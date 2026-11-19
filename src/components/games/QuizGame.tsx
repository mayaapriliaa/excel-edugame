import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Award, Clock, HelpCircle, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { StudentProfile } from '../../types';
import { StorageService } from '../../services/storageService';

interface QuizGameProps {
  student: StudentProfile;
  onFinishGame: (score: number) => void;
  onBackToMenu: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ student, onFinishGame, onBackToMenu }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 }
      });
    } else {
      setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      const finalScore = score;

      StorageService.recordGameResult({
        studentId: student.id,
        studentName: student.name,
        className: student.className,
        gameType: 'quiz',
        score: finalScore,
        maxScore: 100,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        durationSeconds: elapsedSeconds,
        details: { totalQuestions: QUIZ_QUESTIONS.length }
      });

      confetti({
        particleCount: 100,
        spread: 80,
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
          <div className="w-20 h-20 bg-[#EAF5EE] text-[#217346] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#217346] uppercase tracking-wider">
            Kuis Excel Selesai
          </span>

          <h2 className="text-3xl font-extrabold text-[#0F2942] mt-2 mb-1">
            Hasil Evaluasi Kuis
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Hebat, {student.name}! Kamu telah menyelesaikan 10 soal kuis Microsoft Excel.
          </p>

          {/* Score Box */}
          <div className="bg-gradient-to-br from-[#0F2942] via-[#153E5C] to-[#217346] text-white rounded-2xl p-6 mb-6 shadow-md">
            <div className="text-xs uppercase tracking-widest text-blue-100 font-bold mb-1">
              Skor Perolehan
            </div>
            <div className="text-6xl font-black tabular-nums">
              {score}
              <span className="text-2xl font-medium text-blue-100">/100</span>
            </div>
            <div className="mt-3 text-xs text-blue-100 tabular-nums">
              Durasi Waktu: {formatTime(elapsedSeconds)}
            </div>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-8 tabular-nums">
            <div className="p-4 rounded-xl bg-[#EAF5EE] border border-[#C6E6D2] flex items-center justify-center gap-3">
              <Check className="w-6 h-6 text-[#217346]" />
              <div className="text-left">
                <div className="text-2xl font-bold text-[#185C37]">{correctCount}</div>
                <div className="text-xs text-[#217346] font-medium">Jawaban Benar</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center gap-3">
              <X className="w-6 h-6 text-rose-600" />
              <div className="text-left">
                <div className="text-2xl font-bold text-rose-800">{wrongCount}</div>
                <div className="text-xs text-rose-600 font-medium">Jawaban Salah</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setScore(0);
                setCorrectCount(0);
                setWrongCount(0);
                setIsCompleted(false);
                setElapsedSeconds(0);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#0F2942] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Kuis
            </button>
            <button
              onClick={() => onFinishGame(score)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#217346] hover:bg-[#185C37] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Simpan & Lanjutkan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D8E1EC] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346]">
            Game 1: Kuis Teori & Praktik Excel
          </span>
          <h1 className="text-lg font-bold text-[#0F2942]">
            Materi Informatika Kelas X
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold tabular-nums">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF4FA] text-[#0F2942]">
            <Clock className="w-4 h-4 text-[#1E40AF]" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAF5EE] text-[#185C37] border border-[#C6E6D2]">
            <Award className="w-4 h-4 text-[#217346]" />
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

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#D8E1EC] overflow-hidden">
        {/* Progress bar */}
        <div className="w-full bg-[#E6ECF5] h-2.5">
          <div
            className="bg-[#217346] h-2.5 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Question Meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="text-[#217346] font-bold">
              Topik: {currentQuestion.topic}
            </span>
            <span className="font-bold text-[#0F2942] tabular-nums">
              Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-[#0F2942] leading-relaxed mb-6">
            {currentQuestion.question}
          </h2>

          {/* Option Choices */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let btnStyle = 'border-[#D8E1EC] hover:border-[#217346] hover:bg-[#EAF5EE]/50 text-[#0F2942]';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-[#217346] bg-[#EAF5EE] text-[#185C37] ring-2 ring-[#217346]';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-400';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left font-medium text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isAnswered && isCorrect
                        ? 'bg-[#217346] text-white'
                        : isAnswered && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-[#EEF3F9] text-[#0F2942]'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 pt-0.5">{option}</span>

                  {isAnswered && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-[#217346] shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 animate-fade-in ${
                selectedOption === currentQuestion.correctIndex
                  ? 'bg-[#EAF5EE] border border-[#C6E6D2] text-[#185C37]'
                  : 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A]'
              }`}
            >
              <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase tracking-wide mb-1">
                  {selectedOption === currentQuestion.correctIndex
                    ? 'Jawaban Tepat (+10 Poin)'
                    : 'Penjelasan Materi'}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Selesai & Lihat Skor'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
