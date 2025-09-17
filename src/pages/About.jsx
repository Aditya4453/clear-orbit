import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            About <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              ClearOrbit
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced space debris tracking and collision avoidance system
          </p>
        </div>
        
        {/* Mission Section */}
        <div className="tablebck bg-opacity-60 rounded-2xl shadow-2xl p-8 mb-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
            🎯 Our Mission
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            ClearOrbit is dedicated to tracking and monitoring space debris to ensure the safety 
            of active satellites and future space missions. We provide real-time data and 
            visualization tools to help space agencies and organizations make informed decisions 
            about collision avoidance and space traffic management.
          </p>
          
          <h3 className="text-2xl font-semibold mb-6 text-white">🔍 What We Track</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🛰️</div>
                <h4 className="font-bold text-white text-lg">Active Satellites</h4>
              </div>
              <p className="text-blue-100">Operational spacecraft from various space agencies and commercial entities</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🗑️</div>
                <h4 className="font-bold text-white text-lg">Space Debris</h4>
              </div>
              <p className="text-red-100">Non-functional objects including fragments from collisions and explosions</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🚀</div>
                <h4 className="font-bold text-white text-lg">Rocket Bodies</h4>
              </div>
              <p className="text-green-100">Spent rocket stages and boosters left in orbit after missions</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🔧</div>
                <h4 className="font-bold text-white text-lg">Mission Objects</h4>
              </div>
              <p className="text-purple-100">Objects released during missions such as lens covers and deployment mechanisms</p>
            </div>
          </div>
        </div>
        
        {/* Data Sources & Tech Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Data Sources */}
          <div className="tablebck bg-opacity-60 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              📡 Data Sources
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-4">
                <div className="text-2xl">🛰️</div>
                <div>
                  <h4 className="font-semibold text-white">CelesTrak</h4>
                  <p className="text-gray-300 text-sm">Two-Line Element (TLE) data for orbital tracking</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-4">
                <div className="text-2xl">🧮</div>
                <div>
                  <h4 className="font-semibold text-white">SGP4 Propagation</h4>
                  <p className="text-gray-300 text-sm">Accurate position and velocity calculations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-4">
                <div className="text-2xl">🏢</div>
                <div>
                  <h4 className="font-semibold text-white">Space Agencies</h4>
                  <p className="text-gray-300 text-sm">Official reports and collision assessments</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-4">
                <div className="text-2xl">📡</div>
                <div>
                  <h4 className="font-semibold text-white">Ground-based Radar</h4>
                  <p className="text-gray-300 text-sm">Real-time tracking and monitoring</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Implementation */}
          
        </div>
        
        {/* Features Section */}
        <div className="mt-12 tablebck rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-8 text-white text-center">
            ✨ Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold text-white mb-3">3D Visualization</h4>
              <p className="text-gray-300">Interactive globe showing real-time positions of space objects with risk-based color coding</p>
            </div>
            
            <div className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold text-white mb-3">Real-time Updates</h4>
              <p className="text-gray-300">Continuous data refresh every 30 seconds with automatic collision risk assessment</p>
            </div>
            
            <div className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold text-white mb-3">Advanced Analytics</h4>
              <p className="text-gray-300">Comprehensive dashboard with urgency scoring and detailed object classification</p>
            </div>
          </div>
        </div>
        
        {/* Footer Info */}
        
      </div>
    </div>
  );
}
