import React, { useState } from 'react';
import { Check, Star, Shield, Zap, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { upgradeToPremium } from '../paymentSlice';

const PremiumPlans = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If they are already premium, calculate days left
  const isPremium = user?.isPremium;
  const daysLeft = isPremium ? Math.ceil((new Date(user.premiumExpiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  const handleUpgrade = async () => {
    setLoading(true);
    setError('');
    
    try {
      // MOCK PAYMENT WAIT FOR EFFECT
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await dispatch(upgradeToPremium()).unwrap();

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
      
    } catch (err) {
      setError(typeof err === 'string' ? err : err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in flex flex-col items-center">
      
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
          <Sparkles size={16} /> Premium Membership
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-textDark">
          Unlock the Full Experience
        </h1>
        <p className="text-lg text-textMedium max-w-2xl mx-auto">
          Get rid of watermarks instantly and present your beautiful biodata perfectly.
        </p>
      </div>

      {isPremium ? (
        <div className="bg-gradient-to-br from-primary to-accent text-white p-8 rounded-2xl shadow-xl w-full max-w-2xl text-center transform hover:scale-[1.02] transition-transform">
           <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-inner">
             <Star size={40} className="text-white drop-shadow-md" fill="currentColor" />
           </div>
           <h2 className="text-3xl font-playfair font-bold mb-4">You are Premium!</h2>
           <p className="text-lg text-white/90 mb-6">
             Enjoy your beautiful, watermark-free PDFs.
           </p>
           <div className="bg-white/10 rounded-xl p-4 inline-block font-montserrat font-medium border border-white/20">
             Your subscription is active for <span className="font-bold text-xl">{daysLeft}</span> more days.
           </div>
        </div>
      ) : (
        <div className="bg-surface border border-primary/20 p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
          
          <div className="absolute top-0 right-0 bg-accent text-white font-bold text-xs uppercase px-4 py-1.5 rounded-bl-lg tracking-wider">
             Most Popular
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-2">3-Month Access</h2>
            <div className="flex items-baseline justify-center gap-1 text-textDark">
              <span className="text-4xl font-bold font-montserrat tracking-tight">₹499</span>
              <span className="text-textMedium font-medium">/ 90 days</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 text-textDark">
              <div className="mt-0.5 rounded-full bg-green-100 p-0.5"><Check size={16} className="text-green-600" /></div>
              <span className="font-medium">Remove 'ShaadiBio' Watermark</span>
            </li>
            <li className="flex items-start gap-3 text-textDark">
              <div className="mt-0.5 rounded-full bg-green-100 p-0.5"><Check size={16} className="text-green-600" /></div>
              <span>Download Unlimited PDFs</span>
            </li>
            <li className="flex items-start gap-3 text-textDark">
              <div className="mt-0.5 rounded-full bg-green-100 p-0.5"><Check size={16} className="text-green-600" /></div>
              <span>Access to all premium templates</span>
            </li>
            <li className="flex items-start gap-3 text-textDark">
              <div className="mt-0.5 rounded-full bg-green-100 p-0.5"><Check size={16} className="text-green-600" /></div>
              <span>Priority Customer Support</span>
            </li>
          </ul>

          {error && <p className="text-red-500 text-sm text-center mb-4 font-medium">{error}</p>}
          
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center font-medium animate-pulse">
              Payment Successful! Unlocking Premium...
            </div>
          ) : (
            <button 
              onClick={handleUpgrade} 
              disabled={loading}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg text-white shadow-lg transition-all ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover hover:shadow-primary/30'} `}
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Shield size={20} />
                  Simulate Payment (₹499)
                </>
              )}
            </button>
          )}
          
          <p className="text-center text-xs text-textMedium mt-4 flex items-center justify-center gap-1">
             <Zap size={12} className="text-accent" /> Instant activation
          </p>
        </div>
      )}

    </div>
  );
};

export default PremiumPlans;
