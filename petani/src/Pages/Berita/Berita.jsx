import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Berita() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch berita dengan fitur pencarian
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = 'http://localhost:4000/api/berita';

        // Jika ada pencarian, tambahkan query string untuk pencarian
        if (searchTerm) {
          url += `?search=${searchTerm}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [searchTerm]); // Akan melakukan request ulang ketika searchTerm berubah

  return (
    <div className="flex flex-col items-center w-full py-10">
      <div className="w-full max-w-7xl px-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari berita..."
          className="p-2 border rounded-lg mb-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
        />

        {/* Cards */}
        <div className="grid flex-1 grid-cols-4 gap-5 cursor-pointer">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#7BA651] rounded-lg shadow-md hover:transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => navigate(`/berita/${event.id}`)}
            >
              <img
                src={event.gambar ? `http://localhost:4000${event.gambar}` : 'http://via.placeholder.com/150'}
                alt={event.judul || 'Event Image'}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <div className="flex justify-between text-sm text-white mb-2">
                  <p className="text-sm text-gray-500">
                    {new Date(event.diterbitkan_pada).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white truncate">{event.judul}</h3>
                <p className="text-sm text-white">
                  {event.konten.split(' ').length > 20
                    ? `${event.konten.split(' ').slice(0, 20).join(' ')}...`
                    : event.konten}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Berita;
