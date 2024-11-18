import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state with empty fields for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    peran: '',
    pengalaman: '',
    tentang: '',
    alamat: '',
    jenis_kelamin: '',
    pekerjaan: '',
    no_hp: '',
    kata_sandi: '',  // Menambahkan field kata_sandi
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data when component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Anda perlu login terlebih dahulu');
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await fetch(`http://localhost:4000/api/pengguna/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna');
        }

        const data = await response.json();
        if (data.success) {
          setFormData({
            name: data.data.nama,
            email: data.data.email,
            peran: data.data.peran,
            pengalaman: data.data.pengalaman || '',
            tentang: data.data.tentang || '',
            alamat: data.data.alamat || '',
            jenis_kelamin: data.data.jenis_kelamin || '',
            pekerjaan: data.data.pekerjaan || '',
            no_hp: data.data.no_hp || '',
            kata_sandi: '',  // Initial kosong untuk kata_sandi
          });
        } else {
          toast.error('Pengguna tidak ditemukan');
          navigate('/users');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data pengguna');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menangani nilai null untuk peran, jika peran tidak dipilih, set default value
    const peranToSend = formData.peran ? formData.peran : null;  // Kirim null jika tidak ada peran yang dipilih

    try {
      const response = await fetch(`http://localhost:4000/api/pengguna/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          nama: formData.name,
          email: formData.email,
          kata_sandi: formData.kata_sandi,
          pengalaman: formData.pengalaman,
          tentang: formData.tentang,
          alamat: formData.alamat,
          jenis_kelamin: formData.jenis_kelamin,
          pekerjaan: formData.pekerjaan,
          no_hp: formData.no_hp,
          peran: peranToSend,  // Pastikan peran tidak null
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Pengguna berhasil diperbarui');
        navigate('/users');
      } else {
        toast.error(data.message || 'Gagal memperbarui pengguna');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui pengguna');
      console.error('Error updating user:', error);
    }
  };


  const handleBack = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmBack = () => {
    setIsModalOpen(false);
    navigate('/users');
  };

  return (
    <div className="bg-softCream p-8 h-full w-full bg-white">
      <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-6">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-medium text-gray-800">Edit Pengguna</h1>
        </div>

        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Pengguna"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="peran" className="block text-lg font-semibold text-gray-700">Peran</label>
          <select
            id="peran"
            name="peran"
            value={formData.peran || ''}  // Nilai default menjadi string kosong jika null
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="">Pilih Peran</option>  {/* Opsi default kosong */}
            <option value="petani">Petani</option>
          </select>
        </div>


        <div>
          <label htmlFor="pengalaman" className="block text-lg font-semibold text-gray-700">Pengalaman</label>
          <input
            type="text"
            id="pengalaman"
            name="pengalaman"
            value={formData.pengalaman}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="tentang" className="block text-lg font-semibold text-gray-700">Tentang</label>
          <input
            type="text"
            id="tentang"
            name="tentang"
            value={formData.tentang}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="alamat" className="block text-lg font-semibold text-gray-700">Alamat</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="pekerjaan" className="block text-lg font-semibold text-gray-700">Pekerjaan</label>
          <input
            type="text"
            id="pekerjaan"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="no_hp" className="block text-lg font-semibold text-gray-700">No. HP</label>
          <input
            type="text"
            id="no_hp"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="kata_sandi" className="block text-lg font-semibold text-gray-700">Kata Sandi</label>
          <input
            type="password"
            id="kata_sandi"
            name="kata_sandi"
            value={formData.kata_sandi}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-between gap-10 pt-10">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Perbarui Pengguna
          </button>
        </div>
      </form>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Perhatian</h3>
            <p className="mb-4 text-gray-600">Perubahan yang Anda buat belum disimpan. Apakah Anda yakin ingin kembali?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmBack}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Ya
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
