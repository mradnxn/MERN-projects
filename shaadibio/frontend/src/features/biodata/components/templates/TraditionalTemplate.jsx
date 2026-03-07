import React from 'react';

const TraditionalTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#FFFDF8] border-[12px] border-double border-[#8B0000] p-8 md:p-12 font-serif text-[#4A0E0E] relative shadow-lg min-h-[800px] max-w-4xl mx-auto">
      {/* Decorative Corners */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#D4AF37]"></div>
      <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#D4AF37]"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#D4AF37]"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#D4AF37]"></div>

      {/* Header */}
      <div className="text-center mb-10 border-b border-[#D4AF37] pb-6 relative">
         <span className="text-[#D4AF37] text-2xl font-bold mb-4 block">॥ श्री गणेशाय नमः ॥</span>
         
         <div className="flex flex-col items-center justify-center gap-4">
             {personal.profilePhoto ? (
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl">
                     <img src={`http://localhost:5000${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-32 h-32 rounded-full bg-[#8B0000]/10 flex items-center justify-center border-4 border-[#D4AF37]">
                    <span className="text-4xl text-[#8B0000]/50 font-bold">{personal.fullName.charAt(0)}</span>
                </div>
             )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide mt-2 text-[#8B0000] uppercase">
                {personal.fullName}
            </h1>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
        {/* Personal Details */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#8B0000] flex items-center gap-2">
            <span className="text-[#D4AF37] text-xl">❖</span> Personal Details
          </h2>
          <div className="space-y-3">
             <InfoRow label="Date of Birth" value={personal.dob} />
             {personal.age && <InfoRow label="Age" value={`${personal.age} Years`} />}
             <InfoRow label="Height" value={personal.height} />
             <InfoRow label="Religion" value={personal.religion} />
             <InfoRow label="Caste" value={personal.caste} />
             <InfoRow label="Mother Tongue" value={personal.motherTongue} />
             <InfoRow label="Marital Status" value={personal.maritalStatus} />
          </div>
        </section>

        {/* Education & Profession */}
        <section>
           <h2 className="text-2xl font-semibold mb-4 text-[#8B0000] flex items-center gap-2">
            <span className="text-[#D4AF37] text-xl">❖</span> Education & Profession
          </h2>
          <div className="space-y-3">
             <InfoRow label="Education" value={education.educationDetails} />
             <InfoRow label="Profession" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        {/* Family Details */}
        <section className="md:col-span-2">
           <div className="border-t border-b border-[#D4AF37]/30 py-6 my-2">
              <h2 className="text-2xl font-semibold mb-4 text-[#8B0000] flex items-center gap-2">
                 <span className="text-[#D4AF37] text-xl">❖</span> Family Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                 <InfoRow label="Father's Name" value={family.fatherName} />
                 <InfoRow label="Occupation" value={family.fatherOccupation} />
                 <InfoRow label="Mother's Name" value={family.motherName} />
                 <InfoRow label="Occupation" value={family.motherOccupation} />
                 <InfoRow label="Siblings" value={family.siblings} />
                 <InfoRow label="Family Type" value={family.familyType} />
                 <InfoRow label="Family Status" value={family.familyStatus} />
                 <InfoRow label="Native Place" value={family.nativePlace} />
              </div>
           </div>
        </section>

        {/* Horoscope */}
        {(horoscope.rashi || horoscope.nakshatra) && (
           <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#8B0000] flex items-center gap-2">
                 <span className="text-[#D4AF37] text-xl">❖</span> Horoscope Details
              </h2>
              <div className="space-y-3">
                 <InfoRow label="Rashi" value={horoscope.rashi} />
                 <InfoRow label="Nakshatra" value={horoscope.nakshatra} />
                 <InfoRow label="Gothra" value={horoscope.gothra} />
                 <InfoRow label="Time of Birth" value={horoscope.timeOfBirth} />
                 <InfoRow label="Place of Birth" value={horoscope.placeOfBirth} />
              </div>
           </section>
        )}

        {/* Contact Details */}
        {!contact.hideContactInfo && (
           <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#8B0000] flex items-center gap-2">
                 <span className="text-[#D4AF37] text-xl">❖</span> Contact Details
              </h2>
              <div className="space-y-3">
                 <InfoRow label="Phone" value={contact.phone} />
                 <InfoRow label="Email" value={contact.email} />
                 <InfoRow label="Address" value={contact.residentialAddress} />
              </div>
           </section>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex bg-[#8B0000]/5 p-2 rounded-sm border-l-2 border-[#D4AF37]">
      <span className="w-1/3 font-semibold text-[#8B0000]">{label}</span>
      <span className="w-2/3">{value}</span>
    </div>
  );
};

export default TraditionalTemplate;
