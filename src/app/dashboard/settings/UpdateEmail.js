import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";

const UpdateEmail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Email changed successfully:", values);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="border border-gray-200 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#2A2A2A]">Update Email</h2>
            <p className="text-sm text-gray-500">
              Please fill the form below to keep your account secure by setting
              a unique password
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
          className="w-2/4 "
        >
          {/* Current Password */}
          <Form.Item
            name="currentPassword"
            label={
              <span className="text-lg font-bold text-[#2A2A2A]">
                Current Email
              </span>
            }
          >
            <Input.Password
              placeholder="Enter your current email"
              className="h-12 bg-gray-50/50 border-gray-200 rounded-xl px-4 text-gray-400"
            />
          </Form.Item>

          {/* New Email */}
          <Form.Item
            name="newEmail"
            label={
              <span className="text-lg font-bold text-[#2A2A2A]">
                New Email
              </span>
            }
          >
            <Input.Password
              placeholder="Enter your new email"
              className="h-12 bg-gray-50/50 border-gray-200 rounded-xl px-4 text-gray-400"
            />
          </Form.Item>

          {/* Confirm Email */}
          <Form.Item
            name="confirmEmail"
            label={
              <span className="text-lg font-bold text-[#2A2A2A]">
                Confirm Email
              </span>
            }
            dependencies={["newEmail"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newEmail") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The emails do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm email"
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
              Update Password
            </Button>
          </div>
        </Form>
      </div>

      <div className="border border-gray-200 p-6 mt-6">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Section Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#2A2A2A] mb-1">
              Manage Login Options
            </h2>
            <p className="text-sm text-gray-500">
              Control how you access your account and receive security
              verification.
            </p>
          </div>

          {/* Settings List */}
          <div className="-space-y-1">
            <SecurityToggle
              title="Primary Email"
              description="Use your registered email to receive security codes and notifications."
              defaultChecked={true}
            />
            <SecurityToggle
              title="SMS Authentication"
              description="Receive verification codes via sms to your phone."
              defaultChecked={true}
            />
            <SecurityToggle
              title="Backup Codes"
              description="Save your one-time backup code to access your account if you loose your device."
              defaultChecked={true}
            />
          </div>
        </div>
      </div>
    </div>
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

export default UpdateEmail;
