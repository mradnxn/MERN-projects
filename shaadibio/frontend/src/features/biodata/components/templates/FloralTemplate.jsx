import React from 'react';

const FloralTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#fdfffc] p-8 md:p-14 font-sans text-[#2b4c3b] relative shadow-lg min-h-[800px] max-w-4xl mx-auto rounded-xl">
      
      {/* Abstract Floral Decor (CSS) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#f4a261]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#2a9d8f]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-[#e76f51]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 border-2 border-[#2a9d8f]/20 rounded-3xl p-8 md:p-12 bg-white/60 backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center mb-16">
            {personal.profilePhoto ? (
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl mb-6 border-4 border-white ring-4 ring-[#2a9d8f]/30">
                    <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-40 h-40 rounded-full bg-[#2a9d8f]/10 flex items-center justify-center mb-6 border-4 border-white ring-4 ring-[#2a9d8f]/30">
                    <span className="text-5xl text-[#2a9d8f]">{personal.fullName.charAt(0)}</span>
                </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#264653]">
                {personal.fullName}
            </h1>
            <p className="text-lg text-[#e76f51] mt-3 font-medium">{education.professionDetails || 'Professional'}</p>
          </div>

          <div className="space-y-12">
            
            <section>
              <SectionTitle title="Personal Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                 <InfoCard label="DOB" value={personal.dob} />
                 {personal.age && <InfoCard label="Age" value={`${personal.age} Years`} />}
                 <InfoCard label="Height" value={personal.height} />
                 <InfoCard label="Religion" value={personal.religion} />
                 <InfoCard label="Caste" value={personal.caste} />
                 <InfoCard label="Marital Status" value={personal.maritalStatus} />
              </div>
            </section>

            <section>
              <SectionTitle title="Education & Profession" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                 <InfoCard label="Education" value={education.educationDetails} />
                 <InfoCard label="Occupation" value={education.professionDetails} />
                 {education.annualIncome && <InfoCard label="Income" value={education.annualIncome} />}
              </div>
            </section>

            <section>
                <SectionTitle title="Family Background" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 bg-[#2a9d8f]/5 p-6 rounded-2xl">
                    <div className="space-y-3">
                        <InfoRow label="Father" value={family.fatherName} />
                        <InfoRow label="Occupation" value={family.fatherOccupation} />
                        <InfoRow label="Mother" value={family.motherName} />
                        <InfoRow label="Occupation" value={family.motherOccupation} />
                    </div>
                    <div className="space-y-3">
                        <InfoRow label="Siblings" value={family.siblings} />
                        <InfoRow label="Type" value={family.familyType} />
                        <InfoRow label="Status" value={family.familyStatus} />
                        <InfoRow label="Native" value={family.nativePlace} />
                    </div>
                </div>
            </section>

                    {(horoscope.rashi || horoscope.nakshatra || horoscope.gothra) && (
           <section>
              <SectionTitle title="Horoscope Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
                  <SectionTitle title="Contact" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                     <InfoCard label="Phone" value={contact.phone} />
                     <InfoCard label="Email" value={contact.email} />
                     <InfoCard label="Address" value={contact.residentialAddress} />
                  </div>
               </section>
            )}
          </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
    <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[#2a9d8f] uppercase tracking-wider">
            {title}
        </h2>
        <div className="h-px bg-[#2a9d8f]/30 flex-1"></div>
    </div>
)

const InfoCard = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#2a9d8f]/10">
      <span className="block text-xs uppercase tracking-wider text-[#e76f51] font-bold mb-1">{label}</span>
      <span className="text-[#264653] font-medium">{value}</span>
    </div>
  );
};

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b border-[#2a9d8f]/10 py-1">
      <span className="font-semibold text-[#264653]/70">{label}</span>
      <span className="text-[#264653] text-right">{value}</span>
    </div>
  );
};

export default FloralTemplate;
