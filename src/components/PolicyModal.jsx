"use client";

import { Modal } from "antd";

export default function PolicyModal({ policy, onClose }) {
  const embeddedHref = policy ? `/policy-modal${policy.href}` : "";

  return (
    <Modal
      title={policy?.title || "Platform Policy"}
      open={Boolean(policy)}
      onCancel={onClose}
      footer={null}
      width={960}
      centered
      destroyOnHidden
      styles={{ body: { padding: 0 } }}
    >
      {policy && (
        <iframe
          key={policy.href}
          src={embeddedHref}
          title={policy.title}
          className="h-[75vh] w-full rounded-b-lg border-0"
        />
      )}
    </Modal>
  );
}
