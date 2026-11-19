import React from 'react';
import { Play, LayoutDashboard, Trophy, BookOpen, CheckCircle2, Table, Award, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { GameType, StudentProfile } from '../types';

interface HomeHeroProps {
  currentStudent: StudentProfile | null;
  onStartLearning: () => void;
  onSelectGame: (type: GameType) => void;
  onOpenTeacherDashboard: () => void;
  onOpenLeaderboard: () => void;
  onOpenInstructions: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  currentStudent,
  onStartLearning,
  onSelectGame,
  onOpenTeacherDashboard,
  onOpenLeaderboard,
  onOpenInstructions
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2942] via-[#14395B] to-[#185C37] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#1E4B73]">
        {/* Subtle Spreadsheet Cell Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Institution Tag */}
          <div className="text-xs sm:text-sm font-semibold text-blue-100 tracking-wide">
            Mata Pelajaran Informatika · SMK Muhammadiyah Tawang Rejo
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white [text-wrap:balance]">
              Petualangan Belajar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86EFAC] via-white to-[#93C5FD]">
                Microsoft Excel
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-blue-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Media pembelajaran interaktif berbasis game untuk siswa kelas X. Taklukkan 3 tantangan seru: Kuis Excel, Puzzle Lembar Kerja, dan Tantangan Rumus!
            </p>
          </div>

          {/* Current Student Greeting (if logged in) */}
          {currentStudent && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white backdrop-blur-sm">
              <span>
                Selamat datang kembali, <strong>{currentStudent.name}</strong> ({currentStudent.className})
              </span>
            </div>
          )}

          {/* CTA Buttons (Two Main Access Modes) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            {/* Mode Siswa: Mulai Belajar */}
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-4 bg-[#217346] hover:bg-[#195E38] text-white font-extrabold rounded-2xl text-base shadow-lg shadow-[#091D30]/40 border border-[#52C488]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Mulai Belajar (Mode Siswa)</span>
            </button>

            {/* Mode Guru: Dashboard Guru */}
            <button
              onClick={onOpenTeacherDashboard}
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#EFF6FF] text-[#0F2942] font-bold rounded-2xl text-base border border-white shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <LayoutDashboard className="w-5 h-5 text-[#1E40AF]" />
              <span>Dashboard Guru</span>
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="w-full sm:w-auto px-6 py-4 bg-[#0B2035]/70 hover:bg-[#0B2035] text-blue-100 font-semibold rounded-2xl text-sm border border-blue-300/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#93C5FD]" />
              <span>Peringkat Siswa</span>
            </button>
          </div>

          {/* Mode Demo Notice */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-200/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#86EFAC]" />
              Mode Demo Aktif: Penyimpanan lokal browser & sesi mandiri siap digunakan
            </span>
          </div>
        </div>

        {/* Interactive Spreadsheet Illustration */}
        <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-white text-[#0F2942] shadow-2xl border border-[#C7D6E8] overflow-hidden font-mono text-xs">
          {/* Authentic Excel Green Ribbon Strip */}
          <div className="bg-[#217346] text-white px-4 py-2.5 flex items-center justify-between font-sans">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-white" />
              <span className="font-bold text-xs">Tabel_Nilai_Kelas_X.xlsx</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectGame('formula')}
              className="text-[11px] text-[#0F2942] hover:bg-[#DBEAFE] font-bold bg-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
              title="Klik untuk mencoba Tantangan Rumus"
            >
              Formula: =SUM(B2:C2) → Coba Sekarang
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="bg-[#EEF3F9] border border-[#D8E1EC] p-2 rounded font-bold text-[#0F2942]">Sel A1: Siswa</div>
              <div className="bg-[#EEF3F9] border border-[#D8E1EC] p-2 rounded font-bold text-[#0F2942]">Sel B1: Teori</div>
              <div className="bg-[#EEF3F9] border border-[#D8E1EC] p-2 rounded font-bold text-[#0F2942]">Sel C1: Praktik</div>
              <button
                type="button"
                onClick={() => onSelectGame('formula')}
                className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white p-2 rounded font-bold transition-colors cursor-pointer"
              >
                Sel D1: Total (=SUM)
              </button>

              <div className="p-2 border border-[#E2E8F0] rounded text-slate-700">Ilham P.</div>
              <div className="p-2 border border-[#E2E8F0] rounded text-slate-700 tabular-nums">88</div>
              <div className="p-2 border border-[#E2E8F0] rounded text-slate-700 tabular-nums">92</div>
              <button
                type="button"
                onClick={() => onSelectGame('formula')}
                className="p-2 bg-[#EAF5EE] hover:bg-[#D4ECDD] border border-[#217346] rounded font-bold text-[#185C37] transition-colors cursor-pointer tabular-nums"
              >
                180
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Games Showcase Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E40AF]">
            Jelajahi 3 Arena Permainan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">
            Pilih Modul Game Favoritmu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Klik ikon atau kartu di bawah ini untuk langsung memulai permainan dan kumpulkan poin maksimal di Leaderboard kelas!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game 1: Kuis Excel */}
          <button
            type="button"
            onClick={() => onSelectGame('quiz')}
            className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] shadow-sm hover:shadow-xl hover:border-[#217346] hover:-translate-y-1 active:scale-[0.99] transition-all flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#217346]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EAF5EE] text-[#217346] group-hover:bg-[#217346] group-hover:text-white flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-all shadow-xs">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-[#217346] uppercase tracking-wider">
                10 Soal Pilihan Ganda
              </span>
              <h3 className="text-lg font-bold text-[#0F2942] mt-1 mb-2">
                1. Kuis Excel
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Uji wawasan mengenai sel, baris, kolom, formula bar, serta rumus dasar matematika Excel.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#217346] w-full">
              <span>Maksimal: 100 Poin</span>
              <span className="text-[#217346] font-bold group-hover:translate-x-1 transition-transform">Mainkan →</span>
            </div>
          </button>

          {/* Game 2: Puzzle Lembar Kerja */}
          <button
            type="button"
            onClick={() => onSelectGame('puzzle')}
            className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] shadow-sm hover:shadow-xl hover:border-[#1E40AF] hover:-translate-y-1 active:scale-[0.99] transition-all flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-all shadow-xs">
                <Table className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-[#1E40AF] uppercase tracking-wider">
                3x3 & 4x4 Puzzle
              </span>
              <h3 className="text-lg font-bold text-[#0F2942] mt-1 mb-2">
                2. Puzzle Lembar Kerja
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tukar dan susun kembali potongan gambar antarmuka Excel dengan sentuhan atau klik mouse.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1E40AF] w-full">
              <span>Maksimal: 100 Poin</span>
              <span className="text-[#1E40AF] font-bold group-hover:translate-x-1 transition-transform">Mainkan →</span>
            </div>
          </button>

          {/* Game 3: Tantangan Rumus */}
          <button
            type="button"
            onClick={() => onSelectGame('formula')}
            className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] shadow-sm hover:shadow-xl hover:border-[#0369A1] hover:-translate-y-1 active:scale-[0.99] transition-all flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0369A1]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0369A1] group-hover:bg-[#0369A1] group-hover:text-white flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-all shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-[#0369A1] uppercase tracking-wider">
                5 Studi Kasus Nyata
              </span>
              <h3 className="text-lg font-bold text-[#0F2942] mt-1 mb-2">
                3. Tantangan Rumus
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Praktikkan langsung rumus SUM, AVERAGE, MAX, dan MIN pada tabel simulasi nilai siswa SMK.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0369A1] w-full">
              <span>Maksimal: 100 Poin</span>
              <span className="text-[#0369A1] font-bold group-hover:translate-x-1 transition-transform">Mainkan →</span>
            </div>
          </button>
        </div>
      </section>

      {/* Curriculum & Pedagogy Info */}
      <section className="bg-white rounded-3xl p-8 border border-[#D8E1EC] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            type="button"
            onClick={onOpenInstructions}
            className="flex items-start gap-3 text-left p-3 rounded-2xl hover:bg-[#F3F6FA] transition-all cursor-pointer group"
          >
            <CheckCircle2 className="w-6 h-6 text-[#217346] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-bold text-[#0F2942] text-sm group-hover:text-[#217346]">Sesuai Kurikulum Informatika Kelas X</h4>
              <p className="text-xs text-slate-500 mt-1">
                Disusun khusus untuk materi Analisis Data & Aplikasi Pengolah Angka tingkat SMK Fase E.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="flex items-start gap-3 text-left p-3 rounded-2xl hover:bg-[#F3F6FA] transition-all cursor-pointer group"
          >
            <CheckCircle2 className="w-6 h-6 text-[#1E40AF] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-bold text-[#0F2942] text-sm group-hover:text-[#1E40AF]">Transparan & Real-Time</h4>
              <p className="text-xs text-slate-500 mt-1">
                Skor langsung tercatat di papan peringkat kelas dan dapat dipantau guru tanpa rekayasa data.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={onStartLearning}
            className="flex items-start gap-3 text-left p-3 rounded-2xl hover:bg-[#F3F6FA] transition-all cursor-pointer group"
          >
            <CheckCircle2 className="w-6 h-6 text-[#0369A1] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-bold text-[#0F2942] text-sm group-hover:text-[#0369A1]">Responsif di Komputer Lab & Ponsel</h4>
              <p className="text-xs text-slate-500 mt-1">
                Didesain nyaman dimainkan di layar monitor laboratorium komputer sekolah maupun ponsel siswa.
              </p>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">
            Ingin memahami aturan penilaian lengkap dan perolehan badge?
          </span>
          <button
            onClick={onOpenInstructions}
            className="text-[#1E40AF] font-bold hover:underline cursor-pointer"
          >
            Buka Petunjuk & Panduan Penilaian →
          </button>
        </div>
      </section>
    </div>
  );
};
