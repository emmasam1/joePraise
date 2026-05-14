import React, { useState } from "react";
import { Switch } from "antd";

const NotificationSetting = () => {
  return (
    <div>
      <section className="border border-gray-200 p-6">
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#2A2A2A] mb-1">
            Order Notifications
          </h2>
          <p className="text-sm text-gray-500">
            Notifications will be sent to you to inform you of any updates and
            /or changesas events occur for your business. Select which
            notification you want to receive below.
          </p>
        </div>

        <div className="-space-y-1">
          <SecurityToggle
            title="Accepted"
            description="When you accepts customers orders"
            defaultChecked={true}
          />
          <SecurityToggle
            title="In Progress"
            description="When your customer orders are in progress"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Completed"
            description="When you completes customer oders"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Pending"
            description="When a customer order is waiting to be accepted"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Cancelled"
            description="When your customer cancel an orders"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Order Status Update"
            description="When the system update the status of customer orders"
            defaultChecked={true}
          />
        </div>
      </section>

      <section className="border border-gray-200 p-6 mt-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#2A2A2A]">Email Alerts</h2>
        </div>

        <div className="-space-y-1">
          <SecurityToggle
            title="Orders"
            description="When your customer make orders"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Order Status Update"
            description="When the system update the status of customer orders"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Payment"
            description="When payment is successful or failed, invoice is generated and payout is sent to business account."
            defaultChecked={true}
          />
          <SecurityToggle
            title="Customer Activity"
            description="When your customer sends a message, leaves reviews, customer inquiry or support request"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Business Operation"
            description="Subscription renewal alert"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Account & Security"
            description="When business login from a new device/location, password changed and account verification required"
            defaultChecked={true}
          />
        </div>
      </section>

      <section className="border border-gray-200 p-6 mt-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#2A2A2A]">Making Updates</h2>
        </div>

        <div className="-space-y-1">
          <SecurityToggle
            title="Promotions and  Offers"
            description="When your promotion is about to expire or expires"
            defaultChecked={true}
          />
          <SecurityToggle
            title="Brand & Social Mentions"
            description="When your business is mentioned on social media."
            defaultChecked={true}
          />
          <SecurityToggle
            title="Email and Messaging Campaign"
            description="When email campaign is sent successfully, email delivery failed."
            defaultChecked={true}
          />
          <SecurityToggle
            title="Audience & Engagement Insight"
            description="When customer engagements increases."
            defaultChecked={true}
          />
        </div>
      </section>
    </div>
  );
};

const SecurityToggle = ({ title, description, defaultChecked }) => (
  <div className="flex justify-between items-center py-8 border-b border-gray-100 last:border-0">
    <div className="space-y-1 pr-4">
      <h3 className="text-lg font-bold text-[#2A2A2A]">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-md">
        {description}
      </p>
    </div>
    <Switch
      defaultChecked={defaultChecked}
      className="bg-gray-200"
      style={{ backgroundColor: defaultChecked ? "#060853" : "#E5E7EB" }}
    />
  </div>
);

export default NotificationSetting;
