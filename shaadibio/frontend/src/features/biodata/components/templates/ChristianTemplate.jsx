import React from 'react';

const ChristianTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-white p-8 md:p-14 font-sans text-[#2C3E50] relative shadow-lg min-h-[800px] max-w-4xl mx-auto ring-1 ring-[#BDC3C7]">
      
      {/* Header */}
      <div className="text-center mb-12 relative border-b border-[#ECF0F1] pb-8">
         <span className="text-[#3498DB] text-2xl mb-4 block">✝</span>
         
         <div className="flex flex-col items-center justify-center gap-4 mt-6">
             {personal.profilePhoto ? (
                 <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-2 border-[#3498DB]">
                     <img src={`http://localhost:5000${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-32 h-32 rounded-full bg-[#ECF0F1] flex items-center justify-center border-2 border-[#3498DB]">
                    <span className="text-4xl text-[#BDC3C7] font-light">{personal.fullName.charAt(0)}</span>
                </div>
             )}
            <h1 className="text-4xl md:text-5xl font-light tracking-wide mt-2 text-[#2C3E50]">
                {personal.fullName}
            </h1>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        
        <section>
          <SectionTitle title="Personal Information" />
          <div className="space-y-4">
             <InfoRow label="Date of Birth" value={personal.dob} />
             {personal.age && <InfoRow label="Age" value={`${personal.age} Years`} />}
             <InfoRow label="Height" value={personal.height} />
             <InfoRow label="Denomination" value={personal.religion} />
             <InfoRow label="Caste" value={personal.caste} />
             <InfoRow label="Mother Tongue" value={personal.motherTongue} />
             <InfoRow label="Marital Status" value={personal.maritalStatus} />
          </div>
        </section>

        <section>
          <SectionTitle title="Education & Profession" />
          <div className="space-y-4">
             <InfoRow label="Education" value={education.educationDetails} />
             <InfoRow label="Occupation" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        <section className="md:col-span-2">
            <SectionTitle title="Family Background" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 bg-[#F8F9F9] p-8 rounded-lg border border-[#ECF0F1]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
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
              <SectionTitle title="Contact Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
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
    <h2 className="text-lg font-semibold mb-6 text-[#3498DB] uppercase tracking-wider">
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="w-2/5 font-medium text-[#7F8C8D]">{label}</span>
      <span className="w-3/5 text-[#2C3E50]">{value}</span>
    </div>
  );
};

export default ChristianTemplate;
