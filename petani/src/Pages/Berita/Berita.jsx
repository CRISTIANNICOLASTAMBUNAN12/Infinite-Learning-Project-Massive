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
    <div className="flex flex-col items-center w-full h-full py-10 bg-gray-100">
      <div className="w-full max-w-7xl px-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari berita..."
          className="p-3 mb-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => navigate(`/berita/${event.id}`)}
            >
              <img
                src={event.gambar ? `http://localhost:4000${event.gambar}` : 'http://via.placeholder.com/150'}
                alt={event.judul || 'Event Image'}
                className="w-full h-36 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">
                    {new Date(event.diterbitkan_pada).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 truncate">{event.judul}</h3>
                <p className="text-sm text-gray-600">
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
