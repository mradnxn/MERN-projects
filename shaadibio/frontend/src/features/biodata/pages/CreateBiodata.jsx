import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { createBiodata } from '../biodataSlice';

import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import EducationDetailsForm from '../components/forms/EducationDetailsForm';
import FamilyDetailsForm from '../components/forms/FamilyDetailsForm';
import HoroscopeDetailsForm from '../components/forms/HoroscopeDetailsForm';
import ContactDetailsForm from '../components/forms/ContactDetailsForm';

const CreateBiodata = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  // Form State strictly based on SRS requirements (FR-3 to FR-7)
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      gender: 'Male',
      dob: '',
      age: '', // Auto-calculated
      height: '',
      religion: '',
      caste: '',
      motherTongue: '',
      maritalStatus: 'Never Married',
      nationality: 'Indian'
    },
    education: {
      educationDetails: '',
      professionDetails: '',
      annualIncome: '' // Kept as optional commonly requested
    },
    family: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      siblings: '',
      familyType: 'Nuclear',
      familyStatus: 'Middle Class',
      nativePlace: ''
    },
    horoscope: {
      rashi: '',
      nakshatra: '',
      gothra: '',
      timeOfBirth: '',
      placeOfBirth: ''
    },
    contact: {
      phone: '',
      email: '',
      residentialAddress: '',
      hideContactInfo: false
    }
  });
  // Form State strictly based on SRS requirements (FR-3 to FR-7)

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate age automatically when DOB changes (FR-3)
  useEffect(() => {
    const calculatedAge = calculateAge(formData.personal.dob);
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, age: calculatedAge >= 0 ? calculatedAge.toString() : '' }
    }));
  }, [formData.personal.dob]);

  // Handle nested state updates
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (section, field, checked) => {
     setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (!user || !user.token) {
        throw new Error("You must be logged in to create a biodata.");
      }

      // We must use FormData because we are transmitting a binary File
      const submitData = new FormData();
      
      // Append the nested JSON structures as stringified strings
      submitData.append('personal', JSON.stringify(formData.personal));
      submitData.append('education', JSON.stringify(formData.education));
      submitData.append('family', JSON.stringify(formData.family));
      submitData.append('horoscope', JSON.stringify(formData.horoscope));
      submitData.append('contact', JSON.stringify(formData.contact));

      // Append the actual image file if they selected one
      if (profilePhotoFile) {
        submitData.append('profilePhoto', profilePhotoFile);
      }

      // Notice: Content-Type is REMOVED. 
      // The browser automatically sets the correct Content-Type with random boundaries when passing a FormData instance to fetch.
      await dispatch(createBiodata(submitData)).unwrap();

      console.log("Biodata Saved successfully!");
      navigate('/dashboard/my-biodatas');

    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
      
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Create New Biodata</h1>
        <p className="text-textMedium">Fill in your details according to standard marriage biodata requirements.</p>
        
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <PersonalDetailsForm 
          data={formData.personal} 
          onChange={(field, value) => handleChange('personal', field, value)}
          photoPreview={photoPreview}
          onPhotoCropped={(file, url) => {
            setProfilePhotoFile(file);
            setPhotoPreview(url);
          }}
          onClearPhoto={() => {
            setProfilePhotoFile(null);
            setPhotoPreview(null);
          }}
        />

        <EducationDetailsForm 
          data={formData.education} 
          onChange={(field, value) => handleChange('education', field, value)}
        />

        <FamilyDetailsForm 
          data={formData.family} 
          onChange={(field, value) => handleChange('family', field, value)}
        />

        <HoroscopeDetailsForm 
          data={formData.horoscope} 
          onChange={(field, value) => handleChange('horoscope', field, value)}
        />

        <ContactDetailsForm 
          data={formData.contact} 
          onChange={(field, value) => handleChange('contact', field, value)}
          onCheckboxChange={(field, checked) => handleCheckboxChange('contact', field, checked)}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2 border border-borderLight rounded-md text-textMedium hover:bg-surface hover:text-textDark font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className={`flex items-center gap-2 px-8 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover shadow-md transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
            <Save size={18} />
            {isSubmitting ? 'Saving...' : 'Save Biodata'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateBiodata;
