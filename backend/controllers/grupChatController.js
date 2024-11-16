import * as grupChatModel from "../models/grupChatModel.js";

// Mengirim pesan ke grup
export const sendPesanToGrup = async (req, res) => {
  const { grup_id } = req.params;
  const pengguna_id = req.user.id; // ID pengguna yang mengirim pesan
  const { pesan } = req.body; // Isi pesan yang dikirim

  try {
    // Menambahkan pesan ke GrupChat
    const pesanTerkirim = await grupChatModel.addPesanToGrupChat(
      grup_id,
      pengguna_id,
      pesan
    );

    if (!pesanTerkirim) {
      return res.status(400).json({ message: "Gagal mengirim pesan" });
    }

    res.status(200).json({
      message: "Pesan berhasil dikirim",
      data: {
        grup_id,
        pengguna_id,
        pesan,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Gagal mengirim pesan",
      error: error.message,
    });
  }
};

// Mendapatkan pesan dari grup
export const getPesanFromGrup = async (req, res) => {
  const { grup_id } = req.params;

  try {
    const pesanList = await grupChatModel.getPesanByGrup(grup_id);

    if (pesanList.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada pesan dalam grup ini" });
    }

    res.status(200).json({
      message: "Pesan berhasil diambil",
      data: pesanList,
    });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({
      message: "Gagal mengambil pesan",
      error: error.message,
    });
  }
};

export const deletePesanFromGrupChat = async (req, res) => {
  const { grup_id, pesan_id } = req.params; // Mengambil grup_id dan pesan_id dari parameter

  try {
    // Memeriksa apakah pesan ada di grup
    const pesan = await grupChatModel.getPesanById(grup_id, pesan_id);
    if (!pesan) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }

    // Hapus pesan dari grup
    const deleted = await grupChatModel.deletePesanGrupChat(grup_id, pesan_id);
    if (!deleted) {
      return res.status(400).json({ message: "Gagal menghapus pesan" });
    }

    res.status(200).json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res
      .status(500)
      .json({ message: "Gagal menghapus pesan", error: error.message });
  }
};
