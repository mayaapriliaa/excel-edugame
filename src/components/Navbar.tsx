import React from 'react';
import { FileSpreadsheet, User, Trophy, LayoutDashboard, HelpCircle, LogOut } from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentTab: 'home' | 'games' | 'leaderboard' | 'teacher';
  onSelectTab: (tab: 'home' | 'games' | 'leaderboard' | 'teacher') => void;
  currentStudent: StudentProfile | null;
  onOpenStudentModal: () => void;
  onLogoutStudent: () => void;
  onOpenInstructions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentStudent,
  onOpenStudentModal,
  onLogoutStudent,
  onOpenInstructions
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D8E1EC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#217346] to-[#185C37] text-white flex items-center justify-center shadow-md shadow-[#217346]/20 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-[#0F2942] tracking-tight whitespace-nowrap">
                  Excel <span className="text-[#217346]">EduGame</span>
                </span>
                <span className="text-[11px] font-semibold text-[#1E40AF] hidden sm:inline whitespace-nowrap">
                  · Kelas X
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Informatika · SMK Muhammadiyah Tawang Rejo
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-[#EAF5EE] text-[#185C37] font-bold'
                  : 'text-slate-600 hover:text-[#0F2942] hover:bg-[#EFF4FA]'
              }`}
            >
              Beranda
            </button>

            <button
              onClick={() => {
                if (!currentStudent) {
                  onOpenStudentModal();
                } else {
                  onSelectTab('games');
                }
              }}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'games'
                  ? 'bg-[#EAF5EE] text-[#185C37] font-bold'
                  : 'text-slate-600 hover:text-[#0F2942] hover:bg-[#EFF4FA]'
              }`}
            >
              Pilih Game
            </button>

            <button
              onClick={() => onSelectTab('leaderboard')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'leaderboard'
                  ? 'bg-[#EFF6FF] text-[#1E3A8A] font-bold'
                  : 'text-slate-600 hover:text-[#0F2942] hover:bg-[#EFF4FA]'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#1E40AF]" />
              Peringkat
            </button>

            <button
              onClick={() => onSelectTab('teacher')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'teacher'
                  ? 'bg-[#0F2942] text-white font-bold shadow-xs'
                  : 'text-[#0F2942] hover:bg-[#EFF4FA]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Guru
            </button>

            <button
              onClick={onOpenInstructions}
              className="p-2 text-slate-500 hover:text-[#1E40AF] hover:bg-[#EFF6FF] rounded-xl transition-colors cursor-pointer"
              title="Panduan & Aturan Penilaian"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </nav>

          {/* Right Action: Student Identification */}
          <div className="flex items-center gap-2 shrink-0">
            {currentStudent ? (
              <div className="flex items-center gap-2 bg-[#EAF5EE] border border-[#C2E4CF] px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#217346] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {currentStudent.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#0F2942] truncate max-w-[120px]">
                    {currentStudent.name}
                  </div>
                  <div className="text-[10px] text-[#185C37] font-medium truncate max-w-[120px]">
                    {currentStudent.className}
                  </div>
                </div>
                <button
                  onClick={onLogoutStudent}
                  className="p-1 text-[#185C37] hover:text-rose-600 rounded-lg transition-colors ml-1 cursor-pointer"
                  title="Ganti Siswa / Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenStudentModal}
                className="px-4 py-2 bg-[#217346] hover:bg-[#185C37] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Masuk Siswa
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#E6ECF5] text-xs font-semibold">
          <button
            onClick={() => onSelectTab('home')}
            className={`py-1 px-2.5 rounded-lg ${
              currentTab === 'home' ? 'text-[#185C37] font-bold bg-[#EAF5EE]' : 'text-slate-600'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => {
              if (!currentStudent) onOpenStudentModal();
              else onSelectTab('games');
            }}
            className={`py-1 px-2.5 rounded-lg ${
              currentTab === 'games' ? 'text-[#185C37] font-bold bg-[#EAF5EE]' : 'text-slate-600'
            }`}
          >
            Game
          </button>
          <button
            onClick={() => onSelectTab('leaderboard')}
            className={`py-1 px-2.5 rounded-lg flex items-center gap-1 ${
              currentTab === 'leaderboard' ? 'text-[#1E3A8A] font-bold bg-[#EFF6FF]' : 'text-slate-600'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#1E40AF]" />
            Peringkat
          </button>
          <button
            onClick={() => onSelectTab('teacher')}
            className={`py-1 px-2.5 rounded-lg ${
              currentTab === 'teacher' ? 'text-white font-bold bg-[#0F2942]' : 'text-[#0F2942]'
            }`}
          >
            Guru
          </button>
        </div>
      </div>
    </header>
  );
};
