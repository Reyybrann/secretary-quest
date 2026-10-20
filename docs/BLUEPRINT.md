# BLUEPRINT FINAL — SECRETARY QUEST: OFFICE ADVENTURE

**Status:** Spesifikasi implementasi untuk ChatGPT Work, bukan klaim game sudah terbangun atau dipublikasikan.  
**Target pengguna:** siswa SMP kelas 7–9; guru sebagai pendamping.  
**Bahasa:** Bahasa Indonesia.  
**Genre:** 2D pixel art top-down office adventure + misi pekerjaan + akuntansi dasar.  
**Platform:** browser desktop/laptop, bisa dimainkan lewat tautan setelah terpublikasi.  
**Mode:** **single-player**, siswa hanya memainkan **Sekretaris**; Bos dan karyawan lain adalah NPC. Tidak perlu backend, akun, atau SQL.

## 1. Visi dan standar jadi

Bangun **game nyata yang bisa dimainkan**, bukan sekadar halaman presentasi/game kuis statis. Karakter bergerak di dunia 2D, berbicara dengan Bos, berjalan menuju meja kerja/lemari arsip/toko/ruang rapat, dan menyelesaikan 20 quest akuntansi dengan sistem perusahaan yang benar-benar berubah (kas, stok, biaya, omzet, laba, EXP, hari permainan). Tampilan bersih, lucu, warna hangat, terbaca siswa SMP.

**Satu kalimat permainan:** "Jadi sekretaris baru di Kantor Pelangi, selesaikan pekerjaan dari Pak Budi selama lima hari, bantu perusahaan tetap sehat, lalu raih sertifikat Sekretaris Hebat!"

**Definisi selesai:** (a) semua 20 quest bisa selesai tanpa macet; (b) ada map yang bisa dieksplorasi; (c) interaksi dunia nyata dalam game; (d) pencatatan uang/stok dan laporan benar; (e) progres tersimpan; (f) bisa diakses melalui URL hosting statis yang benar-benar diuji jika perizinan/deployment tersedia.

## 2. Prioritas pengalaman anak SMP

- **Tidak perlu login, tidak perlu memahami istilah debit-kredit sebelum bermain.** Akuntansi dijelaskan sebagai **uang masuk, uang keluar, stok barang, omzet, dan untung/rugi**. Istilah formal diperkenalkan lewat tooltip opsional (mis. HPP = modal dari barang yang sudah terjual).
- Maksimal **3 aksi utama pada setiap panel kerja**: *Baca Tugas, Kerjakan, Kirim*. Fitur lain ditempatkan di menu kecil (*Catatan*, *Bantuan*, *Arsip*).
- Satu layar minigame hanya meminta 1–3 jawaban per tahap. Laporan 4 kolom dibagi menjadi beberapa langkah dengan progress bar.
- **Tidak ada hitung mundur wajib**; jawaban salah diberi penjelasan serta kesempatan ulang, bukan hukuman berat.
- Seluruh teks dalam Bahasa Indonesia, angka rupiah dengan pemisah ribuan, tombol besar.
- Ada tutorial 60–90 detik: gerak → bicara dengan Bos → buka komputer → isi satu latihan → simpan.
- Permainan memuat momen menyenangkan: NPC berbicara, stempel nota, XP, confetti ringan, suara pencapaian, ruang baru terbuka, tanaman/dekorasi bisa dibeli dengan token dekorasi (terpisah dari uang perusahaan agar tidak mengacaukan akuntansi).

## 3. Gaya visual (mengikuti referensi gambar pengguna)

