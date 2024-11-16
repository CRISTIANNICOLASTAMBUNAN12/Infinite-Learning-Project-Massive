import * as threadModel from "../models/threadModel.js";

export const getThreadsByForum = async (req, res) => {
  try {
    const { forumId } = req.params;
    const threads = await threadModel.getThreadsByForumId(forumId);
    res.status(200).json(threads);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ message: "Gagal mendapatkan data thread" });
  }
};

export const createThread = async (req, res) => {
  try {
    const { forumId } = req.params;
    const penggunaId = req.user.id;
    const { judul, konten } = req.body;

    if (!judul || !konten) {
      return res.status(400).json({ message: "Judul dan konten diperlukan" });
    }

    const thread = await threadModel.addThread(
      forumId,
      penggunaId,
      judul,
      konten
    );
    res
      .status(201)
      .json({ message: "Thread berhasil ditambahkan", data: thread });
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ message: "Gagal menambahkan thread" });
  }
};

export const removeThread = async (req, res) => {
  try {
    const { id } = req.params;
    await threadModel.deleteThread(id);
    res.status(200).json({ message: "Thread berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting thread:", error);
    res.status(500).json({ message: "Gagal menghapus thread" });
  }
};

export const updateThread = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, konten } = req.body;

    if (!judul || !konten) {
      return res.status(400).json({ message: "Judul dan konten diperlukan" });
    }

    await threadModel.updateThread(id, judul, konten);
    res.status(200).json({ message: "Thread berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating thread:", error);
    res.status(500).json({ message: "Gagal memperbarui thread" });
  }
};
