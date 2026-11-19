import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { GameScoreRecord, GameType, StudentProfile } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { StudentRegisterModal } from './components/StudentRegisterModal';
import { InstructionsModal } from './components/InstructionsModal';
import { GameSelection } from './components/GameSelection';
import { QuizGame } from './components/games/QuizGame';
import { PuzzleGame } from './components/games/PuzzleGame';
import { FormulaChallengeGame } from './components/games/FormulaChallengeGame';
import { Leaderboard } from './components/Leaderboard';
import { StudentResult } from './components/StudentResult';
import { TeacherDashboard } from './components/TeacherDashboard';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'games' | 'leaderboard' | 'teacher'>('home');
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [pendingGame, setPendingGame] = useState<GameType | null>(null);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() => {
    return StorageService.getCurrentStudent();
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);

  // Student scores record
  const [studentScores, setStudentScores] = useState<GameScoreRecord>(() => {
    if (currentStudent) {
      return StorageService.getStudentBestScores(currentStudent.id);
    }
    return {
      quiz: 0,
      puzzle: 0,
      formula: 0,
      totalScore: 0,
      completedGamesCount: 0,
      lastPlayedAt: 0
    };
  });

  // Refresh student scores whenever student changes or game completes
  const refreshStudentScores = () => {
    if (currentStudent) {
      const updated = StorageService.getStudentBestScores(currentStudent.id);
      setStudentScores(updated);
    }
  };

  useEffect(() => {
    refreshStudentScores();
  }, [currentStudent]);

  // Handle student login / registration
  const handleStudentRegistered = (student: StudentProfile) => {
    setCurrentStudent(student);
    const updated = StorageService.getStudentBestScores(student.id);
    setStudentScores(updated);
    setCurrentTab('games');
    setShowResultScreen(false);
    if (pendingGame) {
      setActiveGame(pendingGame);
      setPendingGame(null);
    } else {
      setActiveGame(null);
    }
  };

  // Handle student logout / switch
  const handleLogoutStudent = () => {
    StorageService.setCurrentStudent(null);
    setCurrentStudent(null);
    setActiveGame(null);
    setPendingGame(null);
    setShowResultScreen(false);
    setCurrentTab('home');
  };

  // Start learning from Hero
  const handleStartLearning = () => {
    setPendingGame(null);
    if (!currentStudent) {
      setIsRegisterModalOpen(true);
    } else {
      setCurrentTab('games');
      setActiveGame(null);
      setShowResultScreen(false);
    }
  };

  // Launch a game
  const handleSelectGame = (type: GameType) => {
    if (!currentStudent) {
      setPendingGame(type);
      setIsRegisterModalOpen(true);
      return;
    }
    setActiveGame(type);
    setShowResultScreen(false);
  };

  // Handle game finish
  const handleFinishGame = (_score: number) => {
    refreshStudentScores();
    setActiveGame(null);
    setShowResultScreen(true);
  };

  // Back to games menu
  const handleBackToMenu = () => {
    setActiveGame(null);
    setShowResultScreen(false);
    setCurrentTab('games');
  };

  return (
    <div className="min-h-screen bg-[#F3F6FA] text-[#0F2942] flex flex-col font-sans selection:bg-[#217346] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveGame(null);
          setShowResultScreen(false);
          setCurrentTab(tab);
        }}
        currentStudent={currentStudent}
        onOpenStudentModal={() => {
          setPendingGame(null);
          setIsRegisterModalOpen(true);
        }}
        onLogoutStudent={handleLogoutStudent}
        onOpenInstructions={() => setIsInstructionsModalOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If Active Game is playing */}
        {activeGame && currentStudent ? (
          <div>
            {activeGame === 'quiz' && (
              <QuizGame
                student={currentStudent}
                onFinishGame={handleFinishGame}
                onBackToMenu={handleBackToMenu}
              />
            )}
            {activeGame === 'puzzle' && (
              <PuzzleGame
                student={currentStudent}
                onFinishGame={handleFinishGame}
                onBackToMenu={handleBackToMenu}
              />
            )}
            {activeGame === 'formula' && (
              <FormulaChallengeGame
                student={currentStudent}
                onFinishGame={handleFinishGame}
                onBackToMenu={handleBackToMenu}
              />
            )}
          </div>
        ) : showResultScreen && currentStudent ? (
          /* Result Summary Screen */
          <StudentResult
            student={currentStudent}
            scores={studentScores}
            onSelectGame={handleSelectGame}
            onPlayAnotherGame={() => {
              setShowResultScreen(false);
              setCurrentTab('games');
            }}
            onViewLeaderboard={() => {
              setShowResultScreen(false);
              setCurrentTab('leaderboard');
            }}
            onBackToMenu={handleBackToMenu}
          />
        ) : (
          /* Tab Views */
          <div>
            {currentTab === 'home' && (
              <HomeHero
                currentStudent={currentStudent}
                onStartLearning={handleStartLearning}
                onSelectGame={handleSelectGame}
                onOpenTeacherDashboard={() => setCurrentTab('teacher')}
                onOpenLeaderboard={() => setCurrentTab('leaderboard')}
                onOpenInstructions={() => setIsInstructionsModalOpen(true)}
              />
            )}

            {currentTab === 'games' && currentStudent && (
              <GameSelection
                student={currentStudent}
                scores={studentScores}
                onSelectGame={handleSelectGame}
                onOpenLeaderboard={() => setCurrentTab('leaderboard')}
                onOpenInstructions={() => setIsInstructionsModalOpen(true)}
              />
            )}

            {currentTab === 'games' && !currentStudent && (
              <div className="max-w-md mx-auto py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#EAF5EE] text-[#217346] border border-[#C6E6D2] rounded-3xl flex items-center justify-center mx-auto text-2xl font-bold">
                  🎮
                </div>
                <h2 className="text-xl font-bold text-[#0F2942]">
                  Masukkan Nama Sebelum Bermain
                </h2>
                <p className="text-xs text-slate-500">
                  Untuk menyimpan skor dan menampilkan namamu di leaderboard SMK Muhammadiyah Tawang Rejo, isi identitas terlebih dahulu.
                </p>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-6 py-3 bg-[#217346] hover:bg-[#185C37] text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer"
                >
                  Isi Nama & Kelas Siswa
                </button>
              </div>
            )}

            {currentTab === 'leaderboard' && (
              <Leaderboard
                currentStudent={currentStudent}
                onRefresh={refreshStudentScores}
                onBackToMenu={() => {
                  if (currentStudent) setCurrentTab('games');
                  else setCurrentTab('home');
                }}
              />
            )}

            {currentTab === 'teacher' && (
              <TeacherDashboard
                onBackToHome={() => setCurrentTab('home')}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D8E1EC] py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-[#0F2942]">
            Excel EduGame: Petualangan Belajar Microsoft Excel
          </p>
          <p>
            Mata Pelajaran Informatika Kelas X • SMK Muhammadiyah Tawang Rejo
          </p>
          <p className="text-[11px] text-slate-400">
            Dibuat untuk media pembelajaran interaktif berbasis game
          </p>
        </div>
      </footer>

      {/* Student Registration Modal */}
      <StudentRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegistered={handleStudentRegistered}
        initialStudent={currentStudent}
      />

      {/* Instructions & Scoring Rules Modal */}
      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        onClose={() => setIsInstructionsModalOpen(false)}
      />
    </div>
  );
}
