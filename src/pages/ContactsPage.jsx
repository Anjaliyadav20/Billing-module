import { useState, useEffect, useMemo } from "react";
import { Search, Mail, Phone, Calendar, Plus } from "lucide-react";
import Alphabet from "../components/assets/alphabet.svg"
import Location from "../components/assets/location.svg"
import Filter from "../components/assets/filter.png"
import SendEmail from "./SendEmail";
import Office from "../components/assets/office.svg"
import Square from "../components/assets/square.png"



const rawContacts = [
  {
    id: 1,
    name: "Adam Smith",
    email: "dolores.chambers@example.com",
    company: "Ford Civil Contracting Pty Ltd..",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "AS",
    color: "#3B82F6",
    notes: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but ",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    ],
  },
  {
    id: 2,
    name: "Leslie Alexander",
    email: "nevaeh.simmons@example.com",
    company: "Ford Civil Contracting Pty Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "LA",
    color: "#F97316",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    email: "deanna.curtis@example.com",
    company: "TechCorp",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "EP",
    color: "#8B5CF6",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "bill.sanders@example.com",
    company: "Acme Co.",
    phone: "(704) 555-0127",
    joined: "October 10, 2023",
    location: "Melbourne, Australia",
    initials: "JW",
    color: "#EF4444",
  },
  {
    id: 5,
    name: "Cameron Williamson",
    email: "jackson.graham@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "CW",
    color: "#FBBF24",
  },
  {
    id: 6,
    name: "Marvin McKinney",
    email: "michelle.rivera@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "MM",
    color: "#6366F1",
  },
  {
    id: 7,
    name: "Jacob Jones",
    email: "georgia.young@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "JJ",
    color: "#DC2626",
  },
  {
    id: 8,
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "CH",
    color: "#047857",
  },
  {
    id: 9,
    name: "Brooklyn Simmons",
    email: "michael.mitc@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "BS",
    color: "#D97706",
  },
  {
    id: 10,
    name: "Ronald Richards",
    email: "felicia.reid@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "RR",
    color: "#DC2626",
  },
  {
    id: 11,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    company: "Example Ltd.",
    phone: "(704) 555-0127",
    joined: "November 26, 2023",
    location: "Sydney, Australia",
    initials: "EH",
    color: "#6366F1",
  },
];


