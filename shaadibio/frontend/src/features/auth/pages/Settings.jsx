import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../authSlice';
import { User, Mail, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // Profile State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    setProfileError(null);
    setProfileLoading(true);

    try {
      await dispatch(updateProfile({ name, email })).unwrap();

      setProfileMessage('Profile updated successfully!');
    } catch (err) {
      setProfileError(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);

    if (password !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    if (password.length < 6) {
      return setPasswordError("Password must be at least 6 characters");
    }

    setPasswordLoading(true);

    try {
      await dispatch(updateProfile({ password })).unwrap();

      setPasswordMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in space-y-8">
      
      <header>
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Account Settings</h1>
        <p className="text-textMedium">Update your personal information and secure your account.</p>
      </header>

      {/* Profile Details Card */}
      <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
          <User className="text-primary" size={20} />
          <h2 className="text-xl font-bold font-playfair text-primary">Profile Details</h2>
        </div>
        
        <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
          
          {profileError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 flex items-center gap-3">
              <AlertCircle size={18} /> {profileError}
            </div>
          )}
          {profileMessage && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 flex items-center gap-3">
              <CheckCircle size={18} /> {profileMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-textDark">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
                <User size={18} className="absolute left-3 top-2.5 text-textMedium" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-textDark">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
                <Mail size={18} className="absolute left-3 top-2.5 text-textMedium" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={profileLoading} 
              className={`flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-all ${profileLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Save size={18} /> {profileLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </section>

      {/* Security & Password Card */}
      <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
          <Lock className="text-primary" size={20} />
          <h2 className="text-xl font-bold font-playfair text-primary">Change Password</h2>
        </div>
        
        <form onSubmit={handlePasswordUpdate} className="p-6 space-y-6">
          
          {passwordError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 flex items-center gap-3">
              <AlertCircle size={18} /> {passwordError}
            </div>
          )}
          {passwordMessage && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 flex items-center gap-3">
              <CheckCircle size={18} /> {passwordMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-textDark">New Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Leave blank to keep current"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
                <Lock size={18} className="absolute left-3 top-2.5 text-textMedium" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-textDark">Confirm New Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
                <Lock size={18} className="absolute left-3 top-2.5 text-textMedium" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={passwordLoading || !password} 
              className={`flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-all ${(passwordLoading || !password) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Save size={18} /> {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </section>

    </div>
  );
};

export default Settings;
