import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getBiodata, updateBiodata } from '../biodataSlice';

import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import EducationDetailsForm from '../components/forms/EducationDetailsForm';
import FamilyDetailsForm from '../components/forms/FamilyDetailsForm';
import HoroscopeDetailsForm from '../components/forms/HoroscopeDetailsForm';
import ContactDetailsForm from '../components/forms/ContactDetailsForm';

const EditBiodata = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  // Form State strictly based on SRS requirements
  const [formData, setFormData] = useState({
    personal: { fullName: '', gender: 'Male', dob: '', age: '', height: '', religion: '', caste: '', motherTongue: '', maritalStatus: 'Never Married', nationality: 'Indian' },
    education: { educationDetails: '', professionDetails: '', annualIncome: '' },
    family: { fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '', siblings: '', familyType: 'Nuclear', familyStatus: 'Middle Class', nativePlace: '' },
    horoscope: { rashi: '', nakshatra: '', gothra: '', timeOfBirth: '', placeOfBirth: '' },
    contact: { phone: '', email: '', residentialAddress: '', hideContactInfo: false }
  });

  // Fetch the Biodata on load
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const data = await dispatch(getBiodata(id)).unwrap();

        const personalData = { ...(data.personal || {}) };
        
        // Ensure DOB is properly formatted for <input type="date"> (YYYY-MM-DD)
        if (personalData.dob) {
            try {
                personalData.dob = new Date(personalData.dob).toISOString().split('T')[0];
            } catch (e) {
                console.error("Invalid DOB format", e);
            }
        }

        // Pre-fill form
        setFormData({
          personal: personalData,
          education: data.education || {},
          family: data.family || {},
          horoscope: data.horoscope || {},
          contact: data.contact || { hideContactInfo: false }
        });

        // Current photo preview from DB
        if (data.personal && data.personal.profilePhoto) {
            setPhotoPreview(`https://shaadibio-server.onrender.com${data.personal.profilePhoto}`);
        }

      } catch (err) {
        setError(typeof err === 'string' ? err : err.message || 'Failed to fetch Biodata');
      } finally {
        setLoadingInitial(false);
      }
    };

    if (user && id) {
       fetchBiodata();
    }
  }, [id, user, dispatch]);

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

  useEffect(() => {
    const calculatedAge = calculateAge(formData.personal.dob);
    if (!loadingInitial) {
      setFormData(prev => ({
        ...prev,
        personal: { ...prev.personal, age: calculatedAge >= 0 ? calculatedAge.toString() : '' }
      }));
    }
  }, [formData.personal.dob, loadingInitial]);

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
      if (!user || !user.token) throw new Error("You must be logged in to edit a biodata.");

      const submitData = new FormData();
      
      submitData.append('personal', JSON.stringify(formData.personal));
      submitData.append('education', JSON.stringify(formData.education));
      submitData.append('family', JSON.stringify(formData.family));
      submitData.append('horoscope', JSON.stringify(formData.horoscope));
      submitData.append('contact', JSON.stringify(formData.contact));

      if (profilePhotoFile) {
        submitData.append('profilePhoto', profilePhotoFile);
      }

      await dispatch(updateBiodata({ id, biodataData: submitData })).unwrap();

      console.log("Biodata Updated successfully!");
      navigate('/dashboard/my-biodatas');

    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingInitial) {
     return (
        <div className="flex justify-center items-center h-64">
           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
      
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Edit Biodata</h1>
        <p className="text-textMedium">Update your details according to standard marriage biodata requirements.</p>
        
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
          <button type="button" onClick={() => navigate('/dashboard/my-biodatas')} className="px-6 py-2 border border-borderLight rounded-md text-textMedium hover:bg-surface hover:text-textDark font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className={`flex items-center gap-2 px-8 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-hover shadow-md transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
            <Save size={18} />
            {isSubmitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditBiodata;
