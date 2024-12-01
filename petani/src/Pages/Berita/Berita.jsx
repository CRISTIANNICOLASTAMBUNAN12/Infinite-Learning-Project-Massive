import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Berita() {
  const [activeCategory, setActiveCategory] = useState(null); // null untuk semua berita
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Jika kategori yang sama diklik, set ke null untuk menampilkan semua berita
    setActiveCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  // Fetch kategori dari backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/kategori');
        if (!response.ok) {
          throw new Error('Gagal mengambil kategori dari server');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch berita sesuai kategori
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = activeCategory
          ? `http://localhost:4000/api/berita?kategori=${activeCategory}`
          : 'http://localhost:4000/api/berita';

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
  }, [activeCategory]);

  return (
    <div className="flex flex-col items-center w-full py-10">
      <div className="flex w-full max-w-7xl gap-5 px-5">
        {/* Sidebar */}
        <aside className="w-48 p-5 bg-gray-100 rounded-md shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Kategori</h2>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`block w-full px-4 py-2 mb-2 text-white rounded ${
                activeCategory === category.nama ? 'bg-[#8D5524]' : 'bg-gray-500'
              } hover:bg-[#8D5524]`}
              onClick={() => handleCategoryClick(category.nama)}
            >
              {category.nama}
            </button>
          ))}
        </aside>

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
