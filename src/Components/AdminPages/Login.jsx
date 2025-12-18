import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminAPI } from '../../Services/api';
import { 
  EyeIcon, 
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await adminAPI.login(credentials);
      const { token, admin } = response.data;
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(admin));
      
      toast.success(`Welcome back, ${admin.name || 'Admin'}! 🎉`);
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-12 items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Event Management
              <br />
              <span className="text-blue-200">System</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Streamline your event planning and management with our comprehensive admin platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mt-12">
            {[
              { icon: '📅', text: 'Manage unlimited events' },
              { icon: '📊', text: 'Real-time analytics' },
              { icon: '🎨', text: 'Beautiful galleries' },
              { icon: '🔒', text: 'Secure & reliable' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 text-blue-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl items-center justify-center mb-4 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  focusedInput === 'email' ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  focusedInput === 'password' ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="block w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                />
                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Admin Access Only
                </span>
              </div>
            </div>

            {/* Demo Credentials - Remove in production */}
            <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-blue-700">
                <p>Email: <code className="bg-blue-100 px-2 py-1 rounded">admin@example.com</code></p>
                <p>Password: <code className="bg-blue-100 px-2 py-1 rounded">admin123</code></p>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact{' '}
              <a href="mailto:support@eventpro.com" className="font-semibold text-blue-600 hover:text-blue-700">
                support@eventpro.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;