- **Perspektif A: 2D pixel art TOP-DOWN**; tata ruang berpetak, karakter kecil dan menggemaskan, meja, kursi, PC, lemari, tanaman, lantai kotak/ubin, seperti referensi yang diberikan pengguna (bukan menyalin aset atau susunan persis).
- Basis pixel art **16×16 atau 32×32** dengan skala integer 2–3 kali (nearest-neighbor; `pixelArt: true`, `roundPixels: true` pada Phaser).
- Palette yang ramah: hijau toska (`#35A69A`), hijau tua (`#235A63`), krem (`#F6E5B4`), oranye (`#F3A94F`), navy (`#263950`) dan putih gading (`#FFF9EB`). Jaga kontras teks.
- Avatar sekretaris berambut/berpakaian dapat dipilih (minimal 3 kombinasi palet), animasi diam dan berjalan empat arah; ekspresi NPC sebagai potret dialog.
- Visual boleh menggunakan aset original yang dihasilkan melalui kode/pixel art buatan sendiri, atau **aset berlisensi CC0/izin yang terdokumentasi**. Jangan menyalin sprite dari gambar referensi ber-watermark. Sertakan file `CREDITS.md` / `LICENSE_ASSETS.md`.
- Tidak ada watermark ChatGPT/AI pada tampilan game. Logo produk adalah "SECRETARY QUEST".

## 4. Dunia dan map utama

**Map:** satu lantai kantor berukuran kira-kira **42 × 30 tile, 32 px/tile** (dunia 1344 × 960 px), kamera mengikuti pemain; layout dapat disesuaikan selama seluruh fungsi terjaga. Sudut top-down, arcade collision, pintu dengan trigger interaksi, kamera tidak menampilkan area hitam di luar batas.

| Zona | Fungsi utama | Objek interaksi |
|---|---|---|
| Lobi/pintu masuk | Spawn, tutorial dan petunjuk | papan petunjuk, poster kontrol |
| Ruang Bos | Mendapat tugas / percakapan | NPC Pak Budi, meja Bos, ikon quest |
| Meja Sekretaris | Minigame pembukuan dan laporan | PC, telepon internal, buku kas |
| Arsip | Ambil/cocokkan bukti transaksi | lemari dokumen, map nota, printer |
| Gudang/Toko | Beli stok, hitung barang dan pelajari jual-beli | rak buku, rak pulpen, stok, pelanggan NPC |
| Ruang Pemasaran | Memproses biaya promosi dan diskon | NPC Sari, poster iklan |
| Ruang Meeting | Laporan ke Bos, cerita tiap hari & ending | kursi rapat, layar laporan |

**Jalur:** pintu antarruang dan lorong harus saling tersambung serta tidak terhalang kolider. Gunakan penanda panah quest di dunia dan mini-peta teks/ikon agar siswa tidak tersesat. Hindari labirin.

### Karakter

| Karakter | Peran | Sifat/dialog |
|---|---|---|
| **Pemain: Sekretaris** | Tokoh tunggal yang dikendalikan siswa | Ramah, penasaran, bisa berganti warna baju |
| **Pak Budi** | Bos / pemberi seluruh quest utama | Memberi instruksi 1–2 kalimat; memberi pujian, menjelaskan perbaikan |
| **Kak Sari** | Staff pemasaran NPC | Menjelaskan diskon, biaya promosi, angka penjualan |
| **Pak Doni** | Petugas gudang NPC | Membantu mencocokkan nota dengan stok |
| **Pelanggan NPC** | Pembeli dalam toko | Muncul pada quest jual-beli, mengucapkan permintaan sederhana |

**Quest selalu berasal dari Pak Budi**, disampaikan saat bertemu di Ruang Bos atau melalui telepon internal/pesan komputer setelah quest sebelumnya. Ini menghindari pemain bolak-balik ke kantor Bos setiap 2 menit, tetapi identitas pemberi tugas tetap konsisten.

## 5. Cara bermain / UX

