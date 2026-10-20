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
      "title": "Hari Pertama di Kantor",
      "issued_by": "Pak Budi",
      "place": "Ruang Bos",
      "minigame": "input-amount",
      "briefing": "Selamat datang, sekretaris baru! Catat modal awal kita.",
      "task": "Masukkan uang modal yang diterima dari pemilik: Rp500.000.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D1Q2",
      "day": 1,
      "sequence": 2,
      "title": "Pesanan Buku Baru",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Kita perlu barang dagangan untuk mulai berjualan.",
      "task": "Hitung total nota pembelian 20 buku, Rp8.000 per buku.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D1Q3",
      "day": 1,
      "sequence": 3,
      "title": "Periksa Nota Supplier",
      "issued_by": "Pak Budi",
      "place": "Meja Sekretaris",
      "minigame": "document-match",
      "briefing": "Nota dari gudang perlu diverifikasi sebelum diarsipkan.",
      "task": "Cocokkan 20 buku × Rp8.000 dengan nota Rp160.000. Pilih status dan arsipkan.",
      "expected_answer": {
        "status": "sesuai",
        "total": 160000
      },
      "hint": "Pemeriksaan nota yang sudah dibukukan tidak boleh mengurangi uang untuk kedua kalinya.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D1Q4",
      "day": 1,
      "sequence": 4,
      "title": "Laporan Hari Pertama",
      "issued_by": "Pak Budi",
      "place": "Komputer Sekretaris",
      "minigame": "report-builder",
      "briefing": "Bos menunggu laporan hari pertama.",
      "task": "Isi saldo kas dan nilai persediaan akhir hari pertama.",
      "expected_answer": {
        "kas": 340000,
        "persediaan": 160000,
        "laba": 0
      },
      "hint": "Pembelian stok mengubah kas menjadi barang, bukan langsung biaya laba-rugi.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D2Q5",
      "day": 2,
      "sequence": 1,
      "title": "Penjualan Pagi",
      "issued_by": "Pak Budi",
      "place": "Meja Sekretaris/Toko",
      "minigame": "cashier-total",
      "briefing": "Toko mulai ramai! Ada penjualan pertama.",
      "task": "Catat penjualan 8 buku @Rp12.000.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D2Q6",
      "day": 2,
      "sequence": 2,
      "title": "Penjualan Siang",
      "issued_by": "Pak Budi",
      "place": "Komputer Sekretaris",
      "minigame": "income-expense-sort",
      "briefing": "Pembeli berikutnya membeli 5 buku.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D2Q7",
      "day": 2,
      "sequence": 3,
      "title": "Bayar Iklan Toko",
      "issued_by": "Pak Budi",
      "place": "Ruang Pemasaran",
      "minigame": "expense-approval",
      "briefing": "Tim pemasaran butuh iklan sederhana.",
      "task": "Catat pembayaran iklan Rp20.000 sebagai biaya promosi.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D2Q8",
      "day": 2,
      "sequence": 4,
      "title": "Rapat Hasil Penjualan",
      "issued_by": "Pak Budi",
      "place": "Ruang Meeting",
      "minigame": "report-builder",
      "briefing": "Ayo jelaskan hasil penjualan kepada Bos dan tim pemasaran.",
      "task": "Tunjukkan omzet, biaya barang terjual, biaya iklan, dan laba hari kedua.",
      "expected_answer": {
        "omzet": 156000,
        "hpp": 104000,
        "biaya": 20000,
        "laba": 32000
      },
      "hint": "Laba = omzet − harga pokok barang terjual − biaya usaha.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D3Q9",
      "day": 3,
      "sequence": 1,
      "title": "Stok Pulpen Menipis",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Kita akan mulai menjual pulpen.",
      "task": "Beli 10 pulpen @Rp4.000 dan hitung total nota.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D3Q10",
      "day": 3,
      "sequence": 2,
      "title": "Penjualan Pulpen",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Pelanggan mencari pulpen!",
      "task": "Jual 6 pulpen @Rp7.000. Hitung omzet dan sisa stok pulpen.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D3Q11",
      "day": 3,
      "sequence": 3,
      "title": "Hitung Stok Buku",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "stock-count",
      "briefing": "Ada empat buku lagi yang dibeli pelanggan.",
      "task": "Catat penjualan 4 buku @Rp12.000 dan tentukan sisa buku.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D3Q12",
      "day": 3,
      "sequence": 4,
      "title": "Laporan Persediaan",
      "issued_by": "Pak Budi",
      "place": "Komputer Sekretaris",
      "minigame": "report-builder",
      "briefing": "Bos ingin tahu kondisi toko setelah penjualan.",
      "task": "Masukkan kas akhir, omzet harian, dan laba hari ketiga.",
      "expected_answer": {
        "kas": 526000,
        "omzet": 90000,
        "laba": 34000
      },
      "hint": "Pembelian stok baru tidak langsung menjadi beban.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D4Q13",
      "day": 4,
      "sequence": 1,
      "title": "Promo Diskon Buku",
      "issued_by": "Pak Budi",
      "place": "Ruang Pemasaran",
      "minigame": "discount-calculator",
      "briefing": "Tim pemasaran menawarkan diskon 10% untuk dua buku.",
      "task": "Jual 2 buku @Rp12.000 dengan diskon 10%, hitung pembayaran bersih.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D4Q14",
      "day": 4,
      "sequence": 2,
      "title": "Pesanan Pulpen Sore",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Pelanggan membeli tiga pulpen.",
      "task": "Catat penjualan 3 pulpen @Rp7.000.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D4Q15",
      "day": 4,
      "sequence": 3,
      "title": "Tagihan Listrik",
      "issued_by": "Pak Budi",
      "place": "Ruang Arsip",
      "minigame": "receipt-category",
      "briefing": "Kantor menerima tagihan listrik.",
      "task": "Catat pembayaran listrik Rp15.000 sebagai biaya operasional.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D4Q16",
      "day": 4,
      "sequence": 4,
      "title": "Meeting Saat Rugi",
      "issued_by": "Pak Budi",
      "place": "Ruang Meeting",
      "minigame": "report-builder",
      "briefing": "Hari ini sedikit rugi. Bos ingin mengerti penyebabnya tanpa menyalahkan siapa pun.",
      "task": "Hitung laba/rugi hari keempat dan kas akhir.",
      "expected_answer": {
        "laba": -400,
        "kas": 553600
      },
      "hint": "Omzet Rp42.600 − HPP Rp28.000 − listrik Rp15.000 = −Rp400.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D5Q17",
      "day": 5,
      "sequence": 1,
      "title": "Restok Menjelang Penutupan",
      "issued_by": "Pak Budi",
      "place": "Gudang/Toko",
      "minigame": "invoice-calculation",
      "briefing": "Persediaan buku hampir habis.",
      "task": "Beli 5 buku @Rp8.000. Hitung biaya restok.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D5Q18",
      "day": 5,
      "sequence": 2,
      "title": "Penjualan Terbesar",
      "issued_by": "Pak Budi",
      "place": "Toko",
      "minigame": "cashier-total",
      "briefing": "Ada pesanan lima buku dari pelanggan sekolah.",
      "task": "Jual 5 buku @Rp12.000 dan hitung omzet.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D5Q19",
      "day": 5,
      "sequence": 3,
      "title": "Penjualan dan Kemasan",
      "issued_by": "Pak Budi",
      "place": "Meja Sekretaris",
      "minigame": "two-step-transaction",
      "briefing": "Hari ini satu pulpen terakhir terjual, tetapi ada biaya kemasan.",
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
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    },
    {
      "id": "D5Q20",
      "day": 5,
      "sequence": 4,
      "title": "Laporan Akhir dan Wisuda",
      "issued_by": "Pak Budi",
      "place": "Ruang Meeting",
      "minigame": "final-report",
      "briefing": "Selamat! Perusahaan membutuhkan laporan akhir sebelum sertifikat diberikan.",
      "task": "Isi laba total, kas akhir, serta nilai stok terakhir.",
      "expected_answer": {
        "laba_total": 83600,
        "kas_akhir": 575600,
        "stok_akhir": 8000
      },
      "hint": "Total omzet dikurangi HPP dan biaya, bukan seluruh pembelian stok.",
      "transactions": [],
      "reward_xp": 50,
      "completion_dialogue": "Bagus! Laporanmu sudah membantu perusahaan."
    }
  ]
};
