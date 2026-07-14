// export default function Loading() {
//   return (
//     <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-10 h-10 border-4 border-[#100d63] border-t-transparent rounded-full animate-spin" />
//         <p className="text-sm text-zinc-500 font-medium">Loading business profile...</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Loading = () => {
  // Letters array for a premium, staggered entrance animation
  const titleLetters = "Joe Praise".split("");

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-md select-none overflow-hidden">
      
      {/* 1. Ultra-soft Luxury Glows (Depth Layer) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-12 -left-12 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-[#060853]/20 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-12 -right-12 w-[35rem] h-[35rem] rounded-full bg-gradient-to-bl from-[#18C37E]/20 to-transparent blur-[120px]"
        />
      </div>

      <div className="relative flex flex-col items-center z-10">
        
        {/* 2. Custom Orbital Loading Rings (Replaces standard AntD spinner) */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          
          {/* Outer elegant slow-rotating orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-dashed border-[#060853]/15"
          />

          {/* Premium Glowing Liquid Trail Tracker */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[105%] h-[105%] rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "rgba(24, 195, 126, 0.6)",
              borderRightColor: "rgba(24, 195, 126, 0.1)",
              filter: "drop-shadow(0 0 4px rgba(24, 195, 126, 0.4))",
            }}
          />

          {/* 3. The Core Logo Chamber (Premium Shadow Depth) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="relative w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(6,8,83,0.12)] border border-slate-100/50 p-6 z-20"
          >
            {/* Subtle logo pulse */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/logo.png" // Your logo path
                alt="Joe Praise Technologies"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 4. Staggered Text Animations (Premium brand reveal) */}
        <div className="flex flex-col items-center mt-2">
          
          {/* "Joe Praise" Staggered Slide In + Subtle Glow */}
          <div className="flex space-x-0.5 overflow-hidden">
            {titleLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`text-2xl font-black tracking-wide text-[#060853] ${
                  letter === " " ? "w-2" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* "TECHNOLOGIES" tracking luxury fade */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="text-[#18C37E] font-extrabold uppercase text-[10px] mt-2 translate-x-[0.225em]"
          >
            Technologies
          </motion.p>
        </div>

        {/* 5. Sleek Micro-Loader Progress Line (Replaces bumpy loading dots) */}
        <div className="mt-8 w-24 h-[3px] bg-[#060853]/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-[#18C37E] to-[#060853] rounded-full"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Loading;