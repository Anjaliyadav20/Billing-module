import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom"; 
import Frame from "./assets/Frame.svg";
import Framee from "./assets/Frame-1.svg";
import Group from "./assets/Group.svg";
import Group1 from "./assets/Group-1.svg";
import Group2 from "./assets/Group-2.svg";
import Group3 from "./assets/Group-3.svg";
import Contact from "./assets/Group-4.svg";
import Group5 from "./assets/Group5.svg";
import Bell from "./assets/Bell.svg";
import Quesmark from "./assets/quesmark.svg";
import Replay from "./assets/replay.svg";
import Settings from "./assets/settings.svg";
import Avatar from "./assets/Avatar.svg";
import Union from "./assets/Union.svg";

const activeItem = "Tags";

const highlightByIndex = 1;

const topItems = [

  { icon: Union, label: "Invoices", path: "/" },

  { icon: Frame, label: "Invoices 2", path: "/invoices2" },

  { icon: Group, label: "Documents", path: "/documents" },

  { icon: Framee, label: "Team", path: "/team" },

  { icon: Group1, label: "Help", path: "/help" },

  { icon: Group2, label: "Support", path: "/support" },

  { icon: Group3, label: "Tags", path: "/tags" },

  { icon: Contact, label: "Contact", path: "/contacts" }, 

  { icon: Group5, label: "Dashboard", path: "/dashboard" },

];

const footerItems = [

  { icon: Bell, label: "Notifications" },

  { icon: Quesmark, label: "Help (Footer)" },

  { icon: Replay, label: "Replay" },

  { icon: Settings, label: "Settings" },

];

export const Sidebar = () => {

  const navigate = useNavigate(); // ✅ navigation hook

  const blueFilter =

    "invert(33%) sepia(82%) saturate(3170%) hue-rotate(213deg) brightness(96%) contrast(96%)";

  const initialActive = useMemo(() => {

    const byIndex = topItems[highlightByIndex]?.label;

    if (byIndex) return byIndex;

    const byName = topItems.find((t) => t.label === activeItem)?.label;

    return byName || topItems[0].label;

  }, []);

  const [active, setActive] = useState(initialActive);

  const handleActivate = (label, path) => {

    setActive(label);

    if (path) {

      navigate(path); // ✅ go to page

    }

  };

  return (
    <aside className="flex flex-col w-16 h-screen bg-[#F1F3FD] items-center py-4 justify-between">
      <div className="flex flex-col items-center gap-2">

        {topItems.map((item) => {

          const isActive = item.label === active;

          return (
            <button

              key={item.label}

              type="button"

              onClick={() => handleActivate(item.label, item.path)} // ✅ pass path

              onKeyDown={(e) => {

                if (e.key === "Enter" || e.key === " ") {

                  e.preventDefault();

                  handleActivate(item.label, item.path);

                }

              }}

              aria-pressed={isActive}

              title={item.label}

              className={cn(

                "w-8 h-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300",

                isActive ? "bg-white shadow-md" : "hover:bg-gray-100"

              )}
            >
              <img

                src={item.icon}

                alt={item.label}

                className="w-5 h-5 object-contain"

                style={isActive ? { filter: blueFilter } : undefined}

              />
            </button>

          );

        })}
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1 mb-3">

          {footerItems.map((item) => (
            <button

              key={item.label}

              type="button"

              onClick={() => console.log(`${item.label} clicked`)}

              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"

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

