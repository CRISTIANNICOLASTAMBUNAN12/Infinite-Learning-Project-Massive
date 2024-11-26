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
('Putri Sangkot Meliati', 'johndoe@example.com', 'Jl. Kemerdekaan 15, Jakarta', 'Perempuan', 'Petani', '082234567891', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'petani'),
('Siti Aminah Widodo', 'siti@example.com', 'Jl. Sudirman 20, Surabaya', 'Perempuan', 'Petani Sayur', '083234567892', '$2b$10$ZPlbvzYqw8LZt0YO/BiBEuKDk532cRtywv5xlNFsAtWS1ZYqIIcQy', 'petani');

/* Data Dummy Profil */
INSERT INTO Profil (pengguna_id, nama, lokasi, metode_pertanian, produk_ditawarkan, bio, gambar)
VALUES 
(1, 'John Doe', 'Bandung', 'Hidroponik', 'Sayuran Organik', 'Petani dengan pengalaman lebih dari 5 tahun', '/uploads/1732021427380.png'),
(2, 'Putri Sangkot Meliati', 'Jakarta', 'Tradisional', 'Padi dan Jagung', 'Mengelola komunitas petani di daerah Jakarta', '/uploads/1732021427380.png'),
(3, 'Siti Aminah Widodo', 'Surabaya', 'Organik', 'Sayuran Hijau', 'Berfokus pada pertanian sayuran organik', '/uploads/1732021427380.png');

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
INSERT INTO Berita (judul, konten, gambar) VALUES
('Teknik Peningkatan Hasil Panen Padi', 
 'Para petani di Desa Makmur mulai menerapkan teknik terbaru yang terbukti mampu meningkatkan hasil panen hingga 30%. Teknik ini melibatkan kombinasi antara penggunaan pupuk organik cair, rotasi tanaman, dan pemantauan hama dengan sistem berbasis teknologi. Dengan metode ini, petani tidak hanya dapat meningkatkan hasil panen, tetapi juga menjaga keseimbangan ekosistem yang mendukung keberlanjutan pertanian.','/uploads/1732603014900.jpg'),
('Penyuluhan Pertanian Organik', 
 'Dinas pertanian mengadakan penyuluhan di Kecamatan Sejahtera dengan tema "Masa Depan Pertanian Organik". Acara ini dihadiri oleh lebih dari 150 petani yang antusias mempelajari cara-cara bertani tanpa bahan kimia sintetis. Selain pembahasan teori, petani juga diajarkan praktik pembuatan pupuk kompos dan pestisida alami.', '/uploads/1732603043147.jpg'),
('Harga Gabah Naik 10%', 
 'Harga gabah kering panen di pasar lokal naik sebesar 10% dibandingkan minggu lalu akibat meningkatnya permintaan pasar domestik dan internasional. Petani optimis harga akan terus stabil, tetapi mereka juga meminta dukungan pemerintah dalam mengontrol harga pupuk yang terus melonjak.', '/uploads/1732603050147.jpg'),
('Pemanfaatan Teknologi Drone dalam Pertanian', 
 'Dalam era modern, teknologi drone semakin banyak digunakan dalam sektor pertanian untuk meningkatkan efisiensi. Dengan kemampuan memantau pertumbuhan tanaman dari udara, drone membantu petani memaksimalkan hasil tanpa perlu menghabiskan banyak waktu di lapangan. Drone juga mampu mengidentifikasi hama secara cepat.', '/uploads/1732603063736.webp'),
('Hama Wereng Menyerang Tanaman Padi', 
 'Hama wereng coklat menyerang lahan pertanian di wilayah Utara, mengakibatkan kerusakan lebih dari 200 hektar sawah. Serangan ini membuat petani kehilangan sebagian besar hasil panen. Untuk itu, dinas pertanian menyarankan penggunaan pengendalian hama berbasis biologis yang lebih ramah lingkungan.', '/uploads/1732603072230.jpg'),
