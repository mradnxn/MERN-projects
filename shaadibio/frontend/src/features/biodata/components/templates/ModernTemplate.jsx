import React from 'react';

const ModernTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-white font-sans text-gray-800 shadow-xl overflow-hidden max-w-4xl mx-auto rounded-xl ring-1 ring-gray-100">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 flex flex-col md:flex-row items-center gap-8 border-b border-gray-100">
        {personal.profilePhoto ? (
            <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0 bg-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
        ) : (
            <div className="w-40 h-40 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-sm border-4 border-white">
                <span className="text-5xl font-light">{personal.fullName.charAt(0)}</span>
            </div>
        )}
        <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {personal.fullName}
            </h1>
            <p className="text-lg text-blue-600 font-medium mt-2">{education.professionDetails || 'Professional'}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
               {personal.age && <Badge text={`${personal.age} Years`} />}
               {personal.height && <Badge text={personal.height} />}
               {personal.religion && <Badge text={personal.religion} />}
               {personal.maritalStatus && <Badge text={personal.maritalStatus} />}
            </div>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-7 space-y-10">
            {/* About */}
            <section>
              <SectionTitle title="Personal Details" />
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                 <InfoItem label="Date of Birth" value={personal.dob} />
                 <InfoItem label="Mother Tongue" value={personal.motherTongue} />
                 <InfoItem label="Caste" value={personal.caste} />
                 <InfoItem label="Nationality" value={personal.nationality} />
              </div>
            </section>

            {/* Education & Career */}
            <section>
              <SectionTitle title="Education & Career" />
               <div className="space-y-4">
                 <InfoItem flex label="Education" value={education.educationDetails} />
                 <InfoItem flex label="Organization" value={education.professionDetails} />
                 <InfoItem flex label="Income" value={education.annualIncome} />
              </div>
            </section>

             {/* Horoscope */}
            {(horoscope.rashi || horoscope.nakshatra) && (
            <section>
              <SectionTitle title="Horoscope" />
               <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                 <InfoItem label="Rashi" value={horoscope.rashi} />
                 <InfoItem label="Nakshatra" value={horoscope.nakshatra} />
                 <InfoItem label="Gothra" value={horoscope.gothra} />
                 <InfoItem label="Birth Time" value={horoscope.timeOfBirth} />
                 <InfoItem label="Birth Place" value={horoscope.placeOfBirth} />
              </div>
            </section>
            )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-5 space-y-10">
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
               <SectionTitle title="Family Background" />
               <div className="space-y-4 mt-6">
                 <InfoItem flex label="Father" value={family.fatherName} sub={family.fatherOccupation} />
                 <InfoItem flex label="Mother" value={family.motherName} sub={family.motherOccupation} />
                 <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-4">
                     <InfoItem label="Siblings" value={family.siblings} />
                     <InfoItem label="Type" value={family.familyType} />
                     <InfoItem label="Status" value={family.familyStatus} />
                     <InfoItem label="Native" value={family.nativePlace} />
                 </div>
              </div>
            </div>

            {!contact.hideContactInfo && (
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
               <SectionTitle title="Get In Touch" />
               <div className="space-y-4 mt-6">
                 <InfoItem flex label="Phone" value={contact.phone} />
                 <InfoItem flex label="Email" value={contact.email} />
                 <InfoItem flex label="Address" value={contact.residentialAddress} />
              </div>
            </div>
            )}
        </div>

      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="w-8 h-1 bg-blue-500 inline-block mr-3 rounded-full"></span>
        {title}
    </h3>
);

const Badge = ({ text }) => (
    <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-200 backdrop-blur-sm">
        {text}
    </span>
);

const InfoItem = ({ label, value, sub, flex = false }) => {
  if (!value) return null;
  return (
    <div className={flex ? "flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4" : "flex flex-col gap-1"}>
      <span className={`text-xs font-bold text-gray-400 uppercase tracking-wider ${flex ? 'sm:w-1/3 pt-1' : ''}`}>{label}</span>
      <div className={flex ? 'sm:w-2/3' : ''}>
          <div className="font-semibold text-gray-800">{value}</div>
          {sub && <div className="text-sm text-gray-500 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
};

export default ModernTemplate;
