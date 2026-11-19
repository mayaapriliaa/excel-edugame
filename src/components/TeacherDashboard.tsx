import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  TrendingUp,
  CheckCircle2,
  Search,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Lock,
  ShieldAlert,
  Database,
  ArrowUpDown
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { LeaderboardEntry, GameHistoryEntry } from '../types';
import { FirebaseGuideModal } from './FirebaseGuideModal';

interface TeacherDashboardProps {
  onBackToHome: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('teacher_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // UI Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Selesai Semua' | 'Belum Selesai'>('Semua');
  const [selectedGameFilter, setSelectedGameFilter] = useState<'Semua' | 'quiz' | 'puzzle' | 'formula'>('Semua');
  const [sortOrder, setSortOrder] = useState<'score_desc' | 'score_asc' | 'date_desc' | 'name_asc'>('score_desc');

  // Selected Student for Detail Modal
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<{
    student: LeaderboardEntry;
    history: GameHistoryEntry[];
  } | null>(null);

  const [showFirebaseGuide, setShowFirebaseGuide] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const stats = useMemo(() => {
    return StorageService.getTeacherStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const allEntries = useMemo(() => {
    return StorageService.getLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const classOptions = useMemo(() => {
    const set = new Set<string>();
    allEntries.forEach(e => {
      if (e.className) set.add(e.className);
    });
    return ['Semua', ...Array.from(set)];
  }, [allEntries]);

  const filteredEntries = useMemo(() => {
    let list = [...allEntries];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(e => e.studentName.toLowerCase().includes(q));
    }

    if (selectedClass !== 'Semua') {
      list = list.filter(e => e.className === selectedClass);
    }

    if (selectedStatus === 'Selesai Semua') {
      list = list.filter(e => e.completedCount === 3);
    } else if (selectedStatus === 'Belum Selesai') {
      list = list.filter(e => e.completedCount < 3);
    }

    if (selectedGameFilter === 'quiz') {
      list = list.filter(e => e.quizScore > 0);
    } else if (selectedGameFilter === 'puzzle') {
      list = list.filter(e => e.puzzleScore > 0);
    } else if (selectedGameFilter === 'formula') {
      list = list.filter(e => e.formulaScore > 0);
    }

    list.sort((a, b) => {
      if (sortOrder === 'score_desc') return b.totalScore - a.totalScore;
      if (sortOrder === 'score_asc') return a.totalScore - b.totalScore;
      if (sortOrder === 'date_desc') return b.lastPlayedAt - a.lastPlayedAt;
      if (sortOrder === 'name_asc') return a.studentName.localeCompare(b.studentName);
      return 0;
    });

    return list;
  }, [allEntries, searchQuery, selectedClass, selectedStatus, selectedGameFilter, sortOrder]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'guru123' || pinInput.trim() === 'admin' || pinInput.trim() === 'tawangrejo') {
      setIsAuthenticated(true);
      sessionStorage.setItem('teacher_auth', 'true');
      setPinError('');
    } else {
      setPinError('Kata sandi guru salah. Silakan gunakan "guru123" untuk akses demo.');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('teacher_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('teacher_auth');
    setPinInput('');
  };

  const handleExportCSV = () => {
    StorageService.exportToCSV();
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenDetail = (student: LeaderboardEntry) => {
    const allHistory = StorageService.getAllHistory();
    const studentHistory = allHistory.filter(h => h.studentId === student.studentId);
    setSelectedStudentDetail({
      student,
      history: studentHistory
    });
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    setShowResetConfirm(false);
    handleRefresh();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D8E1EC] overflow-hidden">
          <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white p-6 text-center">
            <div className="w-14 h-14 bg-white/10 text-[#86EFAC] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold">Autentikasi Guru Informatika</h2>
            <p className="text-xs text-blue-100 mt-1">
              SMK Muhammadiyah Tawang Rejo
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {pinError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {pinError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0F2942] uppercase tracking-wider mb-1.5">
                Kata Sandi Guru / Administrator
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="Masukkan kata sandi guru..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-[#1E40AF]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Kunci demo default: <code className="bg-[#EFF6FF] px-1.5 py-0.5 rounded text-[#1E40AF] font-bold">guru123</code>
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#0F2942] hover:bg-[#183C5E] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Masuk ke Dashboard Guru
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-[#EAF5EE] hover:bg-[#D5ECDD] text-[#185C37] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Masuk Cepat Mode Guru (Demo)
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full py-2 text-slate-500 hover:text-[#0F2942] text-xs transition-colors cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D8E1EC] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F2942] text-white flex items-center justify-center font-bold shadow-md">
            <LayoutDashboard className="w-6 h-6 text-[#86EFAC]" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="text-[#217346]">Panel Pendidik</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-[#1E40AF]">Mode Demo (Data Riil Tercatat)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2942] mt-0.5">
              Dashboard Guru Informatika
            </h1>
            <p className="text-xs text-slate-500">
              Evaluasi Pembelajaran Microsoft Excel · SMK Muhammadiyah Tawang Rejo
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
          <button
            onClick={() => setShowFirebaseGuide(true)}
            className="px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E3A8A] border border-[#BFDBFE] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Database className="w-4 h-4 text-[#1E40AF]" />
            Panduan Sinkronisasi Cloud
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-[#217346] hover:bg-[#185C37] text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Ekspor ke CSV
          </button>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl border border-[#D8E1EC] hover:bg-[#F3F6FA] text-[#0F2942] transition-colors cursor-pointer"
            title="Perbarui Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards (Interactive quick filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Students */}
        <button
          type="button"
          onClick={() => {
            setSelectedStatus('Semua');
            setSelectedGameFilter('Semua');
          }}
          className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] hover:border-[#217346] shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EAF5EE] text-[#217346] group-hover:bg-[#217346] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Total Siswa Terdata
            </div>
            <div className="text-3xl font-extrabold text-[#0F2942] mt-0.5 tabular-nums">
              {stats.totalStudents}
            </div>
            <div className="text-[11px] text-[#217346] font-semibold mt-0.5">
              Tampilkan semua siswa
            </div>
          </div>
        </button>

        {/* Card 2: Total Plays */}
        <button
          type="button"
          onClick={() => setSortOrder('date_desc')}
          className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] hover:border-[#1E40AF] shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Total Sesi Pengerjaan
            </div>
            <div className="text-3xl font-extrabold text-[#0F2942] mt-0.5 tabular-nums">
              {stats.totalGamePlays}
            </div>
            <div className="text-[11px] text-[#1E40AF] font-semibold mt-0.5">
              Urutkan aktivitas terbaru
            </div>
          </div>
        </button>

        {/* Card 3: Average Score */}
        <button
          type="button"
          onClick={() => setSortOrder('score_desc')}
          className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] hover:border-[#0369A1] shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0369A1] group-hover:bg-[#0369A1] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Rata-rata Skor Siswa
            </div>
            <div className="text-3xl font-extrabold text-[#0F2942] mt-0.5 tabular-nums">
              {stats.averageScore}
              <span className="text-sm font-medium text-slate-400">/300</span>
            </div>
            <div className="text-[11px] text-[#0369A1] font-semibold mt-0.5">
              Urutkan skor tertinggi
            </div>
          </div>
        </button>

        {/* Card 4: Full Completions */}
        <button
          type="button"
          onClick={() => setSelectedStatus('Selesai Semua')}
          className="text-left bg-white rounded-3xl p-6 border border-[#D8E1EC] hover:border-[#0F2942] shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EEF3F9] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Selesai Seluruh Game
            </div>
            <div className="text-3xl font-extrabold text-[#0F2942] mt-0.5 tabular-nums">
              {stats.fullCompletions}
            </div>
            <div className="text-[11px] text-[#0F2942] font-semibold mt-0.5">
              Filter siswa tuntas 3/3
            </div>
          </div>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search by Name */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari siswa berdasarkan nama..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-[#0F2942] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Kelas:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'Semua' | 'Selesai Semua' | 'Belum Selesai')}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="Semua">Semua Status</option>
                <option value="Selesai Semua">Tuntas 3/3 Game</option>
                <option value="Belum Selesai">Belum Selesai</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Game:</span>
              <select
                value={selectedGameFilter}
                onChange={(e) => setSelectedGameFilter(e.target.value as 'Semua' | 'quiz' | 'puzzle' | 'formula')}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="Semua">Semua Game</option>
                <option value="quiz">Sudah Main Kuis</option>
                <option value="puzzle">Sudah Main Puzzle</option>
                <option value="formula">Sudah Main Rumus</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'score_desc' | 'score_asc' | 'date_desc' | 'name_asc')}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="score_desc">Skor Tertinggi</option>
                <option value="score_asc">Skor Terendah</option>
                <option value="date_desc">Terbaru Mengerjakan</option>
                <option value="name_asc">Nama (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Menampilkan <strong>{filteredEntries.length}</strong> siswa tercatat
          </span>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Reset Data Percobaan
          </button>
        </div>
      </div>

      {/* Student Activity Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#D8E1EC] overflow-hidden">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-[#0F2942] text-base">Belum Ada Aktivitas Siswa yang Tercatat</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Dashboard ini hanya menampilkan data siswa yang benar-benar tercatat dalam sistem. Mintalah siswa membuka aplikasi dan menyelesaikan tantangan untuk melihat riwayat mereka di sini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead>
                <tr className="bg-[#EEF3F9] border-b border-[#D8E1EC] text-[#0F2942] font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-4 text-center w-12">No.</th>
                  <th className="py-4 px-4">Nama Siswa</th>
                  <th className="py-4 px-3">Kelas</th>
                  <th className="py-4 px-3 text-center">Kuis Dikerjakan</th>
                  <th className="py-4 px-3 text-center">Game Dimainkan</th>
                  <th className="py-4 px-4 text-center font-bold text-[#217346]">Skor Tertinggi</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4">Waktu Terakhir</th>
                  <th className="py-4 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry, index) => {
                  return (
                    <tr key={entry.studentId} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        {index + 1}
                      </td>

                      <td className="py-4 px-4 font-bold text-[#0F2942]">
                        {entry.studentName}
                      </td>

                      <td className="py-4 px-3 text-slate-600 text-xs">
                        {entry.className}
                      </td>

                      <td className="py-4 px-3 text-center font-semibold">
                        {entry.quizScore > 0 ? (
                          <span className="text-[#217346] font-bold">
                            {entry.quizScore}/100
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Belum</span>
                        )}
                      </td>

                      <td className="py-4 px-3 text-center font-medium text-[#0F2942]">
                        {entry.completedCount} / 3 Game
                      </td>

                      <td className="py-4 px-4 text-center font-extrabold text-[#217346] text-base">
                        {entry.totalScore}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                            entry.completedCount === 3
                              ? 'bg-[#EAF5EE] text-[#185C37] border border-[#C6E6D2]'
                              : entry.completedCount > 0
                              ? 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE]'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {entry.completedCount === 3 ? 'Selesai Semua' : 'Sedang Berjalan'}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-500">
                        {entry.lastPlayedAt ? (
                          new Date(entry.lastPlayedAt).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        ) : (
                          '-'
                        )}
                      </td>

                      <td className="py-4 px-3 text-center">
                        <button
                          onClick={() => handleOpenDetail(entry)}
                          className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#1E40AF] text-[#1E3A8A] hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer mx-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8E1EC]">
            <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#86EFAC] uppercase tracking-wider">
                  Rincian Aktivitas Siswa
                </span>
                <h3 className="text-xl font-extrabold mt-1">
                  {selectedStudentDetail.student.studentName}
                </h3>
                <p className="text-xs text-blue-100">
                  {selectedStudentDetail.student.className}
                </p>
              </div>

              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="text-white/80 hover:text-white p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center tabular-nums">
                <div className="p-3 bg-[#EAF5EE] rounded-2xl border border-[#C6E6D2]">
                  <div className="text-[10px] font-bold text-[#217346] uppercase">Kuis</div>
                  <div className="text-xl font-extrabold text-[#185C37] mt-1">{selectedStudentDetail.student.quizScore}/100</div>
                </div>
                <div className="p-3 bg-[#EFF6FF] rounded-2xl border border-[#BFDBFE]">
                  <div className="text-[10px] font-bold text-[#1E40AF] uppercase">Puzzle</div>
                  <div className="text-xl font-extrabold text-[#1E3A8A] mt-1">{selectedStudentDetail.student.puzzleScore}/100</div>
                </div>
                <div className="p-3 bg-[#E0F2FE] rounded-2xl border border-[#BAE6FD]">
                  <div className="text-[10px] font-bold text-[#0369A1] uppercase">Rumus</div>
                  <div className="text-xl font-extrabold text-[#0C4A6E] mt-1">{selectedStudentDetail.student.formulaScore}/100</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0F2942] uppercase tracking-wider mb-2">
                  Lencana Prestasi:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudentDetail.student.badges.length > 0 ? (
                    selectedStudentDetail.student.badges.map((b, i) => (
                      <span key={i} className="px-3 py-1 bg-[#EFF6FF] text-[#1E3A8A] font-bold rounded-lg text-xs border border-[#BFDBFE]">
                        🏅 {b}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">Belum ada lencana yang terbuka.</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0F2942] uppercase tracking-wider mb-2">
                  Riwayat Percobaan & Waktu:
                </h4>
                {selectedStudentDetail.history.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Tidak ada rincian riwayat tambahan.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto tabular-nums">
                    {selectedStudentDetail.history.map((h, i) => (
                      <div key={i} className="p-3 bg-[#F8FAFC] border border-[#D8E1EC] rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#0F2942] capitalize">
                            {h.gameType === 'quiz' ? 'Kuis Excel' : h.gameType === 'puzzle' ? 'Puzzle' : 'Tantangan Rumus'}
                          </span>
                          <span className="text-slate-400 ml-2">
                            ({new Date(h.completedAt).toLocaleString('id-ID')})
                          </span>
                        </div>
                        <div className="font-bold text-[#217346]">
                          {h.score} Poin ({h.durationSeconds}s)
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#F3F6FA] border-t border-[#D8E1EC] flex justify-end rounded-b-3xl">
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="px-5 py-2 bg-[#0F2942] hover:bg-[#193F63] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D8E1EC] text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F2942]">
              Konfirmasi Reset Data
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tindakan ini akan menghapus seluruh data siswa, riwayat game, dan leaderboard lokal pada browser ini. Pastikan Anda telah mengekspor CSV terlebih dahulu jika data masih diperlukan.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Hapus Seluruh Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Firebase setup guide modal */}
      <FirebaseGuideModal
        isOpen={showFirebaseGuide}
        onClose={() => setShowFirebaseGuide(false)}
      />
    </div>
  );
};
