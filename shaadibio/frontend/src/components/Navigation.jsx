import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav className={`px-6 md:px-16 py-4 flex justify-between items-center bg-surface sticky top-0 z-50 ${isAuthPage ? 'shadow-sm' : 'shadow-none'}`}>
      <Link to="/" className="text-2xl font-bold font-playfair text-primary">ShaadiBio</Link>
      <div className="flex gap-4 items-center">
        {!isAuthPage && (
           <>
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors hidden sm:block">Login</Link>
            <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-hover transition-colors font-medium text-sm md:text-base">Create Biodata</Link>
           </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
