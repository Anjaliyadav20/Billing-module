import { MoreHorizontal } from "lucide-react";
import calendar from "../assets/calendar-event.svg";
import truck from "../assets/truck-fast.svg";

export const ConnectedList = ({
  type = "pos",
  data = [],
  onAdd,
  onView,
  onMore,
}) => {
  if (!data.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center font-[system-ui]">
        No connected {type} available.
      </div>
    );
  }

  const headerTitle =
    type === "quotes"
      ? "Connected Quote(s)"
      : type === "jobs"
      ? "Connected Job(s)"
      : "Connected PO(s)";

  const matchBadgeClass = (m) =>
    m === "Full Match"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";

  return (
    <div className="space-y-4 font-[system-ui]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[15px] text-foreground">
          {headerTitle}
        </h3>
        <button
          onClick={onAdd}
          type="button"
          className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
        >
          <i className="fa-solid fa-plus mr-1.5"></i> Add
        </button>
      </div>

      {/* Cards */}
      {data.map((item, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-gray-200 bg-white px-4 pt-3 pb-2 shadow-sm"
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              {type === "pos" && (
                <>
                  <div className="text-[15px] font-semibold text-gray-900 mb-1">
                    PO #{item.poNumber}
                  </div>
                  <div className="text-[13px] text-gray-600 leading-5">
                    {item.description}
                  </div>
                </>
              )}

              {type === "quotes" && (
                <>
                  <div className="text-[15px] font-semibold text-gray-900 mb-1">
                    QI #{item.quoteNumber}
                  </div>
                  <div className="text-[13px] text-gray-600 leading-5">
                    Total amount of {item.amount}
                  </div>
                </>
              )}

              {type === "jobs" && (
                <>
                  <div className="text-[15px] font-semibold text-gray-900 mb-1">
                    JO #{item.jobNumber}
                  </div>
                  <div className="text-[13px] text-gray-600 leading-5">
                    {item.description}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-start gap-2">
              <button
                onClick={() => onView?.(item)}
                type="button"
                className="h-8 px-3 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-50 shadow-sm"
              >
                View
              </button>
              <button
                onClick={() => onMore?.(item)}
                type="button"
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-50"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-3 mb-2.5 border-t border-gray-200" />

          {/* Meta row */}
          {type === "pos" && (
            <div className="flex items-center gap-5 text-[13px] text-gray-700">
              <div className="flex items-center gap-1.5">
                <img src={truck} alt="" className="w-4.5 h-4.5" />
                <span className="font-medium leading-5">{item.deliveryDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <img src={calendar} alt="" className="w-4.5 h-4.5" />
                <span className="font-medium leading-5">{item.poDate}</span>
              </div>

              <span className="text-gray-300 text-lg leading-none">•</span>

              <span
                className={
                  "px-2.5 py-0.5 rounded-full border font-medium text-[12px] leading-5 " +
                  matchBadgeClass(item.match)
                }
              >
                {item.match}
              </span>
            </div>
          )}

          {type === "quotes" && (
            <div className="flex items-center gap-6 text-[13px] text-gray-700">
              <div className="flex items-center gap-1.5">
                <img src={calendar} alt="" className="w-4.5 h-4.5" />
                <span className="leading-5">{item.date}</span>
              </div>
            </div>
          )}

          {type === "jobs" && (
            <div className="flex items-center gap-3 text-[13px] text-gray-700">
              <div className="flex items-center gap-1.5">
                <img src={calendar} alt="" className="w-4.5 h-4.5" />
                <span className="leading-5">{item.date}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100 text-[12px] leading-5">
                {item.status}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
