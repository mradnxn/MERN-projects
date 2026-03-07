import React from 'react';

const ElegantTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#FCFAFA] p-8 md:p-16 font-sans text-gray-700 relative shadow-md min-h-[800px] max-w-4xl mx-auto rounded-3xl border border-pink-100">
      
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16 relative">
         {personal.profilePhoto ? (
             <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl shadow-pink-200/50 mb-8 border-[6px] border-white">
                 <img src={`http://localhost:5000${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
             </div>
         ) : (
            <div className="w-40 h-40 rounded-full bg-pink-50 flex items-center justify-center mb-8 border-[6px] border-white shadow-xl shadow-pink-100/50">
                <span className="text-5xl text-pink-300 font-light">{personal.fullName.charAt(0)}</span>
            </div>
         )}
        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800 tracking-wide">
            {personal.fullName}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-pink-400 mt-4 font-semibold">{education.professionDetails || 'Professional'}</p>
      </div>

      <div className="space-y-16">
        
        <section>
          <SectionTitle title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-8 px-4">
             <InfoRow label="Date of Birth" value={personal.dob} />
             {personal.age && <InfoRow label="Age" value={`${personal.age} Years`} />}
             <InfoRow label="Height" value={personal.height} />
             <InfoRow label="Background" value={`${personal.religion}${personal.caste ? `, ${personal.caste}` : ''}`} />
             <InfoRow label="Mother Tongue" value={personal.motherTongue} />
             <InfoRow label="Marital Status" value={personal.maritalStatus} />
          </div>
        </section>

        <section>
          <SectionTitle title="Education & Career" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-8 px-4">
             <InfoRow label="Qualifications" value={education.educationDetails} />
             <InfoRow label="Occupation" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        <section>
            <SectionTitle title="Family Background" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-8 bg-pink-50/50 p-8 rounded-3xl">
                <InfoRow label="Father" value={family.fatherName} sub={family.fatherOccupation} />
                <InfoRow label="Mother" value={family.motherName} sub={family.motherOccupation} />
                <InfoRow label="Siblings" value={family.siblings} />
                <InfoRow label="Family Setup" value={`${family.familyType}, ${family.familyStatus}`} />
                <InfoRow label="Native Place" value={family.nativePlace} />
            </div>
        </section>

                {(horoscope.rashi || horoscope.nakshatra || horoscope.gothra) && (
           <section>
              <SectionTitle title="Horoscope Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-8 px-4">
                 <InfoRow label="Rashi" value={horoscope.rashi} />
                 <InfoRow label="Nakshatra" value={horoscope.nakshatra} />
                 <InfoRow label="Gothra" value={horoscope.gothra} />
                 <InfoRow label="Time of Birth" value={horoscope.timeOfBirth} />
                 <InfoRow label="Place of Birth" value={horoscope.placeOfBirth} />
              </div>
           </section>
        )}

        {!contact.hideContactInfo && (
           <section>
              <SectionTitle title="Contact Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-8 px-4">
                 <InfoRow label="Phone" value={contact.phone} />
                 <InfoRow label="Email" value={contact.email} />
                 <InfoRow label="Address" value={contact.residentialAddress} />
              </div>
           </section>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="mt-20 pt-8 border-t border-pink-100 flex justify-center">
          <div className="w-16 h-1 bg-pink-200 rounded-full"></div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
    <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-pink-200 flex-1"></div>
        <h2 className="text-xl font-serif italic text-pink-500">
            {title}
        </h2>
        <div className="h-px bg-pink-200 flex-1"></div>
    </div>
)

const InfoRow = ({ label, value, sub }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">{label}</span>
      <span className="text-gray-800 text-lg">{value}</span>
      {sub && <span className="text-sm text-gray-500">{sub}</span>}
    </div>
  );
};

export default ElegantTemplate;
