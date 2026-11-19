import { FormulaChallengeItem } from '../types';

export const FORMULA_CHALLENGES: FormulaChallengeItem[] = [
  {
    id: 1,
    title: 'Tantangan 1: Jumlah Total Nilai Siswa (SUM)',
    scenario: 'SMK Muhammadiyah Tawang Rejo mengadakan penilaian praktik spreadsheet.',
    description: 'Bantulah guru menghitung TOTAL NILAI yang diperoleh siswa "Ahmad Fauzi" pada sel E2 berdasarkan nilai Tugas 1 (sel C2) dan Tugas 2 (sel D2).',
    targetCell: 'E2',
    headers: ['A (No)', 'B (Nama Siswa)', 'C (Tugas 1)', 'D (Tugas 2)', 'E (Total Nilai)'],
    rows: [
      [1, 'Ahmad Fauzi', 85, 90, '?'],
      [2, 'Budi Santoso', 78, 82, 160],
      [3, 'Citra Lestari', 92, 88, 180]
    ],
    correctFormula: '=SUM(C2:D2)',
    acceptedFormulas: ['=SUM(C2:D2)', '=SUM(C2,D2)', '=C2+D2', 'SUM(C2:D2)'],
    formulaOptions: [
      '=SUM(C2:D2)',
      '=AVERAGE(C2:D2)',
      '=TOTAL(C2:D2)',
      '=SUM(C2:E2)'
    ],
    expectedResult: 175,
    explanation: 'Fungsi =SUM(C2:D2) menjumlahkan nilai sel C2 (85) dan D2 (90), menghasilkan total 175.'
  },
  {
    id: 2,
    title: 'Tantangan 2: Nilai Rata-rata Kelas (AVERAGE)',
    scenario: 'Menghitung rata-rata nilai Ujian Praktik Informatika kelas X.',
    description: 'Tentukan rumus pada sel C6 untuk menghitung RATA-RATA nilai ulangan dari 4 orang siswa yang berada pada rentang sel C2 sampai C5.',
    targetCell: 'C6',
    headers: ['A (No)', 'B (Nama Siswa)', 'C (Nilai Praktik)'],
    rows: [
      [1, 'Dewi Anggraini', 80],
      [2, 'Eko Prasetyo', 90],
      [3, 'Fani Rahmawati', 85],
      [4, 'Gilang Pratama', 75],
      ['', 'Rata-rata Kelas', '?']
    ],
    correctFormula: '=AVERAGE(C2:C5)',
    acceptedFormulas: ['=AVERAGE(C2:C5)', 'AVERAGE(C2:C5)', '=AVERAGE(C2,C3,C4,C5)'],
    formulaOptions: [
      '=AVERAGE(C2:C5)',
      '=MEAN(C2:C5)',
      '=SUM(C2:C5)',
      '=AVERAGE(C2:C6)'
    ],
    expectedResult: 82.5,
    explanation: 'Fungsi =AVERAGE(C2:C5) menjumlahkan (80 + 90 + 85 + 75 = 330) lalu dibagi 4 data siswa, menghasilkan rata-rata 82.5.'
  },
  {
    id: 3,
    title: 'Tantangan 3: Mencari Nilai Tertinggi (MAX)',
    scenario: 'Pemilihan siswa berprestasi di Laboratorium Komputer.',
    description: 'Guru ingin mengetahui skor TERTINGGI pada penilaian logika pemrograman. Tulis rumus yang tepat pada sel C7 untuk rentang sel C2 sampai C6.',
    targetCell: 'C7',
    headers: ['A (No)', 'B (Nama Siswa)', 'C (Skor Logika)'],
    rows: [
      [1, 'Hanafi Ridwan', 78],
      [2, 'Intan Permata', 95],
      [3, 'Joko Widodo S.', 84],
      [4, 'Kartika Sari', 88],
      [5, 'Lukman Hakim', 91],
      ['', 'Skor Tertinggi', '?']
    ],
    correctFormula: '=MAX(C2:C6)',
    acceptedFormulas: ['=MAX(C2:C6)', 'MAX(C2:C6)'],
    formulaOptions: [
      '=MAX(C2:C6)',
      '=TOP(C2:C6)',
      '=HIGH(C2:C6)',
      '=MAXIMUM(C2:C6)'
    ],
    expectedResult: 95,
    explanation: 'Fungsi =MAX(C2:C6) memindai seluruh angka dalam rentang C2:C6 dan mengembalikan angka paling tinggi, yaitu 95 (milik Intan Permata).'
  },
  {
    id: 4,
    title: 'Tantangan 4: Mencari Nilai Terendah (MIN)',
    scenario: 'Evaluasi siswa yang membutuhkan bimbingan remidi.',
    description: 'Tuliskan rumus pada sel C7 untuk menemukan nilai TERENDAH di antara seluruh peserta ujian pada rentang sel C2 sampai C6.',
    targetCell: 'C7',
    headers: ['A (No)', 'B (Nama Siswa)', 'C (Nilai Teori)'],
    rows: [
      [1, 'Maulana Malik', 86],
      [2, 'Nabila Putri', 72],
      [3, 'Oki Setiawan', 68],
      [4, 'Putri Wulandari', 90],
      [5, 'Rian Hidayat', 80],
      ['', 'Nilai Terendah', '?']
    ],
    correctFormula: '=MIN(C2:C6)',
    acceptedFormulas: ['=MIN(C2:C6)', 'MIN(C2:C6)'],
    formulaOptions: [
      '=MIN(C2:C6)',
      '=LOW(C2:C6)',
      '=BOTTOM(C2:C6)',
      '=MINIMUM(C2:C6)'
    ],
    expectedResult: 68,
    explanation: 'Fungsi =MIN(C2:C6) mencari angka paling kecil dari data C2:C6, yaitu 68 (milik Oki Setiawan).'
  },
  {
    id: 5,
    title: 'Tantangan 5: Total Anggaran Pengadaan PC Lab (SUM Multi-Kolom)',
    scenario: 'Menghitung rekapitulasi inventaris lab komputer SMK Muhammadiyah Tawang Rejo.',
    description: 'Hitung total keseluruhan pengeluaran pengadaan perangkat pada sel D6 dari daftar harga subtotal pada rentang sel D2 sampai D5.',
    targetCell: 'D6',
    headers: ['A (No)', 'B (Perangkat)', 'C (Unit)', 'D (Subtotal Rp)'],
    rows: [
      [1, 'RAM DDR4 8GB', 10, 4500000],
      [2, 'SSD NVMe 512GB', 10, 6000000],
      [3, 'Mouse & Keyboard', 10, 1500000],
      [4, 'Kabel LAN Cat6', 2, 800000],
      ['', 'Total Anggaran', '', '?']
    ],
    correctFormula: '=SUM(D2:D5)',
    acceptedFormulas: ['=SUM(D2:D5)', 'SUM(D2:D5)'],
    formulaOptions: [
      '=SUM(D2:D5)',
      '=SUM(C2:D5)',
      '=AVERAGE(D2:D5)',
      '=COUNT(D2:D5)'
    ],
    expectedResult: 12800000,
    explanation: 'Fungsi =SUM(D2:D5) menjumlahkan seluruh subtotal: 4.500.000 + 6.000.000 + 1.500.000 + 800.000 = 12.800.000.'
  }
];
