import * as chatModel from "../models/chatModel.js";

export const sendPesan = async (req, res) => {
  const { penerima_id, pesan } = req.body;
  const pengirim_id = req.user.id;

  try {
    const idPesan = await chatModel.addChat(pengirim_id, penerima_id, pesan);
    res.status(200).json({
      message: "Pesan berhasil dikirim",
      pesan_id: idPesan,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Gagal mengirim pesan",
      error: error.message,
    });
  }
};

export const getPesan = async (req, res) => {
  const { penerima_id } = req.params;
  const pengirim_id = req.user.id;

  try {
    const pesan = await chatModel.getChatByPengirimPenerima(
      pengirim_id,
      penerima_id
    );
    if (pesan.length === 0) {
      return res.status(404).json({ message: "Tidak ada pesan" });
    }
    res.status(200).json(pesan);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      message: "Gagal mengambil pesan",
      error: error.message,
    });
  }
};

export const deletePesan = async (req, res) => {
  const { id } = req.params;
  const pengguna_id = req.user.id;

  try {
    const pesan = await chatModel.getChatById(id);
    if (!pesan) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }

    if (pesan.pengirim_id !== pengguna_id) {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki hak untuk menghapus pesan ini" });
    }

    const deleted = await chatModel.deleteChat(id);
    if (!deleted) {
      return res.status(400).json({ message: "Gagal menghapus pesan" });
    }

    res.status(200).json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({
      message: "Gagal menghapus pesan",
      error: error.message,
    });
  }
};
