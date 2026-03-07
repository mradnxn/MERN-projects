import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-textDark font-montserrat relative">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-borderLight z-40 flex items-center gap-4 px-4 shadow-sm">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-textDark p-2 bg-primary/5 rounded-md focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-bold font-playfair text-primary">ShaadiBio</h2>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      {/* Add padding top on mobile to account for the fixed top bar */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full md:w-auto pt-16 md:pt-0">
        <div className="p-4 md:p-12 w-full max-w-7xl mx-auto">
          {/* This Outlet renders the inner child routes (like DashboardHome, CreateBiodata, etc) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
