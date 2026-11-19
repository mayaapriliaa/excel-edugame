import React from 'react';
import { BookOpen, Layers, Award, Play, RotateCcw, CheckCircle2, Trophy } from 'lucide-react';
import { GameScoreRecord, GameType, StudentProfile } from '../types';

interface GameSelectionProps {
  student: StudentProfile;
  scores: GameScoreRecord;
  onSelectGame: (type: GameType) => void;
  onOpenLeaderboard: () => void;
  onOpenInstructions: () => void;
}

export const GameSelection: React.FC<GameSelectionProps> = ({
  student,
  scores,
  onSelectGame,
  onOpenLeaderboard,
  onOpenInstructions
}) => {
  const gamesList = [
    {
      type: 'quiz' as GameType,
      title: 'Kuis Excel',
      subtitle: 'Materi Pengenalan & Rumus Dasar',
      description: '10 soal pilihan ganda interaktif mencakup konsep sel, baris, kolom, formula bar, serta fungsi SUM, AVERAGE, MAX, dan MIN.',
      score: scores.quiz,
      played: scores.quiz > 0,
      icon: BookOpen,
      iconBg: 'bg-[#EAF5EE] text-[#217346] border-[#C6E6D2] group-hover:bg-[#217346] group-hover:text-white',
      accentText: 'text-[#217346]',
      cardHover: 'hover:border-[#217346] focus:ring-[#217346]',
      btnBg: 'bg-[#217346] hover:bg-[#185C37]'
    },
    {
      type: 'puzzle' as GameType,
      title: 'Puzzle Gambar Excel',
      subtitle: 'Menyusun Antarmuka Lembar Kerja',
      description: 'Tukar dan susun 9 potongan gambar antarmuka Microsoft Excel 365. Tersedia pula opsi lanjutan tingkat 4x4 bagi petualang tangguh!',
      score: scores.puzzle,
      played: scores.puzzle > 0,
      icon: Layers,
      iconBg: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE] group-hover:bg-[#1E40AF] group-hover:text-white',
      accentText: 'text-[#1E40AF]',
      cardHover: 'hover:border-[#1E40AF] focus:ring-[#1E40AF]',
      btnBg: 'bg-[#1E40AF] hover:bg-[#1E3A8A]'
    },
    {
      type: 'formula' as GameType,
      title: 'Tantangan Rumus Excel',
      subtitle: 'Simulasi Studi Kasus Nyata',
      description: 'Analisis tabel nilai siswa SMK nyata. Terapkan rumus =SUM, =AVERAGE, =MAX, dan =MIN secara tepat untuk memecahkan kasus.',
      score: scores.formula,
      played: scores.formula > 0,
      icon: Award,
      iconBg: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD] group-hover:bg-[#0369A1] group-hover:text-white',
      accentText: 'text-[#0369A1]',
      cardHover: 'hover:border-[#0369A1] focus:ring-[#0369A1]',
      btnBg: 'bg-[#0369A1] hover:bg-[#075985]'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* Student Welcome & Score Dashboard Banner */}
      <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1E4B73]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identity */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#86EFAC] uppercase tracking-wider">
              Status Petualang Siswa
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Kelas: {student.className} · SMK Muhammadiyah Tawang Rejo
            </p>
          </div>

          {/* Quick Score Stats Card */}
          <div className="flex items-center gap-4 bg-[#0B1F33]/75 border border-white/15 p-4 rounded-2xl backdrop-blur-md">
            <div>
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                Total Skor Akumulasi
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                {scores.totalScore}
                <span className="text-sm font-semibold text-blue-200">/300</span>
              </div>
            </div>

            <div className="h-10 w-px bg-white/20 mx-1" />

            <div>
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                Game Tuntas
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1.5 tabular-nums">
                <span>{scores.completedGamesCount}/3</span>
                {scores.completedGamesCount === 3 && (
                  <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Motivation note */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-blue-100">
            {scores.completedGamesCount === 3
              ? '🎉 Selamat! Kamu telah menyelesaikan seluruh modul tantangan Excel.'
              : `🎯 Selesaikan ${3 - scores.completedGamesCount} game lagi untuk meraih lencana Petualang Lengkap!`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInstructions}
              className="text-blue-100 hover:text-white underline font-semibold cursor-pointer"
            >
              Lihat Aturan Skor
            </button>
            <span className="text-blue-300/60">·</span>
            <button
              onClick={onOpenLeaderboard}
              className="text-[#86EFAC] hover:text-white font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
              Buka Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Game Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#0F2942]">
            Pilih Game yang Ingin Kamu Mainkan:
          </h2>
          <span className="text-xs text-slate-500 hidden sm:block">
            Klik ikon atau kartu mana saja untuk memulai
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gamesList.map((game, idx) => {
            const Icon = game.icon;

            return (
              <div
                key={game.type}
                role="button"
                tabIndex={0}
                onClick={() => onSelectGame(game.type)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectGame(game.type);
                  }
                }}
                className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#D8E1EC] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 ${game.cardHover}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold group-hover:scale-110 transition-all shadow-xs ${game.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Modul Game #{idx + 1}
                        </span>
                        <h3 className="text-lg font-bold text-[#0F2942]">
                          {game.title}
                        </h3>
                      </div>
                    </div>

                    {/* Played status */}
                    {game.played ? (
                      <span className="px-2.5 py-1 bg-[#EAF5EE] text-[#185C37] text-[11px] font-bold rounded-lg border border-[#C6E6D2] flex items-center gap-1 shrink-0 tabular-nums">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#217346]" />
                        {game.score}/100
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 shrink-0 pt-1">
                        Belum
                      </span>
                    )}
                  </div>

                  <div className={`text-xs font-bold mb-2 ${game.accentText}`}>
                    {game.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    {game.played ? (
                      <span className={`${game.accentText} font-semibold`}>
                        Ulangi untuk rekor baru
                      </span>
                    ) : (
                      <span>Siap dimulai</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectGame(game.type);
                    }}
                    className={`px-4 py-2.5 ${game.btnBg} text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap`}
                  >
                    {game.played ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        Main Ulang
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Mulai Game
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
