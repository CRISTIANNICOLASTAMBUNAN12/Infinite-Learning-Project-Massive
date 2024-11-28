import React, { useState } from 'react';
import './Berita.css'; // Import the CSS file
import { Link } from 'react-router-dom';
function Berita() {
  const [activeCategory, setActiveCategory] = useState('Lihat Semua');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const events = [
    {
      id: 1,
      date: '26/10/2024',
      location: 'Medan Jl Seksama No 88C',
      title: 'Konferensi Pertanian',
      description: 'Mendorong praktik ramah lingkungan untuk hasil optimal. Selengkapnya...',
      image: '/assets/banner.png',
    },
    // Add more event objects here if needed
  ];

  return (
    <div className="App">
      {/* Sidebar and Event Cards */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Kategori</h2>
          {['Lihat Semua', 'Berita Modern', 'Acara Tahunan', 'Acara Bulanan', 'Berita luar Desa'].map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        {/* Cards */}
        <div className="cards-wrapper">
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt="Event Image" className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <span>{event.date}</span> | <span>{event.location}</span>
                </div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Mendorong praktik ramah lingkungan<br /> untuk hasil optimal.<br /> Selengkapnya...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Berita;
