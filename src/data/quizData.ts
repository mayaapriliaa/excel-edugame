import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Pengenalan Microsoft Excel',
    question: 'Microsoft Excel merupakan salah satu program aplikasi lembar kerja (spreadsheet) yang dikembangkan oleh Microsoft. Apa fungsi utama dari program ini?',
    options: [
      'Membuat presentasi slide interaktif',
      'Mengolah data angka, tabel, dan perhitungan matematis',
      'Mengedit video dan animasi gerak',
      'Membuat dokumen surat menyurat dan novel'
    ],
    correctIndex: 1,
    explanation: 'Microsoft Excel dirancang khusus sebagai aplikasi pengolah angka (spreadsheet) untuk pengorganisasian data tabel, rumus matematis, analisis data, dan pembuatan grafik.'
  },
  {
    id: 2,
    topic: 'Struktur Worksheet: Kolom & Baris',
    question: 'Pada lembar kerja Excel, bagian yang membentang secara vertikal (tegak) ditandai dengan huruf (A, B, C, dst.) dinamakan...',
    options: [
      'Baris (Row)',
      'Kolom (Column)',
      'Sel (Cell)',
      'Range'
    ],
    correctIndex: 1,
    explanation: 'Bagian vertikal bertanda alfabet (A, B, C, ...) disebut Kolom (Column). Sedangkan bagian horizontal bertanda nomor (1, 2, 3, ...) disebut Baris (Row).'
  },
  {
    id: 3,
    topic: 'Konsep Sel (Cell)',
    question: 'Pertemuan atau perpotongan antara Kolom C dengan Baris 5 pada lembar kerja Excel disebut...',
    options: [
      'Range 5C',
      'Sel C5',
      'Formula Bar C5',
      'Worksheet C5'
    ],
    correctIndex: 1,
    explanation: 'Pertemuan antara kolom dan baris disebut Sel (Cell). Penulisannya selalu diawali nama kolom lalu nomor baris, yaitu Sel C5.'
  },
  {
    id: 4,
    topic: 'Rentang Sel (Range)',
    question: 'Sekumpulan sel yang berdekatan atau terpilih sekaligus, misalnya dari sel A1 sampai dengan sel D10, dituliskan dalam Excel dengan notasi...',
    options: [
      'A1 - D10',
      'A1 -> D10',
      'A1:D10',
      'A1 & D10'
    ],
    correctIndex: 2,
    explanation: 'Rentang sel (Range) di Excel dipisahkan menggunakan tanda titik dua (:). Jadi dari A1 hingga D10 ditulis sebagai A1:D10.'
  },
  {
    id: 5,
    topic: 'Formula Bar',
    question: 'Bagian pada jendela Microsoft Excel yang berfungsi untuk menampilkan isi sel yang aktif, memasukkan data, serta mengedit formula/rumus disebut...',
    options: [
      'Title Bar',
      'Status Bar',
      'Formula Bar',
      'Quick Access Toolbar'
    ],
    correctIndex: 2,
    explanation: 'Formula Bar (Bilah Rumus) terletak di bawah Ribbon dan berfungsi menampilkan, mengetik, serta menyunting isi teks atau rumus dari sel yang sedang aktif.'
  },
  {
    id: 6,
    topic: 'Aturan Penulisan Rumus',
    question: 'Karakter atau simbol khusus yang WAJIB diketikkan pertama kali saat ingin menuliskan rumus atau fungsi perhitungan pada Excel adalah...',
    options: [
      'Tanda sama dengan ( = )',
      'Tanda tambah ( + )',
      'Tanda titik dua ( : )',
      'Tanda kurung ( ( )'
    ],
    correctIndex: 0,
    explanation: 'Setiap formula atau fungsi perhitungan di Excel wajib diawali tanda sama dengan (=). Tanpa tanda ini, Excel akan menganggap ketikan tersebut sebagai teks biasa.'
  },
  {
    id: 7,
    topic: 'Fungsi SUM',
    question: 'Fungsi matematika di Excel yang digunakan untuk menjumlahkan sekumpulan angka pada suatu rentang sel tertentu adalah...',
    options: [
      '=COUNT(...)',
      '=SUM(...)',
      '=TOTAL(...)',
      '=ADD(...)'
    ],
    correctIndex: 1,
    explanation: 'Fungsi =SUM(...) adalah rumus standar Excel untuk menjumlahkan semua angka dalam rentang sel yang ditentukan (misalnya =SUM(B2:B10)).'
  },
  {
    id: 8,
    topic: 'Fungsi AVERAGE',
    question: 'Untuk mencari nilai rata-rata dari sekumpulan nilai ulangan siswa pada sel D2 sampai D15, rumus yang benar adalah...',
    options: [
      '=MEAN(D2:D15)',
      '=AVERAGE(D2:D15)',
      '=RATARATA(D2:D15)',
      '=SUMAVG(D2:D15)'
    ],
    correctIndex: 1,
    explanation: 'Fungsi =AVERAGE(...) digunakan untuk menghitung nilai rata-rata aritmetika dari argumen atau rentang sel yang diberikan.'
  },
  {
    id: 9,
    topic: 'Fungsi MAX',
    question: 'Seorang guru Informatika di SMK Muhammadiyah Tawang Rejo ingin mengetahui nilai ujian tertinggi di kelas X. Rumus Excel yang tepat adalah...',
    options: [
      '=HIGH(E2:E30)',
      '=TOP(E2:E30)',
      '=MAX(E2:E30)',
      '=LARGE_ALL(E2:E30)'
    ],
    correctIndex: 2,
    explanation: 'Fungsi =MAX(...) digunakan untuk mencari dan menampilkan nilai numerik terbesar/tertinggi dalam suatu rentang data.'
  },
  {
    id: 10,
    topic: 'Fungsi MIN',
    question: 'Jika ingin mencari nilai terendah atau terkecil dari daftar harga barang pada sel C5 sampai C25, fungsi yang digunakan adalah...',
    options: [
      '=MIN(C5:C25)',
      '=LOW(C5:C25)',
      '=BOTTOM(C5:C25)',
      '=SMALLEST(C5:C25)'
    ],
    correctIndex: 0,
    explanation: 'Fungsi =MIN(...) digunakan untuk mencari dan menampilkan nilai numerik terkecil/terendah di antara sekumpulan data.'
  }
];
