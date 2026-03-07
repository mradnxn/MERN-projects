import React from 'react';
import { Users } from 'lucide-react';

const FamilyDetailsForm = ({ data, onChange }) => {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
        <Users className="text-primary" size={20} />
        <h2 className="text-xl font-bold font-playfair text-primary">Family Details</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Father's Name <span className="text-red-500">*</span></label>
          <input required type="text" value={data.fatherName} onChange={(e) => onChange('fatherName', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Mr. Sharma" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Father's Occupation</label>
          <input type="text" value={data.fatherOccupation} onChange={(e) => onChange('fatherOccupation', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Businessman" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Mother's Name <span className="text-red-500">*</span></label>
          <input required type="text" value={data.motherName} onChange={(e) => onChange('motherName', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Mrs. Sharma" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Mother's Occupation</label>
          <input type="text" value={data.motherOccupation} onChange={(e) => onChange('motherOccupation', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Homemaker" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Siblings</label>
          <input type="text" value={data.siblings} onChange={(e) => onChange('siblings', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. 1 Brother, 1 Sister" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Family Type</label>
          <select value={data.familyType} onChange={(e) => onChange('familyType', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
            <option value="Nuclear">Nuclear</option>
            <option value="Joint">Joint</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Family Status</label>
          <select value={data.familyStatus} onChange={(e) => onChange('familyStatus', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
            <option value="Middle Class">Middle Class</option>
            <option value="Upper Middle Class">Upper Middle Class</option>
            <option value="Rich/Affluent">Rich/Affluent</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Native Place</label>
          <input type="text" value={data.nativePlace} onChange={(e) => onChange('nativePlace', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Jaipur, Rajasthan" />
        </div>
      </div>
    </section>
  );
};

export default FamilyDetailsForm;
