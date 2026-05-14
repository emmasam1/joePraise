"use client";
import React, { useState } from "react";
import { Button, Upload, Form, Col, Row } from "antd";
import { FiX } from "react-icons/fi";
import CustomModal from "@/components/CustomModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const { Dragger } = Upload;
  const router = useRouter();

  // States for all four verification documents
  const [businessCert, setBusinessCert] = useState(null);
  const [businessLicense, setBusinessLicense] = useState(null);
  const [taxCertificate, setTaxCertificate] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (file, setPreview) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  const handleSubmit = () => {
    router.push("/dashboard");
  }

  const DraggerUI = ({ preview, setPreview, label }) => (
    <div className="relative w-full min-h-20 flex flex-col items-center justify-center py-2">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="preview"
            className="max-h-16 object-contain rounded"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg z-10"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-[10px] mb-1">
            Drag & drop your {label} here Max 2mb
          </p>
          <p className="text-gray-400 text-[9px] mb-1">OR</p>
          <Button
            size="small"
            className="text-[#15BE87]! border-[#15BE87]! text-[10px] h-6 px-4"
          >
            Browse files
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white text-black overflow-hidden font-sans">
      {/* LEFT CONTENT AREA */}
      <div className="w-full md:w-1/2 px-6 lg:px-20 py-8 flex flex-col justify-start h-full overflow-y-auto">
        <div className="mb-4">
          <img src="/images/logo.png" alt="logo" className="w-19" />
        </div>

        <h2 className="text-lg font-bold mb-1 text-[#1e293b]">
          Business Verification Submission
        </h2>
        <p className="text-gray-500 text-[13px] mb-6">
          To activate your account, please provide essential<br/> business
          registration documents for review.
        </p>

        <Form layout="vertical" className="w-full">
          <Row gutter={[16, 12]}>
            {/* 1. Business Registration Certificate */}
            <Col span={12}>
              <Form.Item
                label={
                  <span className="text-[10px] font-bold">
                    Business Registration Certificate
                  </span>
                }
                className="mb-2"
              >
                <Dragger
                  showUploadList={false}
                  beforeUpload={(file) => handlePreview(file, setBusinessCert)}
                  className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl"
                >
                  <DraggerUI
                    preview={businessCert}
                    setPreview={setBusinessCert}
                    label="Certificate"
                  />
                </Dragger>
              </Form.Item>
            </Col>

            {/* 2. Operational Business License */}
            <Col span={12}>
              <Form.Item
                label={
                  <span className="text-[10px] font-bold">
                    Business Licence (Optional)
                  </span>
                }
                className="mb-2"
              >
                <Dragger
                  showUploadList={false}
                  beforeUpload={(file) =>
                    handlePreview(file, setBusinessLicense)
                  }
                  className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl"
                >
                  <DraggerUI
                    preview={businessLicense}
                    setPreview={setBusinessLicense}
                    label="License"
                  />
                </Dragger>
              </Form.Item>
            </Col>

            {/* 3. Tax Identification Certificate */}
            <Col span={12}>
              <Form.Item
                label={
                  <span className="text-[10px] font-bold">Tax Certificate</span>
                }
                className="mb-2"
              >
                <Dragger
                  showUploadList={false}
                  beforeUpload={(file) =>
                    handlePreview(file, setTaxCertificate)
                  }
                  className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl"
                >
                  <DraggerUI
                    preview={taxCertificate}
                    setPreview={setTaxCertificate}
                    label="TIN"
                  />
                </Dragger>
              </Form.Item>
            </Col>

            {/* 4. Proof of Business Address */}
            <Col span={12}>
              <Form.Item
                label={
                  <span className="text-[10px] font-bold">
                    Proof of Address (Optional)
                  </span>
                }
                className="mb-2"
              >
                <Dragger
                  showUploadList={false}
                  beforeUpload={(file) =>
                    handlePreview(file, setProofOfAddress)
                  }
                  className="bg-[#f0fdfa]! border-[#15BE87]! border-dashed rounded-xl"
                >
                  <DraggerUI
                    preview={proofOfAddress}
                    setPreview={setProofOfAddress}
                    label="Address"
                  />
                </Dragger>
              </Form.Item>
            </Col>

            {/* Submit Button */}
            <div className="mt-4 w-full flex items-center justify-center">
              <Button
                type="primary"
                className="p-5! bg-[#060853]! border-none text-xs font-bold rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Submit Verification
              </Button>
            </div>
          </Row>
        </Form>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div className="hidden md:block md:w-1/2 relative h-full bg-[url('/images/image_1.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-900/20" />
      </div>

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="max-w-lg" >
        <div className="flex flex-col justify-center items-center mb-5">
            <div className="rounded-full h-25 w-25 bg-[#EDF4FD] mb-5 flex justify-center items-center">
                <img src="/images/mail.png" alt="mail" className="h-20" />
            </div>
          <h2 className="font-bold text-2xl">Verification Pending</h2>
          <p className="text-[#6A7282] text-center mt-4">
            Your business verification is under review.
            <br />
            You will receive an email once approval is completed.
          </p>

          <Button onClick={handleSubmit} className="text-white! p-5! text-lg mt-5 bg-[#060853]! rounded-lg border-none">Go To Dashboard</Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Page;
