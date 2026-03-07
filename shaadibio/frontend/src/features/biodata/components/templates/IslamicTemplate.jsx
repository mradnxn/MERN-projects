import React from 'react';

const IslamicTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#Fdfbf7] p-8 md:p-12 font-serif text-[#044C29] relative shadow-lg min-h-[800px] max-w-4xl mx-auto border-t-[16px] border-[#044C29] border-b-[16px]">
      
      {/* Header */}
      <div className="text-center mb-6 pb-4 relative border-b-2 border-[#D4AF37]/50">
         <span className="text-[#044C29] text-xl font-bold mb-4 block tracking-widest">﷽</span>
         <span className="text-[#044C29]/80 text-sm mb-6 block italic">In the name of Allah, the Most Gracious, the Most Merciful</span>
         
         <div className="flex flex-col items-center justify-center gap-4 mt-6">
             {personal.profilePhoto ? (
                 <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-[#D4AF37]">
                     <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-32 h-32 rounded-full bg-[#044C29]/10 flex items-center justify-center border-4 border-[#D4AF37]">
                    <span className="text-4xl text-[#044C29]/50 font-bold">{personal.fullName.charAt(0)}</span>
                </div>
             )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide mt-2 text-[#044C29] uppercase">
                {personal.fullName}
            </h1>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        
        <section>
          <SectionTitle title="Personal Info" />
          <div className="space-y-3">
             <InfoRow label="Date of Birth" value={personal.dob} />
             {personal.age && <InfoRow label="Age" value={`${personal.age} Years`} />}
             <InfoRow label="Height" value={personal.height} />
             <InfoRow label="Sect/Maslak" value={personal.religion} />
             <InfoRow label="Caste" value={personal.caste} />
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
    <h2 className="text-2xl font-semibold mb-5 text-[#D4AF37] border-b border-[#044C29]/20 pb-2">
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex border-b border-[#044C29]/5 py-2">
      <span className="w-1/3 font-semibold text-[#044C29]/80">{label}</span>
      <span className="w-2/3 text-[#044C29]">{value}</span>
    </div>
  );
};

export default IslamicTemplate;
