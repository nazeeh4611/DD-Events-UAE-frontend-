import React, { useState, useEffect } from 'react';
import { Trash2, Edit, User, Search, Plus, Mail, Phone, Download, Building2, MapPin, Tag, DollarSign, X, CheckCircle, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { clientAPI } from '../../Services/api';
import toast from 'react-hot-toast';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    leads: 0,
    featured: 0
  });
  const [expandedClient, setExpandedClient] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchStats();
  }, [currentPage, searchTerm, filterStatus, filterType]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        eventType: filterType !== 'all' ? filterType : undefined
      };
      
      const response = await clientAPI.getAllClients(params);
      console.log(response,"resposne")
      if (response.data.success) {
        setClients(response.data.data);
        setFilteredClients(response.data.data);
        setTotalClients(response.data.total);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await clientAPI.getClientStats();
      if (response.data.success) {
        const statsData = response.data.data;
        setStats({
          total: statsData.totalClients?.[0]?.count || 0,
          active: statsData.byStatus?.find(s => s._id === 'active')?.count || 0,
          leads: statsData.byStatus?.find(s => s._id === 'lead')?.count || 0,
          featured: clients.filter(c => c.isFeatured).length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await clientAPI.deleteClient(id);
      if (response.data.success) {
        setClients(clients.filter(client => client._id !== id));
        toast.success('Client deleted successfully');
        setDeleteConfirm(null);
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };

  const handleCreateClient = () => {
    setSelectedClient(null);
    setIsEditMode(false);
    setShowClientModal(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsEditMode(true);
    setShowClientModal(true);
  };

  const handleCloseModal = () => {
    setShowClientModal(false);
    setSelectedClient(null);
    setIsEditMode(false);
  };

  const handleClientSubmit = async (newClient) => {
    try {
      let response;
      if (isEditMode && selectedClient) {
        response = await clientAPI.updateClient(selectedClient._id, newClient);
        if (response.data.success) {
          setClients(clients.map(client => 
            client._id === selectedClient._id ? response.data.data : client
          ));
          toast.success('Client updated successfully');
        }
      } else {
        response = await clientAPI.createClient(newClient);
        if (response.data.success) {
          setClients([response.data.data, ...clients]);
          toast.success('Client created successfully');
        }
      }
      handleCloseModal();
      fetchStats();
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error(error.response?.data?.message || 'Failed to save client');
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedClients.length === 0) return;

    try {
      if (bulkAction === 'delete') {
        if (!window.confirm(`Delete ${selectedClients.length} selected clients?`)) return;
        const response = await clientAPI.bulkDelete({ clientIds: selectedClients });
        if (response.data.success) {
          setClients(clients.filter(client => !selectedClients.includes(client._id)));
          setSelectedClients([]);
          toast.success(response.data.message);
          fetchStats();
        }
      } else if (['active', 'inactive', 'lead', 'converted'].includes(bulkAction)) {
        const response = await clientAPI.bulkUpdateStatus({
          clientIds: selectedClients,
          status: bulkAction
        });
        if (response.data.success) {
          await fetchClients();
          setSelectedClients([]);
          toast.success(response.data.message);
          fetchStats();
        }
      }
      setBulkAction('');
    } catch (error) {
      console.error('Bulk action error:', error);
      toast.error('Failed to perform bulk action');
    }
  };

  const handleSelectClient = (id) => {
    setSelectedClients(prev =>
      prev.includes(id) ? prev.filter(clientId => clientId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client._id));
    }
  };

  const handleExport = async () => {
    try {
      const response = await clientAPI.exportClients();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `clients_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export completed');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export clients');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleClientExpand = (id) => {
    setExpandedClient(expandedClient === id ? null : id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    lead: 'bg-blue-100 text-blue-700 border-blue-200',
    converted: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  const eventTypeColors = {
    wedding: 'bg-pink-100 text-pink-700',
    corporate: 'bg-blue-100 text-blue-700',
    birthday: 'bg-yellow-100 text-yellow-700',
    concert: 'bg-purple-100 text-purple-700',
    conference: 'bg-indigo-100 text-indigo-700',
    other: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage all your client relationships</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExport} 
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              <Download className="h-5 w-5" />
              <span className="hidden md:inline">Export</span>
            </button>
            <button 
              onClick={handleCreateClient} 
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden md:inline">New Client</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-gray-200">
            <div className="text-sm font-medium text-gray-600">Total Clients</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-green-200">
            <div className="text-sm font-medium text-gray-600">Active</div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-blue-200">
            <div className="text-sm font-medium text-gray-600">Leads</div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">{stats.leads}</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl border-2 border-yellow-200">
            <div className="text-sm font-medium text-gray-600">Featured</div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600 mt-2">{stats.featured}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="lead">Lead</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
                <select 
                  value={filterType} 
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
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
          )}
        </div>

        {selectedClients.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-blue-900 font-medium">
              {selectedClients.length} client{selectedClients.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex flex-col md:flex-row gap-3">
              <select 
                value={bulkAction} 
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose action...</option>
                <option value="active">Mark as Active</option>
                <option value="inactive">Mark as Inactive</option>
                <option value="lead">Mark as Lead</option>
                <option value="converted">Mark as Converted</option>
                <option value="delete">Delete Selected</option>
              </select>
              <div className="flex gap-2">
                <button 
                  onClick={handleBulkAction} 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
                <button 
                  onClick={() => setSelectedClients([])} 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredClients.length} of {totalClients} clients
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Loading clients...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-16">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={handleCreateClient} 
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Add Client
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                    <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Contact</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <React.Fragment key={client._id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 md:px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedClients.includes(client._id)}
                            onChange={() => handleSelectClient(client._id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {client.name?.charAt(0).toUpperCase() || 'C'}
                            </div>
                            <div>
                              <button
                                onClick={() => toggleClientExpand(client._id)}
                                className="font-medium text-gray-900 flex items-center gap-2 hover:text-blue-600"
                              >
                                {client.name || 'Unnamed Client'}
                                {client.isFeatured && <span className="text-yellow-500">★</span>}
                                {expandedClient === client._id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                              <div className="text-sm text-gray-500 md:hidden">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {client.email || 'No email'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-2 text-gray-900 mb-1">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {client.email || 'No email'}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {client.phone || 'No phone'}
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-6 py-4">
                          <div className="text-sm text-gray-900">{client.company || '—'}</div>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="space-y-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[client.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                              {client.status || 'unknown'}
                            </span>
                            <div className={`inline-block px-2 py-0.5 rounded text-xs ${eventTypeColors[client.eventType] || 'bg-gray-100 text-gray-700'}`}>
                              {client.eventType || 'other'}
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {formatDate(client.lastContacted)}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClient(client)} 
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirm(client._id)} 
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedClient === client._id && (
                        <tr className="bg-blue-50">
                          <td colSpan="7" className="px-4 md:px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{client.email || 'No email'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{client.phone || 'No phone'}</span>
                                  </div>
                                  {client.company && (
                                    <div className="flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm">{client.company}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                                {client.address ? (
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div className="text-sm">
                                      {client.address.street && <div>{client.address.street}</div>}
                                      {(client.address.city || client.address.state) && (
                                        <div>{[client.address.city, client.address.state].filter(Boolean).join(', ')}</div>
                                      )}
                                      {client.address.country && <div>{client.address.country}</div>}
                                      {client.address.zipCode && <div>{client.address.zipCode}</div>}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-500">No address</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Details</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Source: {client.source || 'Unknown'}</span>
                                  </div>
                                  {client.budget && (
                                    <div className="flex items-center gap-2">
                                      <DollarSign className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm">Budget: ${parseFloat(client.budget).toLocaleString()}</span>
                                    </div>
                                  )}
                                  <div className="text-sm text-gray-600">
                                    Created: {formatDate(client.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {client.tags && client.tags.length > 0 && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                  {client.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {client.notes && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                                <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                                  {client.notes}
                                </p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && filteredClients.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalClients)} of {totalClients} clients
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Client</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this client? This action cannot be undone.</p>
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

      {showClientModal && (
        <ClientFormModal
          isEditMode={isEditMode}
          selectedClient={selectedClient}
          onClose={handleCloseModal}
          onSubmit={handleClientSubmit}
        />
      )}
    </div>
  );
};

const ClientFormModal = ({ isEditMode, selectedClient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: { street: '', city: '', state: '', country: '', zipCode: '' },
    eventType: 'wedding',
    status: 'active',
    source: 'website',
    budget: '',
    notes: '',
    isFeatured: false,
    tags: []
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && selectedClient) {
      setFormData({
        name: selectedClient.name || '',
        email: selectedClient.email || '',
        phone: selectedClient.phone || '',
        company: selectedClient.company || '',
        address: selectedClient.address || { street: '', city: '', state: '', country: '', zipCode: '' },
        eventType: selectedClient.eventType || 'wedding',
        status: selectedClient.status || 'active',
        source: selectedClient.source || 'website',
        budget: selectedClient.budget || '',
        notes: selectedClient.notes || '',
        isFeatured: selectedClient.isFeatured || false,
        tags: selectedClient.tags || []
      });
      setTags(selectedClient.tags || []);
    }
  }, [isEditMode, selectedClient]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setFormData({ ...formData, tags: newTags });
      setTagInput('');
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setFormData({ ...formData, tags: newTags });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Client' : 'Add New Client'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <User className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
              </div>
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="client@example.com"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="lead">Lead</option>
                  <option value="converted">Converted</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="concert">Concert</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Source *</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social Media</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
              </div>
              Address Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province</label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="USA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP/Postal Code</label>
                <input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Tag className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
              </div>
              Tags & Notes
            </h3>

            <div className="mb-4 md:mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-blue-500 hover:text-blue-700">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              {showTagInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tag and press Enter"
                    autoFocus
                  />
                  <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                  <button type="button" onClick={() => setShowTagInput(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
              ) : (
                <button type="button" onClick={() => setShowTagInput(true)} className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600">+ Add Tag</button>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes about the client..."
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Settings</h3>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="flex items-center cursor-pointer">
                <span className="text-gray-900 font-medium">Mark as Important Client</span>
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">★ Important</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 md:px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg flex items-center disabled:opacity-50">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {isEditMode ? 'Update Client' : 'Create Client'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Clients;