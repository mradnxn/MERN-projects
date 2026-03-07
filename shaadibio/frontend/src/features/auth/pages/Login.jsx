import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard');
      dispatch(reset());
    }
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gradient-to-br from-secondary/20 to-accent/40 px-4 py-8">
      <div className="bg-surface rounded-2xl shadow-xl border border-secondary/40 p-8 md:p-10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-primary mb-2">Welcome Back</h2>
          <p className="text-textMedium text-sm">Login to continue creating your perfect biodata.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
              {message}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-textDark">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-lg border border-borderLight bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-textDark">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              className="w-full px-4 py-3 rounded-lg border border-borderLight bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] mt-2 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMedium">
          <p>Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Create one now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
