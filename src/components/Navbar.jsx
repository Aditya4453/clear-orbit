import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-transparent px-8 p-6 text-white flex justify-between items-center m-5 rounded-3xl">
      <div className="text-3xl font-semibold">🛰️ ClearOrbit</div>
      <div className="text-2xl flex items-center justify-evenly space-x-6">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            isActive ? ' font-bold ' : 'hover:underline p-4'
          }
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/visualization"
          className={({ isActive }) => 
            isActive ? ' font-bold ' : 'hover:underline p-4'
          }
        >
          Visualization
        </NavLink>
      </div>
    </nav>
  );
}
