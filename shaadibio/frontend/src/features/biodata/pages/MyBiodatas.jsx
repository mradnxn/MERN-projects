import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBiodatas, reset } from '../biodataSlice';
import { 
    FileText, 
    Calendar, 
    MapPin, 
    Briefcase, 
    Download, 
    PlusCircle,
    User,
    Edit2
} from 'lucide-react';

const MyBiodatas = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { biodatas, isLoading, isError, message } = useSelector(
      (state) => state.biodata
    );

    useEffect(() => {
        if (isError) {
          console.log(message);
        }

        if (user) {
            dispatch(getBiodatas());
        }

        return () => {
            dispatch(reset());
        }
    }, [user, isError, message, dispatch]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-textMedium font-medium">Loading your biodatas...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                    <p className="font-bold">Error loading data</p>
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-primary mb-2">My Biodatas</h1>
                    <p className="text-textMedium">View and manage all your created marriage biodatas.</p>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/create')}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primaryDark transition-colors shadow-md hover:shadow-lg"
                >
                    <PlusCircle size={20} />
                    <span>Create New</span>
                </button>
            </div>

            {biodatas.length === 0 ? (
                /* Empty State */
                <div className="bg-surface rounded-2xl shadow-sm border border-borderLight p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <FileText size={40} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-playfair text-textDark mb-3">No Biodatas Yet</h2>
                    <p className="text-textMedium max-w-md mx-auto mb-8">
                        You haven't created any biodatas yet. Click the button below to start building your first beautiful marriage biodata profile.
                    </p>
                    <button 
                        onClick={() => navigate('/dashboard/create')}
                        className="bg-primary hover:bg-primaryDark text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Create Your First Biodata
                    </button>
                </div>
            ) : (
                /* Grid of Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {biodatas.map((biodata) => (
                        <div key={biodata._id} className="bg-surface rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-borderLight overflow-hidden flex flex-col group">
                            
                            {/* Card Header (Gradient/Color) */}
                            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary flex items-end p-6 relative">
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
                                    {new Date(biodata.createdAt).toLocaleDateString()}
                                </div>
                                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center absolute -bottom-8 border-4 border-surface text-primary overflow-hidden">
                                    {biodata.personal.profilePhoto ? (
                                        <img src={`https://shaadibio-server.onrender.com${biodata.personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={28} />
                                    )}
                                </div>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-6 pt-10 flex-grow">
                                <h3 className="text-xl font-bold font-playfair text-textDark mb-1">
                                    {biodata.personal.fullName}
                                </h3>
                                <p className="text-primary font-medium text-sm mb-4">
                                    {biodata.personal.gender} • {biodata.personal.maritalStatus}
                                </p>
                                
                                <div className="space-y-3 mb-6">
                                    {biodata.personal.dob && (
                                        <div className="flex items-center text-sm text-textMedium">
                                            <Calendar size={16} className="mr-3 text-primary/70" />
                                            <span>Born {new Date(biodata.personal.dob).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    {biodata.personal.religion && (
                                        <div className="flex items-center text-sm text-textMedium">
                                            <MapPin size={16} className="mr-3 text-primary/70" />
                                            <span>{biodata.personal.religion} {biodata.personal.caste ? `- ${biodata.personal.caste}` : ''}</span>
                                        </div>
                                    )}
                                    {biodata.education.professionDetails && (
                                        <div className="flex items-start text-sm text-textMedium">
                                            <Briefcase size={16} className="mr-3 text-primary/70 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2 leading-relaxed">{biodata.education.professionDetails}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Card Footer actions */}
                            <div className="px-6 py-4 bg-gray-50/80 border-t border-borderLight flex gap-3">
                                <button 
                                    onClick={() => navigate(`/dashboard/edit/${biodata._id}`)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-borderLight text-textDark hover:text-primary hover:border-primary py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                >
                                    <Edit2 size={16} />
                                    <span>Edit Biodata</span>
                                </button>
                                <button 
                                    onClick={() => navigate(`/dashboard/biodata/${biodata._id}`)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryDark py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                >
                                    <Download size={16} />
                                    <span>Create PDF</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBiodatas;