1. **Menu awal:** Main Baru, Lanjutkan, Cara Bermain, Suara, Hapus Progres (minta konfirmasi dua langkah). Nama panggilan siswa **opsional**, tidak wajib mengumpulkan identitas pribadi.
2. **Intro:** layar teks singkat "Hari 1: Selamat Datang". Pemain spawn di Lobi dan mendapat penanda bicara kepada Pak Budi.
3. **Eksplorasi:** gerak **WASD/panah**, dekati karakter/objek, tekan **E** atau **Spasi** untuk interaksi; **Enter** meneruskan dialog, **Esc** menutup panel, **M** menampilkan petunjuk map, **J** membuka buku misi.
4. **Quest:** panel mini *instruksi*, *lokasi*, *petunjuk*; klik objek kerja untuk membuka tantangan. Saat berhasil, ada animasi stempel **SELESAI**, EXP +50, transaksi otomatis **sekali saja** jika quest memang menghasilkan transaksi.
5. **Penyelesaian hari:** quest keempat setiap hari adalah audit/rapat/laporan, lanjut ke hari berikutnya (transisi pagi hari dengan dialog).
6. **Akhir:** pada quest ke-20, tampil ringkasan keuangan dan sertifikat virtual yang bisa dicetak dari browser (print stylesheet). Tombol main ulang tersedia; jangan otomatis menghapus arsip tanpa konfirmasi.

### HUD (antarmuka)

- Kiri atas: Hari 1/5, Level Sekretaris, bar EXP.
- Kanan atas: Ringkasan kas perusahaan (Rp), ikon Menu/Suara.
- Kiri bawah: Bantuan tombol gerak dan interaksi (menghilang setelah tutorial).
- Kanan bawah: Quest aktif + arah/lokasi + tombol lihat petunjuk.
- Dialog memakai kotak bawah agar peta tetap terlihat. Saat minigame/laporan, game pause sehingga siswa bisa fokus.
- Panel desktop maksimal 760px, responsive, tidak memotong teks pada 1366×768 atau 1280×720. Jika ditambahkan kontrol sentuh, pakai d-pad dan tombol E tanpa mengganggu desktop.

## 6. Sistem ekonomi dan akuntansi — wajib akurat

Nama bisnis dalam cerita: **Kantor Pelangi — toko perlengkapan sekolah**. Semua uang adalah **uang virtual**; **modal awal Rp500.000**. Barang hanya dua supaya sederhana: **Buku tulis** (harga beli Rp8.000; harga jual Rp12.000) dan **Pulpen** (harga beli Rp4.000; harga jual Rp7.000).

Pisahkan:
- `cash`: kas perusahaan; bertambah saat menerima modal/penjualan, berkurang saat membeli persediaan/membayar biaya.
- `inventory`: jumlah barang dan nilai harga belinya (persediaan adalah **aset**, bukan langsung biaya laba-rugi).
- `salesRevenue`: omzet/pendapatan dari penjualan (setelah diskon).
- `cogs`/HPP: **harga beli barang yang sudah terjual**, bukan seluruh pembelian stok.
- `operatingExpenses`: biaya promosi, listrik, dan kemasan.
- `profit = salesRevenue - cogs - operatingExpenses`.
- Rumus pemeriksaan keseimbangan setiap akhir quest: **kas + nilai persediaan = modal disetor + laba kumulatif** (tidak ada utang, piutang, atau penarikan pemilik dalam versi awal).

**Penting:** transaksi yang sekadar mengecek nota, mengoreksi jawaban, atau membuka laporan **TIDAK mencatat transaksi yang sama lagi**. Gunakan `transaction_id` unik dan transaksi atomik/idempoten, terutama jika panel dibuka berulang dan setelah refresh. Simpan nominal dalam **integer rupiah**, jangan floating-point untuk kas.

### Data hasil akhir yang menjadi acuan tes

