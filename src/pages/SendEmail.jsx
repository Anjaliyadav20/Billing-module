import React, { useRef, useState, useEffect } from "react";
import {
  Mail,
  X,
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  Link as LinkIcon,
} from "lucide-react";
import IconButton from "../components/assets/IconButton.svg";
import Icon3 from "../components/assets/icon3.svg";
import GreenIcon from "../components/assets/GreenIcon.svg";
 
const SendEmail = ({ isOpen, onClose, contactEmail }) => {
  const [to, setTo] = useState(contactEmail || "");
  const [subject, setSubject] = useState(
    "Stay on Top of Your Finances with Our Billing Product  "
  );
  const editorRef = useRef(null);
 
  const [showToast, setShowToast] = useState(false);
 
  useEffect(() => {
    if (isOpen && contactEmail) setTo(contactEmail);
  }, [isOpen, contactEmail]);
 
  const exec = (cmd, val) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val || null);
  };
 
  const insertLink = () => {
    const url = prompt("Enter URL", "https://example.com");
    if (!url) return;
    exec("createLink", url);
  };
 
  const insertQuote = () => exec("formatBlock", "blockquote");
 
  const handleSend = () => {
    const bodyHtml = editorRef.current?.innerHTML || "";
    console.log("Email sent:", { to, subject, bodyHtml });
 
    setShowToast(true);
    onClose?.();
    setTimeout(() => setShowToast(false), 4000);
  };
 
  if (!isOpen && !showToast) return null;
 
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
 
          <div
              className="fixed z-50 top-1 right-1 bottom-1 w-full 
           max-w-[97vw] sm:max-w-[94vw] md:max-w-[920px] lg:max-w-[865px]
           bg-white rounded-lg shadow-2xl border border-gray-200
           flex flex-col overflow-hidden"

          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Write Email
              </h2>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border" />
 
            {/* Form */}
            <div className="flex-1 overflow-auto">
              {/* To */}
              <div className="flex flex-wrap items-center px-4 sm:px-6 py-3">
                <div className="w-20 text-sm text-gray-600">To</div>
                <input
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="john@domain.com"
                  className="flex-1 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                />
              </div>
              <div className="border" />
 
              {/* Subject */}
              <div className="flex flex-wrap items-center px-4 sm:px-6 py-3">
                <div className="w-20 text-sm text-gray-600">Subject</div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="flex-1 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                />
              </div>
              <div className="border" />
 
              {/* Toolbar */}
              <div className="px-4 sm:px-6 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { on: () => exec("insertText", " "), Icon: Plus, title: "Insert" },
                    { on: () => exec("bold"), Icon: Bold, title: "Bold" },
                    { on: () => exec("italic"), Icon: Italic, title: "Italic" },
                    { on: () => exec("underline"), Icon: Underline, title: "Underline" },
                  ].map(({ on, Icon, title }, i) => (
                    <button
                      key={title + i}
                      onClick={on}
                      className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center"
                      title={title}
                      type="button"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
 
                  <button
                    onClick={() => exec("insertOrderedList")}
                    className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center"
                    title="Numbered list"
                    type="button"
                  >
                    <img src={Icon3} alt="ordered list" className="w-6 h-6" />
                  </button>
 
                  <button
                    onClick={() => exec("insertUnorderedList")}
                    className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center"
                    title="Bulleted list"
                    type="button"
                  >
                    <List className="w-4 h-4" />
                  </button>
 
                  <button
                    onClick={insertLink}
                    className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center"
                    title="Insert link"
                    type="button"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
 
                  <button
                    onClick={insertQuote}
                    className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center"
                    title="Quote"
                    type="button"
                  >
                    <img src={IconButton} alt="quote" className="w-6 h-6" />
                  </button>
                </div>
              </div>
 
              {/* Editor */}
              <div className="px-4 sm:px-6 py-3">
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[240px] outline-none text-[15px] leading-7 text-gray-800"
                >
                  <p>Dear Members,</p>
                  <p className="mt-4">
                    Are you struggling to keep your finances in check? We have
                    the perfect solution for you!
                  </p>
                  <p className="mt-4">
                    Introducing our cutting-edge billing product, designed to
                    help you stay on top of your financial game effortlessly.
                    With our user-friendly interface and powerful features,
                    managing your bills and expenses has never been this easy.
                  </p>
                  <p className="mt-4">
                    Ready to get started? Visit our{" "}
                    <a href="https://example.com" className="text-blue-600 underline">
                      website
                    </a>{" "}
                    to sign up for a free trial and experience the difference for
                    yourself.
                  </p>
                  <p className="mt-4">
                    Let us help you achieve financial peace of mind!
                  </p>
                  <p className="mt-6">Best regards,</p>
                </div>
              </div>
            </div>
 
            {/* Footer */}
            <div className="flex flex-wrap items-center justify-end gap-2 px-4 sm:px-6 py-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
 
              <button
                onClick={handleSend}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4338CA] text-white font-medium shadow-sm hover:bg-[#3730A3] active:bg-[#312E81] focus:outline-none focus:ring-2 focus:ring-[#4338CA]/30 transition text-sm"
                type="button"
              >
                <span>Send Now</span>
              </button>
            </div>
          </div>
        </>
      )}
 
      {/* SUCCESS TOAST */}
      {showToast && (
        <div
          className="fixed bottom-6 right-6 z-[60] w-[95vw] max-w-sm
                     bg-white border border-gray-200 rounded-2xl shadow-xl
                     p-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <div className="mt-0.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
              <img src={GreenIcon} alt="icon" className="w-5 h-5 text-green-600" />
            </span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">
              Email sent successfully
            </div>
            <div className="text-sm text-gray-500">
              We’ve sent your email on its way!
            </div>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};
 
export default SendEmail;
