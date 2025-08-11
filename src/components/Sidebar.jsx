import {
  BarChart3,
  FileText,
  FolderOpen,
  Users,
  HelpCircle,
  Monitor,
  Bell,
  Settings,
  Tag,
  Archive,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activeItem = "Invoices";


const topItems = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: FileText, label: "Invoices" },
  { icon: FolderOpen, label: "Documents" },
  { icon: Users, label: "Team" },
  { icon: HelpCircle, label: "Help" },
  { icon: Monitor, label: "Support" },
  { icon: Tag, label: "Tags" },
  { icon: Archive, label: "Archive" },
];


const footerItems = [
  { icon: Bell, label: "Notifications" },
  { icon: Info, label: "Info" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-16 h-screen bg-[#f4f0fb] border-r border-border items-center py-4">

      <div className="w-10 h-10 rounded-lg bg-[#9333ea] flex items-center justify-center mb-6">
        <div className="w-5 h-5 rounded-[4px] bg-white"></div>
      </div>

  
      <div className="flex-1 flex flex-col items-center gap-0.6">
        {topItems.map((item, index) => {
          const isActive = item.label === activeItem;
          return (
            <button
              key={index}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-white text-[#6366f1] shadow-sm"
                  : "text-[#64748b] hover:text-[#0f172a] hover:bg-gray-100"
              )}
              title={item.label}
            >
              <item.icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>


      <div className="flex flex-col items-center gap-0.6 mb-3">
        {footerItems.map((item, index) => (
          <button
            key={index}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#64748b] hover:text-[#0f172a] hover:bg-gray-100 transition-colors"
            title={item.label}
          >
            <item.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="mb-2">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:ring-2 hover:ring-ring cursor-pointer overflow-hidden">
          <img
            src="https://ui.shadcn.com/avatars/01.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
};
