import React from 'react';

const AccountActivity = () => {
  const activities = [
    {
      id: 1,
      event: "Logged in",
      details: "Successful login from Chrome on Windows",
      date: "May 02, 2026",
      time: "09:13 PM",
    },
    {
      id: 2,
      event: "Profile Updated",
      details: "Changed contact phone number and residential address",
      date: "April 28, 2026",
      time: "02:45 PM",
    },
    {
      id: 3,
      event: "Password Changed",
      details: "Security credential update initiated by user",
      date: "April 15, 2026",
      time: "10:20 AM",
    },
    {
      id: 4,
      event: "Role Assigned",
      details: "Assigned to 'Doctor' queue by Administrator",
      date: "April 10, 2026",
      time: "08:00 AM",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Account Activity</h2>

      <div className="relative space-y-8 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">

        {activities.map((item) => (
          <div key={item.id} className="relative pl-8">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  {item.event}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  {item.details}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  {item.date}
                </p>
                <p className="text-[9px] text-gray-300 font-medium mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="mt-4 border-b border-gray-50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountActivity;