import React, { useState, useCallback } from 'react';
import { User as UserIcon, X, Crop } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../../utils/cropImage';

const PersonalDetailsForm = ({ 
  data, 
  onChange, 
  photoPreview, 
  onPhotoCropped,
  onClearPhoto 
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage.file], "profile-photo.jpg", { type: "image/jpeg" });
      onPhotoCropped(file, croppedImage.url);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bg-surface rounded-xl shadow-sm border border-borderLight overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-borderLight flex items-center gap-3">
        <UserIcon className="text-primary" size={20} />
        <h2 className="text-xl font-bold font-playfair text-primary">Personal Details</h2>
      </div>
      
      <div className="p-6">
        {/* Profile Photo Upload */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-borderLight">
          <div className="flex-shrink-0">
            {photoPreview ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-md group">
                <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={onClearPhoto}
                  className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={24} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-300 text-gray-400">
                <UserIcon size={40} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-textDark mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 font-semibold py-2.5 px-6 rounded-full transition-all text-sm flex items-center gap-2 border-0">
                <Crop size={16} />
                <span>Choose Image</span>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-3 text-xs text-textMedium">Recommended: Square format, JPG or PNG up to 2MB.</p>
          </div>
        </div>

        {/* Cropper Modal */}
        {showCropper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-surface rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
              <div className="px-6 py-4 border-b border-borderLight flex justify-between items-center bg-white">
                <h3 className="font-playfair font-bold text-lg text-textDark">Adjust Photo</h3>
                <button type="button" onClick={() => setShowCropper(false)} className="text-textMedium hover:text-textDark">
                  <X size={24} />
                </button>
              </div>
              
              <div className="relative w-full h-80 bg-gray-900">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              
              <div className="p-6 bg-white space-y-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl text-sm text-center font-medium border border-primary/10">
                  Drag to adjust position. Scroll or pinch to zoom.
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowCropper(false)}
                    className="flex-1 py-3 border border-borderLight rounded-xl font-medium text-textMedium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSaveCrop}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primaryDark transition-colors shadow-md"
                  >
                    Apply Profile Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Full Name <span className="text-red-500">*</span></label>
            <input required type="text" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Enter full name" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Gender <span className="text-red-500">*</span></label>
            <select required value={data.gender} onChange={(e) => onChange('gender', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Date of Birth <span className="text-red-500">*</span></label>
            <input required type="date" value={data.dob} onChange={(e) => onChange('dob', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Age</label>
            <input type="text" readOnly value={data.age} className="w-full px-4 py-2 rounded-md border border-borderLight bg-gray-50 text-gray-500 transition-all cursor-not-allowed" placeholder="Calculated from DOB" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Height <span className="text-red-500">*</span></label>
            <input required type="text" value={data.height} onChange={(e) => onChange('height', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. 5'8&quot;" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Religion <span className="text-red-500">*</span></label>
            <input required type="text" value={data.religion} onChange={(e) => onChange('religion', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Hindu" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Caste</label>
            <input type="text" value={data.caste} onChange={(e) => onChange('caste', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Brahmin" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Mother Tongue</label>
            <input type="text" value={data.motherTongue} onChange={(e) => onChange('motherTongue', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Hindi, Tamil" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Marital Status <span className="text-red-500">*</span></label>
            <select required value={data.maritalStatus} onChange={(e) => onChange('maritalStatus', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Awaiting Divorce">Awaiting Divorce</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textDark">Nationality</label>
            <input type="text" value={data.nationality} onChange={(e) => onChange('nationality', e.target.value)} className="w-full px-4 py-2 rounded-md border border-borderLight focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="E.g. Indian" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetailsForm;
