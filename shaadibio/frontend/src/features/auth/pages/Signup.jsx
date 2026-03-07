import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gradient-to-br from-secondary/20 to-accent/40 px-4 py-8">
      <div className="bg-surface rounded-2xl shadow-xl border border-secondary/40 p-8 md:p-10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-primary mb-2">Begin Your Journey</h2>
          <p className="text-textMedium text-sm">Create an account to start building your beautiful matrimony biodata.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {isError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
              {message}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-textDark">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name" 
              className="w-full px-4 py-3 rounded-lg border border-borderLight bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              required 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-textDark">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 rounded-lg border border-borderLight bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-textDark">Create Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password" 
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-textMedium">
          <p>Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
