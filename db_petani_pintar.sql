CREATE DATABASE IF NOT EXISTS db_petani_pintar;
USE db_petani_pintar;

/* Tabel User dan Authentication */
CREATE TABLE Pengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pengalaman TEXT NULL,
    tentang TEXT NULL,
    alamat VARCHAR(255) NOT NULL,
    jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
    pekerjaan VARCHAR(255) NULL,
    no_hp VARCHAR(15) NULL,  -- Mengubah menjadi VARCHAR(15) untuk nomor telepon
    kata_sandi VARCHAR(255) NOT NULL,
    peran ENUM('petani', 'admin') DEFAULT 'petani',
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Autentikasi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT,
    token VARCHAR(255) NOT NULL,
    kedaluwarsa_pada TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Profil */
CREATE TABLE Profil (
    pengguna_id INT PRIMARY KEY,
    nama VARCHAR(255),
    lokasi VARCHAR(255),
    metode_pertanian TEXT,
    produk_ditawarkan TEXT,
    bio TEXT,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Forum, Thread, dan Komentar */
CREATE TABLE Forum (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT
);

CREATE TABLE Thread (
    id INT PRIMARY KEY AUTO_INCREMENT,
    forum_id INT,
    pengguna_id INT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES Forum(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

CREATE TABLE Komentar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thread_id INT,
    pengguna_id INT,
    konten TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES Thread(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Grup, GrupChat, dan Chat */
CREATE TABLE GrupPengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    dibuat_oleh INT,
    FOREIGN KEY (dibuat_oleh) REFERENCES Pengguna(id) ON DELETE CASCADE
);

CREATE TABLE AnggotaGrup (
    grup_id INT,
    pengguna_id INT,
    PRIMARY KEY (grup_id, pengguna_id),
    FOREIGN KEY (grup_id) REFERENCES GrupPengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

CREATE TABLE GrupChat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grup_id INT,
    pengguna_id INT,
    pesan TEXT,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grup_id) REFERENCES GrupPengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

CREATE TABLE Chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengirim_id INT,
    penerima_id INT,
    pesan TEXT,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengirim_id) REFERENCES Pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (penerima_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Blog, Berita, dan Event */
CREATE TABLE Blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    kategori VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

CREATE TABLE Berita (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    diterbitkan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Acara (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal TIMESTAMP NOT NULL,
    lokasi VARCHAR(255)
);

/* Tabel Pasar, Produk, dan Kategori */
CREATE TABLE Kategori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(255) NOT NULL  -- 'produk', 'artikel', dll.
);

CREATE TABLE Produk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    kategori_id INT,
    harga DECIMAL(10, 2),
    lokasi VARCHAR(255),
    stok INT,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (kategori_id) REFERENCES Kategori(id) ON DELETE CASCADE
);

CREATE TABLE Pasar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produk_id INT,
    pengguna_id INT,
    lokasi VARCHAR(255),
    deskripsi TEXT,
    FOREIGN KEY (produk_id) REFERENCES Produk(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Edukasi */
CREATE TABLE Edukasi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    kategori_id INT,
    FOREIGN KEY (kategori_id) REFERENCES Kategori(id) ON DELETE CASCADE
);

CREATE TABLE aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jenis_aktivitas VARCHAR(255) NOT NULL,    -- Jenis aktivitas seperti "pengguna baru", "berita pasar"
    deskripsi TEXT NOT NULL,                   -- Deskripsi lebih lanjut tentang aktivitas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





-- DATA DUMMY

-- Insert data untuk tabel Pengguna
INSERT INTO Pengguna (nama, email, kata_sandi, pengalaman, tentang, alamat, jenis_kelamin, pekerjaan, no_hp, peran)
VALUES
('Admin', 'admin@example.com', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'Pengalaman Admin', 'Tentang Admin', 'Jl. Admin No. 1', 'Laki-laki', 'Admin', '081234567890', 'admin'),
('Petani', 'petani@example.com', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'Pengalaman bertani 10 Tahun', 'Seorang Petani..', 'Jl. Sigumpar No. 1', 'Laki-laki', 'Petani', '081234567891', 'petani'),
('Petani2', 'petani2@example.com', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'Pengalaman bertani 5 Tahun', 'Petani yang berdedikasi', 'Jl. Talang No. 3', 'Perempuan', 'Petani', '081234567892', 'petani');

-- Insert data untuk tabel Autentikasi
INSERT INTO Autentikasi (pengguna_id, token, kedaluwarsa_pada)
VALUES
(1, 'token_admin_12345', '2024-12-01 00:00:00'),
(2, 'token_petani_12345', '2024-12-01 00:00:00');

-- Insert data untuk tabel Profil
INSERT INTO Profil (pengguna_id, nama, lokasi, metode_pertanian, produk_ditawarkan, bio)
VALUES
(1, 'Admin', 'Jakarta', 'Pertanian modern', 'Sayuran organik', 'Admin yang bertanggung jawab'),
(2, 'Petani', 'Bali', 'Pertanian tradisional', 'Padi, Jagung', 'Petani dengan pengalaman lebih dari 10 tahun'),
(3, 'Petani2', 'Sumatra', 'Pertanian hidroponik', 'Tomat, Mentimun', 'Petani muda yang sedang berkembang');

-- Insert data untuk tabel Forum
INSERT INTO Forum (nama, deskripsi)
VALUES
('Forum Pertanian', 'Diskusi tentang pertanian dan teknologi pertanian'),
('Forum Petani', 'Tempat bertukar informasi antar petani');

-- Insert data untuk tabel Thread
INSERT INTO Thread (forum_id, pengguna_id, judul, konten)
VALUES
(1, 1, 'Teknologi Pertanian Terbaru', 'Membahas tentang teknologi pertanian yang sedang berkembang'),
(1, 2, 'Pengalaman Bertani Organik', 'Cerita pengalaman bertani organik di Bali'),
(2, 3, 'Hidroponik untuk Petani Pemula', 'Tips dan trik untuk memulai pertanian hidroponik');

-- Insert data untuk tabel Komentar
INSERT INTO Komentar (thread_id, pengguna_id, konten)
VALUES
(1, 2, 'Teknologi pertanian sangat membantu petani dalam meningkatkan hasil panen'),
(2, 3, 'Saya juga mulai beralih ke pertanian organik, sangat menantang tapi menyenangkan'),
(3, 1, 'Hidroponik memang pilihan bagus untuk lahan terbatas');

-- Insert data untuk tabel GrupPengguna
INSERT INTO GrupPengguna (nama, deskripsi, dibuat_oleh)
VALUES
('Grup Petani Bali', 'Grup untuk para petani di Bali', 2),
('Grup Petani Sumatra', 'Grup diskusi para petani Sumatra', 3);

-- Insert data untuk tabel AnggotaGrup
INSERT INTO AnggotaGrup (grup_id, pengguna_id)
VALUES
(1, 2),
(1, 1),
(2, 3);

-- Insert data untuk tabel GrupChat
INSERT INTO GrupChat (grup_id, pengguna_id, pesan)
VALUES
(1, 1, 'Selamat pagi semua, bagaimana kabar pertanian di Bali?'),
(1, 2, 'Semua berjalan baik, musim panen padi mulai datang'),
(2, 3, 'Saya baru saja mencoba hidroponik, hasilnya cukup baik');

-- Insert data untuk tabel Chat
INSERT INTO Chat (pengirim_id, penerima_id, pesan)
VALUES
(1, 2, 'Halo, saya butuh bantuan dengan artikel pertanian yang sedang saya buat'),
(2, 1, 'Tentu, saya akan bantu Anda, kirimkan saja artikelnya');

-- Insert data untuk tabel Blog
INSERT INTO Blog (pengguna_id, judul, konten, kategori)
VALUES
(1, 'Teknologi Pertanian', 'Artikel tentang perkembangan terbaru dalam teknologi pertanian', 'Teknologi Pertanian'),
(2, 'Bertani Organik', 'Panduan untuk memulai pertanian organik di lahan sempit', 'Petani');

-- Insert data untuk tabel Berita
INSERT INTO Berita (judul, konten, diterbitkan_pada)
VALUES
('Perkembangan Pertanian Modern', 'Berita tentang kemajuan teknologi dalam pertanian', '2024-11-01 10:00:00'),
('Festival Pertanian Nasional', 'Acara tahunan untuk merayakan hasil pertanian', '2024-11-10 08:00:00');

-- Insert data untuk tabel Acara
INSERT INTO Acara (nama, deskripsi, tanggal, lokasi)
VALUES
('Festival Pertanian Bali', 'Festival tahunan untuk pertanian di Bali', '2024-11-20 09:00:00', 'Denpasar, Bali'),
('Seminar Pertanian Hidroponik', 'Seminar tentang pertanian hidroponik untuk pemula', '2024-12-05 10:00:00', 'Medan, Sumatra');

-- Insert data untuk tabel Kategori
INSERT INTO Kategori (nama, jenis)
VALUES
('Padi', 'produk'),
('Sayuran', 'produk'),
('Berita Pertanian', 'artikel');

-- Insert data untuk tabel Produk
INSERT INTO Produk (pengguna_id, nama, deskripsi, kategori_id, harga, lokasi, stok)
VALUES
(2, 'Padi Organik', 'Padi yang ditanam secara organik di Bali', 1, 50000.00, 'Bali', 100),
(3, 'Tomat Hidroponik', 'Tomat yang ditanam dengan metode hidroponik', 2, 15000.00, 'Sumatra', 50);

-- Insert data untuk tabel Pasar
INSERT INTO Pasar (produk_id, pengguna_id, lokasi, deskripsi)
VALUES
(1, 2, 'Bali', 'Padi organik yang dijual langsung dari petani'),
(2, 3, 'Sumatra', 'Tomat hidroponik dengan kualitas terbaik');

-- Insert data untuk tabel Edukasi
INSERT INTO Edukasi (judul, konten, kategori_id)
VALUES
('Edukasi Pertanian Organik', 'Panduan lengkap cara bertani organik dengan teknik terbaru', 1),
('Teknik Hidroponik untuk Pemula', 'Edukasi untuk memulai hidroponik di rumah', 2);
