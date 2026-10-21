export const DATA = {
  "products": {
    "BUKU": {
      "label": "Buku tulis",
      "cost": 8000,
      "base_price": 12000
    },
    "PULPEN": {
      "label": "Pulpen",
      "cost": 4000,
      "base_price": 7000
    }
  },
  "quests": [
    {
      "id": "D1Q1",
      "day": 1,
      "sequence": 1,
      "title": "Hari Pertama Bendahara",
      "issued_by": "Pak Budi",
      "place": "Ruang Ketua",
      "minigame": "input-amount",
      "briefing": "Selamat datang, bendahara baru! Saya Pak Budi, ketua Usaha Siswa Pelangi. Kamu bertanggung jawab mencatat kas dan melaporkan keuangan usaha.",
      "task": "Catat modal awal Rp500.000 yang diterima dari pemilik usaha melalui ketua.",
      "expected_answer": {
        "modal": 500000
      },
      "hint": "Modal adalah uang awal yang ditanamkan pemilik usaha.",
      "transactions": [
        {
          "type": "capital",
          "amount": 500000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D1Q2",
      "day": 1,
      "sequence": 2,
      "title": "Pembayaran Pembelian Buku",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Pak Doni memesan buku untuk toko. Periksa nota sebelum mencatat pembayaran dari kas usaha.",
      "task": "Hitung pembayaran pembelian 20 buku, Rp8.000 per buku, lalu catat sebagai persediaan.",
      "expected_answer": {
        "total_nota": 160000
      },
      "hint": "Kalikan jumlah barang dengan harga belinya.",
      "transactions": [
        {
          "type": "inventory_purchase",
          "sku": "BUKU",
          "quantity": 20,
          "unit_cost": 8000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D1Q3",
      "day": 1,
      "sequence": 3,
      "title": "Verifikasi Bukti Pembelian",
      "issued_by": "Pak Budi",
      "place": "Meja Bendahara",
      "minigame": "document-match",
      "briefing": "Sebagai bendahara, cocokkan nota dengan barang yang diterima Pak Doni. Simpan bukti pembayaran agar dapat diperiksa kembali.",
      "task": "Cocokkan 20 buku × Rp8.000 dengan nota Rp160.000. Pilih status dan arsipkan bukti pembelian; jangan membayar dua kali.",
      "expected_answer": {
        "status": "sesuai",
        "total": 160000
      },
      "hint": "Pemeriksaan nota yang sudah dibukukan tidak boleh mengurangi uang untuk kedua kalinya.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D1Q4",
      "day": 1,
      "sequence": 4,
      "title": "Laporan Kas Hari Pertama",
      "issued_by": "Pak Budi",
      "place": "Komputer Bendahara",
      "minigame": "report-builder",
      "briefing": "Ketua usaha menunggu laporan kas dan persediaan dari bendahara.",
      "task": "Laporkan saldo kas, nilai persediaan, dan laba akhir hari pertama.",
      "expected_answer": {
        "kas": 340000,
        "persediaan": 160000,
        "laba": 0
      },
      "hint": "Pembelian stok mengubah kas menjadi barang, bukan langsung biaya laba-rugi.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D2Q5",
      "day": 2,
      "sequence": 1,
      "title": "Catat Penerimaan Pagi",
      "issued_by": "Pak Budi",
      "place": "Meja Bendahara/Toko",
      "minigame": "cashier-total",
      "briefing": "Pak Doni menyerahkan hasil penjualan pagi. Periksa dan catat penerimaannya dalam buku kas.",
      "task": "Catat penjualan 8 buku @Rp12.000. Hitung omzet serta harga pokok barang terjual.",
      "expected_answer": {
        "omzet": 96000,
        "hpp": 64000
      },
      "hint": "Pendapatan = jumlah terjual × harga jual.",
      "transactions": [
        {
          "type": "sale",
          "sku": "BUKU",
          "quantity": 8,
          "unit_price": 12000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D2Q6",
      "day": 2,
      "sequence": 2,
      "title": "Pilah Penerimaan Siang",
      "issued_by": "Pak Budi",
      "place": "Komputer Bendahara",
      "minigame": "income-expense-sort",
      "briefing": "Toko melaporkan penjualan 5 buku. Tentukan arah arus kas untuk pencatatan bendahara.",
      "task": "Hitung penjualan 5 buku @Rp12.000 dan tandai sebagai uang masuk.",
      "expected_answer": {
        "omzet": 60000,
        "arus_kas": "masuk"
      },
      "hint": "Penjualan tunai membuat kas bertambah, tetapi stok berkurang.",
      "transactions": [
        {
          "type": "sale",
          "sku": "BUKU",
          "quantity": 5,
          "unit_price": 12000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D2Q7",
      "day": 2,
      "sequence": 3,
      "title": "Periksa Biaya Promosi",
      "issued_by": "Pak Budi",
      "place": "Ruang Pemasaran",
      "minigame": "expense-approval",
      "briefing": "Kak Sari mengajukan pembayaran iklan Rp20.000 yang telah disetujui ketua. Periksa jumlah dan kategori biayanya.",
      "task": "Catat pembayaran iklan Rp20.000 dari kas usaha sebagai biaya promosi.",
      "expected_answer": {
        "biaya_iklan": 20000,
        "kategori": "promosi"
      },
      "hint": "Biaya iklan mengurangi kas dan laba.",
      "transactions": [
        {
          "type": "expense",
          "label": "promosi",
          "amount": 20000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D2Q8",
      "day": 2,
      "sequence": 4,
      "title": "Rapat Laporan Bendahara",
      "issued_by": "Pak Budi",
      "place": "Ruang Rapat",
      "minigame": "report-builder",
      "briefing": "Sampaikan laporan keuangan kepada ketua usaha dan tim pemasaran. Jelaskan bahwa omzet berbeda dari laba.",
      "task": "Laporkan omzet, harga pokok barang terjual, biaya iklan, dan laba hari kedua.",
      "expected_answer": {
        "omzet": 156000,
        "hpp": 104000,
        "biaya": 20000,
        "laba": 32000
      },
      "hint": "Laba = omzet − harga pokok barang terjual − biaya usaha.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D3Q9",
      "day": 3,
      "sequence": 1,
      "title": "Pembayaran Persediaan Pulpen",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Pak Doni akan menambah jenis barang dagangan berupa pulpen. Periksa kebutuhan pembayaran pembeliannya.",
      "task": "Hitung nota pembelian 10 pulpen @Rp4.000 dan catat pembayaran serta penambahan persediaan.",
      "expected_answer": {
        "total_nota": 40000
      },
      "hint": "Pembelian barang stok mengurangi kas dan menambah persediaan.",
      "transactions": [
        {
          "type": "inventory_purchase",
          "sku": "PULPEN",
          "quantity": 10,
          "unit_cost": 4000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D3Q10",
      "day": 3,
      "sequence": 2,
      "title": "Catat Penerimaan Pulpen",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Pak Doni melaporkan penjualan 6 pulpen. Cocokkan penerimaan dengan jumlah barang yang keluar.",
      "task": "Catat penjualan 6 pulpen @Rp7.000. Hitung omzet dan sisa stok pulpen.",
      "expected_answer": {
        "omzet": 42000,
        "sisa_pulpen": 4
      },
      "hint": "Stok awal 10 pulpen dan terjual 6.",
      "transactions": [
        {
          "type": "sale",
          "sku": "PULPEN",
          "quantity": 6,
          "unit_price": 7000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D3Q11",
      "day": 3,
      "sequence": 3,
      "title": "Cocokkan Catatan Stok Buku",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "stock-count",
      "briefing": "Ada empat buku lagi terjual. Sebagai bendahara, cocokkan catatan persediaan bersama Pak Doni.",
      "task": "Catat penjualan 4 buku @Rp12.000 dan tentukan sisa buku pada catatan persediaan.",
      "expected_answer": {
        "omzet": 48000,
        "sisa_buku": 3
      },
      "hint": "Sebelum penjualan ini stok buku 7 buah.",
      "transactions": [
        {
          "type": "sale",
          "sku": "BUKU",
          "quantity": 4,
          "unit_price": 12000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D3Q12",
      "day": 3,
      "sequence": 4,
      "title": "Laporan Kas dan Hasil Usaha",
      "issued_by": "Pak Budi",
      "place": "Komputer Bendahara",
      "minigame": "report-builder",
      "briefing": "Ketua usaha meminta laporan kas dan hasil penjualan hari ketiga dari bendahara.",
      "task": "Laporkan kas akhir, omzet harian, dan laba hari ketiga berdasarkan transaksi yang telah dicatat.",
      "expected_answer": {
        "kas": 526000,
        "omzet": 90000,
        "laba": 34000
      },
      "hint": "Pembelian stok baru tidak langsung menjadi beban.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D4Q13",
      "day": 4,
      "sequence": 1,
      "title": "Periksa Penerimaan Setelah Diskon",
      "issued_by": "Pak Budi",
      "place": "Ruang Pemasaran",
      "minigame": "discount-calculator",
      "briefing": "Tim pemasaran menetapkan diskon 10% untuk dua buku dengan persetujuan ketua. Bendahara memeriksa potongan dan uang yang diterima.",
      "task": "Catat penjualan 2 buku @Rp12.000 dengan diskon 10%. Hitung pembayaran bersih dan total potongan.",
      "expected_answer": {
        "pembayaran": 21600,
        "diskon_total": 2400
      },
      "hint": "Hitung harga awal dua buku lalu kurangi 10%.",
      "transactions": [
        {
          "type": "sale",
          "sku": "BUKU",
          "quantity": 2,
          "unit_price": 12000,
          "discount_pct": 10
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D4Q14",
      "day": 4,
      "sequence": 2,
      "title": "Catat Penerimaan Sore",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Toko menyerahkan hasil penjualan tiga pulpen. Periksa penerimaan dan saldo persediaannya.",
      "task": "Catat penjualan 3 pulpen @Rp7.000. Hitung omzet dan sisa pulpen.",
      "expected_answer": {
        "omzet": 21000,
        "sisa_pulpen": 1
      },
      "hint": "Jumlah × harga jual.",
      "transactions": [
        {
          "type": "sale",
          "sku": "PULPEN",
          "quantity": 3,
          "unit_price": 7000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D4Q15",
      "day": 4,
      "sequence": 3,
      "title": "Bayar dan Arsipkan Tagihan Listrik",
      "issued_by": "Pak Budi",
      "place": "Ruang Arsip",
      "minigame": "receipt-category",
      "briefing": "Ketua menyetujui pembayaran tagihan listrik usaha. Periksa dan kelompokkan bukti pembayarannya dalam arsip keuangan.",
      "task": "Catat pembayaran listrik Rp15.000 sebagai biaya operasional dan pilih kategori listrik.",
      "expected_answer": {
        "biaya": 15000,
        "kategori": "listrik"
      },
      "hint": "Biaya listrik termasuk pengeluaran operasional, bukan pembelian stok.",
      "transactions": [
        {
          "type": "expense",
          "label": "listrik",
          "amount": 15000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D4Q16",
      "day": 4,
      "sequence": 4,
      "title": "Rapat Pertanggungjawaban Harian",
      "issued_by": "Pak Budi",
      "place": "Ruang Rapat",
      "minigame": "report-builder",
      "briefing": "Hari ini usaha sedikit rugi. Jelaskan hasil perhitungan kepada ketua secara jujur, tanpa menyalahkan siapa pun.",
      "task": "Laporkan laba/rugi hari keempat dan kas akhir. Gunakan tanda minus untuk rugi.",
      "expected_answer": {
        "laba": -400,
        "kas": 553600
      },
      "hint": "Omzet Rp42.600 − HPP Rp28.000 − listrik Rp15.000 = −Rp400.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D5Q17",
      "day": 5,
      "sequence": 1,
      "title": "Pembayaran Restok Buku",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Persediaan buku hampir habis. Ketua menyetujui pembelian tambahan; bendahara memeriksa nota dan mencatat pembayaran.",
      "task": "Hitung pembayaran restok 5 buku @Rp8.000. Catat sebagai pembelian persediaan.",
      "expected_answer": {
        "total_nota": 40000
      },
      "hint": "Jangan mencatat pembelian stok sebagai biaya laba-rugi.",
      "transactions": [
        {
          "type": "inventory_purchase",
          "sku": "BUKU",
          "quantity": 5,
          "unit_cost": 8000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D5Q18",
      "day": 5,
      "sequence": 2,
      "title": "Catat Penjualan Terbesar",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Toko menerima pesanan lima buku dari pelanggan sekolah. Periksa hasil penjualan yang diserahkan kepada bendahara.",
      "task": "Catat penjualan 5 buku @Rp12.000. Hitung omzet dan sisa buku.",
      "expected_answer": {
        "omzet": 60000,
        "sisa_buku": 1
      },
      "hint": "Barang yang dijual mengurangi persediaan dan menghasilkan pendapatan.",
      "transactions": [
        {
          "type": "sale",
          "sku": "BUKU",
          "quantity": 5,
          "unit_price": 12000,
          "discount_pct": 0
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D5Q19",
      "day": 5,
      "sequence": 3,
      "title": "Pisahkan Penerimaan dan Biaya",
      "issued_by": "Pak Budi",
      "place": "Meja Bendahara",
      "minigame": "two-step-transaction",
      "briefing": "Satu pulpen terakhir terjual dan ada pembayaran kemasan. Bendahara harus mencatat kedua bukti secara terpisah.",
      "task": "Catat penjualan 1 pulpen @Rp7.000, lalu biaya kemasan Rp5.000. Uang penjualan tidak sama dengan laba.",
      "expected_answer": {
        "penjualan": 7000,
        "biaya_kemasan": 5000
      },
      "hint": "Selesaikan dua bagian dalam satu quest; masing-masing transaksi hanya tercatat sekali.",
      "transactions": [
        {
          "type": "sale",
          "sku": "PULPEN",
          "quantity": 1,
          "unit_price": 7000,
          "discount_pct": 0
        },
        {
          "type": "expense",
          "label": "kemasan",
          "amount": 5000
        }
      ],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    },
    {
      "id": "D5Q20",
      "day": 5,
      "sequence": 4,
      "title": "Laporan Akhir Bendahara",
      "issued_by": "Pak Budi",
      "place": "Ruang Rapat",
      "minigame": "final-report",
      "briefing": "Sampaikan pertanggungjawaban keuangan lima hari kepada ketua usaha. Cocokkan kas, laba, dan nilai stok sebelum menerima sertifikat Bendahara Muda.",
      "task": "Laporkan laba total, kas akhir, serta nilai stok terakhir berdasarkan seluruh transaksi usaha.",
      "expected_answer": {
        "laba_total": 83600,
        "kas_akhir": 575600,
        "stok_akhir": 8000
      },
      "hint": "Total omzet dikurangi HPP dan biaya, bukan seluruh pembelian stok.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Catatan bendahara sudah membantu pertanggungjawaban keuangan usaha siswa."
    }
  ]
};