('Pemerintah Luncurkan Subsidi Pupuk Baru', 
 'Subsidi pupuk organik resmi diluncurkan oleh pemerintah untuk mendukung keberlanjutan pertanian. Program ini bertujuan membantu petani kecil yang kesulitan mengakses pupuk berkualitas tinggi. Pupuk organik juga diharapkan dapat meningkatkan kesehatan tanah dalam jangka panjang.', '/uploads/1732603084360.jpg'),
('Workshop Pembuatan Pupuk Kompos', 
 'Kelompok tani Desa Hijau mengadakan workshop pembuatan pupuk kompos dari limbah organik. Workshop ini membantu petani memahami proses fermentasi yang sederhana dan hemat biaya. Selain itu, produk pupuk kompos ini juga dapat dijual sebagai tambahan penghasilan.', '/uploads/1732603097143.jpg'),
('Irigasi Tetes Mulai Diterapkan', 
 'Sistem irigasi tetes mulai digunakan oleh petani hortikultura di wilayah Timur. Sistem ini membantu petani menghemat air hingga 60% dibandingkan metode tradisional. Dengan bantuan teknologi sederhana, hasil panen meningkat secara signifikan meskipun di daerah dengan curah hujan rendah.', '/uploads/1732603110569.jpg'),
('Budidaya Jagung Hibrida untuk Daerah Kering', 
 'Jagung hibrida kini menjadi pilihan utama petani di wilayah yang minim curah hujan. Benih ini mampu tumbuh subur meskipun hanya dengan sedikit air, memberikan hasil panen yang lebih besar dibanding varietas biasa. Petani juga dilatih untuk menggunakan metode tanam bergilir.', '/uploads/1732603119247.jpg'),
('Pelatihan Pengolahan Pasca Panen', 
 'Pelatihan ini bertujuan membantu petani mengolah hasil panen menjadi produk dengan nilai tambah, seperti keripik dari singkong dan tepung dari jagung. Pelatihan melibatkan sesi praktik langsung yang dipandu oleh pelaku industri kecil menengah.', '/uploads/1732603128778.jpg');

/* Data Dummy Acara */
INSERT INTO Acara (nama, deskripsi, tanggal, lokasi) VALUES
('Pameran Hasil Pertanian Organik', 
 'Pameran ini menampilkan berbagai produk hasil tani organik, mulai dari sayur-mayur, buah-buahan, hingga olahan makanan seperti keripik dan jus segar. Selain itu, acara ini akan menyelenggarakan lomba inovasi pertanian organik yang melibatkan petani muda di wilayah sekitar.', 
 '2024-12-01', 'Gedung Serbaguna Desa Makmur'),
('Pelatihan Pengendalian Hama', 
 'Workshop ini memberikan edukasi kepada petani tentang cara mengendalikan hama secara alami. Materi mencakup teknik pemanfaatan predator alami, tanaman pengusir hama, hingga pembuatan pestisida dari bahan alami seperti daun mimba dan bawang putih.', 
 '2024-12-05', 'Balai Pertanian Kecamatan Damai'),
('Seminar Teknologi Pertanian', 
 'Seminar ini membahas penggunaan teknologi modern, seperti sensor tanah, drone, dan aplikasi berbasis IoT untuk pertanian pintar. Seminar diakhiri dengan demonstrasi langsung penggunaan alat-alat tersebut di lapangan.', 
 '2024-12-10', 'Aula Kampus IT Del'),
('Lomba Inovasi Pertanian', 
 'Acara ini merupakan lomba inovasi untuk generasi muda di bidang pertanian. Peserta mempresentasikan ide kreatif seperti alat penyiram otomatis berbasis IoT dan sistem tanam hidroponik sederhana. Pemenang akan mendapatkan pendanaan untuk mewujudkan inovasi mereka.', 
 '2024-12-15', 'Lapangan Desa Kreatif'),
('Diskusi Publik tentang Pupuk Organik', 
 'Diskusi ini menghadirkan ahli pertanian dan pemerintah setempat untuk membahas potensi dan tantangan penerapan pupuk organik di tingkat petani kecil. Peserta juga dapat mencoba sampel pupuk organik yang dikembangkan oleh mahasiswa lokal.', 
 '2024-12-18', 'Balai Desa Sejahtera'),
