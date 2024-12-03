import React, { useState, useEffect } from "react";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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

  const fetchMessages = async (userId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/api/chat/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setChatMessages(data);
    setSelectedUser(userId);
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

  return (
    <div className="flex font-sans bg-gray-100" style={{ height: "56em" }}>
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md border-r sm:w-full md:w-1/3 lg:w-1/4">
        <h2 className="text-lg font-bold p-4 bg-blue-500 text-white">
          Daftar Obrolan
        </h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-3 cursor-pointer rounded transition ${
                selectedUser === user.id
                  ? "bg-blue-200 font-bold text-blue-800" // Gaya untuk pengguna aktif
                  : "hover:bg-blue-100 text-gray-800"
              }`}
              onClick={() => fetchMessages(user.id)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                {user.nama[0].toUpperCase()}
              </div>
              {/* Nama pengguna */}
              <span className="ml-3">{user.nama}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-white shadow-md rounded-lg">
        {/* Overflow container */}
        <div className="flex-grow p-4 overflow-y-auto">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => {
              const userId = localStorage.getItem("userId");
              const isSender = Number(msg.pengirim_id) === Number(userId);

              // Format tanggal dengan nama bulan dan tahun
              const date = new Date(msg.dibuat_pada).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              ); // Contoh: 2 Desember 2024
              const time = new Date(msg.dibuat_pada).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }); // Jam dan menit saja

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
                      {/* Tampilkan tanggal dengan nama bulan di kiri dan waktu di kanan */}
                      <span>{date}</span>
                      <span></span>
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
