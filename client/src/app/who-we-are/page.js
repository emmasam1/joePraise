import React from "react";
import Image from "next/image";
import { Button } from "antd";

const page = () => {
  const pillars = [
    {
      title: "Verified Trust",
      desc: 'We don\'t just "list" businesses; we vet them. Our rigorous verification process ensures that every profile you interact with is a legitimate, high-quality professional.',
    },
    {
      title: "Empowering Local Growth",
      desc: "We provide small and medium-sized businesses with the high-end management tools payments, scheduling, and analytics, usually reserved for giant corporations.",
    },
    {
      title: "Seamless Discovery",
      desc: "Whether you're looking for a plumber around the corner or a digital consultant across the city, our smart-match technology puts the best local options at your fingertips.",
    },
    {
      title: "Secure Transactions",
      desc: "With integrated escrow and secure payment gateways, we protect the hard-earned money of customers and the honest labor of business owners.",
    },
  ];
  return (
    <div className="bg-white">
      <section
        style={{ backgroundImage: "url(/images/wwa.png)" }}
        className="text-white text-center gap-5 flex-col relative w-full h-100 md:h-150  bg-cover bg-center flex items-center justify-center"
      >
        <h2 className="text-4xl font-semibold">Who Are We</h2>
        <p>
          At Joepraise Smarthub, we believe that every local business deserves a
          world-class digital <br />
          storefront and every customer deserves a service provider they can
          actually trust.
          <br /> We aren't just a directory; we are a trust-based ecosystem. Our
          platform was born out of a<br /> simple necessity: to eliminate the
          guesswork from local commerce. We saw a world where
          <br /> talented service providers remained hidden and customers
          struggled with unreliable
          <br /> bookings. We decided to build the bridge.
        </p>
      </section>

      <section className="bg-[#E9F8F3] py-20 px-6  lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-12">
            Our Core Pillars
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Side: Image Container */}

            <div className="relative aspect-square w-full max-w-137.5 mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/images/image14.png" // Replace with your image path
                alt="Business professional using phone"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-[#1A202C]">
                    {pillar.title}:{" "}
                    <span className="font-normal text-[#4A5568]">
                      {pillar.desc}
                    </span>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E2EDFC] py-20 px-6  lg:px-24 mt-25">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Right Side: Text Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-5xl font-bold text-[#1A202C]">
                  Our Mission
                </h3>
                <span className="font-normal text-[#4A5568] text-lg">
                  Our goal is to become the digital heartbeat of
                  <br /> local commerce. We envision a future where
                  <br /> "local" doesn't mean "hard to find," and where
                  <br /> the quality of your service—not the size of
                  <br /> your marketing budget—is what determines
                  <br /> your success.
                </span>
              </div>
            </div>

            {/* Left Side: Image Container */}

            <div className="relative aspect-square w-full max-w-137.5 mx-auto overflow-hidden">
              <Image
                src="/images/Illustrator.png" // Replace with your image path
                alt="Business professional using phone"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6  lg:px-24 mt-25">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Side: Image Container */}

            <div className="relative aspect-square w-full max-w-137.5 mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/images/image15.png" // Replace with your image path
                alt="Business professional using phone"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#1A202C]">
                  Empowering Local Excellence Through<br/> Trust and Technology.
                </h3>
                <span className="font-normal text-[#4A5568] text-lg">
                  At Joepraise Smarthub, our mission is to build the<br/> world’s
                  most trusted infrastructure for local <br/>commerce. We aim to
                  bridge the gap between<br/> talented service providers and the
                  customers who<br/> need them by providing a secure, verified, and<br/>
                  seamless digital marketplace.
                </span>

                <Button className="bg-[#060853]! text-white! border-none h-13! px-10! w-fit">List Your Business</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
