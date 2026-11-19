import React, { useState } from 'react';
import { X, ShieldCheck, Database, Copy, Check, ExternalLink } from 'lucide-react';

interface FirebaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseGuideModal: React.FC<FirebaseGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const firestoreRulesSample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default Deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Leaderboard Public Read, Verified Student Submit
    match /students/{studentId} {
      allow read: if true;
      allow create, update: if request.resource.data.name is string 
        && request.resource.data.name.size() >= 3 
        && request.resource.data.name.size() <= 80
        && request.resource.data.className is string;
    }

    // Game Sessions History
    match /game_history/{historyId} {
      allow read: if true;
      allow create: if request.resource.data.score is number
        && request.resource.data.score >= 0
        && request.resource.data.score <= 100
        && request.resource.data.gameType in ['quiz', 'puzzle', 'formula'];
    }

    // Teacher Administrative Collection (Only authorized teacher UID)
    match /teachers/{teacherId} {
      allow read, write: if request.auth != null && request.auth.uid == teacherId;
    }
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(firestoreRulesSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8E1EC]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2942] to-[#153E5C] text-white p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 text-[#86EFAC] rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Panduan Konfigurasi Cloud Firestore</h2>
              <p className="text-xs text-blue-100">Sinkronisasi Online Lintas Komputer Laboratorium</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-600">
          {/* Status info */}
          <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E40AF] shrink-0 mt-0.5" />
            <div className="text-[#0F2942]">
              <p className="font-bold mb-1">Status Saat Ini: Mode Demo (Penyimpanan Lokal Aktif)</p>
              <p className="text-xs text-slate-600">
                Aplikasi saat ini beroperasi menggunakan <code>localStorage</code> di browser komputer ini. Data tersimpan aman untuk sesi mandiri. Untuk mengumpulkan skor dari seluruh komputer siswa di laboratorium secara langsung (real-time online), ikuti 3 langkah mudah berikut:
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F2942] text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#217346] text-white flex items-center justify-center text-xs">1</span>
                Buat Proyek Firebase Gratis
              </h3>
              <p className="text-xs text-slate-500">
                Kunjungi <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#1E40AF] font-bold underline inline-flex items-center gap-0.5">Firebase Console <ExternalLink className="w-3 h-3" /></a>, buat proyek baru, lalu aktifkan <strong>Cloud Firestore</strong> pada mode Datastore.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F2942] text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1E40AF] text-white flex items-center justify-center text-xs">2</span>
                Terapkan Aturan Keamanan (Firestore Rules)
              </h3>
              <p className="text-xs text-slate-500 mb-2">
                Salin dan tempel aturan keamanan ABAC berikut di tab <strong>Firestore Database → Rules</strong> agar siswa tidak bisa memalsukan skor:
              </p>
              
              <div className="relative">
                <pre className="p-3 bg-[#091D30] text-[#86EFAC] rounded-xl font-mono text-[11px] overflow-x-auto max-h-44 border border-[#1E4B73]">
                  {firestoreRulesSample}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-[#153E5C] hover:bg-[#1E4B73] text-white rounded-lg text-[10px] font-bold flex items-center gap-1 border border-white/15 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#86EFAC]" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Tersalin!' : 'Salin Rules'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D8E1EC] bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F2942] text-xs sm:text-sm flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0369A1] text-white flex items-center justify-center text-xs">3</span>
                Aktifkan di Berkas <code>firebase-applet-config.json</code>
              </h3>
              <p className="text-xs text-slate-500">
                Letakkan konfigurasi Web App SDK dari Firebase ke dalam berkas <code>firebase-applet-config.json</code> pada direktori utama aplikasi. Leaderboard otomatis tersinkronisasi ke Cloud secara instan!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3F6FA] rounded-b-3xl border-t border-[#D8E1EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0F2942] hover:bg-[#193F63] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
