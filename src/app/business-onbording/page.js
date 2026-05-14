"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Upload,
  Radio,
  TimePicker,
} from "antd";
import { FiCheck } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { FiX } from "react-icons/fi";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Dragger } = Upload;

// This loads the map only on the client side to prevent errors
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const { TextArea } = Input;

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [hoursType, setHoursType] = useState("always"); // 'always' or 'selected'
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDays, setSelectedDays] = useState([
    { day: "Monday", id: Date.now() },
  ]);

  const [dragIndex, setDragIndex] = useState(null);

  // ✅ ADD DAY
  const addDay = () => {
    const usedDays = selectedDays.map((d) => d.day);
    const nextDay = allDays.find((d) => !usedDays.includes(d));

    if (!nextDay) return;

    setSelectedDays((prev) => [...prev, { id: Date.now(), day: nextDay }]);
  };

  // ✅ REMOVE DAY
  const removeDay = (id) => {
    setSelectedDays((prev) => prev.filter((d) => d.id !== id));
  };

  // ✅ UPDATE DAY
  const updateDay = (id, newDay) => {
    setSelectedDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, day: newDay } : d)),
    );
  };

  // ✅ DRAG START
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  // ✅ DROP
  const handleDrop = (index) => {
    if (dragIndex === null) return;

    const updated = [...selectedDays];
    const draggedItem = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);

    setSelectedDays(updated);
    setDragIndex(null);
  };

  const next = async () => {
    try {
      await form.validateFields();
      if (current < 3) setCurrent((c) => c + 1);
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  // Helper to handle the file and set preview
  const handlePreview = (file, setPreview) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  const DraggerContent = ({ preview, setPreview, label }) => (
    <div className="relative w-full h-full min-h-30 flex flex-col items-center justify-center py-4">
      {preview ? (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <img
            src={preview}
            alt="preview"
            className="max-h-24 object-contain rounded-md"
          />
          <button
            onClick={(e) => {
              e.stopPropagation(); // Don't trigger dragger
              setPreview(null);
            }}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-xs mb-1">
            Drag & drop your {label} here Max 2mb
          </p>
          <p className="text-gray-400 text-[10px] mb-2">OR</p>
          <Button
            size="small"
            className="text-[#10b981]! border-[#10b981]! hover:text-[#0f766e]! hover:border-[#0f766e]! pointer-events-none"
          >
            Browse files
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen w-full flex md:flex-row bg-white text-black overflow-hidden font-sans">
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 px-6 lg:px-20 py-4 flex flex-col justify-center h-full">
        <img src="/images/logo.png" alt="logo" className="w-12 mb-2" />

        <h2 className="text-lg font-bold text-[#1e293b]">
          Step {current + 1} of 4:{" "}
          {current === 0
            ? "Business Information"
            : current === 1
              ? "Business Location"
              : current === 2
                ? "Business Branding"
                : "Business Hours"}
        </h2>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-between mb-8 max-w-md">
          {[0, 1, 2, 3].map((stepIndex, index) => {
            const isCompleted = stepIndex < current;
            const isActive = stepIndex === current;

            return (
              <div
                key={stepIndex}
                className={`flex items-center ${
                  index < 3 ? "w-full" : "w-auto"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-500
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500"
                      : isActive
                        ? "bg-gray-200 border-[#060853]"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="text-white" size={16} />
                  ) : (
                    <span
                      className={`text-xs font-bold ${
                        isActive ? "text-[#060853]" : "text-gray-400"
                      }`}
                    >
                      {stepIndex + 1}
                    </span>
                  )}
                </div>

                {index < 3 && (
                  <div className="flex-1 h-0.5 bg-gray-100 mx-2">
                    <div
                      className="h-full bg-green-500 transition-all duration-700"
                      style={{ width: isCompleted ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FORM HEADER */}
        <div className="mb-4 -mt-4">
          <h3 className="text-md font-semibold text-[#1e293b]">
            {current === 0
              ? "Business Information"
              : current === 1
                ? "Business Location"
                : current === 2
                  ? "Business Branding"
                  : "Business Hours"}
          </h3>
          <p className="text-gray-500 text-xs">
            {current === 0
              ? "Tell us about your business to get started"
              : current === 1
                ? "Provide the details of your physical or operational base."
                : current === 2
                  ? "Enhance your brand access with a logo and banner"
                  : "Provide the operating times and says for your physical base."}
          </p>
        </div>

        <Form form={form} layout="vertical" className="w-full">
          {/* STEP 0 */}
          {current === 0 && (
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Form.Item name="name" label="Business Name">
                  <Input
                    placeholder="Enter Name"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="email" label="Business Email">
                  <Input
                    placeholder="Enter Email"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="phone" label="Phone Number">
                  <Input
                    addonBefore="🇳🇬"
                    placeholder="Phone"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="website" label="Website (Optional)">
                  <Input
                    placeholder="www.example.com"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="category" label="Business Category">
                  <Select
                    size="small"
                    placeholder="Select category"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                    options={[{ value: "tech", label: "Tech" }]}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="description" label="Business Description">
                  <TextArea
                    rows={4}
                    placeholder="Detailed description"
                    className="bg-gray-50! text-xs! rounded-md! resize-none!"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* STEP 1 */}
          {current === 1 && (
            <Row gutter={[12, 0]}>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Select
                    size="small"
                    placeholder="Select Country"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                    options={[{ value: "nigeria", label: "Nigeria" }]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="city" label="City">
                  <Select
                    size="small"
                    placeholder="Select City"
                    className="bg-gray-50! h-8! text-xs! rounded-md!"
                    options={[{ value: "abuja", label: "Abuja" }]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="address" label="Address">
                  <Input
                    placeholder="Enter address"
                    className="bg-gray-50! h-8! text-xs!"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="postalCode" label="Postal Code">
                  <Input
                    placeholder="Postal code"
                    className="bg-gray-50! h-8! text-xs!"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="text-xs font-medium mb-1">
                  Map Location (Optional)
                </div>
                <div className="text-[10px] text-gray-400 mb-2">
                  Add your exact location
                </div>

                <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-200 relative z-0">
                  <MapContainer
                    center={[9.0578, 7.4951]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </MapContainer>
                </div>
              </Col>
            </Row>
          )}

          {/* STEP 2 */}
          {current === 2 && (
            <Row gutter={[0, 24]}>
              {/* LOGO UPLOAD */}
              <Col span={24} className="-mb-5">
                <Form.Item
                  label={
                    <span className="text-xs font-bold text-[#1e293b]">
                      Upload Logo
                    </span>
                  }
                  name="logo"
                >
                  <Dragger
                    accept="image/*"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={(file) => handlePreview(file, setLogoPreview)}
                    className="bg-[#f0fdfa]! border-[#5eead4]! rounded-xl overflow-hidden border-dashed"
                    customRequest={({ onSuccess }) => onSuccess("ok")} // Dummy success
                  >
                    <DraggerContent
                      preview={logoPreview}
                      setPreview={setLogoPreview}
                      label="Logo"
                    />
                  </Dragger>
                </Form.Item>
              </Col>

              {/* BANNER UPLOAD */}
              <Col span={24} className="-mb-3">
                <Form.Item
                  label={
                    <span className="text-xs font-bold text-[#1e293b]">
                      Upload Banner (Optional)
                    </span>
                  }
                  name="banner"
                  extra={
                    <span className="text-[10px] text-gray-400">
                      Best ratio: 16:9. Max size: 2MB
                    </span>
                  }
                >
                  <Dragger
                    accept="image/*"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={(file) =>
                      handlePreview(file, setBannerPreview)
                    }
                    className="bg-[#f0fdfa]! border-[#5eead4]! rounded-xl overflow-hidden border-dashed"
                    customRequest={({ onSuccess }) => onSuccess("ok")}
                  >
                    <DraggerContent
                      preview={bannerPreview}
                      setPreview={setBannerPreview}
                      label="Banner"
                    />
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* STEP 3 */}
          {current === 3 && (
            <div className="space-y-2">
              {/* TOP OPTIONS */}
              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <div
                    className={`p-2 border rounded-xl cursor-pointer ${
                      hoursType === "always"
                        ? "border-[#060853] bg-blue-50/50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setHoursType("always")}
                  >
                    <Radio checked={hoursType === "always"}>
                      <div>
                        <span className="font-bold text-sm">Always Open</span>
                        <p className="text-gray-400 text-xs">e.g parks</p>
                      </div>
                    </Radio>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div
                    className={`p-2 border rounded-xl cursor-pointer ${
                      hoursType === "selected"
                        ? "border-[#060853] bg-blue-50/50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setHoursType("selected")}
                  >
                    <Radio checked={hoursType === "selected"}>
                      <div>
                        <span className="font-bold text-sm">
                          Selected Hours
                        </span>
                        <p className="text-gray-400 text-xs">
                          Set custom schedule
                        </p>
                      </div>
                    </Radio>
                  </div>
                </Col>
              </Row>

              {/* HOURS TABLE */}
              {hoursType === "selected" && (
                <div className="bg-white rounded-lg">
                  {selectedDays.map((item, index) => (
                    <Row
                      key={item.id}
                      align="middle"
                      gutter={12}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(index)}
                      className={`py-2 border-b border-gray-200 last:border-0 cursor-move ${
                        dragIndex === index ? "opacity-50" : ""
                      }`}
                    >
                      {/* DAY SELECT */}
                      <Col span={6}>
                        <Select
                          value={item.day}
                          size="small"
                          className="bg-gray-50! h-9! mt-1! text-xs! rounded-md! w-full"
                          onChange={(value) => updateDay(item.id, value)}
                          options={allDays.map((d) => {
                            const isUsed = selectedDays.some(
                              (sd) => sd.day === d,
                            );
                            const isCurrent = item.day === d;

                            return {
                              value: d,
                              label: d,
                              disabled: isUsed && !isCurrent,
                            };
                          })}
                        />
                      </Col>

                      {/* TIME */}
                      <Col span={14} className="-mb-10 pb-3">
                        <div className="flex items-center gap-2">
                          <Form.Item className="mb-0">
                            <TimePicker
                              use12Hours
                              format="h:mm a"
                              placeholder="Open"
                              className="!h-9 !text-xs"
                            />
                          </Form.Item>

                          <Form.Item className="mb-0">
                            <TimePicker
                              use12Hours
                              format="h:mm a"
                              placeholder="Close"
                              className="!h-9 !text-xs"
                            />
                          </Form.Item>
                        </div>
                      </Col>

                      {/* ACTIONS */}
                      <Col span={4} className="flex gap-2">
                        {/* ADD */}
                        {index === selectedDays.length - 1 && (
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addDay}
                            className="!bg-blue-50 !h-9 w-full"
                          />
                        )}

                        {/* DELETE */}
                        {selectedDays.length > 1 && (
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeDay(item.id)}
                            className="!h-9 w-full"
                          />
                        )}
                      </Col>
                    </Row>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={prev}
              disabled={current === 0}
              className="h-10 px-15! border"
            >
              Back
            </Button>

            {current === 3 ? (
              <Button
                type="primary"
                onClick={next}
                className="h-10 px-15! !bg-[#060853] !border-none"
              >
                <Link href="/business-verification">Continue</Link>
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={next}
                className="h-10 px-15! !bg-[#060853] !border-none"
              >
                Continue
              </Button>
            )}
          </div>
        </Form>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block md:w-1/2 relative h-full">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/reg_img_${current + 1}.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
