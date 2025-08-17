import { useState } from "react";
import {
  ClipboardCopy,
  CheckCircle2,
  Pencil,
  ChevronDown,
  Settings2,
  Mail,
  Building2,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

export default function Settings() {
  // ── original state (kept) ─────────────────────────
  const [orgName, setOrgName] = useState("");
  const [orgEmail] = useState("");
  const [currency, setCurrency] = useState("AUD");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");

  const [uploadEmail, setUploadEmail] = useState("example.com");
  const [canEditUploadEmail, setCanEditUploadEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createFromBody, setCreateFromBody] = useState(false);

  // ── original actions (kept) ───────────────────────
  const copyUploadEmail = async () => {
    try {
      await navigator.clipboard.writeText(uploadEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const onCancel = () => window.history.back?.();
  const onSave = () => {
    const payload = {
      orgName,
      orgEmail,
      currency,
      dateFormat,
      uploadEmail,
      createFromBody,
    };
    console.log("Save settings:", payload);
  };

  // helpers
  const inputBase =
    "rounded-lg border border-slate-200 text-[14px] text-slate-800 px-3 py-2 placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 hover:border-slate-300 transition-all";

  const SectionTitle = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 grid place-items-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-[12.5px] text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <section
      className={
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md " +
        className
      }
    >
      {children}
    </section>
  );

  const GhostButton = ({ children, icon, className = "", ...props }) => (
    <button
      {...props}
      className={
        "inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition-colors " +
        className
      }
    >
    {icon}
    {children}
    </button>
  );

  const LabeledInput = ({ label, icon, ...props }) => (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          {icon}
        </span>
        {label}
      </div>
      <input className={`w-full bg-white ${inputBase}`} {...props} />
    </label>
  );

  const LabeledSelect = ({ label, value, onChange, options, icon }) => (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          {icon}
        </span>
        {label}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full appearance-none bg-white pr-9 ${inputBase} h-[40px]`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      </div>
    </label>
  );

  const CheckboxRow = ({ label, checked, onChange }) => (
    <label className="flex items-start gap-2 text-[13px] text-slate-800">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-0 focus:outline-none"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );

  const MiniNavItem = ({ text, icon, active }) => (
    <button
      type="button"
      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] mb-1 transition-colors
        ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}
    >
      <span className="h-5 w-5 grid place-items-center rounded-md bg-slate-100 text-slate-600">
        {icon}
      </span>
      {text}
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-[#F6F7FB]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm">
                <Settings2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-[22px] md:text-[24px] font-semibold text-slate-900">Settings</h1>
                <p className="text-[12.5px] text-slate-500">
                  Configure organization, regional formats, and email uploads
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-5 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left mini-nav (only the remaining sections) */}
          <aside className="col-span-12 md:col-span-3">
            <Card className="p-3">
              <MiniNavItem text="Organization" icon={<Building2 className="w-4 h-4" />} active />
              <MiniNavItem text="Regional" icon={<ShieldCheck className="w-4 h-4" />} />
              <MiniNavItem text="Upload via Email" icon={<Mail className="w-4 h-4" />} />
            </Card>
          </aside>

          {/* Right column */}
          <section className="col-span-12 md:col-span-9 grid gap-6">
            {/* Organization */}
            <Card>
              <SectionTitle
                icon={<Building2 className="h-4 w-4" />}
                title="Organization"
                subtitle="Core details used across invoices and emails."
              />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledInput
                  label="Organization Name"
                  icon={<Building2 className="h-4 w-4" />}
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter your organization name"
                />
                <LabeledInput
                  label="Organization Email"
                  icon={<Mail className="h-4 w-4" />}
                  value={orgEmail}
                  placeholder="Email (read-only)"
                  disabled
                />
              </div>
            </Card>

            {/* Regional */}
            <Card>
              <SectionTitle
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Regional"
                subtitle="Formatting preferences for currency and dates."
              />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledSelect
                  label="Base Currency"
                  icon={<ShieldCheck className="h-4 w-4" />}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={["AUD", "USD", "NZD", "EUR", "GBP", "INR"]}
                />
                <LabeledSelect
                  label="Date Format"
                  icon={<CalendarDays className="h-4 w-4" />}
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  options={["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]}
                />
              </div>
            </Card>

            {/* Upload via email */}
            <Card>
              <SectionTitle
                icon={<Mail className="h-4 w-4" />}
                title="Upload via Email"
                subtitle="Send emails with attachments to this address to auto-upload."
              />
              <div className="mt-3 flex flex-col md:flex-row md:items-center gap-2.5">
                <div className="relative w-full md:flex-1">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    className={`w-full ${inputBase} pl-9 pr-10 ${
                      canEditUploadEmail ? "bg-white" : "bg-slate-50"
                    }`}
                    value={uploadEmail}
                    onChange={(e) => setUploadEmail(e.target.value)}
                    disabled={!canEditUploadEmail}
                  />
                  <span
                    className={`absolute right-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full transition-colors ${
                      canEditUploadEmail ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 text-[13px]">
                  <GhostButton
                    onClick={() => setCanEditUploadEmail((v) => !v)}
                    icon={<Pencil className="w-4 h-4" />}
                  >
                    {canEditUploadEmail ? "Lock" : "Edit"}
                  </GhostButton>
                  <GhostButton onClick={copyUploadEmail} icon={<ClipboardCopy className="w-4 h-4" />}>
                    {copied ? "Copied" : "Copy"}
                  </GhostButton>
                </div>
              </div>

              <div className="mt-3">
                <CheckboxRow
                  label={
                    <>
                      Create documents from both attachments and the email body.{" "}
                      <a href="#" className="text-indigo-600 hover:text-indigo-700">
                        Learn more
                      </a>
                    </>
                  }
                  checked={createFromBody}
                  onChange={setCreateFromBody}
                />
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-1px_3px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 h-9 rounded-md border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="inline-flex items-center gap-2 px-4 h-9 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Copy toast */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="rounded-lg bg-white px-3 py-2 shadow-lg ring-1 ring-black/5 text-sm text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Email address copied
        </div>
      </div>
    </div>
  );
}
