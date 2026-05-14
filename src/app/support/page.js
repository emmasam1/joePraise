import React from 'react';
import Image from 'next/image';

const page = () => {

    const options = [
    {
      label: "Live Chat",
      icon: "/images/chat.png", 
    },
    {
      label: "Call Us",
      icon: "/images/call.png",
    },
    {
      label: "Give Feedback",
      icon: "/images/write.png", 
    },
  ];

  return (
    <div className='bg-white'>
      {/* Support / Contact Section */}
      <section
        style={{ backgroundImage: "url(/images/support.png)" }}
        className="relative w-full h-100 md:h-150  bg-cover bg-center flex items-center justify-center"
      ></section>

      <section className="py-24 px-6 md:px-12 bg-[#E8FFF7] overflow-hidden">
      
      {/* Header matched to design */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#000000] mb-3 leading-tight tracking-tight">
          We are available to support you 24 hours a day, 7 days per week
        </h2>
      </div>

      {/* Grid: 1 col on mobile, 3 col on tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col items-center gap-6 group cursor-pointer">
            
          
              {/* Illustration container */}
              <div className="relative w-30 h-30 md:w-32 md:h-32">
                <Image 
                  src={option.icon} 
                  alt={option.label} 
                  fill 
                  className="object-contain"
                  // Ensure specific colors are passed for icon, if applicable, otherwise use image itself
                />
              </div>

            {/* Label styled to match design */}
            <p className="text-xl md:text-sm text-[#000000] tracking-tight group-hover:text-[#060853] transition-colors">
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default page;
