"use client";

import React, { use, useState } from "react"; // Added useState
import { useRouter } from "next/navigation";
import { Button, Modal, Input } from "antd"; // Added Modal
import { 
  ArrowLeftOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  CloseOutlined // Added for a modern close button
} from "@ant-design/icons";
import CustomModal from "@/components/CustomModal";

const { TextArea } = Input

const Page = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  
  // State for PDF preview
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activePdf, setActivePdf] = useState({ title: "", url: "" });
  const [isOpen, setIsOpen] = useState(false)

  const businessData = {
    name: "Perlson Marvin",
    company: "Wafas Limited Plc",
    email: "oramafelix!gmail.com",
    phone: "+1 34699976830",
    address: "No. 34 wakali Street Ikeja, Lagos.",
    type: "IT Consulting & Services",
    status: "Pending"
  };

  const documents = [
    { id: 1, title: "Business License", fileName: "License_biekitchen.pdf", size: "1.5 MB", url: "/pdfs/license.pdf" },
    { id: 2, title: "Tax Certificate", fileName: "Tax_biekitchen.pdf", size: "2 MB", url: "/pdfs/tax.pdf" },
    { id: 3, title: "ID Proof (Owner)", fileName: "biebele_id.pdf", size: "2 MB", url: "/pdfs/id_proof.pdf" },
    { id: 4, title: "Business Registration", fileName: "business_reg.pdf", size: "2 MB", url: "/pdfs/registration.pdf" },
  ];

  const handlePreview = (doc) => {
    setActivePdf({ title: doc.title, url: doc.url });
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-white p-8 md:p-12">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:opacity-70 transition-opacity"
          >
            <ArrowLeftOutlined className="text-sm" /> Verification Center
          </button>
          <span className="text-[#4A4A4A] text-normal ml-6">{businessData?.company}</span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#FEF8F4] px-3 py-1">
          <img src="/images/gridicons_time.png" className="w-4" alt="time" />
          <span className="text-[#DE4E06] text-xs font-bold uppercase">{businessData.status}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* CONTACT DETAILS SECTION */}
        <section>
          <h2 className="text-xl font-bold text-black mb-8">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-4">
              <img src="/images/perls-marvin.png" className="w-14 h-14 rounded-full object-cover bg-gray-100" alt="Profile" />
              <div>
                <p className="font-bold text-gray-900 text-[16px]">{businessData.name}</p>
                <p className="text-sm text-gray-400">{businessData.company}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Business Address</p>
                <p className="font-bold text-gray-900 text-[14px]">{businessData.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Business Type</p>
                <p className="font-bold text-gray-900 text-[14px]">{businessData.type}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ECFDF5] text-[#10B981] flex items-center justify-center rounded-lg">
                  <PhoneOutlined rotate={90} className="text-lg" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[14px]">{businessData.phone}</p>
                  <p className="text-xs text-gray-400">Phone Number</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ECFDF5] text-[#10B981] flex items-center justify-center rounded-lg">
                  <MailOutlined className="text-lg" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[14px]">{businessData.email}</p>
                  <p className="text-xs text-gray-400">Mail Address</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS UPLOADED SECTION */}
        <section>
          <h2 className="text-xl font-bold text-black mb-8">Documents Uploaded</h2>
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded">
                    <img src="/images/file.png" className="w-4"/>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{doc.title}</p>
                    <p className="text-xs text-[#2A2A2A]">{doc.fileName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12 text-right">
                  <span className="text-xs text-[#2A2A2A] font-medium">{doc.size}</span>
                  <div className="flex flex-col items-end">
                    {/* View Button Triggers Modal */}
                    <button 
                      onClick={() => handlePreview(doc)}
                      className="text-[#060853] text-xs font-bold hover:underline"
                    >
                      View
                    </button>
                    <span className="text-[10px] text-[#2A2A2A]">Uploaded 2 hours ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEEDBACK ALERT BOX */}
        <div className="bg-[#FEFAEF] rounded-lg p-6 border border-[#FEF3C7] flex items-start gap-4">
          <img src="/images/warning.png" className="mt-1 w-5" />
          <div>
            <p className="font-bold text-gray-900 text-sm">
              Needing further verification: <span className="font-normal text-gray-500">Additional documents required.</span>
            </p>
            <p className="text-gray-500 text-[13px] mt-1">
              Please upload a clearer copy of your business license. Business name is not clearly visible in the licensing area.
            </p>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end pt-8">
          <Button onClick={()=> setIsOpen(true)} className="h-10 px-8 border-[#060853]! text-[#060853]! font-bold rounded-md bg-transparent!">
            Send a message
          </Button>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      <Modal
        title={<span className="font-bold">{activePdf.title}</span>}
        centered
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width={1000}
        closeIcon={<CloseOutlined className="text-black" />}
        bodyStyle={{ height: '80vh', padding: 0 }}
      >
        <iframe
          src={`${activePdf.url}#toolbar=0`} // #toolbar=0 hides the browser's PDF tools for a cleaner look
          width="100%"
          height="100%"
          className="rounded-b-lg border-none"
          title="PDF Preview"
        />
      </Modal>

      <CustomModal 
      isOpen={isOpen}
      onClose={()=> setIsOpen(false)}
      size="max-w-md"
      >
        <h1 className="text-black mb-3 font-bold">Send message to Owner</h1>
        <TextArea rows={8} placeholder="Write a message" className="resize-none!"/>
        <div className="mt-4 flex justify-end">
            <Button className="bg-[#060853]! text-white! border-none! ">Send Message</Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Page;