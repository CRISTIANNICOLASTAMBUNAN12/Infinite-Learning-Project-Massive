import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";

function DetailPasar() {
  const { userId } = useParams();
  const [profil, setProfil] = useState(null);
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userid");
  //   console.log("localStorage userId:", storedUserId, "type:", typeof storedUserId);
  //   console.log("URL userId:", userId, "type:", typeof userId);
  // }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan.");

        const profileResponse = await fetch(
          `http://localhost:4000/api/profil/pasar/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!profileResponse.ok)
          throw new Error("Gagal mengambil data profil.");
        const profileData = await profileResponse.json();
        setProfil(profileData);

        const produkResponse = await fetch(
          `http://localhost:4000/api/produk/produkPetani/all/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!produkResponse.ok) throw new Error("Gagal mengambil data produk.");
        const produkData = await produkResponse.json();
        setProduk(Array.isArray(produkData) ? produkData : [produkData]);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChatClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentUserId = localStorage.getItem("userid");
      if (!token) throw new Error("Token tidak ditemukan.");

      const response = await fetch("http://localhost:4000/api/chat/kirim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pengirim_id: currentUserId,
          penerima_id: userId,
          pesan: "Halo, saya ingin mengobrol!",
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim pesan.");
      }

      navigate(`/chat/${userId}`);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        {profil ? (
          <>
            <div className="flex flex-col items-center text-center">
              <img
                src={
                  profil.gambar
                    ? `http://localhost:4000${profil.gambar}`
                    : "/assets/default-profile.png"
                }
                alt={profil.nama || "User"}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full mb-6"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {profil.nama || "Nama Tidak Ditemukan"}
              </h1>
              <p className="text-gray-600">
                {profil.lokasi || "Tidak Diketahui"}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {profil.metode_pertanian || "Metode Pertanian tidak tersedia"}
              </p>

              {/* Improved chat button logic with numerical comparison */}
              {Number(localStorage.getItem("userid")) !== Number(userId) && (
                <button
                  onClick={handleChatClick}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                  <FaComment className="h-5 w-5" />
                  Kirim Pesan
                </button>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Produk Pengguna
              </h2>
              {produk && produk.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {produk.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 border rounded-lg p-4 hover:shadow-lg transition"
                    >
                      <img
                        src={
                          item.gambar
                            ? `http://localhost:4000${item.gambar}`
                            : "/assets/placeholder.jpg"
                        }
                        alt={item.nama || "Produk"}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-semibold text-gray-700">
                        {item.nama || "Produk"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.harga
                          ? `${item.harga} IDR`
                          : "Harga tidak tersedia"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.deskripsi || "Deskripsi tidak tersedia"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Produk tidak tersedia.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Profil pengguna tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}

export default DetailPasar;