| Hari | Omzet harian | HPP harian | Biaya harian | Laba/rugi harian | Kas akhir hari | Nilai persediaan akhir |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | Rp0 | Rp0 | Rp0 | Rp0 | Rp340.000 | Rp160.000 |
| 2 | Rp156.000 | Rp104.000 | Rp20.000 | Rp32.000 | Rp476.000 | Rp56.000 |
| 3 | Rp90.000 | Rp56.000 | Rp0 | Rp34.000 | Rp526.000 | Rp40.000 |
| 4 | Rp42.600 | Rp28.000 | Rp15.000 | -Rp400 | Rp553.600 | Rp12.000 |
| 5 | Rp67.000 | Rp44.000 | Rp5.000 | Rp18.000 | Rp575.600 | Rp8.000 |

**Seluruh game:** omzet **Rp355.600**, HPP **Rp232.000**, biaya operasional **Rp40.000**, laba kumulatif **Rp83.600**, saldo kas akhir **Rp575.600**, nilai stok tersisa **Rp8.000**, total aset **Rp583.600**. Stok akhir: **1 buku, 0 pulpen**.

**Catatan guru:** Hari 4 sengaja rugi **Rp400** sebagai bahan refleksi. Game harus menjelaskan bahwa rugi kecil bukan kegagalan total dan pemain bisa memperbaiki keputusan.

## 7. Paket 20 quest (empat tugas × lima hari)

> `quest_data_reference.json` memuat data semua quest, jawaban benar, instruksi, operasi transaksi, hadiah EXP, saldo acuan, dan jurnal kejadian yang sudah dihitung otomatis. Gunakan file itu sebagai **fixtures** tes, bukan cukup dijadikan teks yang ditampilkan saja.

| Quest | Nama | Lokasi | Mekanik mini-game | Jawaban acuan |
|---|---|---|---|---|
| D1Q1 | Hari Pertama di Kantor | Ruang Bos | input-amount | modal: Rp500.000 |
| D1Q2 | Pesanan Buku Baru | Gudang/Toko | invoice-calculation | total_nota: Rp160.000 |
| D1Q3 | Periksa Nota Supplier | Meja Sekretaris | document-match | status: sesuai, total: Rp160.000 |
| D1Q4 | Laporan Hari Pertama | Komputer Sekretaris | report-builder | kas: Rp340.000, persediaan: Rp160.000, laba: Rp0 |
| D2Q5 | Penjualan Pagi | Meja Sekretaris/Toko | cashier-total | omzet: Rp96.000, hpp: Rp64.000 |
| D2Q6 | Penjualan Siang | Komputer Sekretaris | income-expense-sort | omzet: Rp60.000, arus_kas: masuk |
| D2Q7 | Bayar Iklan Toko | Ruang Pemasaran | expense-approval | biaya_iklan: Rp20.000, kategori: promosi |
| D2Q8 | Rapat Hasil Penjualan | Ruang Meeting | report-builder | omzet: Rp156.000, hpp: Rp104.000, biaya: Rp20.000, laba: Rp32.000 |
| D3Q9 | Stok Pulpen Menipis | Gudang/Toko | invoice-calculation | total_nota: Rp40.000 |
| D3Q10 | Penjualan Pulpen | Toko | cashier-total | omzet: Rp42.000, sisa_pulpen: Rp4 |
| D3Q11 | Hitung Stok Buku | Gudang/Toko | stock-count | omzet: Rp48.000, sisa_buku: Rp3 |
| D3Q12 | Laporan Persediaan | Komputer Sekretaris | report-builder | kas: Rp526.000, omzet: Rp90.000, laba: Rp34.000 |
| D4Q13 | Promo Diskon Buku | Ruang Pemasaran | discount-calculator | pembayaran: Rp21.600, diskon_total: Rp2.400 |
| D4Q14 | Pesanan Pulpen Sore | Toko | cashier-total | omzet: Rp21.000, sisa_pulpen: Rp1 |
| D4Q15 | Tagihan Listrik | Ruang Arsip | receipt-category | biaya: Rp15.000, kategori: listrik |
| D4Q16 | Meeting Saat Rugi | Ruang Meeting | report-builder | laba: -Rp400, kas: Rp553.600 |
| D5Q17 | Restok Menjelang Penutupan | Gudang/Toko | invoice-calculation | total_nota: Rp40.000 |
| D5Q18 | Penjualan Terbesar | Toko | cashier-total | omzet: Rp60.000, sisa_buku: Rp1 |
| D5Q19 | Penjualan dan Kemasan | Meja Sekretaris | two-step-transaction | penjualan: Rp7.000, biaya_kemasan: Rp5.000 |
| D5Q20 | Laporan Akhir dan Wisuda | Ruang Meeting | final-report | laba_total: Rp83.600, kas_akhir: Rp575.600, stok_akhir: Rp8.000 |

