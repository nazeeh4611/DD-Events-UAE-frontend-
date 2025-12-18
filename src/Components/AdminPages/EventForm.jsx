import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  PhotoIcon, 
  XMarkIcon,
  CloudArrowUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { eventAPI } from '../../Services/api';

const EventForm = ({ isEdit = false, event = null, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: '',
      address: '',
      city: '',
      state: '',
      country: '',
      clientName: '',
      eventType: 'wedding',
      status: 'published',
      featured: false
    }
  });

  const watchFeatured = watch('featured');

  useEffect(() => {
    if (isEdit && event) {
      // Populate form with event data
      const eventData = {
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        address: event.location?.address || '',
        city: event.location?.city || '',
        state: event.location?.state || '',
        country: event.location?.country || '',
        clientName: event.clientName || '',
        eventType: event.eventType || 'wedding',
        status: event.status || 'published',
        featured: event.featured || false
      };
      
      reset(eventData);
      setExistingImages(event.images || []);
      setImagePreviews(event.images || []);
    } else {
      // Reset form for new event
      reset({
        title: '',
        description: '',
        date: '',
        address: '',
        city: '',
        state: '',
        country: '',
        clientName: '',
        eventType: 'wedding',
        status: 'published',
        featured: false
      });
      setExistingImages([]);
      setImagePreviews([]);
      setImageFiles([]);
    }
  }, [event, isEdit, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + existingImages.length + imageFiles.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const newImageFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return;
      }

      newImageFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles(newImageFiles);
  };

  const removeImage = (index) => {
    if (index < existingImages.length) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
      
      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    } else {
      const adjustedIndex = index - existingImages.length;
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(adjustedIndex, 1);
      setImageFiles(newImageFiles);
      
      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    }
  };

  const submitForm = async (data) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Add all form data
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('date', data.date);
      formData.append('clientName', data.clientName || '');
      formData.append('eventType', data.eventType);
      formData.append('status', data.status);
      formData.append('featured', data.featured);
      
      // Add location fields separately
      formData.append('address', data.address || '');
      formData.append('city', data.city || '');
      formData.append('state', data.state || '');
      formData.append('country', data.country || '');
      
      // Handle images
      if (existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }
      
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      let response;
      if (isEdit && event) {
        response = await eventAPI.updateEvent(event.id || event._id, formData);
      } else {
        response = await eventAPI.createEvent(formData);
      }

      // Pass the response data to parent
      onSubmit(response.data);
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Operation failed');
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
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                {...register('clientName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Client or company name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                {...register('eventType')}
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
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                {...register('description', { required: 'Description is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe the event..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            Location Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                {...register('address')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                {...register('city')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="City name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                {...register('state')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="State or province"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                {...register('country')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <PhotoIcon className="h-6 w-6 text-purple-600" />
              </div>
              Event Images
            </div>
            <span className="text-sm font-normal text-gray-500">
              {imagePreviews.length}/10 uploaded
            </span>
          </h2>
          
          <div className="mb-6">
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 5MB (Max 10 images)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Cover
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Settings</h2>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              {...register('featured')}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="flex items-center cursor-pointer">
              <span className="text-gray-900 font-medium">Mark as Featured Event</span>
              {watchFeatured && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  ★ Featured
                </span>
              )}
            </label>
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
                {isEdit ? 'Update Event' : 'Create Event'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;