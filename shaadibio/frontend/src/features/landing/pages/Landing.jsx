import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gradient-to-br from-white to-accent/20">
        <div className="md:w-1/2 space-y-6 md:pr-10 z-10">
          <h1 className="text-5xl md:text-6xl text-primary font-playfair font-bold leading-tight">
            Create Your Perfect Marriage Biodata
          </h1>
          <p className="text-lg text-textMedium font-montserrat max-w-xl leading-relaxed">
            Welcome to ShaadiBio, where finding your life partner begins with a beautiful presentation.
            Design, customize, and share elegant matrimonial biodatas in minutes.
            With our premium wedding-themed templates, make your first impression unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md shadow-md text-center transition-all bg-gradient-to-r hover:from-primary hover:to-primary-hover font-semibold">
              Start Creating Now
            </Link>
            <Link to="/login" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md text-center transition-all font-semibold">
              Login to Account
            </Link>
          </div>
        </div>
        
        {/* Subtle Decorative Hero Visual */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center flex-col items-center">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-secondary/30 relative flex items-center justify-center shadow-2xl overflow-hidden border-8 border-white">
             {/* Decorative Elements */}
             <div className="absolute inset-0 border-[4px] border-primary-hover border-opacity-30 rounded-full scale-90"></div>
             <p className="font-playfair text-xl text-primary font-bold italic z-10">ShaadiBio Elegance</p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-surface">
        <h2 className="text-center text-4xl font-playfair text-primary font-bold mb-16">Why Choose ShaadiBio?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-background rounded-xl text-center shadow-sm border border-borderLight hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold font-playfair">1</span>
             </div>
             <h3 className="text-xl font-bold text-textDark mb-4 font-montserrat">Beautiful Templates</h3>
             <p className="text-textMedium leading-relaxed">Select from our hand-crafted, wedding-inspired themes that highlight your personality elegantly.</p>
          </div>

          <div className="p-8 bg-background rounded-xl text-center shadow-sm border border-borderLight hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold font-playfair">2</span>
             </div>
             <h3 className="text-xl font-bold text-textDark mb-4 font-montserrat">Easy to Share</h3>
             <p className="text-textMedium leading-relaxed">Download as a high-quality PDF or share your unique digital biodata link directly with matches.</p>
          </div>

          <div className="p-8 bg-background rounded-xl text-center shadow-sm border border-borderLight hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold font-playfair">3</span>
             </div>
             <h3 className="text-xl font-bold text-textDark mb-4 font-montserrat">Completely Secure</h3>
             <p className="text-textMedium leading-relaxed">Your data is private and secure. We ensure your personal details are only visible to those you choose.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Landing;
