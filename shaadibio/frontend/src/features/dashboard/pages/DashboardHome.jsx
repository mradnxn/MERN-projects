import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Eye, Clock, Edit2, Download, Shield, Zap } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getBiodatas, reset } from '../../biodata/biodataSlice';

const DashboardHome = () => {
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
    };
  }, [user, navigate, isError, message, dispatch]);

  const totalCount = biodatas.length;
  // Sort by newest first, take top 3
  const recentBiodatas = [...biodatas]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Header section */}
      <header>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
           <h1 className="text-3xl font-playfair font-bold text-primary flex flex-wrap items-center gap-3">
              Welcome, {user?.name || 'User'}! 
              {user?.isPremium && new Date() < new Date(user?.premiumExpiryDate) && (
                 <span className="bg-gradient-to-r flex items-center gap-1 from-[#D4AF37] to-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-sm font-sans tracking-wide">
                    <Shield size={14} /> PREMIUM MEMBER
                 </span>
              )}
           </h1>
        </div>
        <p className="text-textMedium mb-6">Manage your profiles, create new matrimonial biodatas, and track your progress.</p>
      </header>

      {/* Premium Banner (If Not Premium) */}
      {(!user?.isPremium || new Date() > new Date(user?.premiumExpiryDate)) && (
        <div className="bg-gradient-to-r from-accent to-pink-500 rounded-xl p-6 shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-4 transform hover:scale-[1.01] transition-transform">
           <div className="flex items-center gap-4">
             <div className="bg-white/20 p-3 rounded-full">
               <Shield size={28} className="text-white" />
             </div>
             <div>
               <h3 className="text-xl font-playfair font-bold">Remove PDF Watermarks</h3>
               <p className="text-white/80 text-sm mt-1">Upgrade to Premium to download clean, professional biodatas.</p>
             </div>
           </div>
           <Link to="/dashboard/premium" className="bg-white text-accent font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap flex items-center gap-2">
             <Zap size={18} /> Go Premium Now
           </Link>
        </div>
      )}

      {/* Quick Stats / Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Create New Action */}
        <Link to="/dashboard/create" className="bg-primary hover:bg-primary-hover text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center text-center gap-4 group">
          <PlusCircle size={48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-lg font-bold font-montserrat">Create New Biodata</h3>
            <p className="text-white/80 text-sm mt-1">Start from a beautiful template</p>
          </div>
        </Link>
        
         {/* Total Biodatas Stat */}
         <div className="bg-surface border border-secondary/40 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-textMedium text-sm font-medium mb-1">Total Biodatas</p>
                <h3 className="text-3xl font-bold text-textDark font-playfair">{isLoading ? '...' : totalCount}</h3>
              </div>
              <div className="bg-secondary/20 p-3 rounded-full text-primary">
                <FileText size={24} />
              </div>
            </div>
            <Link to="/dashboard/my-biodatas" className="text-sm font-medium text-primary hover:underline mt-4 inline-block">View all biodatas &rarr;</Link>
         </div>

        {/* Profile Views Stat (Placeholder for future) */}
        <div className="bg-surface border border-secondary/40 rounded-xl p-6 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-textMedium text-sm font-medium mb-1">Profile Views</p>
               <h3 className="text-3xl font-bold text-textDark font-playfair">0</h3>
             </div>
             <div className="bg-secondary/20 p-3 rounded-full text-primary">
               <Eye size={24} />
             </div>
           </div>
           <p className="text-sm text-textMedium mt-4">Coming soon feature</p>
        </div>

      </div>

      {/* Recent Activity Section */}
      <section className="mt-12 bg-surface rounded-xl border border-borderLight shadow-sm p-6">
        <h2 className="text-xl font-playfair font-bold text-primary mb-6">Recent Biodatas</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : recentBiodatas.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
             <div className="bg-background rounded-full p-6 mb-4">
                <FileText size={40} className="text-textMedium" />
             </div>
             <h3 className="text-lg font-bold text-textDark mb-2">No Biodatas Yet</h3>
             <p className="text-textMedium mb-6 max-w-sm mx-auto">You haven't created any marriage biodatas yet. Hit the button below to get started!</p>
             <Link to="/dashboard/create" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors font-medium">Create Your First Biodata</Link>
          </div>
        ) : (
          <div className="space-y-4">
             {recentBiodatas.map((bio) => (
                <div key={bio._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-background border border-borderLight rounded-xl shadow-sm hover:shadow-md transition-shadow gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 border border-primary/20">
                      {bio.personal?.profilePhoto ? (
                        <img src={`https://shaadibio-server.onrender.com${bio.personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="text-primary" size={20} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-textDark text-lg truncate" title={bio.personal?.fullName}>{bio.personal?.fullName || 'Untitled Biodata'}</h4>
                      <div className="flex items-center gap-3 text-sm text-textMedium mt-1">
                        <span className="flex items-center gap-1"><Clock size={14} /> Created {new Date(bio.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
                    <button onClick={() => navigate(`/dashboard/edit/${bio._id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-borderLight text-textDark bg-white hover:bg-surface rounded-md text-sm font-medium transition-colors">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button onClick={() => navigate(`/dashboard/biodata/${bio._id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-hover rounded-md text-sm font-medium transition-colors">
                      <Download size={16} /> Print / PDF
                    </button>
                  </div>
                </div>
             ))}
            <div className="pt-4 text-center">
               <Link to="/dashboard/my-biodatas" className="text-primary font-medium hover:underline text-sm">See all your biodatas</Link>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default DashboardHome;
