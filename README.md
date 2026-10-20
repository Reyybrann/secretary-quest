# Secretary Quest — Office Adventure · Tycoon HD 2D

Game single-player Bahasa Indonesia untuk SMP kelas 7–9. HTML/CSS/JavaScript ES Modules + Phaser **3.90.0**, tanpa database, akun, backend, CDN saat bermain, atau build wajib.

**Status pengiriman:** implementasi 20 quest lengkap; **16 tes Node/DOM lulus**. Pengujian Chromium grafis, FPS, hasil cetak nyata, dan hosting HTTPS **belum dijalankan** karena kontrol browser yang didukung lingkungan pengerjaan tidak tersedia. GitHub belum terhubung. Paket ini belum diklaim terbit atau lulus semua acceptance test browser. Detail: `docs/HASIL_TES.md`.

## Pembaruan visual 1.1.0

Grafik kini kartun top-down ala tycoon: karakter chibi bergaris halus, furnitur membulat, lantai kotak pastel, dan bayangan lembut. Perubahan ini mengikuti permintaan terbaru pengguna, menggantikan target pixel art pada blueprint awal; aturan 20 quest dan akuntansi tetap sama.

- Texture karakter 64×96, furnitur 128×128; ditampilkan kecil dan digunakan ulang. Art dibuat saat boot, bukan diulang setiap frame.
- Lantai, garis ubin, papan nama, dan bayangan dinding digabung menjadi satu tekstur statis.
- Zoom awal 150%; tombol Zoom di bawah mengganti 100%, 125%, atau 150%.
- Tidak memakai model 3D, video, font online, atau blur real-time. Total area tekstur yang dihasilkan sekitar 7,30 MiB data RGBA mentah (bukan total RAM/GPU game dan bukan pengukuran FPS).
- Semua 16 tes Node/DOM tetap lulus. Render aset diperiksa melalui Canvas Node; pengujian browser grafis/FPS masih belum tersedia.
- Save dari versi 1.0 tetap memakai key dan schema yang sama. Gunakan browser serta alamat/port yang sama, atau ekspor/impor save.

## Mulai bermain di Windows

1. Ekstrak ZIP. Buka folder `secretary-quest`.
2. Jika Node.js sudah terpasang, klik dua kali **MULAI_WINDOWS.bat**.
3. Browser membuka `http://127.0.0.1:8080`. Jika belum terbuka, tunggu server lalu refresh.
4. Biarkan jendela server terbuka selama bermain. Tutup jendela itu untuk menghentikan server.
5. Klik **Main Baru**, isi nama panggilan opsional, pilih satu dari tiga warna, lalu mulai.

Alternatif VS Code: buka folder ini, gunakan ekstensi Live Server, lalu buka `index.html` dengan Live Server. **Jangan double-click index.html menggunakan file://**, karena ES Modules memerlukan HTTP.

Cara terminal (Node.js 20+):

```sh
cd secretary-quest
npm start
```

`npm install` tidak diperlukan untuk bermain. Jika Node.js tidak tersedia tetapi Python tersedia: `python -m http.server 8080`, kemudian buka alamat di atas. Internet diperlukan untuk mengunduh paket pertama kali / mengunjungi hosting; game tidak memanggil layanan eksternal saat bermain.

## Cara bermain

- **WASD / panah**: jalan; **E / Spasi**: interaksi dari jarak maksimal 64 px.
- Klik objek hanya bekerja saat karakter sudah dekat. Tidak ada teleport dalam menu pemain.
- **M**: peta; **J**: buku misi; **Esc**: tutup panel; **Enter**: lanjut dialog.
- Panah emas dan teks arah menandai tempat tugas. Peta menampilkan enam ruang yang terhubung lewat lobi.
- Bos memberi seluruh tugas; pesan berikutnya dapat diterima melalui telepon internal pada objek tugas.
- Tutorial: berjalan ke Bos → menerima modal → komputer sekretaris → latihan → gudang.
- Jawab dengan integer rupiah: `160000`, `160.000`, atau `Rp 160.000`. Rugi ditulis `-400`. Stok menggunakan **buah**, bukan rupiah.
- Tidak ada timer. Dua jawaban salah membuka petunjuk; empat kesalahan menampilkan contoh langkah.
- Rapat/laporan tiap hari wajib selesai untuk membuka hari berikutnya.

## Fitur yang diimplementasikan

- Dunia 42×30 tile / 1344×960 px; kamera mengikuti pemain, collider dinding dan furnitur, sprite empat arah / tiga frame berjalan dan tiga palet avatar.
- Ruang Bos, sekretaris, arsip, gudang/toko, pemasaran, rapat; lobi penghubung; NPC Pak Budi, Sari, Doni, serta pelanggan.
- 20 quest / 5 hari dari lampiran, disalin ke data runtime; 50 EXP dan 1 token per misi.
- Kalkulator modal, nota pembelian, kasir, pilah uang masuk/keluar, arsip drag-and-drop + alternatif tombol, kategori bukti, hitung stok dengan token buku, diskon, laporan bertahap, dan transaksi dua tahap.
- Ledger idempoten dengan 15 ID unik. Uang integer, perbedaan kas/persediaan/omzet/HPP/biaya/laba, invariant aset = modal + laba.
- Autosave satu snapshot per perubahan / interval posisi aman; validasi load dengan replay ledger; impor/ekspor JSON; reset dua konfirmasi.
- Dekorasi tanaman dan karpet memakai token, tidak memengaruhi kas perusahaan.
- Suara pencapaian sintetis dan mute, confetti mengikuti preferensi reduced motion.
- Ending, sertifikat virtual, ringkasan nilai belajar, CSS print untuk simpan PDF lewat browser.

