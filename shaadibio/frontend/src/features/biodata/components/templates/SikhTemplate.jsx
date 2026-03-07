import React from 'react';

const SikhTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-[#FFF8F0] p-8 md:p-12 font-sans text-[#0A2240] relative shadow-lg min-h-[800px] max-w-4xl mx-auto border-[8px] border-[#0A2240]">
       <div className="absolute top-0 left-0 w-full h-4 bg-[#FF9933]"></div>
       
      {/* Header */}
      <div className="text-center mb-10 pb-6 relative">
         <span className="text-[#FF9933] text-4xl font-bold mb-4 block">ੴ</span>
         
         <div className="flex flex-col items-center justify-center gap-4 mt-6">
             {personal.profilePhoto ? (
                 <div className="w-36 h-36 rounded-full overflow-hidden shadow-xl border-4 border-[#FF9933]">
                     <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
                 </div>
             ) : (
                <div className="w-36 h-36 rounded-full bg-[#FF9933]/10 flex items-center justify-center border-4 border-[#FF9933]">
                    <span className="text-4xl text-[#FF9933] font-bold">{personal.fullName.charAt(0)}</span>
                </div>
             )}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mt-4 text-[#0A2240] uppercase">
                {personal.fullName}
            </h1>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
        <section>
          <SectionTitle title="Personal Details" />
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

        <section>
          <SectionTitle title="Education & Occupation" />
          <div className="space-y-3">
             <InfoRow label="Education" value={education.educationDetails} />
             <InfoRow label="Occupation" value={education.professionDetails} />
             {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
          </div>
        </section>

        <section className="md:col-span-2">
           <div className="bg-white p-6 my-2 shadow-sm rounded-xl border border-[#0A2240]/10">
              <SectionTitle title="Family Details" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 bg-[#0A2240]/5 p-6 rounded-xl">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 bg-[#0A2240]/5 p-6 rounded-xl">
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
    <h2 className="text-xl font-bold mb-5 text-[#FF9933] uppercase tracking-wide border-b-2 border-[#FF9933] inline-block pb-1">
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex py-1.5">
      <span className="w-1/3 font-bold text-[#0A2240]">{label}</span>
      <span className="w-2/3 text-[#0A2240]/80">: {value}</span>
    </div>
  );
};

export default SikhTemplate;
