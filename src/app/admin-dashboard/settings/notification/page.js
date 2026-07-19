"use client";

import { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Switch,
} from "antd";

const { TextArea } = Input;

const PlatformAnnouncements = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">
          Notifications
        </h2>

        {!showForm && (
          <Button
            type="primary"
            className="bg-[#060853] border-none px-8 h-10"
            onClick={() => setShowForm(true)}
          >
            Create Notification
          </Button>
        )}
      </div>

      {/* ========================= */}
      {/* EMPTY STATE */}
      {/* ========================= */}

      {!showForm ? (
        <div className="border border-gray-100 rounded-xl min-h-[650px] flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 mb-16">
            Manage platform announcements, updates and promotions.
          </p>

          <img
            src="/images/rafiki.png"
            alt=""
            className="w-56 mb-8"
          />

          <h2 className="text-2xl font-bold text-black">
            No Notifications Yet
          </h2>

          <p className="text-gray-500 mt-3 max-w-md">
            Create your first announcement to notify users about
            updates, promotions or important platform information.
          </p>

          <Button
            type="primary"
            className="bg-[#060853] border-none mt-10 px-10 h-11"
            onClick={() => setShowForm(true)}
          >
            Create Notification
          </Button>
        </div>
      ) : (
        /* ========================= */
        /* NOTIFICATION FORM */
        /* ========================= */

        <div className="rounded-xl border border-gray-100 p-6">
          <p className="font-semibold text-black mb-6">
            Notification Form
          </p>

          <Form layout="vertical">
            <Form.Item
              label={
                <span className="font-semibold text-black">
                  Title
                </span>
              }
            >
              <Input
                placeholder="Enter announcement title"
                className="h-11 bg-[#F7F7F7]"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-black">
                  Message
                </span>
              }
            >
              <TextArea
                rows={5}
                placeholder="Write your message"
                className="bg-[#F7F7F7]"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-black">
                  Scheduled For
                </span>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  className="w-full h-11"
                  placeholder="Select Date"
                />

                <DatePicker
                  picker="time"
                  format="hh:mm A"
                  use12Hours
                  className="w-full h-11"
                  placeholder="Select Time"
                />
              </div>
            </Form.Item>

            {/* Email */}

            <div className="border border-gray-100 rounded-xl p-5 mb-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    Email Alerts
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Notify users through their registered
                    email addresses.
                  </p>
                </div>

                <Switch defaultChecked />
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between">
                  <span>All Users</span>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between">
                  <span>Business Only</span>
                  <Switch />
                </div>

                <div className="flex justify-between">
                  <span>Customers Only</span>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Push */}

            <div className="border border-gray-100 rounded-xl p-5">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    Push Notifications
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Send notifications directly to users'
                    mobile devices.
                  </p>
                </div>

                <Switch defaultChecked />
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between">
                  <span>All Users</span>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between">
                  <span>Business Only</span>
                  <Switch />
                </div>

                <div className="flex justify-between">
                  <span>Customers Only</span>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-10">
              <Button
                size="large"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>

              <div className="flex gap-3">
                <Button size="large">
                  Save as Draft
                </Button>

                <Button
                  type="primary"
                  size="large"
                  className="bg-[#060853] border-none"
                >
                  Send Now
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PlatformAnnouncements;