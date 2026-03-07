import React from 'react';
import { Phone, EyeOff } from 'lucide-react';

const ContactDetailsForm = ({ data, onChange, onCheckboxChange }) => {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
            <Phone className="text-primary" size={20} />
            <h2 className="text-xl font-bold font-playfair text-primary">Contact Details</h2>
        </div>
        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="hideContact" 
                checked={data.hideContactInfo}
                onChange={(e) => onCheckboxChange('hideContactInfo', e.target.checked)}
                className="w-4 h-4 text-primary bg-white border-borderLight rounded focus:ring-primary"
            />
            <label htmlFor="hideContact" className="text-sm font-medium text-textDark flex items-center gap-1 cursor-pointer select-none">
                <EyeOff size={16} className="text-textMedium" /> Hide Contact Info
            </label>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Phone Number <span className="text-red-500">*</span></label>
          <input 
            required 
            type="tel" 
            value={data.phone} 
            onChange={(e) => {
              const val = e.target.value;
              if (/^(\+?[0-9]*)$/.test(val)) {
                onChange('phone', val);
              }
            }} 
            className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
            placeholder="+91 9876543210" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Email Address <span className="text-red-500">*</span></label>
          <input required type="email" value={data.email} onChange={(e) => onChange('email', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="contact@example.com" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-textDark">Residential Address</label>
          <textarea rows="3" value={data.residentialAddress} onChange={(e) => onChange('residentialAddress', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Full home address"></textarea>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailsForm;
