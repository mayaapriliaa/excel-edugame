import React, { useState } from 'react';
import { X, User, School, Play, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';
import { StorageService } from '../services/storageService';

interface StudentRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (student: StudentProfile) => void;
  initialStudent?: StudentProfile | null;
}

const DEFAULT_CLASSES = [
  'X RPL 1 (Rekayasa Perangkat Lunak)',
  'X RPL 2 (Rekayasa Perangkat Lunak)',
  'X TKJ 1 (Teknik Komputer Jaringan)',
  'X TKJ 2 (Teknik Komputer Jaringan)',
  'X AKL 1 (Akuntansi Keuangan Lembaga)',
  'X AKL 2 (Akuntansi Keuangan Lembaga)',
  'X DKV (Desain Komunikasi Visual)',
  'X BDP (Bisnis Daring Pemasaran)',
  'Lainnya / Kelas Khusus'
];

export const StudentRegisterModal: React.FC<StudentRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  initialStudent
}) => {
  const [name, setName] = useState(initialStudent?.name || '');
  const [selectedClass, setSelectedClass] = useState(initialStudent?.className || DEFAULT_CLASSES[0]);
  const [customClass, setCustomClass] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (cleanName.length < 3) {
      setError('Mohon masukkan nama lengkap minimal 3 karakter.');
      return;
    }

    const finalClass = selectedClass === 'Lainnya / Kelas Khusus' && customClass.trim()
      ? customClass.trim()
      : selectedClass;

    const student: StudentProfile = {
      id: initialStudent?.id || 'std_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: cleanName,
      className: finalClass,
      createdAt: initialStudent?.createdAt || Date.now(),
      lastActive: Date.now()
    };

    StorageService.setCurrentStudent(student);
    onRegistered(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#D8E1EC] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mb-1">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#86EFAC]">
              Profil Siswa
            </span>
          </div>
          <h2 className="text-2xl font-bold">Identitas Siswa Petualang</h2>
          <p className="text-xs text-blue-100 mt-1">
            Informatika Kelas X · SMK Muhammadiyah Tawang Rejo
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-[#0F2942] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#217346]" />
              Nama Lengkap Siswa
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: Muhammad Ilham Pratama"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:border-[#217346] text-[#0F2942] text-sm placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Nama ini akan ditampilkan pada sertifikat hasil dan Leaderboard kelas.
            </p>
          </div>

          {/* Pilihan Kelas */}
          <div>
            <label className="block text-xs font-bold text-[#0F2942] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <School className="w-4 h-4 text-[#1E40AF]" />
              Kelas di SMK Muhammadiyah Tawang Rejo
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-[#0F2942] text-sm bg-white"
            >
              {DEFAULT_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {selectedClass === 'Lainnya / Kelas Khusus' && (
            <div>
              <label className="block text-xs font-bold text-[#0F2942] mb-1">
                Tuliskan Nama Kelas:
              </label>
              <input
                type="text"
                value={customClass}
                onChange={(e) => setCustomClass(e.target.value)}
                placeholder="Misal: X TO 1"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F2942] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>
          )}

          {/* Quick Info Box */}
          <div className="p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#0F2942] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
            <span>
              <strong>Petunjuk Singkat:</strong> Kamu dapat memainkan 3 game edukatif (Kuis Excel, Puzzle Gambar, dan Tantangan Rumus). Selesaikan seluruh tantangan untuk meraih predikat <strong>Excel Grandmaster</strong>!
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#0F2942] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#217346] hover:bg-[#185C37] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Mulai Bermain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
