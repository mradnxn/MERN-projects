import React from 'react';
import { BookOpen } from 'lucide-react';

const EducationDetailsForm = ({ data, onChange }) => {
  return (
    <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
        <BookOpen className="text-primary" size={20} />
        <h2 className="text-xl font-bold font-playfair text-primary">Education & Profession</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-textDark">Education Details <span className="text-red-500">*</span></label>
          <textarea required rows="2" value={data.educationDetails} onChange={(e) => onChange('educationDetails', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Highest Degree, College/University name, etc."></textarea>
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-textDark">Profession Details <span className="text-red-500">*</span></label>
          <textarea required rows="2" value={data.professionDetails} onChange={(e) => onChange('professionDetails', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Job Title, Company Name, Industry."></textarea>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-textDark">Annual Income</label>
          <input type="text" value={data.annualIncome} onChange={(e) => onChange('annualIncome', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. 15 LPA" />
        </div>
      </div>
    </section>
  );
};

export default EducationDetailsForm;