## GitHub Pages (tanpa npm di hosting)

1. Buat repository GitHub, misalnya `secretary-quest`. Untuk alur paling sederhana gunakan repository Public.
2. Pilih **Add file → Upload files**. Unggah **isi** folder `secretary-quest`, bukan ZIP. `index.html`, `style.css`, folder `src`, `assets`, dan `vendor` harus berada di root repository. Sertakan `.nojekyll` (buat lewat Add file → Create new file bila file tersembunyi tidak terunggah).
3. Commit ke branch `main`.
4. Buka **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
5. Pilih **main**, **/(root)**, lalu **Save**. Tunggu proses Pages selesai.
6. Gunakan URL yang benar-benar ditampilkan GitHub Pages. Buka URL tersebut dalam mode incognito, jalankan misi pertama, refresh, lalu Lanjutkan. Cek tidak ada 404 atau error di Console.
7. Setelah teruji, bagikan URL itu kepada guru/siswa. Laptop Anda tidak perlu tetap hidup. Mereka boleh memakai jaringan berbeda; setiap browser mempunyai progres sendiri.

Semua referensi runtime relatif (`./src`, `vendor`, `assets`), sehingga mendukung subfolder repository. Tidak ada domain contoh yang diklaim sebagai URL aktif.

Dokumentasi resmi: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site (dicek 20 Oktober 2026).

## Pengujian

```sh
npm install
npm test
npx playwright install chromium
npm run test:browser
```

`npm test`: ekonomi, urutan quest, replay/idempotensi, save rusak, nilai laporan lima hari, aksesibilitas jalur geometris, asset relatif, dan integrasi DOM. DOM memakai jsdom, **bukan browser grafis**. Tanpa dependency jsdom, test DOM ditandai skip; test ekonomi lainnya tetap jalan.

`npm run test:browser`: skrip Playwright tersedia untuk 1280×720 dan 1366×768, **belum dijalankan di lingkungan pembuatan**. Skrip full quest mengatur posisi karakter untuk mempercepat pengujian form; tes gerakan/collision menggunakan keyboard. Penjelajahan seluruh rute secara manual tetap bagian checklist. Jangan mengubah status belum terverifikasi menjadi lulus tanpa menjalankan tes.

## Struktur dan pengembangan

- `src/data.js`: produk + seluruh quest; sumber `tests/fixture.json`.
- `src/engine.js`: transaksi murni, ledger, progres, parse rupiah, replay save, penilaian.
- `src/world.js`: geometri map dan target quest; dipakai untuk tes keterjangkauan.
- `src/art.js`: generator texture kartun tycoon orisinal; tidak membutuhkan gambar eksternal.
- `src/office.js`: Phaser scene, fisika, kamera, input, interaksi.
- `src/main.js`: menu, dialog, minigame, laporan, autosave, sertifikat.
- `vendor/`: Phaser terkunci dan lisensinya, disertakan agar runtime tidak bergantung CDN.
- `tests/`: fixture asli, unit / integrasi DOM, dan browser test.
- `docs/`: blueprint, panduan guru, laporan tes, output tes mentah.

Ekonomi sengaja tidak diperluas melalui pembelian bebas: transaksi terikat 20 quest agar semua siswa memiliki hasil acuan yang sama. Ini media latihan, bukan sistem ujian antikecurangan. Kunci jawaban memang dapat dilihat di source statis.

## Simpan, pindah perangkat, dan reset

Key: `secretaryQuest.v1.save`. Progres hanya di browser/perangkat yang sama; beda origin/port mempunyai save terpisah. Gunakan Menu → Panduan & pengaturan → Ekspor Save / Impor Save untuk pindah perangkat. Save tidak terverifikasi ditolak dan dapat diunduh untuk pemulihan; tidak otomatis ditimpa. Hapus Progres meminta dua konfirmasi. Nama opsional hanya disimpan lokal. Tidak ada analitik atau pengumpulan data siswa.

## Jika ada masalah

- Menu tidak muncul: periksa seluruh folder `vendor` ikut diekstrak, dan buka lewat HTTP.
- Progres tidak muncul: gunakan browser dan alamat/port yang sama; impor file save jika pindah.
- Simpan gagal: browser mungkin melarang penyimpanan; ekspor save melalui menu sebelum menutup.
- Salah jawab: lihat Buku Kas / petunjuk; angka HPP memakai harga **beli** barang terjual.
- Tidak dapat berinteraksi: dekatkan karakter sampai muncul petunjuk **E**, lalu tekan sekali.
- Panel panjang: gulir di panel. Tombol tidak perlu dicapai dengan mengubah zoom browser.

Sumber aset dan izin ada di `LICENSE_ASSETS.md`.
