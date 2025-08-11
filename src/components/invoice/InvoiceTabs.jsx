export const InvoiceTabs = ({ activeTab, onTabChange, invoices }) => {
  const counts = {
    All: invoices.length,
    Review: invoices.filter((inv) =>
      (inv.status || "").toLowerCase().includes("manual review")
    ).length,
    Approved: invoices.filter((inv) =>
      (inv.status || "").toLowerCase().includes("approved")
    ).length,
    Archived: invoices.filter((inv) =>
      (inv.status || "").toLowerCase().includes("archived")
    ).length,
  };

  const tabs = [
    { label: "All", count: counts.All },
    { label: "Review", count: counts.Review },
    { label: "Approved", count: counts.Approved },
    { label: "Archived", count: counts.Archived },
  ];

  return (
    <div className="flex items-center gap-6 px-6 pt-4 pb-2 bg-white text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onTabChange(tab.label)}
          className={`flex items-center gap-1 border-b-2 pb-1 transition-colors duration-200 ${
            activeTab === tab.label
              ? "text-[#6366f1] border-[#6366f1]"
              : "text-gray-500 border-transparent hover:text-black"
          }`}
        >
          <span className="text-sm">{tab.label}</span>
          <span className="bg-gray-50 text-gray-800 text-[12px] font-bold px-2 py-0.5 rounded-lg">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};
