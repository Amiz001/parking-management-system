import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationSettingsPage = () => {
  const [notify, setNotify] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Bell className="text-yellow-400" /> Notification Preferences
      </h2>

      {Object.keys(notify).map((key) => (
        <div
          key={key}
          className="bg-[#1b1f2a] p-5 rounded-lg flex justify-between items-center hover:bg-[#242938]"
        >
          <span className="capitalize">{key} Notifications</span>
          <input
            type="checkbox"
            checked={notify[key]}
            onChange={() => setNotify({ ...notify, [key]: !notify[key] })}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationSettingsPage;