**Keanekaragaman mini-game:** input nominal lewat kalkulator; simulasi kasir; pilih *uang masuk/keluar*; cocokan nota dan stok; klasifikasi bukti transaksi; hitung diskon; drag-and-drop nota ke arsip; menyusun laporan bertahap. Jangan buat seluruh quest sekadar memilih salah satu dari tiga jawaban. Setiap quest harus melibatkan dunia kantor, minimal satu objek atau NPC.

### Cerita dan peristiwa per hari

- **Hari 1 – Masuk kerja:** Berkenalan, menerima modal, membeli buku, mengarsip nota, laporan pertama. Ruang sekretaris/arsip terbuka.
- **Hari 2 – Toko ramai:** Penjualan buku, biaya promosi, meeting laba pertama. Ruang pemasaran aktif.
- **Hari 3 – Bisnis berkembang:** Tambah pulpen, stok menyusut, belajar omzet dan HPP. NPC pelanggan bertambah.
- **Hari 4 – Tantangan rugi:** Diskon menarik pelanggan, bayar listrik, ternyata laba harian **−Rp400**; rapat memberi penjelasan positif.
- **Hari 5 – Ujian akhir:** Belanja stok, penjualan, biaya kemasan, laporan final dan sertifikat.

**Anti-stuck:** Jika pemain menjawab salah 2 kali, munculkan petunjuk tambahan; setelah 4 kali, tampilkan rumus/contoh langkah (pemain tetap mengetik hasil) agar tidak terkunci. Penghitungan benar menghasilkan feedback plus alasan singkat.

## 8. Sistem progres, reward, dan penyimpanan

- 20 quest, **50 EXP/quest**, total **1.000 EXP** untuk menyelesaikan cerita. Bar EXP dan title naik dari "Anak Magang" → "Staf Baru" → "Staf Terampil" → "Sekretaris Andal" → "Sekretaris Hebat" berdasarkan hari/progres.
- Quest keempat setiap hari mewajibkan laporan/meeting, jadi **tidak boleh melewati laporan** untuk melanjutkan cerita.
- Simpan state selepas setiap misi berhasil, tiap perubahan transaksi, dan saat transisi hari melalui **`localStorage`** dengan key versi `secretaryQuest.v1.save`. Tambahkan tombol ekspor/impor save JSON opsional bila memungkinkan.
- State utama minimal: `schemaVersion`, `playerName`, `day`, `activeQuestId`, `completedQuestIds`, `appliedTransactionIds`, `cash`, `stock`, `ledger`, `exp`, `position`, `settings`, `unlockedAreas`, `certificateEarned`.
- Saat load, validasi data dan `schemaVersion`; bila data rusak, tawarkan pemulihan/reset dengan konfirmasi. **Jangan menyimpan posisi saat pemain berada pada tile collision.**
- Nilai individual: akurasi 40%, ketuntasan 30%, pemahaman laporan 20%, eksplorasi/membaca petunjuk 10%. Boleh cetak "ringkasan belajar" tanpa perlu data akun sekolah.
- State dipakai hanya pada perangkat dan browser yang sama. Tidak menyatakan adanya sinkronisasi antardevice tanpa backend.

## 9. Detail implementasi teknis

