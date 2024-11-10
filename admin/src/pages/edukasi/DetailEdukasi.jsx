import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailEdukasi = () => {
  const { id } = useParams();
  const [edukasi, setEdukasi] = useState(null);

  useEffect(() => {
    // Here you would fetch the edukasi data from an API or global state
    const fetchedEdukasi = {
      id,
      title: 'Teknik Pertanian Organik yang Efektif',
      date: '2024-11-05',
      imageUrl: 'https://example.com/edukasi1.jpg',
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
      status: 'published',
    };
    setEdukasi(fetchedEdukasi);
  }, [id]);

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-softCream bg-white">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">{edukasi.title}</h1>
      <div className="flex mb-6">
        <img
          src={edukasi.imageUrl}
          alt={edukasi.title}
          className="w-48 h-48 object-cover rounded-xl"
        />
        <div className="ml-6">
          <p className="text-sm text-gray-600">{edukasi.date}</p>
          <p className="text-lg text-gray-700 mt-4">{edukasi.description}</p>
          <p className="mt-4 text-sm text-gray-500">Status: {edukasi.status}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailEdukasi;
