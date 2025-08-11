import { ChevronDown, ChevronUp, Mail } from "lucide-react";

export default function DestinationCard({
  logoSrc,
  title,
  publishedText,
  contactName,
  contactEmail,
  onViewPurchases,
  isOpen,
  onToggle,
  form, // JSX for the inner form content
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      {/* Collapsed header */}
      <div className="relative grid grid-cols-[auto,1fr,auto] grid-rows-[auto,auto] gap-x-3">
        <img
          src={logoSrc}
          alt={title}
          className="w-10 h-10 rounded-full row-span-2"
        />

        <div className="col-start-2 row-start-1 text-[15px] font-semibold text-gray-900 leading-5">
          {title}
        </div>

        <button
          onClick={onToggle}
          aria-label={isOpen ? "Collapse" : "Expand"}
          className="absolute right-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          )}
        </button>

        <div className="col-start-2 row-start-2 mt-0.5 flex items-center gap-2 text-[13px] text-gray-600">
          <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500" />
          <span>{publishedText}</span>
        </div>

        <button
          onClick={onViewPurchases}
          className="col-start-3 row-start-2 justify-self-end inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 shadow-sm"
        >
          View Purchases
        </button>
      </div>

      {/* Divider */}
      <div className="mt-3 border-t border-gray-200" />

      {/* Contact line (always visible to match screenshot) */}
      <div className="flex items-center text-[13px] text-gray-700 py-3">
        <Mail className="w-4 h-4 text-gray-600 mr-2" />
        <span>
          <span className="font-semibold text-gray-800">{contactName}</span>{" "}
          <span className="text-gray-600">({contactEmail})</span>
        </span>
      </div>

      {/* Expanded form */}
      {isOpen && <div className="pt-1">{form}</div>}
    </div>
  );
}
