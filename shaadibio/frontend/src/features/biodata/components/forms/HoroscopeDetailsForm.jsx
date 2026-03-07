import React from 'react';
import { Star } from 'lucide-react';

const HoroscopeDetailsForm = ({ data, onChange }) => {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
        <Star className="text-primary" size={20} />
        <h2 className="text-xl font-bold font-playfair text-primary">Horoscope Details (Optional)</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Rashi (Zodiac)</label>
          <input type="text" value={data.rashi} onChange={(e) => onChange('rashi', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Nakshatra</label>
          <input type="text" value={data.nakshatra} onChange={(e) => onChange('nakshatra', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Gothra</label>
          <input type="text" value={data.gothra} onChange={(e) => onChange('gothra', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Time of Birth</label>
          <input type="time" value={data.timeOfBirth} onChange={(e) => onChange('timeOfBirth', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-textDark">Place of Birth</label>
          <input type="text" value={data.placeOfBirth} onChange={(e) => onChange('placeOfBirth', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="City, State, Country" />
        </div>
      </div>
    </section>
  );
};

export default HoroscopeDetailsForm;