**Teknologi:** HTML5, CSS3, JavaScript ES Modules, **Phaser 3.x** untuk scene, Arcade Physics, sprite, collision, tilemap/kamera/audio. Simpan Phaser versi terkunci di proyek dan pastikan game berfungsi setelah deployment HTTPS. Tidak perlu React, Vue, Node backend, SQL, login, atau cloud storage. Node/NPM *boleh* untuk build/lint/test lokal jika Work membutuhkan, **hasil rilis akhir tetap berkas statis** untuk GitHub Pages.

Usulan struktur proyek:

```text
secretary-quest/
├── index.html
├── README.md
├── LICENSE_ASSETS.md
├── package.json                 # opsional untuk test/build
├── src/
│   ├── main.js
│   ├── config.js
│   ├── scenes/BootScene.js
│   ├── scenes/MenuScene.js
│   ├── scenes/OfficeScene.js
│   ├── scenes/UIScene.js
│   ├── scenes/EndingScene.js
│   ├── systems/QuestManager.js
│   ├── systems/Economy.js
│   ├── systems/Inventory.js
│   ├── systems/SaveManager.js
│   ├── systems/DialogManager.js
│   ├── systems/InteractionManager.js
│   ├── ui/MiniGamePanels.js
│   ├── data/quests.json
│   └── data/dialogues.js
├── assets/
│   ├── sprites/
│   ├── tiles/
│   ├── audio/
│   └── ui/
└── tests/
    ├── economy.test.js
    ├── quests.test.js
    └── e2e.spec.js
```

Jika Work memilih menggunakan HTML canvas untuk sprite procedural yang dibuat sendiri, boleh, tetapi hasil akhir tetap harus terasa seperti game pixel-art dengan **gerak sprite** dan world collision nyata, bukan papan teks yang diklaim game.

**State machine quest:** `LOCKED → AVAILABLE → IN_PROGRESS → COMPLETED` (atau `RETRY` yang kembali ke `IN_PROGRESS`). Selesaikan hanya quest aktif; setiap quest punya prasyarat quest sebelumnya. Side effect ke ekonomi hanya saat validasi sukses dan dilakukan tepat sekali. Jendela UI dialog/minigame harus pause world movement (hindari salah tekan).

**Perhitungan dan validasi:** utamakan pure functions seperti `computeSale()`, `applyTransaction()`, `getDailySummary()`, `getLifetimeSummary()`, `validateQuestAnswer()`, `saveGame()`; uji melalui fixture data. Pisahkan `ledger` dari UI dan replay/idempotency. Untuk laporan harian, gunakan field `day` yang disimpan pada transaksi; jangan mengira laporan dari saldo kas saja.

**Aset:** prefer sprite dan tiles original / CC0. Sediakan set minimal pemain, Pak Budi, Kak Sari, Pak Doni, pelanggan, furniture (meja, lemari, rak, pintu, printer, komputer, kursi, tanaman), icon kertas/stempel, efek UI, suara sederhana. Optimalkan atlas sprites untuk meminimalkan request dan gunakan aset 2D kecil agar tidak lag di laptop sekolah.

**Performa dan aksesibilitas:** 60 FPS target untuk laptop sedang, 30 FPS tetap playable; batasi physics dan animasi, jangan gunakan video berukuran besar, font mudah dibaca, suara bisa dimute, `prefers-reduced-motion` untuk confetti, tombol keyboard dan klik. Tidak ada iklan, pelacakan, pembayaran nyata, atau chat publik untuk anak-anak.

## 10. Penerapan ke GitHub Pages / alternatif

Karena seluruh game single-player berbasis berkas statis, **GitHub Pages sesuai**. Tambahkan `.nojekyll` bila dibutuhkan oleh pipeline asset, periksa path relatif ketika website berada pada `https://username.github.io/nama-repo/`, dan uji refresh di subfolder. Jika menggunakan bundler, atur `base`/`publicPath` sesuai repo. Alternatif upload simpel: **Netlify Drop** atau **itch.io HTML5**.

