import React, { useState } from "react";
import { Switch } from "antd";

const LoginOption = () => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  return (
    <section className="border border-gray-200 p-6 pt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#2A2A2A]">
            Re-login Options
          </h2>
          <p className="text-sm text-gray-500">
            Choose re-login options to keep account active
          </p>
        </div>
        {/* Second Edit Button: Toggles input disabled state */}
        <button
          onClick={() => setIsEditingInfo(!isEditingInfo)}
          className={`flex items-center gap-1 px-3 py-1 bg-[#E0E7FF] text-[#060853] text-[13px] cursor-pointer font-bold rounded-md hover:bg-[#ccd5ff] transition-colors ${
            isEditingInfo
              ? "bg-[#E0E7FF]! text-[#060853]"
              : "bg-[#060853] text-[#060853]"
          }`}
        >
          <img src="/images/pen_icon.png" alt="Edit" className="h-4 w-4" />{" "}
          {isEditingInfo ? "Finish" : "Edit"}
        </button>
      </div>

      <div className="-space-y-1">
        <SecurityToggle
          title="Always Login with Google Account"
          description="Use your registered google account to re-login."
          defaultChecked={true}
        />
        <SecurityToggle
          title="Always Login with Email & Password"
          description="Use your registered email and password to re-login into your account."
          defaultChecked={true}
        />
        <SecurityToggle
          title="Always Login with Password"
          description="use only saved password to re-login into your account."
          defaultChecked={true}
        />
      </div>
    </section>
  );
};

const SecurityToggle = ({ title, description, defaultChecked }) => (
  <div className="flex justify-between items-center py-8 border-b border-gray-100 last:border-0">
    <div className="space-y-1 pr-4">
      <h3 className="text-lg font-bold text-[#2A2A2A]">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-md">
        {description}
      </p>
    </div>
    <Switch
      defaultChecked={defaultChecked}
      className="bg-gray-200"
      style={{ backgroundColor: defaultChecked ? "#060853" : "#E5E7EB" }}
    />
  </div>
);

export default LoginOption;
