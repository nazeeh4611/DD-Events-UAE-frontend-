import React, { useState, useEffect } from 'react';
import { 
  TrashIcon, 
  PencilIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  MapPinIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { eventAPI } from '../../Services/api';
import EventForm from './EventForm';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterStatus, filterType]);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getAllEvents();
      const eventsArray = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.events || [];
      setEvents(eventsArray);
    } catch (error) {
      toast.error('Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.eventType === filterType);
    }

    setFilteredEvents(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await eventAPI.deleteEvent(id);
      setEvents(events.filter(event => (event.id || event._id) !== id));
      toast.success('Event deleted successfully');
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEditMode(false);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditMode(true);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setIsEditMode(false);
  };

  const handleEventSubmit = async (responseData) => {
    try {
      await fetchEvents();
      
      if (isEditMode) {
        toast.success('Event updated successfully');
      } else {
        toast.success('Event created successfully');
      }
    } catch (error) {
      console.error('Error refreshing events:', error);
    }
    handleCloseModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Manage and organize all your events</p>
          </div>
          <button
            onClick={handleCreateEvent}
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Event
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="birthday">Birthday</option>
                <option value="concert">Concert</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CalendarIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all' 
                ? 'No events found' 
                : 'No events yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Create your first event to get started'}
            </p>
            <button
              onClick={handleCreateEvent}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id || event._id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CalendarIcon className="h-20 w-20 text-white opacity-50" />
                    </div>
                  )}
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    {event.location?.city && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {event.location.city}, {event.location.state || event.location.country}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      event.status === 'published' ? 'bg-green-100 text-green-700' :
                      event.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {event.status}
                    </span>
                    {event.eventType && (
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {event.eventType}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event.id || event._id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Form Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-4xl my-8">
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-0">
                <EventForm
                  isEdit={isEditMode}
                  event={selectedEvent}
                  onSubmit={handleEventSubmit}
                  onCancel={handleCloseModal}
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <TrashIcon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Delete Event
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;