import React, { useState, useEffect } from "react";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

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
      const response = await fetch(`/api/chat/${messageId}`, {
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
        setDropdownOpen(null); // Menutup dropdown setelah pesan dihapus
      } else {
        console.error("Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleToggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle dropdown
  };


  return (
    <div
      className="chat-container flex font-sans bg-gray-100"
      style={{ height: "56em" }}
    >
      {/* Sidebar for Desktop */}
      <div
        className={`w-full bg-white shadow-md border-r ${
          isMobileView
            ? selectedUser
              ? "hidden"
              : "block"
            : "sm:w-full md:w-1/3 lg:w-1/4"
        }`}
      >
        <h2 className="text-lg font-bold p-4 bg-blue-500 text-white">
          Daftar Obrolan
        </h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-3 cursor-pointer rounded transition ${
                selectedUser === user.id
                  ? "bg-blue-200 font-bold text-blue-800"
                  : "hover:bg-blue-100 text-gray-800"
              }`}
              onClick={() => fetchMessages(user.id)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                {user.nama[0].toUpperCase()}
              </div>
              <span className="ml-3">{user.nama}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-grow flex flex-col bg-white shadow-md rounded-lg ${
          isMobileView && selectedUser
            ? "fixed top-0 left-0 right-0 bottom-0 z-50 w-full"
            : ""
        }`}
        style={{
          overflow: "hidden",
        }}
      >
        {/* Mobile Back Button */}
        {isMobileView && selectedUser && (
          <div className="flex items-center justify-between bg-blue-500 text-white py-2 px-4">
            <button
              onClick={handleBackToContacts}
              className="text-white bg-blue-500 p-2 rounded-full"
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
                const userId = localStorage.getItem("userId");
                const isSender = Number(msg.pengirim_id) === Number(userId);

                const date = new Date(msg.dibuat_pada).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );

                const time = new Date(msg.dibuat_pada).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={index}
                    className={`flex mb-2 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        isSender ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      <div className="flex justify-between text-xs mt-1 opacity-70">
                        <span>{date}</span>
                        <span>
                          <div className="relative flex items-center justify-center w-10 h-full">
                            {/* Dropdown Arrow */}
                            <svg
                              onClick={() => handleToggleDropdown(index)} // Toggle dropdown on click
                              className="w-5 h-5 text-white cursor-pointer"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>

                            {/* Dropdown Menu */}
                            {dropdownOpen === index && (
                              <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)} // Handle delete message
                                  className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </span>
                      </div>

                      <p>{msg.pesan}</p>
                      <div className="flex justify-between text-xs mt-1 opacity-70">
                        <span></span>
                        <span>{time}</span>
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
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tulis pesan..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              Kirim
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
