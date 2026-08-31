"use client";
import React, { useState } from "react";
import { Button, Modal, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/store/authStore";
import CustomModal from "@/components/CustomModal";

const ToggleRow = ({ title, description, checked, onChange }) => (
  <div className="flex items-center justify-between gap-4">
    <div><h4 className="text-sm font-bold text-gray-900 sm:text-base">{title}</h4><p className="mt-1 text-xs text-gray-500">{description}</p></div>
    <Switch checked={checked} onChange={onChange} />
  </div>
);

const SecurityRow = ({ title, description, children }) => (
  <div className="flex flex-col gap-4 border-b border-gray-200 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
    <div><h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3><p className="mt-1 text-xs text-gray-500 sm:text-sm">{description}</p></div>
    <div className="self-end sm:self-auto">{children}</div>
  </div>
);

const Device = ({ name, onRemove }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState(true);
  return <div className="border-b border-gray-200 p-5 last:border-0 sm:p-8">
    <div className="flex items-start justify-between gap-4"><div><h3 className="text-base font-bold text-gray-900 sm:text-lg">{name}</h3><p className="mt-1 text-xs text-gray-500">Last accessed on 26 March, 2026</p></div><Button onClick={onRemove} className="h-9! border-[#060853]! px-3! text-xs! text-[#060853]!">Remove Device</Button></div>
    <div className="mt-5 space-y-5"><ToggleRow title="Get New Notification" description="Enable to receive the latest alert and locations" checked={notifications} onChange={setNotifications} /><ToggleRow title="Auto Logout Inactive Sessions" description="Logout inactive session automatically after a set of time" checked={autoLogout} onChange={setAutoLogout} /></div>
  </div>;
};

const SecurityPage = () => {
  const user = useAuthStore((state) => state.user);
  const [twoFactor, setTwoFactor] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const confirm = (title, content) => Modal.confirm({ title, content, okText: "Continue", cancelText: "Cancel" });
  return <div className="space-y-6 text-gray-900">
    <section className="rounded-lg border border-gray-200 px-4 sm:px-5">
      <SecurityRow title="Email Address" description="The email address associated with your account"><div className="flex items-center gap-3"><div className="text-right"><p className="max-w-[190px] truncate text-xs font-semibold sm:text-sm">{user?.email || "Not available"}</p><p className="text-xs font-semibold text-red-500">Unverified</p></div><Button icon={<EditOutlined />} className="h-9! border-none! bg-[#E0E7FF]! px-3! text-xs! text-[#060853]!">Edit</Button></div></SecurityRow>
      <SecurityRow title="Password" description="Set a unique password to protect your account"><Button className="h-9! border-[#060853]! px-3! text-xs! text-[#060853]!">Change Password</Button></SecurityRow>
      <SecurityRow title="Enable 2 factor Authentication" description="Make your account extra secure, along with your password, you will need to enter a code"><Switch checked={twoFactor} onChange={setTwoFactor} /></SecurityRow>
    </section>
    <section className="rounded-lg border border-gray-200"><Device name="Laptop" onRemove={() => Modal.info({ title: "Current device", content: "This device cannot be removed." })} /><Device name="Phone" onRemove={() => confirm("Remove device?", "You will need to sign in again on this device.")} /></section>
    <section className="rounded-lg border border-gray-200 px-4 sm:px-5"><SecurityRow title="Deactivate Account" description="This will shut down your account, your account will reactivate when you sign in again."><Button onClick={() => confirm("Deactivate account?", "Your account will be temporarily deactivated.")} className="h-9! border-[#060853]! px-4! text-xs! text-[#060853]!">Deactivate</Button></SecurityRow><SecurityRow title="Delete Account" description="This will delete your account, your account will be permanently deleted from the platform"><Button danger onClick={() => setDeleteOpen(true)} className="h-9! px-4! text-xs!">Delete</Button></SecurityRow></section>
    <CustomModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} size="max-w-xl">
      <div className="flex flex-col items-center px-5 py-8 text-center sm:px-10">
        <div className="flex h-24 w-24 items-center justify-center">
          <img src="/images/delete-icon-big.png" alt="Delete account" className="h-16 w-16 object-contain" />
        </div>
        <h2 className="mt-8 text-2xl font-bold text-black">Delete Account</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">Are you sure you want to delete this account?<br />This action cannot be undone</p>
        <div className="mt-7 flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-between">
          <Button onClick={() => setDeleteOpen(false)} className="h-10! flex-1 border-[#F5A623]! text-[#F5A623]!">ⓧ Cancel</Button>
          <Button danger onClick={() => setDeleteOpen(false)} className="h-10! flex-1 bg-[#990B0B]! text-white!">Delete</Button>
        </div>
      </div>
    </CustomModal>
  </div>;
};
export default SecurityPage;
