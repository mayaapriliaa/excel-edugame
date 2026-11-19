import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RefreshCw, CheckCircle, Eye, ArrowRight, RotateCcw, Award, Clock, HelpCircle, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PUZZLE_THEMES, PuzzleTheme } from '../../data/puzzleData';
import { StudentProfile } from '../../types';
import { StorageService } from '../../services/storageService';

interface PuzzleGameProps {
  student: StudentProfile;
  onFinishGame: (score: number) => void;
  onBackToMenu: () => void;
}

export const PuzzleGame: React.FC<PuzzleGameProps> = ({
  student,
  onFinishGame,
  onBackToMenu
}) => {
  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [checkFeedback, setCheckFeedback] = useState<string | null>(null);

  const totalTiles = gridSize * gridSize;
  const currentTheme: PuzzleTheme = PUZZLE_THEMES[selectedThemeIndex];

  const svgDataUri = useMemo(() => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(currentTheme.svgContent.trim())}`;
  }, [currentTheme]);

  const shuffleTiles = useCallback(() => {
    const array = Array.from({ length: totalTiles }, (_, i) => i);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    let isSolved = true;
    for (let i = 0; i < totalTiles; i++) {
      if (array[i] !== i) {
        isSolved = false;
        break;
      }
    }
    if (isSolved) {
      [array[0], array[1]] = [array[1], array[0]];
    }
    setTiles(array);
    setSelectedTileIndex(null);
    setMovesCount(0);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setCheckFeedback(null);
  }, [totalTiles]);

  useEffect(() => {
    shuffleTiles();
  }, [shuffleTiles]);

  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  const handleTileClick = (clickedPosition: number) => {
    if (isCompleted) return;

    if (selectedTileIndex === null) {
      setSelectedTileIndex(clickedPosition);
    } else if (selectedTileIndex === clickedPosition) {
      setSelectedTileIndex(null);
    } else {
      const newTiles = [...tiles];
      const temp = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = newTiles[clickedPosition];
      newTiles[clickedPosition] = temp;

      setTiles(newTiles);
      setSelectedTileIndex(null);
      setMovesCount(prev => prev + 1);

      checkIfSolved(newTiles);
    }
  };

  const checkIfSolved = (currentTiles: number[] = tiles) => {
    let solved = true;
    let correctCount = 0;
    for (let i = 0; i < totalTiles; i++) {
      if (currentTiles[i] === i) {
        correctCount++;
      } else {
        solved = false;
      }
    }

    if (solved) {
      handlePuzzleSolved();
    } else {
      setCheckFeedback(`${correctCount} dari ${totalTiles} potongan berada di posisi yang benar.`);
      setTimeout(() => setCheckFeedback(null), 3000);
    }
  };

  const computeFinalScore = () => {
    if (gridSize === 3) {
      if (elapsedSeconds > 180) return 75;
      if (elapsedSeconds > 90) return 85;
      return 100;
    }
    if (elapsedSeconds > 240) return 80;
    if (elapsedSeconds > 120) return 90;
    return 100;
  };

  const handlePuzzleSolved = () => {
    setIsCompleted(true);
    const score = computeFinalScore();

    StorageService.recordGameResult({
      studentId: student.id,
      studentName: student.name,
      className: student.className,
      gameType: 'puzzle',
      score,
      maxScore: 100,
      durationSeconds: elapsedSeconds,
      details: {
        gridSize: `${gridSize}x${gridSize}`,
        moves: movesCount,
        theme: currentTheme.name
      }
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isCompleted) {
    const finalScore = computeFinalScore();
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D8E1EC] overflow-hidden text-center p-8">
          <div className="w-20 h-20 bg-[#EFF6FF] text-[#1E40AF] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            Puzzle Berhasil Disusun!
          </span>

          <h2 className="text-3xl font-extrabold text-[#0F2942] mt-2 mb-1">
            Luar Biasa, Susunan Sempurna!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Selamat {student.name}, kamu berhasil memecahkan teka-teki visual Excel {gridSize}x{gridSize}!
          </p>

          {/* Solved Image Preview */}
          <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-[#1E40AF] shadow-md mb-6">
            <img src={svgDataUri} alt="Puzzle Terselesaikan" className="w-full h-full object-cover" />
          </div>

          {/* Score Box */}
          <div className="bg-gradient-to-br from-[#0F2942] via-[#1E3A8A] to-[#217346] text-white rounded-2xl p-6 mb-8 shadow-md">
            <div className="text-xs uppercase tracking-widest text-blue-100 font-bold mb-1">
              Skor Puzzle
            </div>
            <div className="text-6xl font-black tabular-nums">
              {finalScore}
              <span className="text-2xl font-medium text-blue-100">/100</span>
            </div>
            <div className="mt-3 flex justify-center gap-6 text-xs text-blue-100 tabular-nums">
              <span>Waktu: <strong>{formatTime(elapsedSeconds)}</strong></span>
              <span>Jumlah Gerakan: <strong>{movesCount} Langkah</strong></span>
              <span>Tingkat: <strong>{gridSize}x{gridSize}</strong></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={shuffleTiles}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#0F2942] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Mainkan Lagi
            </button>
            <button
              onClick={() => onFinishGame(finalScore)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Simpan & Lanjutkan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E40AF]">
            Game 2: Puzzle Gambar Excel
          </span>
          <h1 className="text-lg font-bold text-[#0F2942]">
            Susun Potongan Gambar Lembar Kerja
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold tabular-nums">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF4FA] text-[#0F2942]">
            <Clock className="w-4 h-4 text-[#1E40AF]" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE]">
            <Award className="w-4 h-4 text-[#1E40AF]" />
            <span>{movesCount} Langkah</span>
          </div>

          <button
            onClick={onBackToMenu}
            className="text-slate-400 hover:text-[#0F2942] p-1 cursor-pointer"
            title="Kembali ke Pilihan Game"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Control Panel (Size & Theme Selector) */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold uppercase tracking-wider">Tingkat Kesulitan:</span>
          <div className="inline-flex rounded-xl p-1 bg-[#EEF3F9] border border-[#D8E1EC]">
            <button
              onClick={() => setGridSize(3)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                gridSize === 3 ? 'bg-[#1E40AF] text-white shadow-sm' : 'text-slate-600 hover:text-[#0F2942]'
              }`}
            >
              Standar (3 × 3)
            </button>
            <button
              onClick={() => setGridSize(4)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                gridSize === 4 ? 'bg-[#1E40AF] text-white shadow-sm' : 'text-slate-600 hover:text-[#0F2942]'
              }`}
            >
              Tantangan Ahli (4 × 4)
            </button>
          </div>
        </div>

        {/* Theme select */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#1E40AF]" />
          <select
            value={selectedThemeIndex}
            onChange={(e) => setSelectedThemeIndex(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-[#0F2942] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
          >
            {PUZZLE_THEMES.map((theme, i) => (
              <option key={theme.id} value={i}>
                Gambar: {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#D8E1EC] p-6 sm:p-8">
        {/* Instructions banner */}
        <div className="p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl mb-6 text-xs text-[#0F2942] flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
          <span>
            <strong>Cara Bermain:</strong> Klik potongan pertama untuk memilih, lalu klik potongan kedua untuk <strong>menukar posisinya</strong>. Ulangi hingga gambar tersusun utuh!
          </span>
        </div>

        {/* Puzzle Grid */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-full max-w-[440px] aspect-square rounded-2xl p-2 bg-[#0F2942] shadow-xl border-4 border-[#CBD5E1] grid gap-1.5 ${
              gridSize === 3 ? 'grid-cols-3 grid-rows-3' : 'grid-cols-4 grid-rows-4'
            }`}
          >
            {tiles.map((pieceValue, currentPosition) => {
              const originalRow = Math.floor(pieceValue / gridSize);
              const originalCol = pieceValue % gridSize;

              const isSelected = selectedTileIndex === currentPosition;
              const isCorrectPosition = pieceValue === currentPosition;

              const posX = (originalCol / (gridSize - 1)) * 100;
              const posY = (originalRow / (gridSize - 1)) * 100;

              return (
                <button
                  key={currentPosition}
                  type="button"
                  onClick={() => handleTileClick(currentPosition)}
                  style={{
                    backgroundImage: `url("${svgDataUri}")`,
                    backgroundPosition: `${posX}% ${posY}%`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`
                  }}
                  className={`relative rounded-lg overflow-hidden transition-all transform cursor-pointer border ${
                    isSelected
                      ? 'ring-4 ring-[#60A5FA] scale-[0.96] shadow-xl z-20 border-white'
                      : 'hover:opacity-95 hover:brightness-105 border-white/25'
                  }`}
                  aria-label={`Potongan puzzle posisi ${currentPosition + 1}`}
                >
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0F2942]/80 text-white backdrop-blur-sm pointer-events-none">
                    #{pieceValue + 1}
                  </span>

                  {isCorrectPosition && (
                    <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#217346] text-white flex items-center justify-center text-[9px] pointer-events-none shadow">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status / Feedback message */}
        {checkFeedback && (
          <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] rounded-xl text-center text-xs font-semibold mb-4 animate-fade-in">
            {checkFeedback}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shuffleTiles}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#0F2942] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Acak Ulang
            </button>

            <button
              type="button"
              onClick={() => setShowHintModal(true)}
              className="px-4 py-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E3A8A] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Petunjuk Gambar Asli
            </button>
          </div>

          <button
            type="button"
            onClick={() => checkIfSolved()}
            className="px-6 py-2.5 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            Periksa Jawaban
          </button>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091D30]/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 border border-[#D8E1EC]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0F2942] text-sm">
                Petunjuk: Gambar Target Asli
              </h3>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-slate-400 hover:text-[#0F2942] font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-[#1E40AF] mb-4 shadow">
              <img src={svgDataUri} alt="Panduan Asli" className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-slate-500 mb-4 text-center">
              Susun potongan-potongan di papan hingga membentuk gambar seperti di atas.
            </p>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Kembali Menyusun
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
