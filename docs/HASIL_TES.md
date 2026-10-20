# Laporan pengujian aktual

Tanggal pengerjaan: 20 Oktober 2026. Hasil aktual disimpan di `TEST_OUTPUT.txt`.

## Dijalankan: 16 tes lulus, 0 gagal, 0 dilewati

Perintah: `node --test tests/*.test.js` dengan jsdom 26.1.0 tersedia.

1. Menyelesaikan 20 quest dan membandingkan **seluruh 15 baris ledger**, seluruh field laporan akhir, dan kelima laporan harian terhadap fixture asli.
2. Jawaban salah pada seluruh quest tidak mengubah kas, stok, atau ledger.
3. Quest harus diterima dan tidak boleh dilompati.
4. Pemanggilan penyelesaian ganda, replay ID transaksi, dan membuka laporan tidak menggandakan transaksi / EXP.
5. Serialisasi dan restore setelah tiap quest, termasuk Q7, Q13, Q19; lanjut sampai ending.
6. Autosave menulis satu snapshot JSON valid.
7. Q19 dua transaksi atomik: salah satu jawaban salah berarti tidak ada transaksi diterapkan; hasil benar menambah kas Rp2.000 neto.
8. Transaksi yang kasnya tidak cukup / stok kurang / nominal negatif ditolak tanpa memutasi state asal.
9. Save rusak, versi salah, modifikasi saldo/ledger/progres/token ditolak.
10. Parsing rupiah menerima pemisah ribuan/minus; menolak kosong, teks asing, desimal, dan notasi eksponen.
11. Semua data runtime quest identik dengan lampiran JSON.
12. Semua asset/import relatif ditemukan; runtime tidak mengandalkan CDN, path absolut, atau localhost.
13. Integrasi **DOM simulasi jsdom**, bukan browser: Main Baru, tutorial, seluruh 20 form, jawaban salah, pilihan kategori, arsip tombol, slider diskon, hitung stok, laporan bertahap, load Q7/Q13/Q19, ending, sertifikat, dan reset dua langkah. Scene Phaser di-mock; fisika dan rendering tidak berjalan dalam tes ini.
14. Posisi spawn aman; pusat setiap collider ditolak sebagai posisi save.
15. BFS grid 8 px membuktikan semua enam objek tugas dapat dicapai dari lobi melalui geometri bebas collider.
16. Seluruh 20 quest menunjuk objek dunia yang valid.

Validasi tambahan: `node --check` untuk modul JavaScript dan skrip E2E, tidak ada kegagalan sintaks. Phaser 3.90.0 dan lisensi MIT-nya sudah dibundel lokal.

## Hasil ekonomi aktual

| Parameter | Hasil |
|---|---:|
| Quest selesai | 20 |
| Transaksi unik | 15 |
| EXP | 1.000 |
| Kas akhir | Rp575.600 |
| Omzet | Rp355.600 |
| HPP | Rp232.000 |
| Biaya | Rp40.000 |
| Laba total | Rp83.600 |
| Persediaan | 1 buku, 0 pulpen |
| Nilai persediaan | Rp8.000 |
| Aset | Rp583.600 |

## Belum diverifikasi

- Browser Chromium nyata pada 1280×720 / 1366×768, frame rate, gerakan/collision Phaser saat rendering, ukuran UI aktual, suara, dan hasil print PDF.
- Drag-and-drop native browser (DOM menguji alternatif tombol; E2E menyediakan drag test).
- Tidak adanya error console / request 404 dari browser sungguhan.
- Publikasi GitHub Pages, HTTPS, refresh di subfolder repository, mode incognito/perangkat lain.

**Penyebab:** skill Sites untuk lingkungan managed mensyaratkan kontrol browser yang didukung; kemampuan tersebut tidak tersedia. Sesuai instruksi skill, server preview / browser alternatif tidak dipasang atau dijalankan. GitHub juga belum terhubung. Ini batas verifikasi, bukan bukti bahwa seluruh acceptance criteria telah lulus.

## Cara menjalankan tes browser yang disertakan

```sh
npm install
npx playwright install chromium
npm run test:browser
```

Konfigurasi akan menjalankan server lokal dan dua resolusi desktop. Terdapat dua skenario per resolusi:

- Menu → tutorial → 20 quest → save/refresh → sertifikat; rekam error JavaScript dan respons aset gagal. Untuk efisiensi, posisi karakter diatur langsung mendekati objek; semua jawaban dimasukkan melalui panel pemain.
- Gerakan keyboard, collider furnitur, jarak interaksi, pause ketika panel terbuka, mute, dan reset dua konfirmasi.

Tes disediakan sebagai source dan **belum dieksekusi**. Laporan HTML/trace akan dibuat oleh Playwright saat dijalankan. Tambahkan uji jalan manual lewat semua pintu, klik objek, arsip via drag, Esc/Enter, scrolling, impor/ekspor save, serta pencetakan sertifikat.

## Setelah publikasi

Buka URL HTTPS yang benar-benar diberikan hosting, bukan URL perkiraan. Uji dengan incognito/perangkat lain. Refresh dan Lanjutkan sesudah misi pertama. Pastikan semua asset termuat di URL subfolder repository. Baru bagikan link tersebut sebagai game online.

## Verifikasi revisi visual 1.1.0

Seluruh 16 tes Node/DOM dijalankan ulang setelah perubahan visual dan tetap lulus. Generator art dijalankan melalui Canvas Node dan hasilnya diperiksa secara visual. Dihasilkan 86 entri tekstur (termasuk alias NPC dan lantai), sekitar 7,30 MiB RGBA mentah. Ini ukuran buffer ilustrasi, bukan konsumsi RAM/GPU keseluruhan dan bukan benchmark FPS.

Ukuran collider pemain dipetakan ulang agar tetap 20×14 px di dunia, meskipun resolusi sprite meningkat. Collider map, lokasi objek, stok, ledger, EXP, dan format save tidak diubah. Zoom kamera 100–150% tidak memindahkan objek di dunia.

Batas verifikasi browser dari bagian sebelumnya tetap berlaku. Pratinjau `PREVIEW_TYCOON.png` merupakan render kode aset, bukan screenshot game yang dijalankan di browser.
