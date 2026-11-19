import React from 'react';
import { Award, Trophy, Play, CheckCircle2, Circle, Printer } from 'lucide-react';
import { GameScoreRecord, GameType, StudentProfile } from '../types';

interface StudentResultProps {
  student: StudentProfile;
  scores: GameScoreRecord;
  onSelectGame: (type: GameType) => void;
  onPlayAnotherGame: () => void;
  onViewLeaderboard: () => void;
  onBackToMenu: () => void;
}

export const StudentResult: React.FC<StudentResultProps> = ({
  student,
  scores,
  onSelectGame,
  onPlayAnotherGame,
  onViewLeaderboard,
  onBackToMenu
}) => {
  // Motivational message logic
  const getMotivationalMessage = (total: number, completed: number) => {
    if (total >= 270) {
      return 'Luar biasa! Pemahaman konsep rumus dan sel kamu sangat matang. Kamu adalah calon Ahli Data dan Teknisi handal di laboratorium komputer SMK Muhammadiyah Tawang Rejo!';
    }
    if (total >= 210) {
      return 'Kerja bagus! Penguasaan materi Microsoft Excel kamu di atas rata-rata. Pertahankan semangat belajar untuk menggapai puncak klasemen kelas!';
    }
    if (completed === 3) {
      return 'Selamat, kamu telah menyelesaikan seluruh modul petualangan! Teruslah mencoba untuk meningkatkan nilai dan rekor terbaikmu.';
    }
    return 'Awal yang hebat! Selesaikan sisa tantangan lainnya untuk membuka lencana penghargaan Petualang Lengkap!';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in space-y-6">
      {/* Certificate / Result Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-[#D8E1EC] overflow-hidden relative print:border-none print:shadow-none">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white p-8 text-center relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86EFAC] mb-2">
            <Award className="w-4 h-4" />
            <span>Kartu Laporan Capaian Siswa</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Hasil Akhir Petualangan Excel
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Mata Pelajaran Informatika · SMK Muhammadiyah Tawang Rejo
          </p>
        </div>

        {/* Student Bio Strip */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F3F6FA] border border-[#D8E1EC] rounded-2xl">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Nama Lengkap Siswa
              </div>
              <div className="text-xl font-extrabold text-[#0F2942]">
                {student.name}
              </div>
              <div className="text-xs text-[#217346] font-semibold mt-0.5">
                Kelas: {student.className}
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-[#D8E1EC] sm:pl-6">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Total Akumulasi Skor
              </div>
              <div className="text-3xl font-extrabold text-[#0F2942] tabular-nums">
                {scores.totalScore}
                <span className="text-sm font-semibold text-slate-400">/300</span>
              </div>
              <div className="text-xs text-slate-500 font-medium tabular-nums">
                {scores.completedGamesCount} dari 3 Game Tuntas
              </div>
            </div>
          </div>

          {/* Breakdown of 3 Games */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Rincian Capaian Tiap Game (Klik untuk main/ulang):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Game 1: Quiz */}
              <button
                type="button"
                onClick={() => onSelectGame('quiz')}
                className="p-4 rounded-xl border border-[#D8E1EC] hover:border-[#217346] bg-white hover:bg-[#EAF5EE]/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {scores.quiz > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-[#217346] shrink-0 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-[#217346] shrink-0 transition-colors" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-[#0F2942]">1. Kuis Excel</div>
                    <div className="text-[11px] text-slate-500">10 Soal Teori</div>
                  </div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-lg font-extrabold text-[#217346]">{scores.quiz}/100</div>
                  <div className="text-[10px] text-slate-400">{scores.quiz > 0 ? 'Selesai' : 'Mainkan'}</div>
                </div>
              </button>

              {/* Game 2: Puzzle */}
              <button
                type="button"
                onClick={() => onSelectGame('puzzle')}
                className="p-4 rounded-xl border border-[#D8E1EC] hover:border-[#1E40AF] bg-white hover:bg-[#EFF6FF]/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {scores.puzzle > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-[#1E40AF] shrink-0 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-[#1E40AF] shrink-0 transition-colors" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-[#0F2942]">2. Puzzle Gambar</div>
                    <div className="text-[11px] text-slate-500">Lembar Kerja</div>
                  </div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-lg font-extrabold text-[#1E40AF]">{scores.puzzle}/100</div>
                  <div className="text-[10px] text-slate-400">{scores.puzzle > 0 ? 'Selesai' : 'Mainkan'}</div>
                </div>
              </button>

              {/* Game 3: Formula */}
              <button
                type="button"
                onClick={() => onSelectGame('formula')}
                className="p-4 rounded-xl border border-[#D8E1EC] hover:border-[#0369A1] bg-white hover:bg-[#E0F2FE]/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {scores.formula > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-[#0369A1] shrink-0 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-[#0369A1] shrink-0 transition-colors" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-[#0F2942]">3. Tantangan Rumus</div>
                    <div className="text-[11px] text-slate-500">SUM, AVG, MAX, MIN</div>
                  </div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="text-lg font-extrabold text-[#0369A1]">{scores.formula}/100</div>
                  <div className="text-[10px] text-slate-400">{scores.formula > 0 ? 'Selesai' : 'Mainkan'}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Motivational teacher message */}
          <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#0F2942]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] mb-1">
              Catatan Guru Informatika:
            </div>
            <p className="text-xs sm:text-sm leading-relaxed italic">
              "{getMotivationalMessage(scores.totalScore, scores.completedGamesCount)}"
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan Hasil
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onViewLeaderboard}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0F2942] hover:bg-[#193F63] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Trophy className="w-4 h-4 text-[#93C5FD]" />
                Lihat Leaderboard
              </button>

              <button
                onClick={onPlayAnotherGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                Main Game Lain
              </button>

              <button
                onClick={onBackToMenu}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
