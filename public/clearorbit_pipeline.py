
"""
ClearOrbit Space Debris Tracking & Visualization - Data Pipeline
Author: Generated for ClearOrbit Project
Date: September 2025

This script fetches TLE data from CelesTrak, processes it with SGP4,
and generates a structured dataset for space debris visualization.
"""

import requests
import json
import pandas as pd
import random
from datetime import datetime, timezone
import re
import math
import time
from sgp4.api import Satrec, jday

class ClearOrbitPipeline:
    def __init__(self):
        self.earth_radius_km = 6371.0
        self.processed_data = []

    def fetch_celestrak_data(self):
        """
        Fetch TLE data using CelesTrak's current GP data format
        """
        groups = [
            'active',      # Active satellites
            'stations',    # Space stations  
            'last-30-days' # Recently cataloged objects (often includes debris)
        ]

        all_tle_data = []

        print("Fetching TLE data from CelesTrak...")

        for group in groups:
            url = f"https://celestrak.org/NORAD/elements/gp.php?GROUP={group}&FORMAT=tle"
            try:
                response = requests.get(url, timeout=15)
                if response.status_code == 200 and response.text.strip():
                    print(f"✓ Successfully fetched {group}: {len(response.text.splitlines())} lines")
                    all_tle_data.append(response.text)
                    break  # Just use the first successful one for performance
                else:
                    print(f"✗ Failed to fetch {group}: Status {response.status_code}")
            except Exception as e:
                print(f"✗ Error fetching {group}: {str(e)}")

        return all_tle_data

    def parse_tle_data(self, tle_text):
        """
        Parse TLE text into structured data format
        """
        lines = tle_text.strip().split('\n')
        satellites = []

        i = 0
        while i < len(lines) - 2:
            # Skip empty lines
            if not lines[i].strip():
                i += 1
                continue

            # Look for TLE format: name, line1, line2
            name_line = lines[i].strip()

            if i + 2 < len(lines):
                line1 = lines[i + 1].strip()
                line2 = lines[i + 2].strip()

                # Validate TLE format
                if (len(line1) >= 69 and len(line2) >= 69 and 
                    line1.startswith('1 ') and line2.startswith('2 ')):

                    satellites.append({
                        'name': name_line,
                        'tle_line1': line1,
                        'tle_line2': line2
                    })
                    i += 3
                else:
                    i += 1
            else:
                break

        print(f"Parsed {len(satellites)} satellite TLE entries")
        return satellites

    def extract_satellite_data(self, tle_entry):
        """
        Extract structured data from TLE entry using SGP4
        """
        try:
            # Parse TLE lines
            name = tle_entry['name']
            line1 = tle_entry['tle_line1']
            line2 = tle_entry['tle_line2']

            # Create SGP4 satellite object
            satellite = Satrec.twoline2rv(line1, line2)

            # Extract NORAD catalog number (satellite ID)
            satnum = int(line1[2:7])

            # Extract epoch from TLE
            epoch_year = int(line1[18:20])
            # Convert 2-digit year to 4-digit year
            if epoch_year < 57:
                epoch_year += 2000
            else:
                epoch_year += 1900

            epoch_days = float(line1[20:32])

            # Create current time for position calculation
            now = datetime.now(timezone.utc)
            jd, fr = jday(now.year, now.month, now.day, now.hour, now.minute, now.second)

            # Get satellite position and velocity
            error, position, velocity = satellite.sgp4(jd, fr)

            if error == 0 and position is not None:
                # Calculate altitude (distance from Earth center - Earth radius)
                distance_from_center = math.sqrt(position[0]**2 + position[1]**2 + position[2]**2)
                altitude = distance_from_center - self.earth_radius_km

                # Classify orbit type based on altitude
                if altitude < 2000:
                    orbit_type = "LEO"
                elif altitude < 35786:
                    orbit_type = "MEO"
                else:
                    orbit_type = "GEO"

                return {
                    'id': satnum,
                    'name': name,
                    'tle_line1': line1,
                    'tle_line2': line2,
                    'epoch_year': epoch_year,
                    'epoch_days': epoch_days,
                    'altitude': round(altitude, 1),
                    'orbit_type': orbit_type,
                    'position': position,
                    'velocity': velocity
                }

        except Exception as e:
            print(f"Error processing {name}: {e}")
            return None

    def classify_object_type(self, name):
        """
        Classify object type based on name patterns
        """
        name_upper = name.upper()

        # Debris indicators
        debris_keywords = ['DEB', 'DEBRIS', 'FRAG', 'FRAGMENT']
        rocket_keywords = ['R/B', 'ROCKET BODY', 'ROCKET', 'BOOSTER']

        if any(keyword in name_upper for keyword in debris_keywords):
            return 'Debris'
        elif any(keyword in name_upper for keyword in rocket_keywords):
            return 'Rocket Body'
        else:
            return 'Satellite'

    def calculate_urgency_score(self, altitude, object_type):
        """
        Calculate urgency score based on altitude and object type
        Formula: urgency = (100 - altitude/1000) + object_type_weight + random_factor

        Lower altitude = higher risk
        Object type weight: Debris=30, Rocket Body=20, Satellite=10
        Random factor (0-10) for variability
        """

        # Object type weights
        type_weights = {
            'Debris': 30,
            'Rocket Body': 20,
            'Satellite': 10
        }

        # Calculate components
        altitude_factor = max(0, 100 - altitude/1000)  # Lower altitude = higher score
        type_weight = type_weights.get(object_type, 10)
        random_factor = random.uniform(0, 10)

        urgency = altitude_factor + type_weight + random_factor

        return round(urgency, 1)

    def create_sample_debris(self):
        """
        Create some sample debris entries based on known events for demo purposes
        """
        debris_templates = [
            {"base_name": "COSMOS 2251 DEB", "base_id": 33757, "base_alt": 785},
            {"base_name": "FENGYUN 1C DEB", "base_id": 33441, "base_alt": 850},
            {"base_name": "IRIDIUM 33 DEB", "base_id": 24946, "base_alt": 790},
            {"base_name": "COSMOS 1408 DEB", "base_id": 82915, "base_alt": 470}
        ]

        sample_debris = []

        for i, template in enumerate(debris_templates):
            # Create a few variants of each debris event
            for j in range(2):
                debris_id = template["base_id"] + j + 1
                altitude = template["base_alt"] + random.randint(-30, 30)

                # Create simplified TLE lines for demo
                tle_line1 = f"1 {debris_id:5d}U 93036{chr(65+j):1s} 25260.47336218  .00001534  00000-0  35580-4 0  9996"
                tle_line2 = f"2 {debris_id:5d}  51.6453  57.0843 0001671  64.9808  73.0513 15.49338189252428"

                urgency_score = self.calculate_urgency_score(altitude, 'Debris')

                sample_entry = {
                    'id': debris_id,
                    'name': f"{template['base_name']} #{j+1}",
                    'tle_line1': tle_line1,
                    'tle_line2': tle_line2,
                    'orbit_type': 'LEO' if altitude < 2000 else 'MEO',
                    'altitude': altitude,
                    'object_type': 'Debris',
                    'urgency_score': urgency_score
                }

                sample_debris.append(sample_entry)

        return sample_debris

    def run_pipeline(self, max_objects=50):
        """
        Run the complete data pipeline
        """
        start_time = time.time()

        print("=== ClearOrbit Space Debris Data Pipeline ===\n")

        # Step 1: Fetch TLE data
        tle_raw_data = self.fetch_celestrak_data()

        if not tle_raw_data:
            print("No TLE data fetched. Cannot proceed.")
            return []

        # Step 2: Parse TLE data
        print(f"\nStep 2: Parsing TLE data...")
        all_satellites = []
        for tle_text in tle_raw_data:
            satellites = self.parse_tle_data(tle_text)
            all_satellites.extend(satellites)

        # Step 3: Process satellite data
        print(f"\nStep 3: Processing satellite data with SGP4...")
        processed_data = []

        # Process a sample of satellites
        sample_size = min(max_objects * 3, len(all_satellites))  # Process more to get enough valid ones
        sample_satellites = all_satellites[:sample_size]

        for i, tle_entry in enumerate(sample_satellites):
            if len(processed_data) >= max_objects:
                break

            data = self.extract_satellite_data(tle_entry)
            if data:
                # Add object classification and urgency score
                object_type = self.classify_object_type(data['name'])
                urgency_score = self.calculate_urgency_score(data['altitude'], object_type)

                # Create final data structure
                final_entry = {
                    'id': data['id'],
                    'name': data['name'],
                    'tle_line1': data['tle_line1'],
                    'tle_line2': data['tle_line2'],
                    'orbit_type': data['orbit_type'],
                    'altitude': data['altitude'],
                    'object_type': object_type,
                    'urgency_score': urgency_score
                }

                processed_data.append(final_entry)

            if (i + 1) % 25 == 0:
                print(f"  Processed {i + 1}/{sample_size} satellites...")

        # Add some sample debris for demo purposes
        sample_debris = self.create_sample_debris()
        processed_data.extend(sample_debris[:max_objects//4])  # Add up to 1/4 as sample debris

        # Limit to requested number of objects
        processed_data = processed_data[:max_objects]

        # Sort by urgency score (highest first)
        processed_data.sort(key=lambda x: x['urgency_score'], reverse=True)

        # Step 4: Save to JSON
        print(f"\nStep 4: Saving data to debris.json...")

        with open('debris.json', 'w') as f:
            json.dump(processed_data, f, indent=2)

        # Statistics
        type_counts = {}
        for obj in processed_data:
            obj_type = obj['object_type']
            type_counts[obj_type] = type_counts.get(obj_type, 0) + 1

        elapsed_time = time.time() - start_time

        print(f"\n=== Pipeline Complete! ===")
        print(f"✓ Processed {len(processed_data)} objects in {elapsed_time:.1f} seconds")
        print(f"✓ Saved to debris.json")
        print("\nObject Distribution:")
        for obj_type, count in type_counts.items():
            print(f"  {obj_type}: {count}")

        # Show sample results
        print("\n=== Sample High-Priority Objects ===")
        for obj in processed_data[:3]:
            print(f"ID: {obj['id']} | {obj['name']}")
            print(f"Type: {obj['object_type']} | Altitude: {obj['altitude']} km")
            print(f"Urgency Score: {obj['urgency_score']} | Orbit: {obj['orbit_type']}")
            print("-" * 50)

        return processed_data

def main():
    """
    Main execution function
    """
    pipeline = ClearOrbitPipeline()

    try:
        # Run pipeline with ~50 objects as requested
        data = pipeline.run_pipeline(max_objects=50)

        if data:
            print(f"\n✅ Success! Generated debris.json with {len(data)} objects")
            print("Ready for frontend integration.")
        else:
            print("\n❌ Failed to generate data")

    except Exception as e:
        print(f"\n❌ Pipeline failed with error: {str(e)}")

if __name__ == "__main__":
    main()
