# Panduan guru — Secretary Quest

Sasaran: SMP 7–9. Satu pemain per browser. Estimasi satu sesi penuh 60–90 menit, atau lima sesi 15–20 menit. Estimasi pedagogis ini belum diukur melalui uji kelas.

## Tujuan belajar

Siswa membedakan modal, kas, persediaan, omzet, harga pokok penjualan, dan biaya; memeriksa bukti; mengurangi stok ketika barang terjual; menyusun laporan; serta memahami bahwa perusahaan dapat mengalami rugi harian meskipun kas bertambah.

## Persiapan

1. Jalankan game dari server lokal atau GitHub Pages yang sudah Anda uji. Untuk ruang komputer, lebih praktis satu URL hosting; setiap siswa punya save sendiri.
2. Siapkan kalkulator/kertas coretan bila diperlukan. Tidak perlu memperkenalkan debit-kredit sebelum bermain.
3. Jelaskan bahwa seluruh uang dan transaksi virtual. Nama panggilan boleh kosong.
4. Lakukan tutorial bersama: lobi → Bos → modal → komputer → latihan → gudang.
5. Minta siswa menyimpan bukti belajar melalui sertifikat PDF dan ekspor save, tanpa mengirim data pribadi yang tidak diperlukan.

## Tahapan pembelajaran

| Hari | Quest | Fokus | Refleksi |
|---|---|---|---|
| 1 | 1–4 | Modal, pembelian stok, verifikasi nota, laporan | Mengapa pembelian buku tidak langsung mengurangi laba? |
| 2 | 5–8 | Omzet, HPP, promosi, rapat pertama | Apakah Rp156.000 omzet sama dengan laba? |
| 3 | 9–12 | Restok pulpen, penjualan, sisa barang | Apa akibat barang terjual terhadap kas dan stok? |
| 4 | 13–16 | Diskon 10%, listrik, rugi Rp400 | Mengapa kas bertambah walaupun hari ini rugi? |
| 5 | 17–20 | Restok, dua transaksi, laporan akhir | Mengapa Rp575.600 kas akhir bukan laba total? |

Ruang pemasaran dan rapat aktif mulai hari kedua. Semua quest diberikan Pak Budi; NPC lain hanya membantu. Pemain tidak perlu kembali ke Bos setelah setiap quest karena pesan bisa dibuka pada objek tugas.

## Angka audit guru

| Hari | Omzet | HPP | Biaya | Laba/rugi | Kas akhir | Nilai stok |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 0 | 0 | 0 | 340.000 | 160.000 |
| 2 | 156.000 | 104.000 | 20.000 | 32.000 | 476.000 | 56.000 |
| 3 | 90.000 | 56.000 | 0 | 34.000 | 526.000 | 40.000 |
| 4 | 42.600 | 28.000 | 15.000 | −400 | 553.600 | 12.000 |
| 5 | 67.000 | 44.000 | 5.000 | 18.000 | 575.600 | 8.000 |
| Total arus laba-rugi | 355.600 | 232.000 | 40.000 | 83.600 | — | — |

Akhir: kas Rp575.600 + persediaan Rp8.000 = aset Rp583.600 = modal Rp500.000 + laba Rp83.600. Sisa 1 buku dan 0 pulpen. Pembelian total Rp240.000; hanya Rp232.000 menjadi HPP, sisanya Rp8.000 masih persediaan.

Catatan koreksi satuan blueprint: sisa pulpen/buku adalah **buah**, bukan rupiah. Implementasi memakai data JSON dengan satuan buah di label UI.

## Kunci jawaban 20 quest

Lihat `tests/fixture.json` untuk jawaban rinci dan semua transaksi. File fixture adalah acuan pengujian, bukan output ekonomi yang disuntikkan ke mesin; perhitungan ledger dibuat melalui transaksi aktual.

## Penilaian yang ditampilkan

- Akurasi (40): jumlah quest selesai dibagi total percobaan. Kesalahan tahap form juga dihitung.
- Ketuntasan (30): quest selesai / 20.
- Pemahaman laporan (20): laporan harian yang selesai / 5. Ini indikator berbasis penyelesaian, **bukan** penilaian mendalam terhadap alasan siswa.
- Eksplorasi/petunjuk (10): jumlah ruang berbeda yang dikunjungi + catatan bantuan berbeda yang dibaca, maksimal 10.

Nilai dibulatkan menjadi 0–100. Gunakan sebagai umpan balik formatif; tambahkan tanya jawab lisan untuk menilai pemahaman sesungguhnya. Tidak ada hukuman uang atau timer. Sertifikat adalah sertifikat kegiatan virtual, bukan sertifikasi kompetensi profesi.

## Pertanyaan tindak lanjut

1. Mengapa cek nota pada Q3 tidak mengurangi kas lagi? (Pembelian sudah tercatat Q2.)
2. Mengapa diskon mengurangi omzet tetapi tidak mengubah HPP per buku? (Harga beli barang tidak berubah.)
3. Mengapa persediaan dicatat dengan harga beli, bukan harga jual? (Nilai modal aset yang belum terjual.)
4. Q19 menerima Rp7.000 tetapi keluar Rp5.000 dan ada HPP Rp4.000. Berapa kontribusi labanya? (−Rp2.000.)
5. Apakah rugi Rp400 hari keempat berarti seluruh usaha rugi? (Tidak; laba kumulatif tetap positif.)

## Checklist sebelum penggunaan kelas

Karena pengujian browser belum dapat dilakukan di lingkungan pembuatan, jalankan skrip Playwright atau uji manual sebelum penggunaan kelas. Pastikan karakter berjalan, collider bekerja, tidak ada aset hilang, input berfungsi, semua tombol dapat dijangkau pada resolusi laptop sekolah, dan PDF sertifikat terbaca. Panduan rinci ada di `HASIL_TES.md`.
