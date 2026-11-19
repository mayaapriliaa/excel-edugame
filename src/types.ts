export type GameType = 'quiz' | 'puzzle' | 'formula';

export interface StudentProfile {
  id: string;
  name: string;
  className: string;
  createdAt: number;
  lastActive: number;
}

export interface GameScoreRecord {
  quiz: number;
  puzzle: number;
  formula: number;
  totalScore: number;
  completedGamesCount: number;
  lastPlayedAt: number;
}

export interface GameHistoryEntry {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  gameType: GameType;
  score: number;
  maxScore: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  durationSeconds: number;
  completedAt: number;
  details?: Record<string, unknown>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface FormulaChallengeItem {
  id: number;
  title: string;
  scenario: string;
  targetCell: string;
  description: string;
  headers: string[];
  rows: (string | number)[][];
  correctFormula: string;
  acceptedFormulas: string[];
  formulaOptions: string[];
  expectedResult: number | string;
  explanation: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  className: string;
  quizScore: number;
  puzzleScore: number;
  formulaScore: number;
  totalScore: number;
  completedCount: number;
  lastPlayedAt: number;
  badges: string[];
}
