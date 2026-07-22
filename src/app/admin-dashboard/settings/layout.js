'use client';
import React from 'react';
import { Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { 
  PercentageOutlined, 
  DollarCircleOutlined, 
  AppstoreOutlined, 
  BellOutlined,
  DeleteOutlined 
} from '@ant-design/icons';

export default function SettingsLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Complete menu configuration mapping to the items on your Figma screen
  const menuItems = [
    {
      key: '/admin-dashboard/settings/commission',
      icon: <PercentageOutlined />,
      label: 'Commission Percentage',
    },
    // {
    //   key: '/admin-dashboard/settings/pricing',
    //   icon: <DollarCircleOutlined />,
    //   label: 'Subscription Pricing',
    // },
    {
      key: '/admin-dashboard/settings/categories',
      icon: <AppstoreOutlined />,
      label: 'Category Management',
    },
    {
      key: '/admin-dashboard/settings/notification',
      icon: <BellOutlined />,
      label: 'Notification',
    },
    {
      type: 'divider',
    },
    {
      key: '/settings/delete-account',
      icon: <DeleteOutlined className="text-red-500" />,
      label: <span className="text-red-500 hover:text-red-600">Delete Account</span>,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Settings Module Outer Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500">Configure platform rules</p>
      </div>

      {/* Desktop Layout Container: Flexbox row on large viewports */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full max-w-7xl mx-auto">
        
        {/* Fixed Desktop Side Nav Panel */}
        <aside className="w-full lg:w-72  rounded-lg border border-gray-200 lg:sticky lg:top-6 shrink-0 overflow-hidden">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            onClick={({ key }) => router.push(key)}
            items={menuItems}
            className="border-none py-3 px-2 ant-menu-layout-override"
          />
        </aside>

        {/* Dynamic Display Inner Form Pane */}
        <main className="flex-1 w-full min-h-137.5">
          {children}
        </main>

      </div>
    </div>
  );
}