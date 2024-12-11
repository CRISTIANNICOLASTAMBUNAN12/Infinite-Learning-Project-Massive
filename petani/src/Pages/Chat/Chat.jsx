import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from 'react-icons/fa'

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await fetch(
          "http://localhost:4000/api/chat/pengguna/chat",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Jalankan saat pertama kali komponen dimuat
    handleResize();

    // Dengarkan perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Bersihkan event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchMessages = async (userId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/chat/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setChatMessages(data);
    setSelectedUser(userId);
    if (window.innerWidth <= 768) {
      setIsMobileView(true); // Enable mobile view when a contact is selected
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch("/api/chat/kirim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        penerima_id: selectedUser,
        pengirim_id: userId,
        pesan: newMessage,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      setNewMessage("");
      fetchMessages(selectedUser);
    } else {
      console.error("Error sending message:", result.message);
    }
  };

  const handleBackToContacts = () => {
    setIsMobileView(false); // Switch back to the contact list
    setSelectedUser(null); // Clear selected user
  };

  const handleDeleteMessage = async (messageId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:4000/api/chat/${messageId}`, {  // Add full URL
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setChatMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );
        setDropdownOpen(null);
      } else {
        const error = await response.json();
        console.error("Delete failed:", error.message);
        alert("Cannot delete this message. You may only delete your own messages.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Error deleting message. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }
    setCurrentUserId(userId);
  }, []);

  return (
    <div
      className="chat-container flex font-sans bg-gray-100"
      style={{ height: "56em" }}
    >
      <div
        className={`w-full bg-white shadow-md border-r ${isMobileView
          ? selectedUser
            ? "hidden"
            : "block"
          : "sm:w-full md:w-1/3 lg:w-1/4"
          }`}
      >
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-3 cursor-pointer rounded transition ${selectedUser === user.id
                ? "bg-green-200 font-bold text-green-800"
                : "hover:bg-green-100 text-green-800"
                }`}
              onClick={() => fetchMessages(user.id)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                {user.nama[0].toUpperCase()}
              </div>
              <span className="ml-3">{user.nama}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-grow flex flex-col bg-white shadow-md rounded-lg ${isMobileView && selectedUser
          ? "fixed top-0 left-0 right-0 bottom-0 z-50 w-full"
          : ""
          }`}
        style={{
          overflow: "hidden",
        }}
      >
        {/* Mobile Back Button */}
        {isMobileView && selectedUser && (
          <div className="flex items-center justify-between bg-green-600 text-white py-2 px-4">
            <button
              onClick={handleBackToContacts}
              className="text-white bg-green-600 p-2 rounded-full"
            >
              &#10005;
            </button>
            <div className="flex-grow text-center">
              {users.find((user) => user.id === selectedUser)?.nama ||
                "Unknown User"}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {selectedUser && (
          <div className="flex-grow p-4 overflow-y-auto">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg, index) => {
                const isSender = currentUserId && String(msg.pengirim_id) === String(currentUserId);
                const date = new Date(msg.dibuat_pada).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                const time = new Date(msg.dibuat_pada).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={index}
                    className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-xs p-3 rounded-lg ${isSender ? "bg-green-500 text-white text-right" : "bg-green-200 text-gray-800 text-left"
                        }`}
                    >
                      <div className="flex justify-between items-center text-xs mt-1 opacity-70 gap-4">
                        <span>{date}</span>
                        <span>
                          <div className="flex items-center gap-2">
                            <div className="relative" ref={dropdownRef}>
                              {isSender && (
                                <>
                                  <button
                                    ref={buttonRef}
                                    onClick={() => handleToggleDropdown(index)}
                                    className="p-1 hover:bg-green-600 rounded"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                  {dropdownOpen === index && (
                                    <div
                                      ref={dropdownRef}
                                      className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10"
                                    >
                                      <button
                                        onClick={() => {
                                          handleDeleteMessage(msg.id);
                                          setDropdownOpen(null);
                                        }}
                                        className="block px-4 py-2 text-red-500 hover:bg-gray-100 whitespace-nowrap"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </span>
                      </div>
                      <p className="mb-1">{msg.pesan}</p>
                      <div className="flex justify-between items-center text-xs mt-1 opacity-70">
                        <span></span>
                        <div className="flex items-center gap-2">
                          <span>{time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No messages available</p>
            )}
          </div>
        )}

        {/* Send Message */}
        {selectedUser && (
          <div className="p-4 border-t flex items-center bg-gray-50">
            <input
              type="text"
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Tulis pesan..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="ml-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
              onClick={handleSendMessage}
            >
              <FaPaperPlane /> {/* Ikon pesawat kertas */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
