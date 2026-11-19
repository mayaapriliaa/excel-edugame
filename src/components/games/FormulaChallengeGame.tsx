import React, { useState, useEffect } from 'react';
import { Award, Clock, HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FORMULA_CHALLENGES } from '../../data/formulaData';
import { StudentProfile } from '../../types';
import { StorageService } from '../../services/storageService';

interface FormulaChallengeGameProps {
  student: StudentProfile;
  onFinishGame: (score: number) => void;
  onBackToMenu: () => void;
}

export const FormulaChallengeGame: React.FC<FormulaChallengeGameProps> = ({
  student,
  onFinishGame,
  onBackToMenu
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const currentChallenge = FORMULA_CHALLENGES[currentIndex];

  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  const handleVerifyFormula = (formulaToCheck: string) => {
    if (isAnswered) return;
    const clean = formulaToCheck.trim().toUpperCase().replace(/\s+/g, '');
    if (!clean) return;

    setSelectedFormula(formulaToCheck);
    setIsAnswered(true);

    const normalizedAccepted = currentChallenge.acceptedFormulas.map(f =>
      f.trim().toUpperCase().replace(/\s+/g, '')
    );

    const isMatch = normalizedAccepted.includes(clean);
    setIsCorrect(isMatch);

    if (isMatch) {
      setScore(prev => prev + 20);
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextChallenge = () => {
    if (currentIndex < FORMULA_CHALLENGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedFormula('');
      setCustomInput('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setIsCompleted(true);
      const finalScore = score;
      StorageService.recordGameResult({
        studentId: student.id,
        studentName: student.name,
        className: student.className,
        gameType: 'formula',
        score: finalScore,
        maxScore: 100,
        correctAnswers: correctCount,
        wrongAnswers: FORMULA_CHALLENGES.length - correctCount,
        durationSeconds: elapsedSeconds,
        details: { challengesCompleted: FORMULA_CHALLENGES.length }
      });

      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D8E1EC] overflow-hidden text-center p-8">
          <div className="w-20 h-20 bg-[#E0F2FE] text-[#0369A1] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#0369A1] uppercase tracking-wider">
            Tantangan Rumus Selesai
          </span>

          <h2 className="text-3xl font-extrabold text-[#0F2942] mt-2 mb-1">
            Penakluk Rumus Microsoft Excel!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Hebat, {student.name}! Kamu telah menyelesaikan semua studi kasus perhitungan data di lembar kerja.
          </p>

          <div className="bg-gradient-to-br from-[#0F2942] via-[#0369A1] to-[#217346] text-white rounded-2xl p-6 mb-8 shadow-md">
            <div className="text-xs uppercase tracking-widest text-blue-100 font-bold mb-1">
              Skor Tantangan Rumus
            </div>
            <div className="text-6xl font-black tabular-nums">
              {score}
              <span className="text-2xl font-medium text-blue-100">/100</span>
            </div>
            <div className="mt-3 text-xs text-blue-100 tabular-nums">
              {correctCount} dari {FORMULA_CHALLENGES.length} Rumus Berhasil Dieksekusi dengan Benar
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedFormula('');
                setCustomInput('');
                setIsAnswered(false);
                setIsCorrect(false);
                setScore(0);
                setCorrectCount(0);
                setIsCompleted(false);
                setElapsedSeconds(0);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#0F2942] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Tantangan
            </button>
            <button
              onClick={() => onFinishGame(score)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#0369A1] hover:bg-[#075985] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
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
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0369A1]">
            Game 3: Tantangan Rumus Excel
          </span>
          <h1 className="text-lg font-bold text-[#0F2942]">
            Kuasai Fungsi SUM, AVERAGE, MAX, dan MIN
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold tabular-nums">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF4FA] text-[#0F2942]">
            <Clock className="w-4 h-4 text-[#1E40AF]" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E0F2FE] text-[#075985] border border-[#BAE6FD]">
            <Award className="w-4 h-4 text-[#0369A1]" />
            <span>Skor: {score} Poin</span>
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

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#D8E1EC] overflow-hidden p-6 sm:p-8">
        {/* Meta Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#0369A1] text-xs font-bold uppercase tracking-wider">
            {currentChallenge.title}
          </span>
          <span className="text-xs text-slate-500 font-semibold tabular-nums">
            Tantangan {currentIndex + 1} dari {FORMULA_CHALLENGES.length}
          </span>
        </div>

        {/* Scenario description */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 mb-6">
          <p className="text-xs font-bold text-[#1E40AF] uppercase tracking-wide mb-1">
            Skenario Kasus:
          </p>
          <p className="text-sm font-semibold text-[#0F2942] mb-1">
            {currentChallenge.scenario}
          </p>
          <p className="text-xs text-slate-600">
            {currentChallenge.description}
          </p>
        </div>

        {/* Excel Spreadsheet Simulation Box */}
        <div className="mb-6 rounded-2xl border-2 border-[#CBD5E1] shadow-sm overflow-hidden bg-white">
          {/* Simulated Excel Formula Bar */}
          <div className="bg-[#EEF3F9] p-2.5 border-b border-[#CBD5E1] flex items-center gap-3">
            <div className="bg-white px-3 py-1 border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F2942] shadow-inner">
              {currentChallenge.targetCell}
            </div>
            <div className="font-serif italic font-bold text-[#1E40AF] text-sm">
              fx
            </div>
            <div className="flex-1 bg-white px-3 py-1.5 border border-[#CBD5E1] rounded font-mono text-xs font-semibold text-[#217346] shadow-inner overflow-x-auto min-h-[30px] flex items-center">
              {selectedFormula || customInput || (
                <span className="text-slate-400 italic">Pilih atau ketik rumus di bawah...</span>
              )}
            </div>
          </div>

          {/* Spreadsheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse tabular-nums">
              <thead>
                <tr className="bg-[#0F2942] text-white border-b border-[#1E4B73]">
                  <th className="p-2 border-r border-[#1E4B73] w-10 text-center font-bold">#</th>
                  {currentChallenge.headers.map((hdr, hIdx) => (
                    <th key={hIdx} className="p-2.5 border-r border-[#1E4B73] text-left font-bold last:border-r-0">
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentChallenge.rows.map((row, rIdx) => {
                  const rowNumber = rIdx + 2;
                  return (
                    <tr key={rIdx} className="border-b border-slate-200 hover:bg-[#F8FAFC]">
                      <td className="p-2 text-center bg-[#EEF3F9] border-r border-[#CBD5E1] font-bold text-[#0F2942]">
                        {rowNumber}
                      </td>
                      {row.map((cellVal, cIdx) => {
                        const isQuestionCell = cellVal === '?';
                        const displayVal = isQuestionCell && isAnswered && isCorrect
                          ? currentChallenge.expectedResult.toLocaleString('id-ID')
                          : cellVal;

                        return (
                          <td
                            key={cIdx}
                            className={`p-2.5 border-r border-slate-200 last:border-r-0 ${
                              isQuestionCell
                                ? isAnswered && isCorrect
                                  ? 'bg-[#EAF5EE] text-[#185C37] font-bold ring-2 ring-[#217346]'
                                  : 'bg-[#DBEAFE] text-[#1E3A8A] font-bold ring-2 ring-[#1E40AF]'
                                : 'text-[#0F2942]'
                            }`}
                          >
                            {displayVal}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula Input & Choices */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F2942] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0369A1]" />
              Pilih Rumus yang Tepat untuk Sel {currentChallenge.targetCell}:
            </h3>
          </div>

          {/* Quick Choice Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentChallenge.formulaOptions.map((formula, idx) => {
              const isSelected = selectedFormula === formula;

              let btnStyle = 'border-[#D8E1EC] hover:border-[#0369A1] hover:bg-[#EFF6FF] text-[#0F2942] bg-[#F8FAFC]';

              if (isAnswered) {
                if (formula === currentChallenge.correctFormula) {
                  btnStyle = 'border-[#217346] bg-[#EAF5EE] text-[#185C37] font-bold ring-2 ring-[#217346]';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-400';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-100 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleVerifyFormula(formula)}
                  disabled={isAnswered}
                  className={`p-3 rounded-xl border text-left font-mono text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{formula}</span>
                  {isAnswered && formula === currentChallenge.correctFormula && (
                    <CheckCircle className="w-4 h-4 text-[#217346] shrink-0" />
                  )}
                  {isAnswered && isSelected && formula !== currentChallenge.correctFormula && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Or type custom formula */}
          {!isAnswered && (
            <div className="pt-2">
              <div className="text-xs text-slate-500 font-semibold mb-1">
                Atau ketik rumus sendiri (misal: <code>{currentChallenge.correctFormula}</code>):
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customInput.trim()) {
                    handleVerifyFormula(customInput);
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Ketik rumus di sini..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs text-[#0F2942] focus:outline-none focus:ring-2 focus:ring-[#0369A1] focus:border-[#0369A1]"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="px-5 py-2.5 bg-[#0F2942] hover:bg-[#193F63] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Uji Rumus
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className="space-y-4 animate-fade-in">
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 ${
                isCorrect
                  ? 'bg-[#EAF5EE] border border-[#C6E6D2] text-[#185C37]'
                  : 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A]'
              }`}
            >
              <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase tracking-wide mb-1">
                  {isCorrect
                    ? 'Rumus Benar! (+20 Poin)'
                    : `Rumus Kurang Tepat (Jawaban Benar: ${currentChallenge.correctFormula})`}
                </p>
                <p className="leading-relaxed">{currentChallenge.explanation}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextChallenge}
                className="px-6 py-3 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {currentIndex < FORMULA_CHALLENGES.length - 1 ? 'Tantangan Berikutnya' : 'Selesai & Lihat Skor'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
