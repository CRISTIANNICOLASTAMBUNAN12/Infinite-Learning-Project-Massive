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
      status: 'draft',
    };
    setEdukasi(fetchedEdukasi);
  }, [id]);

  const handleBack = () => {
    navigate('/edukasi');
  };

  if (!edukasi) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-softCream bg-white h-full w-full">
      <div className="pt-10">
      {edukasi ? (
          <div className="mb-6">
            <div className="relative flex justify-center items-center">
            <img
                src={edukasi.imageUrl}
                alt={edukasi.title}
                className="h-48 sm:h-64 object-cover rounded-md w-full max-w-xl"
              />
            </div>

            <div className="p-10 mx-20">
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-4">{edukasi.title}</h1>
              <p className="text-sm sm:text-base text-gray-500 mb-4">Tanggal: {new Date(edukasi.date).toLocaleDateString()}</p>
              <p
                className={`text-sm sm:text-base mb-4 px-3 py-1 rounded-md inline-block ${edukasi.status === 'published'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-500 text-black'
                  }`}
              >
                Status: {edukasi.status === 'published' ? 'Dipublikasikan' : 'Draft'}
              </p>
              <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed">
                Artikel tentang {edukasi.title.toLowerCase()} memberikan informasi mengenai berbagai aspek yang perlu diperhatikan dalam dunia pertanian.
              </p>
              <div className="flex justify-between gap-10 pt-10">
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
