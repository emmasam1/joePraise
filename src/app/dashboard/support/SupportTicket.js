"use client";
import React from "react";
import { Select, Input, DatePicker, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SupportTicketPage = ({ onBack }) => {
  return (
    <div className="px-5 mt-5">

      <h1 className="text-3xl font-bold text-gray-900 mb-10">Support Ticket System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* CATEGORY */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">Category</label>
          <Select 
            placeholder="Select an option" 
            className="h-12 bg-gray-50 border-gray-100 rounded-xl"
            suffixIcon={<img src="/images/arrow_down_dark.png" alt="down" className="w-3" />}
          />
        </div>

        {/* PURPOSE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">Purpose</label>
          <Select 
            placeholder="Select an option" 
            className="h-12 bg-gray-50 border-gray-100 rounded-xl"
            suffixIcon={<img src="/images/arrow_down_dark.png" alt="down" className="w-3" />}
          />
        </div>

        {/* DESCRIPTION - Takes up left column but height matches right side stack */}
        <div className="flex flex-col gap-2 row-span-2">
          <label className="text-sm font-bold text-gray-800">Description</label>
          <TextArea 
            placeholder="Detailed Product Description" 
            rows={7}
            className="bg-gray-50 border-gray-100 rounded-xl p-4 text-gray-500 resize-none!"
          />
        </div>

        {/* PRIORITY */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">Priority</label>
          <Select 
            placeholder="Select an option" 
            className="w-full h-12 custom-select"
            suffixIcon={<img src="/images/arrow_down_dark.png" alt="down" className="w-3" />}
          />
        </div>

        {/* DATE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">Date</label>
          <DatePicker 
            placeholder="DD/MM/YYYY" 
            format="DD/MM/YYYY"
            className="w-full h-12 rounded-xl border-gray-300 bg-gray-50 focus:border-[#060853]"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end mt-12">
        <Button 
          type="primary" 
          className="bg-[#060853] hover:bg-[#060853]/90 h-12 px-12 rounded-lg border-none text-white font-bold"
        >
          Submit
        </Button>
      </div>

    
    </div>
  );
};

export default SupportTicketPage;