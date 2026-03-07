import React from 'react';

const JainTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#FFFDF5] p-8 md:p-12 font-serif text-[#9D2B22] relative shadow-lg min-h-[800px] max-w-4xl mx-auto border-[12px] border-double border-[#9D2B22]/20">
      
      {/* Header */}
      <div className="text-center mb-10 pb-6 relative border-b-2 border-[#D4AF37]/50">
         <span className="text-[#D4AF37] text-xl font-bold mb-3 block tracking-widest">॥ जय जिनेन्द्र ॥</span>
         
         <div className="flex flex-col items-center justify-center gap-4 mt-6">
             {personal.profilePhoto ? (
                 <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-[#D4AF37]">
                     <img src={`http://localhost:5000${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-32 h-32 rounded-full bg-[#9D2B22]/10 flex items-center justify-center border-4 border-[#D4AF37]">
                    <span className="text-4xl text-[#9D2B22]/50 font-bold">{personal.fullName.charAt(0)}</span>
                </div>
             )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide mt-2 text-[#9D2B22]">
                {personal.fullName}
            </h1>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
        <section>
          <SectionTitle title="Personal Info" />
          <div className="space-y-3">
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
          <SectionTitle title="Education & Career" />
          <div className="space-y-3">
             <InfoRow label="Education" value={education.educationDetails} />
             <InfoRow label="Occupation" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        <section className="md:col-span-2">
           <div className="border border-[#D4AF37]/30 p-6 my-2 bg-gradient-to-b from-[#FFFDF5] to-[#fcf6e4] rounded-lg shadow-sm">
              <SectionTitle title="Family Background" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
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
           <section className="md:col-span-2">
              <SectionTitle title="Horoscope Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                 <InfoRow label="Rashi" value={horoscope.rashi} />
                 <InfoRow label="Nakshatra" value={horoscope.nakshatra} />
                 <InfoRow label="Gothra" value={horoscope.gothra} />
                 <InfoRow label="Time of Birth" value={horoscope.timeOfBirth} />
                 <InfoRow label="Place of Birth" value={horoscope.placeOfBirth} />
              </div>
           </section>
        )}

        {!contact.hideContactInfo && (
           <section className="md:col-span-2">
              <SectionTitle title="Contact Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
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

const SectionTitle = ({ title }) => (
    <h2 className="text-2xl font-semibold mb-5 text-[#D4AF37] border-b border-[#9D2B22]/20 pb-2 flex items-center gap-2">
        <span className="text-[#9D2B22]/50 text-sm">❖</span>
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex border-b border-[#9D2B22]/5 py-2">
      <span className="w-1/3 font-semibold text-[#9D2B22]/80">{label}</span>
      <span className="w-2/3 text-[#9D2B22]">{value}</span>
    </div>
  );
};

export default JainTemplate;
