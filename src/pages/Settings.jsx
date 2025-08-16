import { useState } from "react";
import {
  ClipboardCopy,
  CheckCircle2,
  Pencil,
  ChevronDown,
} from "lucide-react";

export default function Settings() {
 
  const [orgName, setOrgName] = useState("");
  const [orgEmail] = useState(""); 
  const [currency, setCurrency] = useState("AUD");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");

  const [uploadEmail, setUploadEmail] = useState(
    "example.com"
  );
  const [canEditUploadEmail, setCanEditUploadEmail] = useState(false);
  const [copyOk, setCopyOk] = useState(false);

  const [createFromBody, setCreateFromBody] = useState(false);
  const [extractData, setExtractData] = useState(true);
  const [autoTax, setAutoTax] = useState(true);


  const copyUploadEmail = async () => {
    try {
      await navigator.clipboard.writeText(uploadEmail);
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 1400);
    } catch {

    }
  };

  const onCancel = () => {
 
    window.history.back?.();
  };

  const onSave = () => {
    const payload = {
      orgName,
      orgEmail,
      currency,
      dateFormat,
      uploadEmail,
      createFromBody,
      extractData,
      autoTax,
    };
    console.log("Save settings:", payload);

  };

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {/* Top nav tabs */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 h-30 ">
          <div className="flex gap-6 ">
            <Tab text="Suppliers" />
            <Tab className="text-2xl md:text-2xl" text="Settings" active />
            <Tab text="Integrations" />
          </div>
        </div>
      </div>

      {/* Page body */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-[22px] font-semibold text-gray-800 mb-4">
        Settings
        </h1>

        {/* General */}
        <Card>
          <CardTitle>General</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInput
              label="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization Name"
            />
            <LabeledInput
              label="Organization Email"
              value={orgEmail}
              placeholder="Organization Email"
            />

            <LabeledSelect
              label="Base Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={["AUD", "USD", "NZD", "EUR", "GBP", "INR"]}
            />

            <LabeledSelect
              label="Date Format"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              options={["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]}
            />
          </div>
        </Card>

        {/* Uploading files via email */}
        <Card>
          <CardTitle>Uploading files via email</CardTitle>
          <p className="text-sm text-gray-600 mb-3">
            You can send emails with attached documents to the following
            address. The documents will be automatically uploaded to your
            account.
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <input
              className={`w-full md:flex-1 rounded-md border px-3 py-2 text-sm ${
                canEditUploadEmail ? "bg-white" : "bg-gray-100"
              }`}
              value={uploadEmail}
              onChange={(e) => setUploadEmail(e.target.value)}
              disabled={!canEditUploadEmail}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCanEditUploadEmail((v) => !v)}
                className="text-sm inline-flex items-center gap-1 text-blue-700 hover:underline"
              >
                <Pencil className="w-4 h-4" />
                Edit email
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={copyUploadEmail}
                className="text-sm inline-flex items-center gap-1 text-blue-700 hover:underline"
              >
                <ClipboardCopy className="w-4 h-4" />
                {copyOk ? "Copied" : "Copy to Clipboard"}
              </button>
            </div>
          </div>

          <label className="mt-3 flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={createFromBody}
              onChange={(e) => setCreateFromBody(e.target.checked)}
            />
            <span>
              Create documents from both the attachment(s) and the body of the
              email.{" "}
              <a className="text-blue-700 hover:underline" href="#">
                Learn More.
              </a>
            </span>
          </label>
        </Card>


        

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}



function Tab({ text, active }) {
  return (
    <button
      className={`relative px-4 py-3 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {text}
      {active && (
        <span className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-emerald-400" />
      )}
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 mb-5">
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return (
    <h2 className="text-[15px] font-semibold text-gray-800 mb-3">{children}</h2>
  );
}

function LabeledInput({ label, ...props }) {
  return (
    <label className="block">
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      <input
        className="w-full rounded-md border bg-white px-3 py-2 text-sm disabled:bg-gray-100"
        {...props}
      />
    </label>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm pr-8"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>
    </label>
  );
}

function CheckboxRow({ label, checked, onChange }) {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-800">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
