import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  PhotoIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { 
      name: 'Dashboard', 
      icon: HomeIcon, 
      path: '/admin/dashboard',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Events', 
      icon: CalendarIcon, 
      path: '/admin/events',
      gradient: 'from-green-500 to-emerald-600'
    },
    // { 
    //   name: 'Gallery', 
    //   icon: PhotoIcon, 
    //   path: '/admin/gallery',
    //   gradient: 'from-purple-500 to-indigo-600'
    // },
    { 
      name: 'Clients', 
      icon: UsersIcon, 
      path: '/admin/clients',
      gradient: 'from-pink-500 to-rose-600'
    },
    // { 
    //   name: 'Reports', 
    //   icon: ChartBarIcon, 
    //   path: '/reports',
    //   gradient: 'from-amber-500 to-orange-600'
    // },
    { 
      name: 'Settings', 
      icon: Cog6ToothIcon, 
      path: '/settings',
      gradient: 'from-gray-500 to-gray-600'
    },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DD Events </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                    : 'text-gray-700 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                <div className={`mr-3 flex-shrink-0 ${
                  isActive ? '' : 'opacity-60 group-hover:opacity-100'
                }`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span>{item.name}</span>
                
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats - Optional */}
        
        {/* Logout Button */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;