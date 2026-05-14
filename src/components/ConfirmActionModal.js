"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAlertCircle } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const page = ({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  actionText,
  icon1,
  icon2,
  icon3,
  borderColor = "#A12E2E",
  loading = false,
  size = "max-w-2xl",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className={`relative w-full ${size} bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10`}
          >
            <div className="flex flex-col items-center justify-center py-10 px-8 text-center">
              {/* DYNAMIC ICON CONTAINER */}
              <div className="w-20 h-20  flex items-center justify-center mb-8 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  {icon1}
                </div>
              </div>

              {/* TEXT CONTENT */}
              <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>

              {description ? (
                <div className="text-[#4A4A4A] text-base text-[12px] mb-8 whitespace-pre-line leading-relaxed">
                  {description}
                </div>
              ) : (
                <div className="text-gray-500 text-base mb-8 leading-relaxed">
                  <p>Are you sure you want to proceed? Deleting this</p>
                  <p>option will remove it from relevant records.</p>
                  <p className="font-semibold mt-1">
                    This action cannot be undone!
                  </p>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-4 w-full justify-center mt-2">
                <button
                  onClick={onClose}
                  className="h-10 px-8 rounded-lg border border-[#F9B949] text-[#F9B949] font-bold flex items-center gap-2 hover:bg-[#F9B949]/5 transition-all cursor-pointer"
                >
                  {icon2}
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={onAction}
                  className={`h-10 px-8 cursor-pointer rounded-lg border font-bold flex items-center gap-2 transition-all ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90"
                  }`}
                  style={{
                    borderColor: borderColor,
                    color: borderColor,
                    backgroundColor: "transparent",
                  }}
                >
                  {icon3}
                  Delete
                 
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default page;
