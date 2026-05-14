"use client";
import React from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  size = "max-w-2xl",
  // Ensure the default value is a full Tailwind class
  bgColor = "bg-white" 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* BACKDROP: Fades in/out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER: Scales and slides up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            // Apply the bgColor variable here
            className={`relative w-full ${size} ${bgColor} rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10`}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4">
              <h3 className="text-lg font-bold text-[#1e293b]">{title}</h3>
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;