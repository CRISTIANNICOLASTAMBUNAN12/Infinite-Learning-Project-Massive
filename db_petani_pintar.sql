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
    no_hp VARCHAR(15) NULL,
    kata_sandi VARCHAR(255) NOT NULL,
    peran ENUM('petani', 'admin') DEFAULT 'petani',
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Tabel Autentikasi */
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
    gambar VARCHAR(255), 
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Forum */
CREATE TABLE Forum (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Tabel Thread */
CREATE TABLE Thread (
    id INT PRIMARY KEY AUTO_INCREMENT,
    forum_id INT,
    pengguna_id INT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
	gambar VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES Forum(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Komentar */
CREATE TABLE Komentar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thread_id INT,
    pengguna_id INT,
    konten TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES Thread(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel GrupPengguna */
CREATE TABLE GrupPengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    dibuat_oleh INT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dibuat_oleh) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel AnggotaGrup */
CREATE TABLE AnggotaGrup (
    grup_id INT,
    pengguna_id INT,
    PRIMARY KEY (grup_id, pengguna_id),
    FOREIGN KEY (grup_id) REFERENCES GrupPengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel GrupChat */
CREATE TABLE GrupChat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grup_id INT,
    pengguna_id INT,
    pesan TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grup_id) REFERENCES GrupPengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Chat */
CREATE TABLE Chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengirim_id INT,
    penerima_id INT,
    pesan TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengirim_id) REFERENCES Pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (penerima_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Blog */
CREATE TABLE Blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    kategori VARCHAR(255),
	gambar VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Berita */
CREATE TABLE Berita (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
	gambar VARCHAR(255),
    diterbitkan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Tabel Acara */
CREATE TABLE Acara (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal TIMESTAMP NOT NULL,
    lokasi VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Tabel Kategori */
CREATE TABLE Kategori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(255) NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Tabel Produk */
CREATE TABLE Produk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    kategori_id INT,
    harga DECIMAL(10, 2),
    lokasi VARCHAR(255),
    stok INT,
	gambar VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (kategori_id) REFERENCES Kategori(id) ON DELETE CASCADE
);

/* Tabel Pasar */
CREATE TABLE Pasar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produk_id INT,
    pengguna_id INT,
    lokasi VARCHAR(255),
    deskripsi TEXT,
	gambar VARCHAR(255),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES Produk(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES Pengguna(id) ON DELETE CASCADE
);

/* Tabel Edukasi */
CREATE TABLE Edukasi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    kategori_id INT,
	gambar VARCHAR(255),
    diterbitkan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES Kategori(id) ON DELETE CASCADE
);

/* Tabel Aktivitas */
CREATE TABLE Aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jenis_aktivitas VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- DATA DUMMY

/* Data Dummy Pengguna */
INSERT INTO Pengguna (nama, email, alamat, jenis_kelamin, pekerjaan, no_hp, kata_sandi, peran)
VALUES 
('Admin', 'admin@example.com', 'Jl. Merdeka 10, Bandung', 'Laki-laki', 'Admin', '081234567890', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'admin'),
('john doe', 'johndoe@example.com', 'Jl. Kemerdekaan 15, Jakarta', 'Perempuan', 'Petani', '082234567891', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'petani'),
('Siti Aminah', 'siti@example.com', 'Jl. Sudirman 20, Surabaya', 'Perempuan', 'Petani Sayur', '083234567892', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'petani');

/* Data Dummy Profil */
INSERT INTO Profil (pengguna_id, nama, lokasi, metode_pertanian, produk_ditawarkan, bio, gambar)
VALUES 
(1, 'John Doe', 'Bandung', 'Hidroponik', 'Sayuran Organik', 'Petani dengan pengalaman lebih dari 5 tahun', '/uploads/1732021427380.png'),
(2, 'Jane Doe', 'Jakarta', 'Tradisional', 'Padi dan Jagung', 'Mengelola komunitas petani di daerah Jakarta', '/uploads/1732021427380.png'),
(3, 'Siti Aminah', 'Surabaya', 'Organik', 'Sayuran Hijau', 'Berfokus pada pertanian sayuran organik', '/uploads/1732021427380.png');

/* Data Dummy Forum */
INSERT INTO Forum (nama, deskripsi)
VALUES 
('Diskusi Umum', 'Forum untuk diskusi berbagai topik pertanian'),
('Hidroponik', 'Diskusi seputar metode pertanian hidroponik'),
('Tanaman Pangan', 'Forum yang berfokus pada tanaman pangan seperti padi dan jagung');

/* Data Dummy Thread */
INSERT INTO Thread (forum_id, pengguna_id, judul, konten)
VALUES 
(1, 1, 'Cara Menanam Tomat', 'Ada yang tahu cara terbaik menanam tomat secara organik?'),
(2, 2, 'Perawatan Tanaman Hidroponik', 'Apa saja tips perawatan tanaman hidroponik?'),
(3, 3, 'Harga Pupuk Melonjak', 'Kenapa harga pupuk melonjak akhir-akhir ini?');

/* Data Dummy Komentar */
INSERT INTO Komentar (thread_id, pengguna_id, konten)
VALUES 
(1, 2, 'Saya biasa menggunakan pupuk kompos untuk hasil yang lebih baik'),
(2, 1, 'Pastikan pH air tetap stabil agar tanaman tumbuh optimal'),
(3, 3, 'Kemungkinan karena biaya bahan baku yang meningkat');

/* Data Dummy GrupPengguna */
INSERT INTO GrupPengguna (nama, deskripsi, dibuat_oleh)
VALUES 
('Komunitas Hidroponik', 'Grup diskusi khusus hidroponik', 1),
('Petani Sayur Organik', 'Grup khusus petani sayur organik', 2),
('Penggiat Pertanian Tradisional', 'Grup untuk petani tradisional', 3);

/* Data Dummy AnggotaGrup */
INSERT INTO AnggotaGrup (grup_id, pengguna_id)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 1);

/* Data Dummy GrupChat */
INSERT INTO GrupChat (grup_id, pengguna_id, pesan)
VALUES 
(1, 1, 'Halo semua, ada yang sudah mencoba metode baru hidroponik?'),
(2, 2, 'Saya sedang mencoba pupuk organik baru, hasilnya bagus sekali'),
(3, 3, 'Bagaimana cara mengatasi hama ulat pada jagung?');

/* Data Dummy Chat */
INSERT INTO Chat (pengirim_id, penerima_id, pesan)
VALUES 
(1, 2, 'Halo, bagaimana kabarnya?'),
(2, 3, 'Apakah kamu sudah mencoba metode hidroponik yang baru?'),
(3, 1, 'Terima kasih atas tipsnya, sangat membantu!');

/* Data Dummy Blog */
INSERT INTO Blog (pengguna_id, judul, konten, kategori)
VALUES 
(1, 'Manfaat Hidroponik', 'Hidroponik dapat meningkatkan hasil panen secara signifikan', 'Pertanian'),
(2, 'Tips Bertani Organik', 'Menggunakan pupuk kompos untuk hasil yang lebih alami', 'Pertanian Organik'),
(3, 'Penyakit Tanaman Padi', 'Cara mengenali dan mengatasi penyakit pada tanaman padi', 'Tanaman Pangan');

/* Data Dummy Berita */
INSERT INTO Berita (judul, konten)
VALUES 
('Harga Pupuk Naik', 'Harga pupuk naik 20% di pasar lokal'),
('Cuaca Ekstrem', 'Cuaca ekstrem mengancam hasil panen di berbagai daerah'),
('Inovasi Baru di Pertanian', 'Teknologi terbaru dalam bidang pertanian diperkenalkan');

/* Data Dummy Acara */
INSERT INTO Acara (nama, deskripsi, tanggal, lokasi)
VALUES
('Pameran Pertanian', 'Pameran teknologi pertanian terbaru', '2024-12-15 09:00:00', 'Jakarta Convention Center'),
('Pelatihan Hidroponik', 'Pelatihan metode pertanian hidroponik', '2024-11-25 10:00:00', 'Bandung'),
('Seminar Pertanian Organik', 'Seminar untuk petani organik', '2024-12-10 13:00:00', 'Surabaya');

/* Data Dummy Kategori */
INSERT INTO Kategori (nama, jenis)
VALUES 
('Sayuran', 'Produk Pertanian'),
('Buah-buahan', 'Produk Pertanian'),
('Padi', 'Tanaman Pangan');

/* Data Dummy Produk */
INSERT INTO Produk (pengguna_id, nama, deskripsi, kategori_id, harga, lokasi, stok)
VALUES 
(1, 'Wortel Organik', 'Wortel segar dan organik', 1, 10000.00, 'Bandung', 50),
(2, 'Apel Fuji', 'Apel Fuji segar dari kebun lokal', 2, 30000.00, 'Malang', 30),
(3, 'Beras Pandan Wangi', 'Beras harum khas Pandan Wangi', 3, 12000.00, 'Cirebon', 100);

/* Data Dummy Pasar */
INSERT INTO Pasar (produk_id, pengguna_id, lokasi, deskripsi)
VALUES 
(1, 1, 'Pasar Bandung', 'Produk sayuran segar dari petani lokal'),
(2, 2, 'Pasar Malang', 'Buah-buahan langsung dari kebun'),
(3, 3, 'Pasar Cirebon', 'Beras lokal berkualitas tinggi');

/* Data Dummy Edukasi */
INSERT INTO Edukasi (judul, konten, kategori_id)
VALUES 
('Cara Membuat Pupuk Kompos', 'Langkah-langkah membuat pupuk kompos dari bahan organik', 1),
('Pengendalian Hama Tanaman Padi', 'Tips mengatasi hama pada tanaman padi secara efektif', 3),
('Manfaat Buah-buahan untuk Kesehatan', 'Buah-buahan sangat baik untuk kesehatan tubuh', 2);

/* Data Dummy Aktivitas */
INSERT INTO Aktivitas (jenis_aktivitas, deskripsi)
VALUES 
('Pengguna Baru', 'John Doe bergabung ke platform'),
('Berita Pasar', 'Harga pupuk meningkat di berbagai daerah'),
('Produk Baru', 'Wortel Organik ditambahkan ke pasar');
