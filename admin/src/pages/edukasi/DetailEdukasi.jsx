import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailEdukasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edukasi, setEdukasi] = useState(null);

  useEffect(() => {
    // Here you would fetch the edukasi data from an API or global state
    const fetchedEdukasi = {
      id,
      title: 'Teknik Pertanian Organik yang Efektif',
      date: '2024-11-05',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Pelajari cara bertani organik yang efektif untuk meningkatkan hasil panen tanpa merusak lingkungan.',
      status: 'published',
    };
    setEdukasi(fetchedEdukasi);
  }, [id]);

  const handleBack = () => {
    navigate('/edukasi');
  };

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg pt-10">
        {edukasi ? (
          <div className="mb-6">
            <div className="flex justify-center items-center">
            <img
                src={edukasi.imageUrl}
                alt={edukasi.title}
                className="h-48 object-cover rounded-md max-w-xl"
              />
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md">
                {edukasi.status === 'published' ? 'Dipublikasikan' : 'Draft'}
              </div>
            </div>

            <div className="p-10 mx-20">
              <h1 className="text-2xl font-medium text-gray-800 mb-4">{edukasi.title}</h1>
              <p className="text-sm text-gray-500 mb-4">Tanggal: {new Date(edukasi.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Artikel tentang {edukasi.title.toLowerCase()} memberikan informasi mengenai berbagai aspek yang perlu diperhatikan dalam dunia pertanian.
              </p>
              <div className="flex justify-between gap-6">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Kembali
                </button>
                <button
                  onClick={() => navigate(`/edukasi/edit/${id}`)}
                  className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Edit edukasi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
            <p className="ml-4 text-gray-600">Memuat data edukasi...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailEdukasi;
