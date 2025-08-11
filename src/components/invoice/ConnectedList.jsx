import { CalendarDays, Building2, Truck, MoreHorizontal } from "lucide-react";

export const ConnectedList = ({
  type, 
  data = [],
  onAdd,
  onView,
  onMore
}) => {
  if (!data.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected {type} available.
      </div>
    );
  }

  const getHeaderTitle = () => {
    switch (type) {
      case "quotes":
        return "Connected Quote(s)";
      case "pos":
        return "Connected PO(s)";
      case "jobs":
        return "Connected Job(s)";
      default:
        return "Connected Items";
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-[15px] text-foreground">
          {getHeaderTitle()}
        </h3>
        <button
          className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
          onClick={onAdd}
        >
          <i class="fa-solid fa-plus"></i> Add
        </button>
      </div>

      
      {data.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-100 rounded-lg bg-white px-4 pt-3 pb-2 shadow-sm"
        >
          {/* Top section */}
          <div className="flex justify-between items-start">
            <div>
              {type === "quotes" && (
                <>
                  <div className="font-semibold text-sm text-foreground mb-1">
                    QI #{item.quoteNumber}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total amount of {item.amount}
                  </div>
                </>
              )}

              {type === "pos" && (
                <>
                  <div className="font-semibold text-sm text-foreground mb-1">
                    PO #{item.poNumber}
                  </div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </>
              )}

              {type === "jobs" && (
                <>
                  <div className="font-semibold text-sm text-foreground mb-1">
                    JO #{item.jobNumber}
                  </div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </>
              )}
            </div>

            <div className="flex items-start gap-2">
              <button
                className="h-9 px-4 text-sm font-medium bg-gray-100 rounded-lg  hover:bg-gray-50 shadow-sm transition"
                onClick={() => onView?.(item)}
              >
                View
              </button>
              <button
                className="h-9 w-9 flex items-center justify-center rounded-lg  bg-gray-100 hover:bg-gray-100 transition"
                onClick={() => onMore?.(item)}
              >
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          
          <div className="mt-3 mb-3 border-t border-gray-100" />

          
          {type === "quotes" && (
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{item.vendor}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            </div>
          )}

          {type === "pos" && (
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                <span>{item.deliveryDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{item.poDate}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full font-medium text-xs leading-5 ${
                  item.match === "Full Match"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}
              >
                {item.match}
              </span>
            </div>
          )}

          {type === "jobs" && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
                {item.status}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
