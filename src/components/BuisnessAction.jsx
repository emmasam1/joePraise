"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Carousel, Form, Input, Select, message } from "antd";
import {
  Check,
  Copy,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import CustomModal from "./CustomModal";
import Image from "next/image";

const { TextArea } = Input;

export default function BusinessActions({
  businessId,
  customerEmail = "",
  businessName = "Aurora Design Studio",
}) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form] = Form.useForm();
  

  const businessUrl =
    typeof window !== "undefined" ? window.location.href : "";

  //  const businessUrl =
  //   typeof window !== "undefined"
  //     ? `${window.location.origin}${canonicalUrl}`
  //     : "";


  const closeMessageModal = () => {
    form.resetFields();
    setIsMessageOpen(false);
  };

  const closeShareModal = () => {
    setCopied(false);
    setIsShareOpen(false);
  };

  const copyBusinessLink = async () => {
    try {
      await navigator.clipboard.writeText(businessUrl);
      setCopied(true);
      message.success("Business link copied");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      message.error("Could not copy the business link");
    }
  };

  const handleSendMessage = async (values) => {
    setSending(true);

    try {
      const payload = {
        businessId,
        customerEmail: values.customerEmail,
        subject: values.subject,
        message: values.message,
      };

      // Replace this block with your API request:
      //
      // const response = await fetch("/api/messages", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      //
      // if (!response.ok) throw new Error("Unable to send message");

      console.log("Message payload:", payload);

      message.success("Message sent successfully");
      closeMessageModal();
    } catch (error) {
      message.error("Unable to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setIsShareOpen(true)}
          className="inline-flex items-center gap-2 rounded bg-[#10105e] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0b084d]"
        >
          <Share2 size={17} />
          Share Business
        </button>

        <button
          onClick={() => setIsMessageOpen(true)}
          className="inline-flex items-center gap-2 rounded border border-[#10105e] px-4 py-3 text-sm font-medium text-[#10105e] transition hover:bg-[#10105e] hover:text-white"
        >
          <MessageCircle size={17} />
          Message
        </button>
      </div>

      {/* Share Business Modal */}
      <CustomModal
        isOpen={isShareOpen}
        onClose={closeShareModal}
        title={null}
        size="max-w-xl"
      >
        <div className="px-2 py-8 text-center sm:px-8">
          <div className="mx-auto flex h-28 w-28 items-center justify-center">
            <Image src="/images/amico.png" alt="share" width={200} height={200}/>
          </div>

          <h2 className="mt-7 text-2xl font-bold text-zinc-800 sm:text-3xl">
            Share This Business!
          </h2>

          <p className="mt-5 text-sm text-zinc-700 sm:text-base">
            Tell your friends about{" "}
            <span className="font-semibold">{businessName}</span>!
          </p>

          <div className="mt-7 flex flex-col gap-3 rounded-md bg-zinc-100 p-2 sm:flex-row sm:items-center sm:justify-between sm:pl-4">
            <p className="truncate text-left text-sm text-zinc-600">
              {businessUrl}
            </p>

            <Button
              onClick={copyBusinessLink}
              className="h-10 min-w-[145px] border-0 bg-white font-medium text-zinc-800 shadow-none hover:!bg-zinc-50"
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  Copied
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Copy size={16} />
                  Copy Link
                </span>
              )}
            </Button>
          </div>

          <Button
            onClick={closeShareModal}
            className="mt-7 h-[42px] min-w-[120px] bg-[#870A0A]! font-semibold text-white! shadow-none hover:!border-[#680808] hover:!bg-[#680808]"
          >
            Close
          </Button>
        </div>
      </CustomModal>

      {/* Message Modal */}
      <CustomModal
        isOpen={isMessageOpen}
        onClose={closeMessageModal}
        size="max-w-xl"
        title={
          <div className="pr-8">
            <p className="text-[28px] font-bold leading-tight text-zinc-800 sm:text-4xl">
              Compose Your Message
            </p>
            <p className="mt-4 text-sm font-normal text-zinc-700 sm:text-base">
              Fill in the details below to send a message to your customer
            </p>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{ customerEmail }}
          onFinish={handleSendMessage}
          className="px-1 pt-3"
        >
          <Form.Item
            label={
              <span className="text-base font-semibold text-zinc-900">
                Customer Email
              </span>
            }
            name="customerEmail"
            rules={[
              { required: true, message: "Customer email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
            className="mb-8"
          >
            <Input
              size="large"
              placeholder="example@gmail.com"
              className="h-[40px] rounded-md border-zinc-300 px-5 text-base shadow-none placeholder:text-zinc-300"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-base font-semibold text-zinc-900">
                Subject
              </span>
            }
            name="subject"
            rules={[{ required: true, message: "Subject is required" }]}
            className="mb-8"
          >
            <Input
              size="large"
              placeholder="What is the message all about"
              className="h-[40px] rounded-md border-zinc-300 px-5 text-base shadow-none placeholder:text-zinc-300"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-base font-semibold text-zinc-900">
                Your Message
              </span>
            }
            name="message"
            rules={[
              { required: true, message: "Message is required" },
              { max: 1000, message: "Maximum message length is 1000" },
            ]}
            className="mb-8"
          >
            <TextArea
              maxLength={1000}
              showCount
              placeholder="Type your message here"
              className="min-h-[200px] resize-none! rounded-md border-zinc-300 p-5 text-base shadow-none placeholder:text-zinc-300"
            />
          </Form.Item>

          <div className="flex flex-col-reverse justify-end gap-4 border-t border-zinc-100 pt-6 sm:flex-row">
            <Button
              htmlType="button"
              onClick={closeMessageModal}
              size="large"
              className="h-[54px] min-w-[208px] border-[#10105e] font-semibold text-zinc-800 shadow-none"
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={sending}
              size="large"
              className="h-[54px] min-w-[208px] border-[#10105e] bg-[#10105e] font-semibold text-white shadow-none hover:!border-[#0b084d] hover:!bg-[#0b084d]"
            >
              <span className="flex items-center gap-2">
                <Send size={16} />
                Send Message
              </span>
            </Button>
          </div>
        </Form>
      </CustomModal>
    </>
  );
}