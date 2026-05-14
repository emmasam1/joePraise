"use client";
import React, { useState, useRef } from "react";
import { Input, Upload, Select, Form, message, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const ProfileTab = () => {
  const [form] = Form.useForm();
  const uploadRef = useRef(null);

  // State for image preview and form editability
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const handleUpload = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
      message.success("Logo updated successfully");
    }
  };

  const prefixSelector = (
    <Select
      defaultValue="NG"
      borderless
      className="w-16"
      disabled={!isEditingInfo}
    >
      <Option value="NG">🇳🇬</Option>
      <Option value="US">🇺🇸</Option>
      <Option value="UK">🇬🇧</Option>
    </Select>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Section 1: Logo Upload */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#060853]">
            Business Profile Setting
          </h2>
          {/* First Edit Button: Triggers hidden upload */}
          <button
            onClick={() => document.getElementById("logo-uploader").click()}
            className="flex items-center gap-1 px-3 py-1 bg-[#E0E7FF] text-[#060853] text-[13px] cursor-pointer font-bold rounded-md hover:bg-[#ccd5ff] transition-colors"
          >
            <img src="/images/pen_icon.png" alt="Edit" className="h-4 w-4" />{" "}
            Edit
          </button>
        </div>

        <Form layout="vertical">
          <Form.Item
            label={
              <span className="font-bold text-gray-700">Upload Your Logo</span>
            }
          >
            <Upload.Dragger
              id="logo-uploader"
              className="bg-gray-50/50 border-2 border-dashed border-emerald-200! rounded-2xl! w-2/4! overflow-hidden"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                handleUpload({ file });
                onSuccess("ok");
              }}
            >
              <div className="py-6 flex flex-col items-center justify-center min-h-40">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Business Logo"
                    className="h-24 object-contain mb-2"
                  />
                ) : (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </>
                )}
              </div>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </section>

      {/* Section 2: Business Information */}
      <section className="border-t border-gray-100 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#060853]">
            Business Information
          </h2>
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

        <Form
          form={form}
          layout="vertical"
          disabled={!isEditingInfo} // Controls all inputs at once
          requiredMark={false}
          initialValues={{
            name: "Glow World Luxury Furniture",
            email: "glowworldluxuryfurniture@gmail.com",
            phone: "708090467588",
            website: "www.glowworldfurnitures.com",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet varius faucibus, justo erat ultricies nisl, vitae facilisis nulla lacus non justo. Integer nec libero vel odio tempor consequat.",
          }}
        >
          <div className="grid grid-cols-1 gap-4 w-2/4">
            <Form.Item
              name="name"
              label={<span className="font-bold text-gray-700">Name</span>}
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="font-bold text-gray-700">Email</span>}
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={
                <span className="font-bold text-gray-700">Phone number</span>
              }
            >
              {/* This is the "Box" that holds both parts */}
              <Space.Compact className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden focus-within:border-blue-300 transition-all">
                {/* Part 1: The dropdown (previously your prefixSelector) */}
                <Select
                  defaultValue="NG"
                  variant="borderless"
                  className="w-20! h-full flex items-center border-r border-gray-200"
                  disabled={!isEditingInfo}
                >
                  <Option value="NG">🇳🇬</Option>
                  <Option value="US">🇺🇸</Option>
                  <Option value="UK">🇬🇧</Option>
                </Select>

                {/* Part 2: The actual input field */}
                <Input
                  variant="borderless"
                  className="h-full text-sm font-medium text-gray-600 px-4"
                  placeholder="+234 708090467588"
                  disabled={!isEditingInfo}
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              name="website"
              label={<span className="font-bold text-gray-700">Website</span>}
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl text-blue-500 underline underline-offset-4" />
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <span className="font-bold text-gray-700">
                  Business Description
                </span>
              }
            >
              <TextArea
                rows={5}
                className="bg-gray-50 border-gray-100 rounded-xl p-4 text-gray-500"
              />
            </Form.Item>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default ProfileTab;
