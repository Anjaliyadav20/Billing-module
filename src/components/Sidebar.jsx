import { cn } from "@/lib/utils";
import Logo from "./assets/Logo.svg";
import Frame from "./assets/Frame.svg";
import Framee from "./assets/Frame-1.svg";
import Group from "./assets/Group.svg";
import Group1 from "./assets/Group-1.svg";
import Group2 from "./assets/Group-2.svg";
import Group3 from "./assets/Group-3.svg"; 
import Group4 from "./assets/Group-4.svg";
import Group5 from "./assets/Group5.svg";
import Bell from "./assets/Bell.svg";
import Quesmark from "./assets/quesmark.svg";
import Replay from "./assets/replay.svg";
import Settings from "./assets/settings.svg";
import Avatar from "./assets/Avatar.svg"

const activeItem = "Tags";

const topItems = [
  { icon: Frame, label: "Invoices" },
  { icon: Group, label: "Documents" },
  { icon: Framee, label: "Team" },
  { icon: Group1, label: "Help" },
  { icon: Group2, label: "Support" },
  { icon: Group3, label: "Tags" },
  { icon: Group4, label: "Archive" },
  { icon: Group5, label: "Dashboard" },
];

const footerItems = [
  { icon: Bell, label: "Notifications" },
  { icon: Quesmark, label: "Help" },
  { icon: Replay, label: "Replay" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-16 h-screen bg-[#f4f0fb] border-r border-border items-center py-4 justify-between">
      <div className="flex flex-col items-center gap-1">
        

        {topItems.map((item, index) => {
          const isActive = item.label === activeItem;
          return (
            <button
              key={index}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-white shadow-md"
                  : "hover:bg-gray-100"
              )}
              title={item.label}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 object-contain"
              />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1 mb-3">
          {footerItems.map((item, index) => (
            <button
              key={index}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              title={item.label}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 object-contain"
              />
            </button>
          ))}
        </div>

        <div className="mb-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:ring-2 hover:ring-ring cursor-pointer overflow-hidden">
            <img
              src={Avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
