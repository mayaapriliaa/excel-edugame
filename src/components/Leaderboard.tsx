import React, { useState, useMemo } from 'react';
import { Trophy, Search, Filter, RefreshCw } from 'lucide-react';
import { StudentProfile } from '../types';
import { StorageService } from '../services/storageService';

interface LeaderboardProps {
  currentStudent: StudentProfile | null;
  onRefresh?: () => void;
  onBackToMenu: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentStudent,
  onRefresh,
  onBackToMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Semua');
  const [sortByGame, setSortByGame] = useState<'total' | 'quiz' | 'puzzle' | 'formula'>('total');

  // Load live leaderboard from storage
  const rawLeaderboard = useMemo(() => {
    return StorageService.getLeaderboard();
  }, []);

  // Distinct classes list
  const classesList = useMemo(() => {
    const set = new Set<string>();
    rawLeaderboard.forEach(item => {
      if (item.className) set.add(item.className);
    });
    return ['Semua', ...Array.from(set)];
  }, [rawLeaderboard]);

  // Filtered and sorted leaderboard
  const filteredList = useMemo(() => {
    let list = [...rawLeaderboard];

    if (selectedClass !== 'Semua') {
      list = list.filter(item => item.className === selectedClass);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => item.studentName.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      if (sortByGame === 'quiz') return b.quizScore - a.quizScore;
      if (sortByGame === 'puzzle') return b.puzzleScore - a.puzzleScore;
      if (sortByGame === 'formula') return b.formulaScore - a.formulaScore;
      return b.totalScore - a.totalScore;
    });

    return list;
  }, [rawLeaderboard, selectedClass, searchQuery, sortByGame]);

  // Top 3 for Podium
  const top3 = useMemo(() => {
    return filteredList.slice(0, 3);
  }, [filteredList]);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* Title & Info Banner */}
      <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1E4B73]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#86EFAC]">
              <Trophy className="w-3.5 h-3.5" />
              <span>Klasemen Prestasi Siswa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Peringkat Petualang Excel
            </h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Informatika Kelas X · SMK Muhammadiyah Tawang Rejo
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onRefresh) onRefresh();
              }}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold border border-white/25 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Perbarui Klasemen
            </button>
            <button
              onClick={onBackToMenu}
              className="px-4 py-2 bg-white text-[#0F2942] rounded-xl text-xs font-bold shadow-md hover:bg-[#EFF6FF] transition-colors cursor-pointer whitespace-nowrap"
            >
              Kembali ke Menu Game
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {top3.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8E1EC] shadow-md">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E40AF]">
              Podium 3 Peringkat Tertinggi
            </span>
            <h2 className="text-xl font-extrabold text-[#0F2942] mt-1">
              Bintang Kelas Informatika
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
            {/* Rank 2 */}
            {top3[1] && (
              <div className="order-2 md:order-1 bg-[#F8FAFC] border-2 border-[#CBD5E1] rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center text-[#0F2942] font-extrabold text-xl mb-3 shadow">
                  🥈 2
                </div>
                <div className="font-extrabold text-base text-[#0F2942] truncate max-w-full">
                  {top3[1].studentName}
                </div>
                <div className="text-xs text-slate-500 font-medium mb-3">
                  {top3[1].className}
                </div>
                <div className="text-2xl font-extrabold text-[#0F2942] mb-1 tabular-nums">
                  {top3[1].totalScore}
                  <span className="text-xs text-slate-400 font-normal"> Poin</span>
                </div>
                <div className="text-[11px] text-[#185C37] font-semibold">
                  {top3[1].completedCount}/3 Game Selesai
                </div>
              </div>
            )}

            {/* Rank 1 */}
            {top3[0] && (
              <div className="order-1 md:order-2 bg-gradient-to-b from-[#EFF6FF] via-white to-[#EAF5EE]/60 border-2 border-[#1E40AF] rounded-3xl p-6 text-center flex flex-col items-center shadow-lg transform md:-translate-y-3">
                <div className="w-16 h-16 rounded-full bg-[#0F2942] border-2 border-[#217346] flex items-center justify-center text-white font-extrabold text-2xl mb-3 shadow-md">
                  👑 1
                </div>
                <div className="font-extrabold text-lg text-[#0F2942] truncate max-w-full">
                  {top3[0].studentName}
                </div>
                <div className="text-xs text-[#1E40AF] font-semibold mb-3">
                  {top3[0].className}
                </div>
                <div className="text-4xl font-extrabold text-[#217346] mb-1 tabular-nums">
                  {top3[0].totalScore}
                  <span className="text-xs text-slate-500 font-normal"> Poin</span>
                </div>
                <div className="text-xs text-[#185C37] font-bold mb-2">
                  {top3[0].completedCount}/3 Game Selesai
                </div>
                {top3[0].badges.length > 0 && (
                  <div className="text-[11px] text-[#0F2942] font-semibold bg-[#DBEAFE] px-3 py-1 rounded-lg">
                    🏅 {top3[0].badges[0]}
                  </div>
                )}
              </div>
            )}

            {/* Rank 3 */}
            {top3[2] && (
              <div className="order-3 bg-[#F4F7FA] border-2 border-[#BFDBFE] rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#DBEAFE] border-2 border-[#60A5FA] flex items-center justify-center text-[#1E3A8A] font-extrabold text-xl mb-3 shadow">
                  🥉 3
                </div>
                <div className="font-extrabold text-base text-[#0F2942] truncate max-w-full">
                  {top3[2].studentName}
                </div>
                <div className="text-xs text-slate-500 font-medium mb-3">
                  {top3[2].className}
                </div>
                <div className="text-2xl font-extrabold text-[#0F2942] mb-1 tabular-nums">
                  {top3[2].totalScore}
                  <span className="text-xs text-slate-400 font-normal"> Poin</span>
                </div>
                <div className="text-[11px] text-[#185C37] font-semibold">
                  {top3[2].completedCount}/3 Game Selesai
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-[#0F2942] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-[#1E40AF]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Class Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              {classesList.map(cls => (
                <option key={cls} value={cls}>
                  Kelas: {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Game column */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Urutkan:</span>
            <select
              value={sortByGame}
              onChange={(e) => setSortByGame(e.target.value as 'total' | 'quiz' | 'puzzle' | 'formula')}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="total">Total Skor (Maks 300)</option>
              <option value="quiz">Skor Kuis Excel</option>
              <option value="puzzle">Skor Puzzle</option>
              <option value="formula">Skor Tantangan Rumus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#D8E1EC] overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-[#0F2942] text-base">Belum Ada Data Siswa</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || selectedClass !== 'Semua'
                ? 'Tidak ada siswa yang sesuai dengan filter pencarian.'
                : 'Belum ada pengerjaan game yang tercatat. Masuklah sebagai siswa dan selesaikan tantangan untuk mencatatkan namamu di papan peringkat!'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead>
                <tr className="bg-[#EEF3F9] border-b border-[#D8E1EC] text-[#0F2942] font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-4 text-center w-14">Rank</th>
                  <th className="py-4 px-4">Nama Siswa</th>
                  <th className="py-4 px-3">Kelas</th>
                  <th className="py-4 px-3 text-center">Kuis</th>
                  <th className="py-4 px-3 text-center">Puzzle</th>
                  <th className="py-4 px-3 text-center">Rumus</th>
                  <th className="py-4 px-4 text-center font-extrabold text-[#217346]">Total Skor</th>
                  <th className="py-4 px-4 text-center">Progres</th>
                  <th className="py-4 px-4">Lencana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((entry, index) => {
                  const isCurrentStudent = currentStudent?.id === entry.studentId;

                  return (
                    <tr
                      key={entry.studentId}
                      className={`hover:bg-[#F8FAFC] transition-colors ${
                        isCurrentStudent ? 'bg-[#EAF5EE]/70 font-semibold' : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-4 px-4 text-center font-bold">
                        {index === 0 && <span className="text-[#0F2942] font-extrabold text-base">🥇 1</span>}
                        {index === 1 && <span className="text-slate-600 font-extrabold text-base">🥈 2</span>}
                        {index === 2 && <span className="text-[#1E40AF] font-extrabold text-base">🥉 3</span>}
                        {index > 2 && <span className="text-slate-500 font-bold">#{index + 1}</span>}
                      </td>

                      {/* Name Column */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#0F2942] flex items-center gap-2">
                          <span>{entry.studentName}</span>
                          {isCurrentStudent && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-[#217346] text-white font-bold">
                              Kamu
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Class Column */}
                      <td className="py-4 px-3 text-slate-600 text-xs">
                        {entry.className}
                      </td>

                      {/* Quiz Score */}
                      <td className="py-4 px-3 text-center font-medium">
                        <span className={entry.quizScore > 0 ? 'text-[#217346] font-bold' : 'text-slate-400'}>
                          {entry.quizScore}
                        </span>
                      </td>

                      {/* Puzzle Score */}
                      <td className="py-4 px-3 text-center font-medium">
                        <span className={entry.puzzleScore > 0 ? 'text-[#1E40AF] font-bold' : 'text-slate-400'}>
                          {entry.puzzleScore}
                        </span>
                      </td>

                      {/* Formula Score */}
                      <td className="py-4 px-3 text-center font-medium">
                        <span className={entry.formulaScore > 0 ? 'text-[#0369A1] font-bold' : 'text-slate-400'}>
                          {entry.formulaScore}
                        </span>
                      </td>

                      {/* Total Score */}
                      <td className="py-4 px-4 text-center font-extrabold text-[#0F2942] text-base">
                        {entry.totalScore}
                      </td>

                      {/* Progress */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`text-xs font-bold ${
                            entry.completedCount === 3
                              ? 'text-[#217346]'
                              : 'text-slate-500'
                          }`}
                        >
                          {entry.completedCount}/3
                          {entry.completedCount === 3 && ' Selesai'}
                        </span>
                      </td>

                      {/* Badges Column */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs text-[11px] font-semibold text-[#1E3A8A]">
                          {entry.badges.length > 0 ? (
                            entry.badges.map((b, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded"
                              >
                                {b}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-xs italic">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
