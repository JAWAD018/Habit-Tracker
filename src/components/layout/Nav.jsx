import { Target } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
      const navigate =useNavigate(); 
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  return (
    <div>
       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2 rounded-xl shadow-lg">
              <Link to='/'>
                <Target className="w-6 h-6 text-white" />
              </Link>
              </div>
              <Link to='/'>
              <span className="text-xl font-bold text-gray-900">Habit Tracker</span>
               </Link> 
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
