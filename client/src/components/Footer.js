"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Time between each icon appearing
        delayChildren: 0.2, // Wait before starting the sequence
      },
    },
  };

  // Animation variants for individual icons
  const iconVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const footerLinks = {
    "Joe praise": [
      "Why Joe Praise",
      "Enterprise",
      "Customer Story",
      "Security",
      "Pricing",
    ],
    Resources: [
      "Download",
      "Help Center",
      "Events",
      "Guides",
      "Partner",
      "Directories",
    ],
    Company: ["About us", "Contact us", "Products", "Login", "Sign Up", "FAQ"],
  };

  const socialIcons = [
    <Image src="/images/facebook.png" alt="Facebook" width={50} height={50} />,
    <Image src="/images/twitter.png" alt="Twitter" width={50} height={50} />,
    <Image src="/images/youtube.png" alt="Youtube" width={50} height={50} />,
    <Image src="/images/linkedin.png" alt="Linkedin" width={50} height={50} />,
    <Image
      src="/images/instagram.png"
      alt="Instagram"
      width={50}
      height={50}
    />,
  ];

  return (
    <footer className="bg-[#060853] text-white pt-20 pb-10 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand and About Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Joe Praise</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
              Joe Praise Technology is a Website lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud
            </p>
            <motion.div
              className="flex gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // Triggers when the user scrolls to the footer
              viewport={{ once: true }} // Only animate once
            >
              {socialIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer transition-colors text-lg text-white hover:bg-[#00D094] hover:text-[#060853]"
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-8 text-[13px]">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li
                    key={link}
                    className="text-gray-300 text-sm hover:text-[#00D094] cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="pt-10 mb-20">
          <h3 className="font-bold mb-8 text-[16px]">Get in Touch with Us</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <Image
                src={"/images/pin.png"}
                alt="Location"
                width={20}
                height={20}
                className="mt-1"
              />

              <p className="text-gray-300 text-sm max-w-[250px]">
                832, Thompson Drive, San Fransisco CA 94107, United Kingdom
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Image
                src={"/images/phone.png"}
                alt="Location"
                width={20}
                height={20}
                className="mt-1"
              />
              <p className="text-gray-300 text-sm">+123 345123 556</p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={"/images/address.png"}
                alt="Location"
                width={20}
                height={20}
                className="mt-1"
              />
              <p className="text-gray-300 text-sm">support@joepraise.id</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="flex  md:row justify-between items-center text-[#62748E] text-xs">
          <p>Joe Praise Technologies Website - © 2026 All Rights Reserved</p>
         <Image
            src={"/images/creator.png"}
            alt="Heart"
            width={150}
            height={150}
            className="inline-block mx-1"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