('Bursa Tani 2024', 
 'Ajang pertemuan petani dan distributor alat pertanian, termasuk alat modern seperti traktor mini dan mesin pemanen otomatis. Bursa ini juga menawarkan diskon khusus bagi petani yang membeli alat dalam jumlah besar.', 
 '2024-12-20', 'Gedung Expo Kota Hijau'),
('Pelatihan Irigasi Modern', 
 'Pelatihan ini mengajarkan cara memasang sistem irigasi tetes dan irigasi otomatis untuk kebun kecil. Materi meliputi penggunaan pompa air hemat energi dan pengelolaan sumber daya air yang berkelanjutan.', 
 '2024-12-22', 'Desa Produktif Barat'),
('Festival Panen Raya', 
 'Perayaan ini melibatkan petani lokal untuk memamerkan hasil panen terbaik mereka. Selain itu, terdapat kompetisi memasak berbahan dasar hasil tani seperti jagung dan singkong. Festival ini juga diiringi dengan pentas seni lokal.', 
 '2024-12-25', 'Lapangan Desa Harmoni'),
('Kursus Pembuatan Pupuk Cair', 
 'Kursus ini bertujuan untuk mengajarkan petani membuat pupuk cair berbasis bahan organik seperti kotoran ternak dan limbah dapur. Peserta akan mendapatkan pelatihan praktis dan panduan tertulis untuk pembuatan pupuk di rumah.', 
 '2024-12-28', 'Gedung Pelatihan Desa Makmur'),
('Penyuluhan Diversifikasi Tanaman', 
 'Penyuluhan ini mengedukasi petani tentang pentingnya menanam berbagai jenis tanaman untuk meningkatkan hasil panen. Selain itu, diberikan panduan tentang pengelolaan rotasi tanaman dan manfaat tanaman tumpangsari.', 
 '2024-12-30', 'Balai Penyuluhan Kecamatan Damai');

/* Data Dummy Kategori */
INSERT INTO Kategori (nama, jenis)
VALUES 
('Sayuran', 'Produk Pertanian'),
('Buah-buahan', 'Produk Pertanian'),
('Padi', 'Tanaman Pangan');

/* Data Dummy Produk */
INSERT INTO Produk (pengguna_id, nama, deskripsi, kategori_id, harga, lokasi, stok) VALUES
(2, 'Pupuk Organik Cair', 
 'Pupuk cair ini terbuat dari bahan organik berkualitas seperti kotoran ternak, limbah dapur, dan ekstrak tanaman. Proses fermentasi selama 30 hari memastikan pupuk ini kaya akan nutrisi dan mikroorganisme yang bermanfaat untuk memperbaiki kesuburan tanah. Pupuk ini sangat cocok untuk tanaman hortikultura dan padi.', 
 2, 50000, 'Desa Makmur', 100),
(2, 'Benih Padi Unggul', 
 'Benih padi varietas unggul ini dirancang untuk menghasilkan panen yang lebih melimpah dan tahan terhadap hama. Dengan teknologi pemuliaan modern, benih ini mampu tumbuh subur di berbagai kondisi cuaca dan memberikan hasil yang berkualitas tinggi. Direkomendasikan untuk daerah tropis.', 
 1, 30000, 'Kecamatan Damai', 200),
(3, 'Alat Penyemprot Otomatis', 
 'Alat ini mempermudah petani dalam proses penyemprotan pupuk cair atau pestisida ke tanaman. Dilengkapi dengan teknologi hemat energi, alat ini mampu menyemprot hingga 15 liter cairan dalam sekali pengisian. Cocok untuk pertanian skala kecil hingga menengah.', 
 3, 150000, 'Kota Hijau', 50),
