import { useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

export const EmailList = ({ emails = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!emails.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected emails available.
      </div>
    );
  }

  return (
    <div className="space-y-4"> 
      {emails.map((email, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="border border-border rounded-md bg-white shadow-sm"
          >
            
            <div
              onClick={() => toggle(idx)}
              className="cursor-pointer p-4 flex items-start justify-between"
            >
              <div>
                <div className="font-medium text-[15px] text-foreground mb-1">
                  {email.subject}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {email.date} ・ {email.time}
                </div>
              </div>

              <div className="mt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(idx);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 shadow-sm hover:bg-gray-100 transition"
                >
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="border-t px-4 py-4 text-sm text-foreground space-y-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 text-xs text-muted-foreground pt-0.5">From</div>
                  <div className="text-sm font-medium">{email.from}</div>
                </div>

               
                <div className="flex items-start gap-4">
                  <div className="w-10 text-xs text-muted-foreground pt-0.5">To</div>
                  <div className="text-sm font-medium">{email.to}</div>
                </div>

                
                <div className="pt-3 border-t text-sm leading-6 whitespace-pre-line text-gray-800">
                  {email.body}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
