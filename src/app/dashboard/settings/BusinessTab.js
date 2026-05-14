"use client";
import React, { useState } from "react";
import {
  Input,
  Radio,
  Select,
  Form,
  message,
  Row,
  Col,
  TimePicker,
  Button
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const BusinessTab = () => {
  const [form] = Form.useForm();
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [hoursType, setHoursType] = useState("always");
  const [activeDayIndexes, setActiveDayIndexes] = useState([0]);
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <section className="">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#060853]">Business Address</h2>
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
            postalCode: "9000011",
            taxId: "105674",
          }}
        >
          <div className="grid grid-cols-1 gap-4 w-2/4">
            <Form.Item
              name="website"
              label={<span className="font-bold text-gray-700">Country</span>}
            >
              <Select
                placeholder="Select Country"
                className="w-full h-12 text-sm bg-gray-50 border border-gray-100 rounded-xl"
                options={[
                  { value: "NG", label: "Nigeria" },
                  { value: "US", label: "United States" },
                  { value: "UK", label: "United Kingdom" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="cityState"
              label={
                <span className="font-bold text-gray-700">City/State</span>
              }
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label={
                <span className="font-bold text-gray-700">Postal Code</span>
              }
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
            </Form.Item>
            <Form.Item
              name="taxId"
              label={<span className="font-bold text-gray-700">Tax ID</span>}
            >
              <Input className="h-12 bg-gray-50 border-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="website"
              label={
                <span className="font-bold text-gray-700">
                  Business Category
                </span>
              }
            >
              <Select
                placeholder="Select Industry"
                className="w-full h-12 text-sm bg-gray-50 border border-gray-100 rounded-xl"
                options={[
                  { value: "services", label: "Services" },
                  { value: "product", label: "Product" },
                ]}
              />
            </Form.Item>
          </div>
        </Form>
      </section>

      <section className="border-t border-gray-100 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#060853]">Business Hours</h2>
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

        <Form layout="vertical" className="w-2/4">
          {/* SELECTION TYPE */}
          <div className="mb-3">
            <div
              className="p-3 rounded-xl cursor-pointer transition-all"
              onClick={() => setHoursType("always")}
            >
              <Radio checked={hoursType === "always"}>
                <span className="font-bold text-sm text-[#1e293b]">
                  Always Open
                </span>
                <p className="text-gray-400 text-[10px] ml-6">e.g parks</p>
              </Radio>
            </div>

            <div
              className="p-3 rounded-xl cursor-pointer transition-all"
              onClick={() => setHoursType("selected")}
            >
              <Radio checked={hoursType === "selected"}>
                <span className="font-bold text-sm text-[#1e293b]">
                  Open on Selected Hours
                </span>
                <p className="text-gray-400 text-[10px] ml-6">
                  Input your own hours
                </p>
              </Radio>
            </div>
          </div>

          {/* CONDITIONAL HOURS INPUTS */}
          {hoursType === "selected" && (
            <div className="bg-white rounded-lg">
              {/* We map through activeDayIndexes which starts as [0] */}
              {activeDayIndexes.map((dayIdx, listIdx) => (
                <Row key={allDays[dayIdx]} align="middle" gutter={12}>
                  <Col span={6} className="-mt-10">
                    <span className="text-xs font-bold text-[#1e293b]">
                      {allDays[dayIdx]}
                    </span>
                  </Col>
                  <Col span={15} className="-mt-4">
                    <div className="flex items-center space-x-2">
                      <Form.Item
                        name={[allDays[dayIdx], "open"]}
                        className="mb-0"
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          placeholder="Opening"
                          className="text-xs rounded-lg border-gray-300"
                        />
                      </Form.Item>
                      &nbsp;
                      <Form.Item
                        name={[allDays[dayIdx], "close"]}
                        className="mb-0"
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          placeholder="Closing"
                          className="text-xs rounded-lg border-gray-300"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={3} className="-mt-10">
                    {/* Show Plus only on the last row, and only if we haven't reached Sunday (7 days) */}
                    {listIdx === activeDayIndexes.length - 1 &&
                    activeDayIndexes.length < 7 ? (
                      <Button
                        type="text"
                        icon={<PlusOutlined className="text-blue-500" />}
                        className="bg-blue-50 rounded-lg flex items-center justify-center w-full h-8"
                        onClick={() => {
                          if (activeDayIndexes.length < 7) {
                            setActiveDayIndexes([
                              ...activeDayIndexes,
                              activeDayIndexes.length,
                            ]);
                          }
                        }}
                      />
                    ) : (
                      <Button
                        type="text"
                        icon={<CloseOutlined className="text-red-500" />}
                        className="bg-red-50 rounded-lg flex items-center justify-center w-full h-8"
                        onClick={() => {
                          setActiveDayIndexes(
                            activeDayIndexes.filter((_, i) => i !== listIdx),
                          );
                        }}
                      />
                    )}
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </Form>
      </section>
    </div>
  );
};

export default BusinessTab;