(3, 'Kompos Granul', 
 'Kompos granul ini dibuat dari campuran kotoran ternak dan bahan hijauan yang difermentasi. Dengan bentuk butiran, produk ini lebih mudah diaplikasikan di lahan pertanian. Selain itu, granul ini kaya akan unsur hara seperti nitrogen, fosfor, dan kalium yang penting untuk pertumbuhan tanaman.', 
 2, 60000, 'Desa Sejahtera', 120),
(2, 'Bibit Cabai Hibrida', 
 'Bibit cabai hibrida ini memiliki daya tumbuh tinggi dan menghasilkan buah dengan kualitas unggul. Varietas ini tahan terhadap penyakit seperti antraknosa dan dapat dipanen lebih cepat dibandingkan cabai biasa. Sangat ideal untuk petani yang ingin meningkatkan hasil panen cabai mereka.', 
 1, 20000, 'Kecamatan Harmoni', 300),
(3, 'Mesin Pemipil Jagung', 
 'Mesin ini dirancang untuk membantu petani memipil jagung secara cepat dan efisien. Dengan motor bertenaga tinggi, alat ini mampu memipil hingga 200 kg jagung per jam. Cocok untuk petani jagung skala besar yang ingin menghemat waktu dan tenaga.', 
 3, 500000, 'Kota Produktif', 20),
(2, 'Pestisida Nabati', 
 'Pestisida nabati ini terbuat dari bahan alami seperti ekstrak daun mimba, bawang putih, dan cabai. Produk ini efektif untuk mengendalikan hama seperti kutu daun, ulat, dan wereng tanpa merusak lingkungan. Pestisida ini juga aman digunakan untuk tanaman organik.', 
 2, 40000, 'Desa Tani Asri', 150),
(3, 'Alat Pengukur pH Tanah', 
 'Alat ini membantu petani mengetahui tingkat keasaman tanah secara cepat dan akurat. Dengan desain portabel, alat ini mudah digunakan di berbagai jenis lahan. Informasi pH tanah sangat penting untuk menentukan jenis pupuk yang tepat untuk tanaman.', 
 3, 120000, 'Kecamatan Subur', 70),
(2, 'Bibit Tomat Super', 
 'Bibit tomat ini menghasilkan tanaman dengan buah yang besar, manis, dan tahan lama. Selain itu, varietas ini memiliki ketahanan terhadap penyakit layu bakteri dan virus mosaik. Cocok untuk budidaya di dataran rendah maupun tinggi.', 
 1, 25000, 'Kota Hijau', 200),
(3, 'Pupuk Hayati', 
 'Pupuk hayati ini mengandung mikroorganisme hidup yang bermanfaat untuk memperbaiki struktur tanah dan meningkatkan penyerapan nutrisi oleh tanaman. Produk ini sangat cocok digunakan untuk padi, jagung, dan sayuran.', 
 2, 70000, 'Desa Mandiri', 90);


/* Data Dummy Pasar */
INSERT INTO Pasar (produk_id, pengguna_id, lokasi, deskripsi)
VALUES 
(1, 1, 'Pasar Bandung', 'Produk sayuran segar dari petani lokal'),
(2, 2, 'Pasar Malang', 'Buah-buahan langsung dari kebun'),
(3, 3, 'Pasar Cirebon', 'Beras lokal berkualitas tinggi');

/* Data Dummy Edukasi */
INSERT INTO Edukasi (judul, konten, kategori_id, gambar) VALUES
('Manfaat Pupuk Organik untuk Tanah', 
 'Penggunaan pupuk organik membawa banyak manfaat untuk tanah dan tanaman. Pupuk ini meningkatkan kesuburan tanah, memperbaiki struktur tanah, dan menyediakan nutrisi yang lebih alami untuk tanaman. Selain itu, pupuk organik membantu mengurangi penggunaan bahan kimia sintetis yang dapat merusak lingkungan.', 
 1, 'uploads\1732601715647.jpg'),
('Cara Budidaya Padi yang Efisien', 
 'Budidaya padi yang efisien melibatkan pemilihan varietas benih unggul, penyiapan lahan yang baik, dan sistem irigasi yang tepat. Teknik seperti jajar legowo juga dianjurkan untuk meningkatkan hasil panen. Petani perlu memonitor pertumbuhan tanaman secara berkala agar bisa segera menangani masalah seperti hama atau penyakit.', 
 1, 'uploads\1732601727587.jpg'),
