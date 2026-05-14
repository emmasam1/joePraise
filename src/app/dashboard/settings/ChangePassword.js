import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


   const handleSubmit = () => {
    router.push("/dashboard/settings");
  }

  // Watch the newPassword field to update validation checklist in real-time
  const passwordValue = Form.useWatch("newPassword", form) || "";

  // Validation Logic
  const hasEightChars = passwordValue.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(passwordValue);
  const hasUpperAndLower =
    /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);

  const onFinish = (values) => {
    console.log("Password changed successfully:", values);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="border border-gray-200 p-6">
      {/* Header */}

      <div className="flex justify-between items-start mb-8 ">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#2A2A2A]">Change password</h2>
          <p className="text-sm text-gray-500">
            Please fill the form below to keep your account secure by setting a
            unique password
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 px-3 py-1 bg-[#E0E7FF] text-[#060853] text-[13px] cursor-pointer font-bold rounded-md hover:bg-[#ccd5ff] transition-colors"
        >
          <img src="/images/pen_icon.png" alt="Edit" className="h-4 w-4" />{" "}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={!isEditing}
        requiredMark={false}
        className="w-2/4"
      >
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label={
            <span className="text-lg font-bold text-[#2A2A2A]">
              Current password
            </span>
          }
        >
          <Input.Password
            placeholder="Enter your current password"
            className="h-12 bg-gray-50/50 border-gray-200 rounded-xl px-4 text-gray-400"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label={
            <span className="text-lg font-bold text-[#2A2A2A]">
              New Password
            </span>
          }
        >
          <Input.Password
            placeholder="Enter your new password"
            className="h-12 bg-gray-50/50 border-gray-200 rounded-xl px-4 text-gray-400"
          />
        </Form.Item>

        {/* Validation Checklist */}
        <div className="mb-8 space-y-3">
          <h3 className="text-lg font-bold text-[#2A2A2A] mb-4">
            Your password must contain:
          </h3>

          <ValidationRequirement
            text="At least 8 characters"
            isMet={hasEightChars}
          />
          <ValidationRequirement
            text="Least one number (0-9) or symbol"
            isMet={hasNumberOrSymbol}
          />
          <ValidationRequirement
            text="Lowercase (a-z) and uppercase (A-Z)"
            isMet={hasUpperAndLower}
          />
        </div>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label={
            <span className="text-lg font-bold text-[#2A2A2A]">
              Confirm Password
            </span>
          }
          dependencies={["newPassword"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            className="h-12 bg-gray-50/50 border-gray-200 rounded-xl px-4 text-gray-400"
          />
        </Form.Item>

        {/* Footer Actions */}
        <div className="space-y-6 pt-6">
          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={() => setIsModalOpen(true)}
            className="h-12! text-white! bg-[#060853]!  border-none text-lg font-bold rounded-xl"
          >
            Change Password
          </Button>

          <div className="text-left">
            <button
              type="button"
              className="text-[#00D094] font-semibold text-lg underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </Form>
      </div>

      {/* Confirmation Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="max-w-lg"
      >
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="rounded-full h-25 w-25 bg-[#EDF4FD] mb-5 flex justify-center items-center">
            <img src="/images/mail_checked.png" alt="mail" className="h-20" />
          </div>
          <h2 className="font-bold text-2xl text-[#15BE87]">Change Password successful.</h2>
          <p className="text-[#6A7282] text-center text-xs mt-4">
            Congratulations, your password has been changed successfully
          </p>

          <Button
            onClick={handleSubmit}
            className="text-white! p-5! text-lg mt-5 bg-[#060853]! rounded-lg border-none"
          >
            Go To Settings
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

// Sub-component for individual checklist items
const ValidationRequirement = ({ text, isMet }) => (
  <div className="flex items-center gap-3">
    {isMet ? (
      <CheckOutlined className="text-[#00D094] text-sm" />
    ) : (
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-1" />
    )}
    <span
      className={`text-sm transition-all duration-300 ${isMet ? "text-[#00D094]" : "text-gray-400"}`}
    >
      {text}
    </span>
  </div>
);

export default ChangePassword;