**Jangan mengaku website telah online jika belum benar-benar di-deploy dan URL diuji.** Jika butuh kredensial/izin akun GitHub/Netlify, minta akses melalui alur resmi; jangan meminta kata sandi atau token ditempel di chat. Jika Work tidak dapat mengakses akun hosting, kirim **folder siap deploy + prosedur singkat**, bukan URL karangan.

## 11. Uji penerimaan yang wajib dijalankan

1. Menu *Main Baru → tutorial → Bos → kerjakan Q1 → simpan* berfungsi dari awal.
2. Kamera/map mengikuti pemain; dinding dan furnitur tidak tembus; interaksi berjarak maksimal 1–2 tile.
3. Semua 20 quest bisa dikerjakan berurutan, membuka ruang dan dialog yang relevan; tidak ada quest yang terlewat.
4. Semua jawaban dan transaksi sesuai `quest_data_reference.json` termasuk Q13 diskon 10%, Q16 rugi Rp400, Q19 dua transaksi dan Q20 ending.
5. Membuka panel, menekan tombol dua kali, pergi ke map lain, refresh, atau load **tidak menggandakan kas, stok, biaya, EXP, atau transaksi**.
6. Laporan harian dan akhir cocok dengan tabel ekonomi di dokumen ini.
7. **Setelah semua quest**, kas Rp575.600, stok 1 buku, nilai stok Rp8.000, omzet Rp355.600, HPP Rp232.000, biaya Rp40.000, laba Rp83.600.
8. Simpan/lanjutkan setelah Q7, Q13, dan Q19 kembali ke status persis yang seharusnya; hapus progres harus meminta konfirmasi.
9. Tampilan dan tombol berfungsi di Chromium desktop resolusi 1280×720 dan 1366×768; suara mute, fullscreen (jika ada), ESC serta keyboard semuanya bekerja.
10. Tidak ada request 404 aset, error JavaScript, tautan rusak, layar hitam, UI terpotong, atau tampilan kotak placeholder yang tersisa.
11. Jika di-host GitHub Pages, verifikasi URL HTTPS dari browser lain / mode incognito; tidak ada hardcoded `localhost` atau asset URL dengan base salah.
12. Sediakan README berisi cara menjalankan lokal (jika ES modules, gunakan static local server, bukan double-click file HTML), cara deploy, cara reset save, penjelasan fitur dan daftar sumber aset.

## 12. Urutan kerja di ChatGPT Work

1. Buat seluruh proyek dan struktur sumber dari blueprint ini.
2. Rancang dan implementasikan map 2D beserta assets pixel art legal/orisinal, NPC, animasi, UI dan navigasi.
3. Implementasikan engine ekonomi yang menghasilkan hasil pada tabel acuan dan uji otomatis.
4. Masukkan **20 quest lengkap**, lima hari cerita, ragam minigame, meeting, progres, laporan, penyimpanan.
5. Jalankan tes ekonomi, tes quest, dan tes pengalaman nyata di browser; perbaiki sampai semua acceptance criteria lulus.
6. Polish: sfx, hint, animasi, transisi, ukuran HUD, loading dan penyederhanaan bahasa.
7. Build berkas statis, lakukan publikasi jika akses tersedia, buka tautan dan verifikasi bisa dimainkan dari awal sampai akhir.
8. Serahkan source lengkap, URL aktif jika ada, tutorial bermain, dan catatan tes yang benar-benar dilakukan.

**Aturan penting untuk pelaksana:** Jangan berhenti setelah menghasilkan mockup, screenshot, menu awal, atau rencana. Prioritaskan game sungguhan yang lengkap dan stabil. Jika ada keterbatasan alat, laporkan secara jujur bagian yang sudah diuji dan yang belum, beserta berkas siap lanjut. Jangan mengurangi jumlah quest ataupun menjadikan sekretaris hanya kuis tanpa map.
