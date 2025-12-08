import { projectId, publicAnonKey } from './superbase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-22ededbc`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

export const api = {
  // Get all events
  getEvents: async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Get single event
  getEvent: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  // Create event
  createEvent: async (eventData) => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers,
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers,
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};
