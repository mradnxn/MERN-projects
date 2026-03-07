import React from 'react';

const RoyalTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#1C0F24] p-8 md:p-12 font-serif text-[#F8E5BA] relative shadow-2xl min-h-[800px] max-w-4xl mx-auto border-[16px] border-[#D4AF37]/80">
      
      {/* Decorative Ornaments (CSS via borders) */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D4AF37]/30 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-16 relative">
         <div className="flex justify-center mb-6">
             {personal.profilePhoto ? (
                 <div className="w-40 h-40 rounded-full overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] border-[6px] border-[#D4AF37]">
                     <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-40 h-40 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border-[6px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <span className="text-6xl text-[#D4AF37] font-bold">{personal.fullName.charAt(0)}</span>
                </div>
             )}
         </div>
         <h1 className="text-4xl md:text-6xl font-black tracking-widest text-[#D4AF37] uppercase" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
             {personal.fullName}
         </h1>
         <div className="mt-6 flex justify-center items-center gap-4">
             <div className="h-0.5 w-16 bg-[#D4AF37]"></div>
             <span className="text-[#D4AF37] text-xl">✤</span>
             <div className="h-0.5 w-16 bg-[#D4AF37]"></div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 px-4 md:px-8">
        
        <section>
          <SectionTitle title="Personal Details" />
          <div className="space-y-4">
             <InfoRow label="Date of Birth" value={personal.dob} />
             {personal.age && <InfoRow label="Age" value={`${personal.age} Years`} />}
             <InfoRow label="Height" value={personal.height} />
             <InfoRow label="Religion" value={personal.religion} />
             <InfoRow label="Community" value={personal.caste} />
             <InfoRow label="Mother Tongue" value={personal.motherTongue} />
             <InfoRow label="Marital Status" value={personal.maritalStatus} />
          </div>
        </section>

        <section>
          <SectionTitle title="Education & Status" />
          <div className="space-y-4">
             <InfoRow label="Education" value={education.educationDetails} />
             <InfoRow label="Occupation" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        <section className="md:col-span-2">
           <div className="border-t-2 border-b-2 border-[#D4AF37] py-10 my-4">
              <SectionTitle title="Family Background" align="center" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-8">
                 <InfoRow label="Father's Name" value={family.fatherName} />
                 <InfoRow label="Occupation" value={family.fatherOccupation} />
                 <InfoRow label="Mother's Name" value={family.motherName} />
                 <InfoRow label="Occupation" value={family.motherOccupation} />
                 <InfoRow label="Siblings" value={family.siblings} />
                 <InfoRow label="Family Type" value={family.familyType} />
                 <InfoRow label="Status" value={family.familyStatus} />
                 <InfoRow label="Native Place" value={family.nativePlace} />
              </div>
           </div>
        </section>

                {(horoscope.rashi || horoscope.nakshatra || horoscope.gothra) && (
           <section className="md:col-span-2 mb-8">
              <SectionTitle title="Horoscope Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-8 text-center">
                 <InfoRow label="Rashi" value={horoscope.rashi} />
                 <InfoRow label="Nakshatra" value={horoscope.nakshatra} />
                 <InfoRow label="Gothra" value={horoscope.gothra} />
                 <InfoRow label="Time of Birth" value={horoscope.timeOfBirth} />
                 <InfoRow label="Place of Birth" value={horoscope.placeOfBirth} />
              </div>
           </section>
        )}

        {!contact.hideContactInfo && (
           <section className="md:col-span-2 mb-8">
              <SectionTitle title="Contact Details" align="center" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-8 text-center">
                 <div>
                    <span className="block text-[#D4AF37] text-xs uppercase tracking-widest mb-1">Phone</span>
                    <span>{contact.phone}</span>
                 </div>
                 <div>
                    <span className="block text-[#D4AF37] text-xs uppercase tracking-widest mb-1">Email</span>
                    <span>{contact.email}</span>
                 </div>
                 <div>
                    <span className="block text-[#D4AF37] text-xs uppercase tracking-widest mb-1">Address</span>
                    <span>{contact.residentialAddress}</span>
                 </div>
              </div>
           </section>
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ title, align = "left" }) => (
    <h2 className={`text-2xl font-bold mb-6 text-[#D4AF37] uppercase tracking-wider ${align === 'center' ? 'text-center' : ''}`}>
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex border-b border-[#D4AF37]/20 pb-2">
      <span className="w-2/5 font-semibold text-[#D4AF37]/70 uppercase text-sm tracking-wider pt-0.5">{label}</span>
      <span className="w-3/5 text-[#F8E5BA] text-lg">{value}</span>
    </div>
  );
};

export default RoyalTemplate;
