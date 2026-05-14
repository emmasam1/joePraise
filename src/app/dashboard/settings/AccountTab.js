"use client";
import React, { useState, useEffect } from 'react';
import { RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import ChangePassword from './ChangePassword';
import UpdateEmail from './UpdateEmail';
import LoginOption from './LoginOption';

const AccountTab = ({ setHeaderTitle }) => {
  const [view, setView] = useState('menu');

useEffect(() => {
    if (view === 'menu') setHeaderTitle('Account Settings');
    if (view === 'password') setHeaderTitle('Change Password');
    if (view === 'email') setHeaderTitle('Update Email');
    if (view === 'login') setHeaderTitle('Manage Login Options');
  }, [view, setHeaderTitle]);

  // Helper to render the correct component
  const renderContent = () => {
    switch (view) {
      case 'password':
        return <ChangePassword/>;
      case 'email':
        return <UpdateEmail />;
      case 'login':
        return <LoginOption />;
      default:
        return (
          <div className="space-y-2 animate-in fade-in duration-500">
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Manage your personal informations and loging details
            </p>
            
            <div className="flex flex-col gap-4">
              <MenuOption 
                title="Change password" 
                onClick={() => setView('password')} 
              />
              <MenuOption 
                title="Update Email" 
                onClick={() => setView('email')} 
              />
              <MenuOption 
                title="Manage Login Options" 
                onClick={() => setView('login')} 
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Show back button if not on the main menu */}
      {view !== 'menu' && (
        <button 
          onClick={() => setView('menu')}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-[#060853] hover:underline"
        >
          <ArrowLeftOutlined /> Back to Account
        </button>
      )}
      
      {renderContent()}
    </div>
  );
};

// Reusable Menu Row Component
const MenuOption = ({ title, onClick }) => (
  <div 
    onClick={onClick}
    className="flex justify-between items-center py-4 cursor-pointer border-b border-gray-50 group hover:px-2 transition-all"
  >
    <h2 className="text-lg text-[#2A2A2A] group-hover:text-[#060853]">
      {title}
    </h2>
    <RightOutlined className="text-2xl text-[#2A2A2A] font-light" />
  </div>
);

export default AccountTab;