('Teknologi Drone untuk Pemantauan Tanaman', 
 'Drone menjadi alat yang semakin populer di kalangan petani modern. Alat ini memungkinkan pemantauan kondisi tanaman dari udara dengan akurasi tinggi. Dengan bantuan drone, petani dapat mengidentifikasi area yang membutuhkan perhatian khusus, seperti daerah yang kekurangan air atau terinfestasi hama.', 
 3, 'uploads\1732602898144.jpg'),
('Pembuatan Pupuk Kompos', 
 'Pupuk kompos merupakan solusi ramah lingkungan untuk memanfaatkan limbah organik. Proses pembuatannya melibatkan pencampuran bahan-bahan seperti dedaunan, limbah dapur, dan kotoran ternak. Setelah melalui proses fermentasi, kompos ini siap digunakan untuk menyuburkan tanah.', 
 2, 'uploads\1732602909400.jpg'),
('Manajemen Air dalam Pertanian', 
 'Manajemen air yang baik sangat penting dalam pertanian, terutama di wilayah dengan curah hujan rendah. Sistem irigasi tetes dan pengelolaan sumber air alternatif seperti embung dapat membantu petani mempertahankan produktivitas lahan mereka.', 
 3, 'uploads\1732602920492.jpg'),
('Rotasi Tanaman untuk Kesuburan Tanah', 
 'Rotasi tanaman adalah praktik penting dalam pertanian berkelanjutan. Dengan menanam tanaman berbeda setiap musim, petani dapat mengurangi risiko penyakit tanah, meningkatkan kesuburan tanah, dan memanfaatkan nutrisi secara lebih efisien.', 
 1, 'uploads\1732602928519.jpg'),
('Keunggulan Tanaman Tumpangsari', 
 'Tumpangsari adalah teknik menanam dua atau lebih jenis tanaman dalam satu lahan. Teknik ini meningkatkan efisiensi lahan dan memberikan keuntungan ganda bagi petani, seperti hasil panen yang lebih banyak dan risiko gagal panen yang lebih rendah.', 
 1, 'uploads\1732602941910.jpg'),
('Teknik Pengendalian Hama Ramah Lingkungan', 
 'Pengendalian hama secara alami melibatkan penggunaan predator alami, pestisida nabati, dan rotasi tanaman. Teknik ini tidak hanya efektif mengendalikan hama, tetapi juga menjaga keseimbangan ekosistem.', 
 2, 'uploads\1732602953753.jpg'),
('Keuntungan Bertani Hidroponik', 
 'Hidroponik adalah metode bertani tanpa tanah yang semakin populer. Metode ini menggunakan air dan larutan nutrisi untuk menumbuhkan tanaman. Keunggulannya meliputi penggunaan lahan yang lebih sedikit, pengurangan kebutuhan air, dan panen yang lebih cepat.', 
 3, 'uploads\1732602970796.jpg'),
('Inovasi Pertanian dengan IoT', 
 'Internet of Things (IoT) membawa revolusi dalam pertanian. Dengan sensor IoT, petani dapat memantau kelembapan tanah, suhu, dan kebutuhan nutrisi tanaman secara real-time, sehingga keputusan pengelolaan lahan menjadi lebih tepat.', 
 3, 'uploads\1732602410973.webp');


/* Data Dummy Aktivitas */
INSERT INTO Aktivitas (jenis_aktivitas, deskripsi)
VALUES 
('Edukasi terbaru', 'Edukasi dengan judul "Teknik Pengendalian Hama Ramah Lingkungan" telah dipublikasikan.'),
('Edukasi terbaru', 'Edukasi dengan judul "Keuntungan Bertani Hidroponik" telah dipublikasikan.'),
('Edukasi terbaru', 'Edukasi dengan judul "Inovasi Pertanian dengan IoT" telah dipublikasikan.');
