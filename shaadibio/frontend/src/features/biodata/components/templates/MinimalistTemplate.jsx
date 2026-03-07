import React from 'react';

const MinimalistTemplate = ({ data }) => {
  if (!data) return null;
  const { personal, education, family, horoscope, contact } = data;

  return (
    <div className="bg-white p-12 md:p-16 font-mono text-black relative shadow-2xl min-h-[800px] max-w-4xl mx-auto border border-black/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 border-b-2 border-black pb-12">
         {personal.profilePhoto ? (
             <div className="w-48 h-48 overflow-hidden grayscale border border-black">
                 <img src={`https://shaadibio-server.onrender.com${personal.profilePhoto}`} alt="Profile" className="w-full h-full object-cover" />
             </div>
         ) : (
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border border-black">
                <span className="text-6xl text-gray-300">{personal.fullName.charAt(0)}</span>
            </div>
         )}
         <div className="text-left flex-1">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                {personal.fullName}
            </h1>
            <p className="text-xl mt-4 uppercase tracking-widest text-gray-500">{education.professionDetails || 'Professional'}</p>
            <div className="mt-4 flex gap-4 text-sm text-gray-400 uppercase tracking-widest">
               {personal.age && <span>{personal.age} Y</span>}
               {personal.height && <span>{personal.height}</span>}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="space-y-16">
            <section>
            <SectionTitle title="Personal" />
            <div className="space-y-2">
                <InfoRow label="DOB" value={personal.dob} />
                <InfoRow label="Religion" value={personal.religion} />
                <InfoRow label="Community" value={personal.caste} />
                <InfoRow label="Language" value={personal.motherTongue} />
                <InfoRow label="Status" value={personal.maritalStatus} />
            </div>
            </section>

            <section>
            <SectionTitle title="Education & Work" />
            <div className="space-y-2">
                <InfoRow label="Degree" value={education.educationDetails} />
                <InfoRow label="Current Role" value={education.professionDetails} />
                {education.annualIncome && <InfoRow label="Income" value={education.annualIncome} />}
            </div>
            </section>
        </div>

        <div className="space-y-16">
            <section>
                <SectionTitle title="Family" />
                <div className="space-y-2">
                    <InfoRow label="Father" value={family.fatherName} />
                    <InfoRow label="His Job" value={family.fatherOccupation} />
                    <InfoRow label="Mother" value={family.motherName} />
                    <InfoRow label="Her Job" value={family.motherOccupation} />
                    <InfoRow label="Siblings" value={family.siblings} />
                    <InfoRow label="Type" value={family.familyType} />
                    <InfoRow label="Native" value={family.nativePlace} />
                </div>
            </section>

                    {(horoscope.rashi || horoscope.nakshatra || horoscope.gothra) && (
           <section>
              <SectionTitle title="Horoscope Details" />
              <div className="space-y-2">
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
                <div className="space-y-2">
                    <InfoRow label="Tel" value={contact.phone} />
                    <InfoRow label="Mail" value={contact.email} />
                    <InfoRow label="Loc" value={contact.residentialAddress} />
                </div>
            </section>
            )}
        </div>

      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
    <h2 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] border-b border-black/20 pb-2">
        {title}
    </h2>
)

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="w-1/3 uppercase text-gray-500 text-xs tracking-widest pt-1">{label}</span>
      <span className="w-2/3 text-black text-sm">{value}</span>
    </div>
  );
};

export default MinimalistTemplate;
