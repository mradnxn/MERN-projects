import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, PlusCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../auth/authSlice';

const Sidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Biodata', path: '/dashboard/create', icon: <PlusCircle size={20} /> },
    { name: 'My Biodatas', path: '/dashboard/my-biodatas', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-borderLight h-screen flex flex-col">
      
      {/* Brand area for sidebar (only visible if we remove top nav for dashboard) */}
      <div className="p-6 border-b border-borderLight flex items-center justify-center">
         <h2 className="text-2xl font-bold font-playfair text-primary">ShaadiBio</h2>
      </div>

      <nav className="flex-grow py-6 flex flex-col gap-2 px-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/dashboard'} // Active only on exact route for base dashboard
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all font-medium text-sm ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-textMedium hover:bg-surface hover:text-primary border-l-4 border-transparent'
              }`
            }
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
            }}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-borderLight">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-textMedium hover:bg-surface hover:text-primary rounded-md transition-all font-medium text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
