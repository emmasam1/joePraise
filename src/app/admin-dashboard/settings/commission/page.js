// "use client";

// import { useState } from "react";
// import { Button, Form, Input } from "antd";
// import { EditOutlined, SaveOutlined } from "@ant-design/icons";

// const CommissionPercentage = () => {
//   const [editing, setEditing] = useState(false);

//   return (
//     <div className=" rounded-xl border border-gray-100 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//         <h2 className="text-lg font-bold text-[#1D1D1F]">
//           Commission Percentage
//         </h2>

//         <Button
//           icon={<EditOutlined />}
//           onClick={() => setEditing(!editing)}
//           className="bg-[#EEF4FF]! border-none! text-[#060853]! font-semibold!"
//         >
//           Edit
//         </Button>
//       </div>

//       {/* Body */}
//       <div className="px-6 py-8">
//         <Form layout="vertical">
//           <Form.Item
//             label={
//               <span className="font-semibold text-[#1D1D1F]">
//                 Commission
//               </span>
//             }
//           >
//             <Input
//               disabled={!editing}
//               defaultValue="20%"
//               className="h-11 max-w-md"
//             />
//           </Form.Item>

//           <div className="flex justify-center mt-12">
//             <Button
//               type="primary"
//               icon={<SaveOutlined />}
//               disabled={!editing}
//               className="bg-[#060853]! border-none! px-12! h-11! rounded-md! font-semibold!"
//             >
//               Save
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CommissionPercentage;

"use client";

import { useState, useEffect } from "react";
import { Button, Form, InputNumber, Skeleton, message } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  ShoppingOutlined,
  CloudDownloadOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { usePlatformSettingsStore } from "@/store/platformSettingsStore";

const RATE_FIELDS = [
  {
    key: "physical_product",
    label: "Physical Products",
    description: "Commission taken from every physical product sale.",
    icon: <ShoppingOutlined />,
  },
  {
    key: "digital_product",
    label: "Digital Products",
    description: "Commission taken from every digital product sale.",
    icon: <CloudDownloadOutlined />,
  },
  {
    key: "service",
    label: "Services",
    description: "Commission taken from every completed service booking.",
    icon: <ToolOutlined />,
  },
];

const CommissionCard = ({ field, value, onSave, saving }) => {
  const [editing, setEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  const handleEdit = () => {
    setDraftValue(value);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraftValue(value);
    setEditing(false);
  };

  const handleSave = async () => {
    if (draftValue === null || draftValue === undefined || draftValue < 0 || draftValue > 100) {
      message.error("Commission rate must be between 0 and 100.");
      return;
    }

    try {
      await onSave(field.key, draftValue);
      setEditing(false);
    } catch {
      // error already surfaced via message in the store
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#060853]">
            {field.icon}
          </div>
          <div>
            <h3 className="font-bold text-[#1D1D1F] text-sm">{field.label}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{field.description}</p>
          </div>
        </div>

        {!editing ? (
          <Button
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="bg-[#EEF4FF]! border-none! text-[#060853]! font-semibold!"
          >
            Edit
          </Button>
        ) : (
          <Button
            icon={<CloseOutlined />}
            onClick={handleCancel}
            disabled={saving}
            className="border-none! text-gray-400! font-semibold!"
          >
            Cancel
          </Button>
        )}
      </div>

      <div className="px-6 py-6">
        <InputNumber
          disabled={!editing}
          value={draftValue}
          onChange={(val) => setDraftValue(val)}
          min={0}
          max={100}
          precision={1}
          suffix="%"
          addonAfter="%"
          className="h-11! w-full max-w-xs"
        />

        {editing && (
          <div className="flex justify-start mt-6">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving}
              onClick={handleSave}
              className="bg-[#060853]! border-none! px-10! h-10! rounded-md! font-semibold!"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const CommissionPercentage = () => {
  const {
    commissionRates,
    commissionLoading,
    commissionSaving,
    lastUpdatedAt,
    fetchCommissionRates,
    updateCommissionRates,
  } = usePlatformSettingsStore();

  useEffect(() => {
    fetchCommissionRates();
  }, []);

  const handleSaveField = async (fieldKey, newValue) => {
    await updateCommissionRates({ [fieldKey]: newValue });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D1D1F]">Commission Percentage</h2>
          <p className="text-xs text-gray-400 mt-1">
            Set the platform's commission rate per listing type.
          </p>
        </div>

        {lastUpdatedAt && !commissionLoading && (
          <p className="text-xs text-gray-400">
            Last updated {new Date(lastUpdatedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {commissionLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-6">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {RATE_FIELDS.map((field) => (
            <CommissionCard
              key={field.key}
              field={field}
              value={commissionRates?.[field.key] ?? 0}
              onSave={handleSaveField}
              saving={commissionSaving}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommissionPercentage;