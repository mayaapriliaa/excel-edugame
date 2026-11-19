import React from 'react';
import { X, HelpCircle, Award, CheckCircle2, ShieldAlert } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8E1EC]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2942] via-[#153E5C] to-[#185C37] text-white p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <HelpCircle className="w-6 h-6 text-[#86EFAC]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Panduan & Aturan Penilaian</h2>
              <p className="text-xs text-blue-100">Excel EduGame · SMK Muhammadiyah Tawang Rejo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/15 rounded-full transition-colors text-white cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-700">
          {/* Rules Summary */}
          <div className="bg-[#EAF5EE] border border-[#C6E6D2] rounded-xl p-4 flex items-start gap-3">
            <Award className="w-6 h-6 text-[#217346] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#185C37] text-sm">Sistem Skor Terpisah & Akumulasi Skor Terbaik</h3>
              <p className="text-xs text-[#185C37]/90 mt-1">
                Setiap game memiliki skor maksimal 100 poin. Total skor maksimal keseluruhan adalah <strong>300 poin</strong>. Kamu dapat memainkan game berkali-kali untuk memperbaiki skor terbaikmu!
              </p>
            </div>
          </div>

          {/* 3 Games Breakdown */}
          <div className="grid grid-cols-1 gap-4">
            {/* Game 1 */}
            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC] hover:border-[#217346] transition-colors">
              <div className="flex items-center gap-2 font-bold text-[#0F2942] text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-[#217346] text-white flex items-center justify-center text-xs">1</span>
                Kuis Excel (10 Soal)
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#217346] shrink-0" />
                  <span>Setiap jawaban benar bernilai <strong>10 poin</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#217346] shrink-0" />
                  <span>Jawaban salah memperoleh 0 poin disertai penjelasan edukatif.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#217346] shrink-0" />
                  <span>Materi: Sel, baris, kolom, formula bar, SUM, AVERAGE, MAX, MIN.</span>
                </li>
              </ul>
            </div>

            {/* Game 2 */}
            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC] hover:border-[#1E40AF] transition-colors">
              <div className="flex items-center gap-2 font-bold text-[#0F2942] text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-[#1E40AF] text-white flex items-center justify-center text-xs">2</span>
                Puzzle Gambar Excel (3x3 / 4x4)
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <span>Tukar posisi potongan gambar dengan klik/sentuh.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <span>Skor dihitung dari ketepatan susunan & efisiensi waktu pengerjaan.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <span>Tersedia tombol "Petunjuk" untuk melihat gambar asli.</span>
                </li>
              </ul>
            </div>

            {/* Game 3 */}
            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC] hover:border-[#0369A1] transition-colors">
              <div className="flex items-center gap-2 font-bold text-[#0F2942] text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-[#0369A1] text-white flex items-center justify-center text-xs">3</span>
                Tantangan Rumus Excel (5 Level)
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0369A1] shrink-0" />
                  <span>Analisis tabel nilai siswa nyata di lembar kerja.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0369A1] shrink-0" />
                  <span>Pilih atau ketik formula <code>=SUM</code>, <code>=AVERAGE</code>, <code>=MAX</code>, <code>=MIN</code>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0369A1] shrink-0" />
                  <span>Setiap rumus benar bernilai <strong>20 poin</strong>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Leaderboard & Badges */}
          <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
            <h4 className="font-bold text-[#0F2942] text-sm flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#1E40AF]" />
              Lencana Prestasi (Badges)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#1E3A8A]">
              <span className="bg-white px-2.5 py-1 rounded border border-[#BFDBFE] font-medium">🏅 Excel Grandmaster (Skor ≥ 260)</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#BFDBFE] font-medium">✨ Petualang Lengkap (Selesai 3 Game)</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#BFDBFE] font-medium">⚡ Master Rumus (Skor ≥ 80)</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#BFDBFE] font-medium">🎯 Pakar Kuis (Skor ≥ 80)</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#BFDBFE] font-medium">🧩 Arsitek Puzzle (Skor ≥ 80)</span>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Data nama dan kelas digunakan semata-mata untuk pencatatan peringkat kelas dan evaluasi guru.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3F6FA] rounded-b-2xl border-t border-[#D8E1EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#217346] hover:bg-[#185C37] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
          >
            Saya Mengerti & Siap Main
          </button>
        </div>
      </div>
    </div>
  );
};
