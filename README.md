# 🚀 ClearOrbit – Space Debris Tracking & Visualization

## 📌 Overview
**ClearOrbit** is a lightweight web application designed to **track and visualize space debris** while helping operators prioritize risks using an **Urgency Score** inspired by ATS (Applicant Tracking System) ranking.  

With millions of objects orbiting Earth, space debris poses a growing threat to satellites and missions. Our solution simplifies debris data into an **interactive dashboard** and a **3D visualization**, enabling quick identification of high-risk debris.

---

## ✨ Features
- 📊 **Dashboard View**  
  - Displays debris objects sorted by urgency score.  
  - Color-coded urgency badges (🔴 High, 🟡 Medium, 🟢 Low).  

- 🌍 **3D Visualization**  
  - Interactive globe showing debris points.  
  - Color-coded based on urgency.  
  - Click any object to see details.  

- ℹ️ **About Page**  
  - Problem, Solution, and Impact explained.  

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite) + React Router  
- **Styling:** Tailwind CSS  
- **Visualization:** react-globe.gl, Recharts  
- **Data Handling:** JSON dataset (processed from CelesTrak TLEs)  

---

## 📂 Project Structure
public/
debris.json # Dataset with debris info + urgency scores
src/
App.jsx # Main routing
main.jsx # React entry point
index.css # Global styles
components/
Navbar.jsx
DataTable.jsx
ScoreBadge.jsx
GlobeViz.jsx
pages/
Dashboard.jsx
Visualization.jsx
About.jsx

---

## ⚡ Installation & Setup
```bash
# Clone the repo
git clone https://github.com/your-username/clearorbit.git
cd clearorbit

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
