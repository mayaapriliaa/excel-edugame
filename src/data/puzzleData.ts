export interface PuzzleTheme {
  id: string;
  name: string;
  description: string;
  svgContent: string;
}

export const PUZZLE_THEMES: PuzzleTheme[] = [
  {
    id: 'excel_interface',
    name: 'Antarmuka Microsoft Excel 365',
    description: 'Bilah Ribbon hijau, formula bar, kisi sel, dan diagram visualisasi data.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0e6e39"/>
            <stop offset="100%" stop-color="#107c41"/>
          </linearGradient>
          <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b5a2f"/>
            <stop offset="100%" stop-color="#073b1e"/>
          </linearGradient>
        </defs>

        <!-- Canvas Background -->
        <rect width="600" height="600" fill="#f8fafc"/>

        <!-- Excel Top Bar Header -->
        <rect width="600" height="90" fill="url(#bgGrad)"/>
        
        <!-- App Icon & Title -->
        <rect x="25" y="20" width="50" height="50" rx="10" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))"/>
        <text x="36" y="56" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#107c41">X</text>
        <text x="90" y="44" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">Microsoft Excel</text>
        <text x="90" y="66" font-family="Arial, sans-serif" font-size="13" fill="#bbf7d0">SMK Muhammadiyah Tawang Rejo - Kelas X</text>

        <!-- Ribbon Toolbar Tabs -->
        <rect y="90" width="600" height="42" fill="#f1f5f9" stroke="#e2e8f0"/>
        <rect x="25" y="96" width="65" height="30" rx="4" fill="#107c41"/>
        <text x="42" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#ffffff">Home</text>
        <text x="110" y="116" font-family="Arial, sans-serif" font-size="13" fill="#475569">Insert</text>
        <text x="175" y="116" font-family="Arial, sans-serif" font-size="13" fill="#475569">Page Layout</text>
        <text x="275" y="116" font-family="Arial, sans-serif" font-size="13" fill="#475569">Formulas</text>
        <text x="355" y="116" font-family="Arial, sans-serif" font-size="13" fill="#475569">Data</text>
        <text x="415" y="116" font-family="Arial, sans-serif" font-size="13" fill="#475569">View</text>

        <!-- Formula Bar Area -->
        <rect y="132" width="600" height="44" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="25" y="140" width="60" height="28" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="44" y="159" font-family="monospace" font-weight="bold" font-size="14" fill="#1e293b">D4</text>
        <text x="100" y="160" font-family="serif" font-style="italic" font-weight="bold" font-size="17" fill="#64748b">fx</text>
        <rect x="130" y="140" width="445" height="28" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="145" y="159" font-family="monospace" font-size="14" font-weight="bold" fill="#0f766e">=SUM(B4:C4) * 1.1</text>

        <!-- Grid Header Row -->
        <rect y="176" width="600" height="28" fill="#e2e8f0"/>
        <rect x="0" y="176" width="40" height="28" fill="#cbd5e1" stroke="#94a3b8"/>
        <rect x="40" y="176" width="130" height="28" fill="#e2e8f0" stroke="#cbd5e1"/>
        <text x="95" y="195" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#334155">A</text>
        <rect x="170" y="176" width="130" height="28" fill="#e2e8f0" stroke="#cbd5e1"/>
        <text x="230" y="195" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#334155">B</text>
        <rect x="300" y="176" width="130" height="28" fill="#e2e8f0" stroke="#cbd5e1"/>
        <text x="360" y="195" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#334155">C</text>
        <rect x="430" y="176" width="170" height="28" fill="#107c41" stroke="#059669"/>
        <text x="500" y="195" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#ffffff">D (Total)</text>

        <!-- Spreadsheet Cells -->
        <!-- Row 1 -->
        <rect x="0" y="204" width="40" height="42" fill="#e2e8f0" stroke="#cbd5e1"/>
        <text x="16" y="230" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#475569">1</text>
        <rect x="40" y="204" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="50" y="230" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">Ahmad Fauzi</text>
        <rect x="170" y="204" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="220" y="230" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">88</text>
        <rect x="300" y="204" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="350" y="230" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">92</text>
        <rect x="430" y="204" width="170" height="42" fill="#ecfdf5" stroke="#a7f3d0"/>
        <text x="490" y="230" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#065f46">180</text>

        <!-- Row 2 -->
        <rect x="0" y="246" width="40" height="42" fill="#e2e8f0" stroke="#cbd5e1"/>
        <text x="16" y="272" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#475569">2</text>
        <rect x="40" y="246" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="50" y="272" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">Citra Lestari</text>
        <rect x="170" y="246" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="220" y="272" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">95</text>
        <rect x="300" y="246" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="350" y="272" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">90</text>
        <rect x="430" y="246" width="170" height="42" fill="#ecfdf5" stroke="#a7f3d0"/>
        <text x="490" y="272" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#065f46">185</text>

        <!-- Row 3 Active Cell -->
        <rect x="0" y="288" width="40" height="42" fill="#cbd5e1" stroke="#94a3b8"/>
        <text x="16" y="314" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#0f172a">3</text>
        <rect x="40" y="288" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="50" y="314" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">Dedi Kurniawan</text>
        <rect x="170" y="288" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="220" y="314" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">82</text>
        <rect x="300" y="288" width="130" height="42" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="350" y="314" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">85</text>
        <!-- Highlighted Active Cell with Thick Green Border & Fill handle -->
        <rect x="430" y="288" width="170" height="42" fill="#dcfce7" stroke="#15803d" stroke-width="3"/>
        <text x="490" y="314" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#14532d">167</text>
        <rect x="592" y="322" width="8" height="8" fill="#15803d"/>

        <!-- Chart Section in bottom half -->
        <rect x="25" y="350" width="550" height="225" rx="12" fill="#ffffff" stroke="#cbd5e1" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.06))"/>
        <text x="50" y="385" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#1e293b">Grafik Nilai Siswa SMK Muhammadiyah Tawang Rejo</text>
        
        <!-- Chart Bars -->
        <line x1="60" y1="520" x2="520" y2="520" stroke="#94a3b8" stroke-width="2"/>
        <line x1="60" y1="410" x2="60" y2="520" stroke="#94a3b8" stroke-width="2"/>
        
        <!-- Bar 1 -->
        <rect x="90" y="440" width="55" height="80" rx="4" fill="#107c41"/>
        <text x="100" y="432" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#107c41">88</text>
        <text x="95" y="542" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Ahmad</text>
        
        <!-- Bar 2 -->
        <rect x="180" y="420" width="55" height="100" rx="4" fill="#2563eb"/>
        <text x="190" y="412" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#2563eb">95</text>
        <text x="185" y="542" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Citra</text>

        <!-- Bar 3 -->
        <rect x="270" y="455" width="55" height="65" rx="4" fill="#f59e0b"/>
        <text x="280" y="447" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#d97706">82</text>
        <text x="275" y="542" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Dedi</text>

        <!-- Formula Legend Badge -->
        <rect x="365" y="420" width="190" height="85" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
        <circle cx="385" cy="442" r="5" fill="#107c41"/>
        <text x="398" y="446" font-family="Arial, sans-serif" font-size="12" fill="#334155">MAX: 95 (Citra)</text>
        <circle cx="385" cy="465" r="5" fill="#f59e0b"/>
        <text x="398" y="469" font-family="Arial, sans-serif" font-size="12" fill="#334155">MIN: 82 (Dedi)</text>
        <circle cx="385" cy="488" r="5" fill="#2563eb"/>
        <text x="398" y="492" font-family="Arial, sans-serif" font-size="12" fill="#334155">AVERAGE: 88.3</text>
      </svg>
    `
  },
  {
    id: 'excel_functions',
    name: 'Peta Rumus & Analisis Excel',
    description: 'Visualisasi formula matematika utama Excel: SUM, AVERAGE, MAX, dan MIN.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
        <!-- Background -->
        <rect width="600" height="600" fill="#0F2942"/>

        <!-- Pattern Grid -->
        <pattern id="excelGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E4B73" stroke-width="0.75" opacity="0.4"/>
        </pattern>
        <rect width="600" height="600" fill="url(#excelGrid)"/>

        <!-- Header Banner -->
        <rect x="40" y="30" width="520" height="80" rx="16" fill="#091D30" stroke="#60A5FA" stroke-width="2"/>
        <text x="300" y="65" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">PETA FORMULA INFORMATIKA</text>
        <text x="300" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#93C5FD">SMK Muhammadiyah Tawang Rejo</text>

        <!-- Card 1: SUM -->
        <g transform="translate(40, 135)">
          <rect width="245" height="195" rx="14" fill="#217346" stroke="#86EFAC" stroke-width="2"/>
          <rect x="15" y="15" width="40" height="40" rx="8" fill="#86EFAC"/>
          <text x="35" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#185C37">Σ</text>
          <text x="70" y="42" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">=SUM()</text>
          <text x="15" y="85" font-family="Arial, sans-serif" font-size="13" fill="#EAF5EE">Menjumlahkan seluruh data angka</text>
          <rect x="15" y="105" width="215" height="40" rx="6" fill="#185C37"/>
          <text x="25" y="130" font-family="monospace" font-weight="bold" font-size="14" fill="#86EFAC">=SUM(A1:A10)</text>
          <text x="15" y="175" font-family="Arial, sans-serif" font-size="12" fill="#D1FAE5">Contoh: Menghitung total nilai siswa</text>
        </g>

        <!-- Card 2: AVERAGE -->
        <g transform="translate(315, 135)">
          <rect width="245" height="195" rx="14" fill="#1E40AF" stroke="#93C5FD" stroke-width="2"/>
          <rect x="15" y="15" width="40" height="40" rx="8" fill="#93C5FD"/>
          <text x="35" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#1E3A8A">x̄</text>
          <text x="70" y="42" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#ffffff">=AVERAGE()</text>
          <text x="15" y="85" font-family="Arial, sans-serif" font-size="13" fill="#DBEAFE">Mencari rata-rata nilai aritmetika</text>
          <rect x="15" y="105" width="215" height="40" rx="6" fill="#172554"/>
          <text x="25" y="130" font-family="monospace" font-weight="bold" font-size="14" fill="#93C5FD">=AVERAGE(B2:B20)</text>
          <text x="15" y="175" font-family="Arial, sans-serif" font-size="12" fill="#BFDBFE">Contoh: Rata-rata ujian praktik kelas</text>
        </g>

        <!-- Card 3: MAX -->
        <g transform="translate(40, 355)">
          <rect width="245" height="205" rx="14" fill="#0369A1" stroke="#7DD3FC" stroke-width="2"/>
          <rect x="15" y="15" width="40" height="40" rx="8" fill="#7DD3FC"/>
          <text x="35" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0C4A6E">▲</text>
          <text x="70" y="42" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">=MAX()</text>
          <text x="15" y="85" font-family="Arial, sans-serif" font-size="13" fill="#E0F2FE">Mencari nilai angka tertinggi</text>
          <rect x="15" y="105" width="215" height="40" rx="6" fill="#0C4A6E"/>
          <text x="25" y="130" font-family="monospace" font-weight="bold" font-size="14" fill="#BAE6FD">=MAX(C2:C30)</text>
          <text x="15" y="175" font-family="Arial, sans-serif" font-size="12" fill="#E0F2FE">Contoh: Skor tertinggi kompetisi</text>
        </g>

        <!-- Card 4: MIN -->
        <g transform="translate(315, 355)">
          <rect width="245" height="205" rx="14" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
          <rect x="15" y="15" width="40" height="40" rx="8" fill="#E2E8F0"/>
          <text x="35" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0F2942">▼</text>
          <text x="70" y="42" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">=MIN()</text>
          <text x="15" y="85" font-family="Arial, sans-serif" font-size="13" fill="#E2E8F0">Mencari nilai angka terendah</text>
          <rect x="15" y="105" width="215" height="40" rx="6" fill="#0F172A"/>
          <text x="25" y="130" font-family="monospace" font-weight="bold" font-size="14" fill="#CBD5E1">=MIN(D2:D30)</text>
          <text x="15" y="175" font-family="Arial, sans-serif" font-size="12" fill="#CBD5E1">Contoh: Mengetahui nilai remedi</text>
        </g>
      </svg>
    `
  }
];
