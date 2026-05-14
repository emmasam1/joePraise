"use client";
import React from "react";
import Image from "next/image";
import { Button, Input } from "antd";
import { motion } from "framer-motion";

const page = () => {
  const images = [
    { src: "/images/image9.png", alt: "Braiding business", style: "h-[300px]" },
    {
      src: "/images/image10.png",
      alt: "Tailoring business",
      style: "h-[230px]",
    },
    {
      src: "/images/image11.png",
      alt: "Mechanic business",
      style: "h-[230px]",
    },
    { src: "/images/image12.png", alt: "Chef business", style: "h-[300px]" },
    {
      src: "/images/image13.png",
      alt: "Cleaning business",
      style: "h-[300px]",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      desc: "Quickly sign up in just a few minutes and set up your business profile.",
      image: "/images/Iluustrator_1.png",
      color: "#15BE87",
    },
    {
      number: 2,
      title: "List Business Details",
      desc: "Add your business name, location services and photos.",
      image: "/images/Illustrator_2.png",
      color: "#FB2E2E",
    },
    {
      number: 3,
      title: "Get Verified",
      desc: "Our team reviews and verifies your business to build trust with customers.",
      image: "/images/Illustrator_3.png",
      color: "#2A2A2A",
    },
    {
      number: 4,
      title: "Get Discovered",
      desc: "Your business becomes visible to people searching for services near them.",
      image: "/images/Illustrator_4.png",
      color: "#060853",
    },
  ];

  // Container variants to stagger the children's appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Items appear one by one
      },
    },
  };

  // Individual card variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      title: "Get Discovered",
      desc: "People can easily find your business online when they search for products or services you offer. Your business becomes visible to more potential customers.",
      icon: "/images/book.png",
    },
    {
      title: "Build Trust",
      desc: " A verified profile shows customers that your business is real, reliable, and approved on the platform. This added layer of credibility helps people feel more confident choosing your services or products.",
      icon: "/images/shield.png",
    },
    {
      title: "Manage Everything",
      desc: "Easily update your business hours, contact details, and services anytime, so customers always see the most accurate and up-to-date information. ",
      icon: "/images/setting.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white!">
      <section className="w-full py-24 px-6 md:px-16 lg:px-24 font-sans max-w-425 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side: Text and CTA */}
          <div className="flex-1 w-full max-w-xl text-center lg:text-left">
            <p className="text-[#323232] text-5xl md:text-6xl font-bold mb-5 tracking-tight">
              Grow Your Business
            </p>
            <h1 className="text-5xl md:text-5xl font-extrabold leading-tight mb-5 tracking-tight">
              <span className="text-[#20A97E]">
                Where Customers Are Searching
              </span>
            </h1>

            <p className="text-black text-lg">
              Join thousands of I business already
              <br /> connecting with customers on our platform
            </p>
            <Button
              type="primary"
              className="h-12! mt-5 bg-[#060853]! hover:bg-[#060853]! border-none text-white text-base font-bold rounded-lg px-10! transition-colors"
            >
              List Your Business
            </Button>
          </div>

          {/* Right Side: Staggered Masonry-Style Grid */}
          <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-6 items-end">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="relative h-82.5 rounded-3xl overflow-hidden border border-[#15BE87]">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
              </div>
              <div className="relative h-62.5 rounded-3xl overflow-hidden border border-[#15BE87]">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
              </div>
            </div>

            {/* Column 2 - Pushed Up */}
            <div className="space-y-6 mb-16 md:mb-24">
              <div className="relative h-62.5 rounded-3xl overflow-hidden border border-[#15BE87]">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
              </div>
              <div className="relative h-82.5 rounded-3xl overflow-hidden border border-[#15BE87]">
                <Image
                  src={images[3].src}
                  alt={images[3].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
              </div>
            </div>

            {/* Column 3 - Only on larger screens */}
            <div className="space-y-6 hidden md:block">
              <div className="relative h-82.5 rounded-3xl mb-65 overflow-hidden border border-[#15BE87]">
                <Image
                  src={images[4].src}
                  alt={images[4].alt}
                  fill
                  className="object-cover"
                  sizes="15vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E8FFF7] px-6 flex justify-center items-center">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-extrabold py-12 md:py-16 lg:py-20 text-center max-w-4xl tracking-tight">
          Why List Your Business
        </h2>
      </section>

      <section className="py-24 px-6 bg-white max-w-7xl mx-auto overflow-hidden">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Animates when 20% of section is visible
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="p-8 bg-white border border-gray-100 rounded-sm flex flex-col gap-5 text-center justify-center items-center transition-shadow group cursor-pointer"
            >
              {/* Animated Icon Container */}
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                <Image src={feature.icon} width={50} height={50} />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#060853] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center items-center mt-10">
          <Button className="bg-[#060853]! h-12! text-white! text-lg! px-5! ">
            List Your Business
          </Button>
        </div>
      </section>
      <section className="py-24 px-6 md:px-12 bg-white max-w-7xl mx-auto overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-[#000000] mb-3">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Get Your Business Online Takes a Few Steps
          </p>
        </div>

        {/* Grid Container with Staggered Motion */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            // Logic for specific corner rounding
            const cornerClasses = [
              "rounded-tl-[80px]", // Card 1: Top Left
              "rounded-tr-[80px]", // Card 2: Top Right
              "rounded-bl-[80px]", // Card 3: Bottom Left
              "rounded-br-[80px]", // Card 4: Bottom Right
            ];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className={`bg-[#E7EEFA] p-8 relative group ${cornerClasses[index]}`}
              >
                {/* Step Number */}
                <div className="flex justify-center items-center">
                  <div
                    style={{ backgroundColor: step.color }}
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white mb-8"
                  >
                    {step.number}
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row items-center gap-3">
                  {/* Illustration */}
                  <div className="relative w-full sm:w-60 h-50 shrink-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </div>

                  {/* Text */}
                  <div className="text-center xl:text-left">
                    <h3 className="text-lg font-extrabold text-[#000000] mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

    
        {/* Subscription Form Container */}
        <section className="bg-[#15BE87] flex flex-col justify-center items-center py-24 md:py-32 px-6 mb-24">
          {/* Heading */}
          <h2 className="text-white text-3xl md:text-5xl font-extrabold text-center leading-[1.1] mb-12 tracking-tighter">
            Want to list your business for
            <br className="hidden md:block" /> massive growth
          </h2>

          {/* Grid Container: Ensures equal width columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Input
              placeholder="Enter your email"
              className="h-16 px-6 rounded-xl bg-[#F2F2F2] border-none text-gray-700 text-lg shadow-sm focus:bg-white transition-all w-full"
            />

            <Button
              type="primary"
              className="h-16! bg-[#060853]! hover:bg-[#0a0d6b]! border-none text-white! text-lg font-bold rounded-xl w-full transition-all shadow-lg active:scale-95"
            >
              Subscribe
            </Button>
          </div>
        </section>
    </div>
  );
};

export default page;
