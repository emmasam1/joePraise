"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const CommissionPercentage = () => {
  const [editing, setEditing] = useState(false);

  return (
    <div className=" rounded-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-[#1D1D1F]">
          Commission Percentage
        </h2>

        <Button
          icon={<EditOutlined />}
          onClick={() => setEditing(!editing)}
          className="bg-[#EEF4FF]! border-none! text-[#060853]! font-semibold!"
        >
          Edit
        </Button>
      </div>

      {/* Body */}
      <div className="px-6 py-8">
        <Form layout="vertical">
          <Form.Item
            label={
              <span className="font-semibold text-[#1D1D1F]">
                Commission
              </span>
            }
          >
            <Input
              disabled={!editing}
              defaultValue="20%"
              className="h-11 max-w-md"
            />
          </Form.Item>

          <div className="flex justify-center mt-12">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              disabled={!editing}
              className="bg-[#060853]! border-none! px-12! h-11! rounded-md! font-semibold!"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CommissionPercentage;