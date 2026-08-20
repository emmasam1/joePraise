"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { publicPolicyLinks } from "@/data/policyCatalog";

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
    "Joe Praise SmartHub": [
      "Why Joe Praise SmartHub",
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
    Company: ["Who we are", "Support", "Login", "Sign Up"],
  };

  const footerRoutes = {
    "Who we are": "/who-we-are",
    Support: "/support",
    Login: "/login",
    "Sign Up": "/business-registration",
  };

  const socialIcons = [
    { src: "/images/facebook.png", alt: "Facebook" },
    { src: "/images/twitter.png", alt: "Twitter" },
    { src: "/images/youtube.png", alt: "YouTube" },
    { src: "/images/linkedin.png", alt: "LinkedIn" },
    { src: "/images/instagram.png", alt: "Instagram" },
  ];

  return (
    <footer className="bg-[#060853] text-white pt-20 pb-10 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand and About Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Joe Praise SmartHub</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
              Joe Praise SmartHub is a Website lorem ipsum dolor sit amet,
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
                  key={icon.alt}
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer transition-colors text-lg text-white hover:bg-[#00D094] hover:text-[#060853]"
                >
                  <Image src={icon.src} alt={icon.alt} width={50} height={50} />
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
                    {footerRoutes[link] ? (
                      <Link href={footerRoutes[link]}>{link}</Link>
                    ) : (
                      link
                    )}
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
                3rd Floor, 86-90 Paul Street, London, England, EC2A 4NE
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
            <div className="flex items-start gap-4">
              <Image
                src={"/images/address.png"}
                alt="Email"
                width={20}
                height={20}
                className="mt-1"
              />
              <div className="flex flex-col gap-1 text-sm text-gray-300">
                <a className="hover:text-white" href="mailto:support@joepraisesmarthub.co.uk">
                  support@joepraisesmarthub.co.uk
                </a>
                <a className="hover:text-white" href="mailto:onboarding@joepraisesmarthub.co.uk">
                  onboarding@joepraisesmarthub.co.uk
                </a>
                <a className="hover:text-white" href="mailto:legal@joepraisesmarthub.co.uk">
                  legal@joepraisesmarthub.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="flex flex-col gap-5 border-t border-white/10 pt-8 text-[#A8B3C7] text-xs md:flex-row md:justify-between md:items-center">
          <div className="space-y-4">
            <p>Joe Praise SmartHub Technologies Website - © 2026 All Rights Reserved</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3">
              {publicPolicyLinks.map((policy) => (
                <Link key={policy.href} className="transition-colors hover:text-[#00D094]" href={policy.href}>
                  {policy.title}
                </Link>
              ))}
            </nav>
          </div>
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
