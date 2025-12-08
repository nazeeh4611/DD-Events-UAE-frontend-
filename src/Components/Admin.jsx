import React from 'react'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LogIn,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../utils/api";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Corporate",
    date: "",
    location: "",
    image: "",
  });

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  /* ------------------ LOGIN HANDLING ------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === "admin@diamonddreams.ae" && password === "diamond123") {
      localStorage.setItem("adminToken", "demo-token");
      setIsAuthenticated(true);
      toast.success("Login successful!");
      fetchEvents();
    } else {
      toast.error("Invalid credentials");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  /* ------------------ FORM HANDLING ------------------ */
  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.createEvent(formData);
      toast.success("Event added successfully!");
      cancelForm();
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
    }

    setIsLoading(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowAddForm(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.updateEvent(editingEvent.id, formData);
      toast.success("Event updated successfully!");
      cancelForm();
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }

    setIsLoading(false);
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.deleteEvent(id);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      category: "Corporate",
      date: "",
      location: "",
      image: "",
    });
  };

  /* ------------------ LOGIN VIEW ------------------ */
  if (!isAuthenticated) {
    return (
      <section
        id="admin"
        aria-label="Admin Login Section"
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      >
        {/* SEO Meta */}
        <meta
          name="description"
          content="Admin dashboard for Diamond Dreams Events Management – manage portfolio events, upload details, update and delete event listings."
        />

        {/* Background */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(#4A7BFF 1px, transparent 1px), linear-gradient(90deg, #4A7BFF 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        <motion.div
          className="relative max-w-md w-full mx-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass p-8 rounded-2xl" role="form" aria-label="Admin login form">
            <div className="text-center mb-8">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center glass mx-auto mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <LogIn aria-hidden="true" className="w-8 h-8 text-[#9CF3FF]" />
              </motion.div>

              <h1 className="text-3xl gradient-text mb-2">Admin Login</h1>
              <p className="text-gray-400">Manage your events portfolio</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  aria-label="Admin email input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@diamonddreams.ae"
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  aria-label="Admin password input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                aria-label="Submit login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 gradient-bg rounded-full text-white flex items-center justify-center gap-2"
              >
                {isLoading ? "Logging in..." : "Login"}
                <LogIn className="w-5 h-5" />
              </motion.button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-6">
              Demo credentials: admin@diamonddreams.ae / diamond123
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ------------------ DASHBOARD VIEW ------------------ */
  return (
    <section
      id="admin"
      aria-label="Admin event management dashboard"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <meta
        name="description"
        content="Admin Dashboard for Diamond Dreams - add, edit, delete and manage event portfolio entries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl gradient-text mb-2">Event Management</h2>
            <p className="text-gray-400">Manage your portfolio events</p>
          </div>

          <div className="flex gap-3">
            <motion.button
              aria-label="Add new event"
              onClick={() => setShowAddForm(true)}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 gradient-bg rounded-full text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Event
            </motion.button>

            <motion.button
              aria-label="Logout from admin panel"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 glass rounded-full text-white flex items-center gap-2 hover:border-red-500"
            >
              <LogOut className="w-5 h-5" /> Logout
            </motion.button>
          </div>
        </header>

        {/* Add / Edit Form */}
        {showAddForm && (
          <motion.div
            role="form"
            aria-label={editingEvent ? "Edit event form" : "Add new event form"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl text-white">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h3>

              <button
                aria-label="Close event form"
                onClick={cancelForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
              className="space-y-6"
            >
              {/* FORM FIELDS */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2">Title *</label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Event Title"
                    aria-label="Event title"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    aria-label="Event category"
                    className="w-full px-4 py-3 glass rounded-lg text-white"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Private">Private</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Date *</label>
                  <input
                    required
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Jan 2024"
                    aria-label="Event date"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Location *</label>
                  <input
                    required
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    aria-label="Event location"
                    placeholder="Dubai"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-white mb-2">Description *</label>
                <textarea
                  rows="3"
                  name="description"
                  required
                  aria-label="Event description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Event description..."
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 resize-none"
                ></textarea>
              </div>

              {/* IMAGE URL */}
              <div>
                <label className="block text-white mb-2">Image URL *</label>
                <input
                  required
                  type="url"
                  name="image"
                  aria-label="Event image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500"
                />
              </div>

              {/* FORM BUTTONS */}
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  aria-label="Save event"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 px-8 py-4 gradient-bg rounded-full text-white flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingEvent ? "Update Event" : "Add Event"}
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="Cancel event editing"
                  onClick={cancelForm}
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 glass rounded-full text-white hover:border-red-500"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* EVENTS LIST */}
        <div className="space-y-4" aria-live="polite">
          {events.length === 0 ? (
            <div className="glass p-12 rounded-2xl text-center">
              <Upload aria-hidden="true" className="w-16 h-16 text-[#9CF3FF] mx-auto mb-4" />
              <h3 className="text-2xl text-white mb-2">No Events Yet</h3>
              <p className="text-gray-400">Start by adding your first event</p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                role="article"
                aria-label={`Event: ${event.title}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl hover:border-[#9CF3FF]"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl text-white mb-1">{event.title}</h3>
                        <span className="px-3 py-1 text-xs gradient-bg rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          aria-label={`Edit event ${event.title}`}
                          onClick={() => handleEditEvent(event)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 glass rounded-lg hover:border-[#9CF3FF]"
                        >
                          <Edit2 className="w-4 h-4 text-[#9CF3FF]" />
                        </motion.button>

                        <motion.button
                          aria-label={`Delete event ${event.title}`}
                          onClick={() => handleDeleteEvent(event.id)}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 glass rounded-lg hover:border-red-500"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-2">{event.description}</p>

                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