export default function ContactsPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("sent");
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editableContact, setEditableContact] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);


  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContactData, setNewContactData] = useState({
    name: "",
    email: "",
    phone: "",
    joined: "",
    location: "",
  });
  const [contactList, setContactList] = useState(rawContacts);
  const contacts = contactList;

  useEffect(() => {
    if (contacts.length > 0) setSelectedContact(contacts[0]);
    else setSelectedContact(null);
  }, [contacts]);

  const filtered = contacts
    .filter((c) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (!sortByNameAsc) return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });

  const handleSendEmailClick = () => {
    setEmailModalOpen(true);
  };

  const handleDeleteContact = () => {
    if (!selectedContact) return;
    const updatedList = contactList.filter((c) => c.id !== selectedContact.id);
    setContactList(updatedList);
    if (updatedList.length > 0) {
      setSelectedContact(updatedList[0]);
    } else {
      setSelectedContact(null);
    }
  };

  return (
    <div className="flex flex-col h-screen text-gray-800">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <h1 className="text-xl font-semibold">My Contacts</h1>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 px-4 py-1.5
             rounded-xl border border-gray-200 bg-white text-gray-900
             shadow-sm hover:bg-gray-50 hover:shadow
             focus:outline-none focus:ring-2 focus:ring-indigo-500/20
             transition"
          >
            <img src={Filter} alt="filter" className="w-5 h-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNewContactForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2
              rounded-[12px] bg-[#4338CA] text-white text-sm font-medium
              border border-white/80 shadow-sm
              hover:bg-[#3730A3] active:bg-[#312E81]
              focus:outline-none focus:ring-2 focus:ring-[#4338CA]/30 transition"
          >
            <Plus className="w-5 h-5" />
            <span>{showNewContactForm ? "Cancel" : "New Contact"}</span>
          </button>
        </div>
      </div>

      {showNewContactForm && (
        <>

          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowNewContactForm(false)}
          />


          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold mb-4">Add New Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "email", "phone", "joined", "location"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newContactData[field]}
                    onChange={(e) =>
                      setNewContactData((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowNewContactForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const initials = newContactData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase();

                    const newContact = {
                      ...newContactData,
                      id: Date.now(),
                      initials,
                      company: "New Company",
                      color: "#3B82F6",
                      notes: [],
                    };

                    setContactList((prev) => [newContact, ...prev]);
                    setShowNewContactForm(false);
                    setNewContactData({
                      name: "",
                      email: "",
                      phone: "",
                      joined: "",
                      location: "",
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[600px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 flex-1">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full"
                  placeholder="Search..."
                />
              </div>

              <div className="inline-flex border border-gray-300 rounded-[8px] overflow-hidden w-auto">
                <button
                  onClick={() => setFilter("sent")}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${filter === "sent"
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-white text-gray-700"
                    }`}
                >
                  Sent
                </button>
                <button
                  onClick={() => setFilter("received")}
                  className={`px-3 py-1 text-sm font-medium transition-colors border-l border-gray-200 ${filter === "received"
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-white text-gray-700"
                    }`}
                >
                  Received
                </button>
              </div>

              <button
                onClick={() => setSortByNameAsc((s) => !s)}
                className="px-3 py-1 text-sm font-medium border border-gray-300 rounded-[8px] flex items-center gap-1"
              >
                <img src={Alphabet} alt="alphabet" />
                Name
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1">
            {filtered.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedContact(c);
                  setIsEditing(false);
                  setEditableContact(null);
                  setIsCreatingNote(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedContact?.id === c.id ? "bg-gray-50" : ""
                  } ${idx !== filtered.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: c.color }}
                >
                  {c.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.email}</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No contacts found.</div>
            )}
          </div>
        </div>


        <div className="flex-1 bg-white overflow-auto px-6 py-6">
          {selectedContact ? (
            <>
              <div className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: selectedContact.color }}
                  >
                    {selectedContact.initials}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        className="border-b border-gray-300 bg-transparent outline-none text-xl font-semibold"
                        value={editableContact.name}
                        onChange={(e) =>
                          setEditableContact({
                            ...editableContact,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <div className="text-xl font-semibold">
                        {selectedContact.name}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                      <img src={Office} alt="office" className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        {selectedContact.company}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendEmailClick}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setSelectedContact(editableContact);
                        setIsEditing(false);
                        setEditableContact(null);
                      } else {
                        setEditableContact({ ...selectedContact });
                        setIsEditing(true);
                      }
                    }}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  <button className="px-3 py-1 border rounded-lg text-sm">Share</button>
                  <button
                    onClick={handleDeleteContact}
                    className="px-3 py-1 border rounded-lg text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-3 py-5 border-t border-b border-gray-300 text-sm text-gray-700 -mx-6 px-6">
                {["email", "phone", "joined", "location"].map((field) => (
                  <div className="flex items-center py-2" key={field}>
                    <div className="w-32 text-xs font-medium text-gray-600 capitalize">
                      {field}
                    </div>
                    {field === "email" && <Mail className="w-4 h-4 mr-2 mt-1" />}
                    {field === "phone" && <Phone className="w-4 h-4 mr-2 mt-1" />}
                    {field === "joined" && <Calendar className="w-4 h-4 mr-2 mt-1" />}
                    {field === "location" && <img src={Location} alt="location" className="w-4 h-4 mr-2 mt-1" />}
                    {isEditing ? (
                      <input
                        className="border-b border-gray-300 bg-transparent outline-none text-sm text-gray-800"
                        value={editableContact[field]}
                        onChange={(e) =>
                          setEditableContact({
                            ...editableContact,
                            [field]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <div className="font-medium text-sm text-gray-800">
                        {selectedContact[field]}
                      </div>
                    )}
                  </div>
                ))}
              </div>


              <div className="mt-6" onClick={(e) => {
                if (isCreatingNote && !e.target.closest("textarea") && !e.target.closest("button")) {
                  setIsCreatingNote(false);
                  setNewNote("");
                }
              }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-700">Notes</div>
                  <button
                    onClick={() => setIsCreatingNote(true)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-gray-300 bg-white text-sm shadow-sm hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" /> Create
                  </button>
                </div>

                {isCreatingNote && (
                  <div className="mt-3">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                      placeholder="Type your note..."
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="mt-2 px-3 py-1 mb-2 bg-indigo-600 text-white text-sm rounded-lg"
                        onClick={() => {
                          const updatedNotes = [newNote, ...(selectedContact.notes || [])];
                          const updated = { ...selectedContact, notes: updatedNotes };
                          setSelectedContact(updated);
                          setIsCreatingNote(false);
                          setNewNote("");
                        }}
                      >
                        Save Note
                      </button>
                    </div>

                  </div>
                )}

                <div className="space-y-3">
                  {selectedContact.notes?.map((note, i) => (
                    <div
                      key={i}
                      className="relative p-4 bg-gray-50 rounded-xl border border-gray-300 text-sm text-gray-800 shadow-sm"
                    >
                      <p className="leading-relaxed">{note}</p>

                      <button
                        title="Copy note"
                        onClick={() => {
                          navigator.clipboard.writeText(note);
                          setCopiedIndex(i);
                          setTimeout(() => setCopiedIndex(null), 2000); // Hide after 2s
                        }}
                        className="absolute bottom-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-md text-gray-600 hover:text-indigo-600"
                      >
                        <img src={Square} alt="copy" className="w-4 h-4" />
                      </button>

                      {copiedIndex === i && (
                        <div className="absolute bottom-10 right-2 bg-black text-white text-xs px-2 py-1 rounded shadow">
                          Copied!
                        </div>
                      )}
                    </div>
                  ))}





                  {!selectedContact.notes?.length && (
                    <div className="text-gray-400 text-sm italic">No notes added yet.</div>
                  )}
                </div>
              </div>

            </>
          ) : (
            <div className="text-center text-gray-500">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>

      <SendEmail
        isOpen={isEmailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        contactEmail={selectedContact?.email || ""}
      />
    </div>
  );
}
