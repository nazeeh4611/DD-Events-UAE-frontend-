import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { clientAPI } from '../../Services/api';

const ClientForm = ({ isEdit = false, client = null, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      },
      eventType: 'wedding',
      status: 'active',
      source: 'website',
      budget: '',
      notes: '',
      isFeatured: false,
      assignedTo: ''
    }
  });

  const watchStatus = watch('status');
  const watchEventType = watch('eventType');
  const watchBudget = watch('budget');

  useEffect(() => {
    if (isEdit && client) {
      const clientData = {
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        company: client.company || '',
        address: client.address || {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        eventType: client.eventType || 'wedding',
        status: client.status || 'active',
        source: client.source || 'website',
        budget: client.budget || '',
        notes: client.notes || '',
        isFeatured: client.isFeatured || false,
        assignedTo: client.assignedTo?._id || client.assignedTo || ''
      };
      
      reset(clientData);
      setTags(client.tags || []);
    } else {
      // Reset form for new client
      reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        eventType: 'wedding',
        status: 'active',
        source: 'website',
        budget: '',
        notes: '',
        isFeatured: false,
        assignedTo: ''
      });
      setTags([]);
    }
  
    // Add a hidden field for tags in the form
    setValue('tags', tags);
  
    // Fetch assigned users (you'll need to implement this API)
    fetchAssignedUsers();
  }, [client, isEdit, reset, setValue]);

  const fetchAssignedUsers = async () => {
    try {
      // Replace with your actual users API
      // const response = await userAPI.getAllUsers();
      // setAssignedUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const submitForm = async (data) => {
    setLoading(true);
    
    try {
      // Prepare data for backend
      const formData = {
        ...data,
        tags: tags, // tags is state variable
        budget: data.budget ? parseFloat(data.budget) : undefined,
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          country: data.address?.country || '',
          zipCode: data.address?.zipCode || ''
        }
      };
  
      // Clean up empty values
      Object.keys(formData).forEach(key => {
        if (formData[key] === '' || formData[key] === undefined) {
          delete formData[key];
        }
      });
  
      let response;
      if (isEdit && client) {
        response = await clientAPI.updateClient(client.id || client._id, formData);
      } else {
        response = await clientAPI.createClient(formData);
      }
  
      // Call parent onSubmit with the created/updated client
      onSubmit(response.data);
      
    } catch (error) {
      console.error('Submit error:', error);
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(err);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(isEdit ? 'Failed to update client' : 'Failed to create client');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6 p-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter client name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="client@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company/Organization
              </label>
              <div className="relative">
                <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register('company')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="lead">Lead</option>
                <option value="converted">Converted</option>
              </select>
              {errors.status && (
                <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                {...register('eventType', { required: 'Event type is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Source *
              </label>
              <select
                {...register('source', { required: 'Source is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget
              </label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register('budget')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                />
              </div>
              {watchBudget && (
                <p className="mt-2 text-sm text-gray-500">
                  ${parseFloat(watchBudget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <MapPinIcon className="h-6 w-6 text-green-600" />
            </div>
            Address Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                {...register('address.street')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                {...register('address.city')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                {...register('address.state')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="NY"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                {...register('address.country')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="USA"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                {...register('address.zipCode')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="10001"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <TagIcon className="h-6 w-6 text-purple-600" />
            </div>
            Tags & Notes
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
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
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag and press Enter"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowTagInput(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowTagInput(true)}
                className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add Tag
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              rows={4}
              {...register('notes')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Add any notes about the client..."
            />
          </div>
        </div>

        {/* Assignment */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assignment & Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assign To
              </label>
              <select
                {...register('assignedTo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Unassigned</option>
                {assignedUsers.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isFeatured"
                {...register('isFeatured')}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="flex items-center cursor-pointer">
                <span className="text-gray-900 font-medium">Mark as Important Client</span>
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  ★ Important
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                {isEdit ? 'Update Client' : 'Create Client'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;