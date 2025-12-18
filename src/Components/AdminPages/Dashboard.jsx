import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  PhotoIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { eventAPI } from '../../Services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    publishedEvents: 0,
    draftEvents: 0,
    featuredEvents: 0,
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await eventAPI.getAllEvents();
      // Handle both response.data and response.data.data
      const events = response.data?.data || response.data || [];
      
      setStats({
        totalEvents: events.length,
        publishedEvents: events.filter(e => e.status === 'published').length,
        draftEvents: events.filter(e => e.status === 'draft').length,
        featuredEvents: events.filter(e => e.featured).length,
        recentEvents: events.slice(0, 5)
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgGradient, trend }) => (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg ${bgGradient} p-6 text-white transform hover:scale-105 transition-all duration-300`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
        <Icon className="h-32 w-32" />
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <div className="flex items-center text-sm font-semibold">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <p className="text-sm opacity-90 mb-1 font-medium">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  const QuickActionCard = ({ to, icon: Icon, title, description, color }) => (
    <Link
      to={to}
      className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {adminUser.name || 'Admin'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your events today.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={CalendarIcon}
            color="bg-white"
            bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
            trend="+12%"
          />
          <StatCard
            title="Published"
            value={stats.publishedEvents}
            icon={CheckCircleIcon}
            color="bg-white"
            bgGradient="bg-gradient-to-br from-green-500 to-emerald-600"
            trend="+8%"
          />
          <StatCard
            title="Featured"
            value={stats.featuredEvents}
            icon={PhotoIcon}
            color="bg-white"
            bgGradient="bg-gradient-to-br from-purple-500 to-indigo-600"
            trend="+5%"
          />
          <StatCard
            title="Draft Events"
            value={stats.draftEvents}
            icon={ClockIcon}
            color="bg-white"
            bgGradient="bg-gradient-to-br from-amber-500 to-orange-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-gray-600 mt-1">Shortcuts to common tasks</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              to="/events/new"
              icon={PlusIcon}
              title="Create New Event"
              description="Add a new event to your portfolio"
              color="bg-blue-600"
            />
            <QuickActionCard
              to="/events"
              icon={ChartBarIcon}
              title="Manage Events"
              description="View and edit all your events"
              color="bg-green-600"
            />
            <QuickActionCard
              to="/gallery"
              icon={PhotoIcon}
              title="View Gallery"
              description="Browse event photos and media"
              color="bg-purple-600"
            />
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Events</h2>
                <p className="text-sm text-gray-600 mt-1">Your latest event activities</p>
              </div>
              <Link 
                to="/events" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
              >
                View All 
                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentEvents.length > 0 ? (
              <div className="space-y-4">
                {stats.recentEvents.map((event, index) => (
                  <div 
                    key={event._id || event.id || index} 
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {event.images && event.images.length > 0 ? (
                          <img 
                            src={event.images[0]} 
                            alt={event.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                            <CalendarIcon className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 flex-wrap">
                          <p className="text-sm text-gray-600 flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            event.status === 'published' ? 'bg-green-100 text-green-700' :
                            event.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {event.status}
                          </span>
                          {event.eventType && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              {event.eventType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/events/edit/${event._id || event.id}`}
                      className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-lg transition-all"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No recent events</p>
                <p className="text-gray-400 text-sm mb-6">Start by creating your first event</p>
                <Link
                  to="/events/new"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create Event
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Event Types Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Types</h3>
            <div className="space-y-3">
              {['Wedding', 'Corporate', 'Birthday', 'Concert', 'Conference', 'Other'].map((type, index) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{Math.floor(Math.random() * 20)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Event Published</p>
                  <p className="text-xs text-gray-500">Summer Festival 2025 - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Event Updated</p>
                  <p className="text-xs text-gray-500">Corporate Gala - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">New Event Created</p>
                  <p className="text-xs text-gray-500">Birthday Celebration - Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;