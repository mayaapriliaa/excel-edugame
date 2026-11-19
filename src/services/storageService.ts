import { GameHistoryEntry, GameScoreRecord, GameType, LeaderboardEntry, StudentProfile } from '../types';

const STORAGE_KEY_STUDENTS = 'excel_edugame_students_v1';
const STORAGE_KEY_HISTORY = 'excel_edugame_history_v1';
const STORAGE_KEY_CURRENT_STUDENT = 'excel_edugame_current_student_v1';

export class StorageService {
  // Check if Firebase config is active
  static isFirebaseConfigured(): boolean {
    return false; // In Demo mode until user provisions Firebase project
  }

  // Get current active student
  static getCurrentStudent(): StudentProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_STUDENT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  // Set current active student
  static setCurrentStudent(student: StudentProfile | null): void {
    if (student) {
      localStorage.setItem(STORAGE_KEY_CURRENT_STUDENT, JSON.stringify(student));
      this.saveStudent(student);
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT);
    }
  }

  // Get all registered students
  static getAllStudents(): StudentProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_STUDENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Save or update student
  static saveStudent(student: StudentProfile): void {
    const list = this.getAllStudents();
    const existingIndex = list.findIndex(s => s.id === student.id || (s.name.trim().toLowerCase() === student.name.trim().toLowerCase() && s.className === student.className));
    
    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        ...student,
        lastActive: Date.now()
      };
    } else {
      list.push(student);
    }
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(list));
  }

  // Get all game history entries
  static getAllHistory(): GameHistoryEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Record a completed game session
  static recordGameResult(entry: Omit<GameHistoryEntry, 'id' | 'completedAt'>): GameHistoryEntry {
    const fullEntry: GameHistoryEntry = {
      ...entry,
      id: 'game_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      completedAt: Date.now()
    };

    const history = this.getAllHistory();
    history.push(fullEntry);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));

    // Also update student last active
    const student = this.getAllStudents().find(s => s.id === entry.studentId);
    if (student) {
      this.saveStudent({ ...student, lastActive: Date.now() });
    }

    return fullEntry;
  }

  // Calculate best scores per student
  static getStudentBestScores(studentId: string): GameScoreRecord {
    const history = this.getAllHistory().filter(h => h.studentId === studentId);
    
    let quiz = 0;
    let puzzle = 0;
    let formula = 0;
    let lastPlayedAt = 0;

    const playedGameTypes = new Set<GameType>();

    for (const item of history) {
      if (item.completedAt > lastPlayedAt) {
        lastPlayedAt = item.completedAt;
      }
      if (item.gameType === 'quiz' || item.gameType === 'puzzle' || item.gameType === 'formula') {
        playedGameTypes.add(item.gameType);
      }

      if (item.gameType === 'quiz' && item.score > quiz) quiz = item.score;
      if (item.gameType === 'puzzle' && item.score > puzzle) puzzle = item.score;
      if (item.gameType === 'formula' && item.score > formula) formula = item.score;
    }

    const totalScore = quiz + puzzle + formula;
    const completedGamesCount = playedGameTypes.size;

    return {
      quiz,
      puzzle,
      formula,
      totalScore,
      completedGamesCount,
      lastPlayedAt
    };
  }

  // Calculate badges for a student
  static getBadgesForRecord(record: GameScoreRecord): string[] {
    const badges: string[] = [];
    if (record.quiz >= 80) badges.push('Pakar Kuis');
    if (record.puzzle >= 80) badges.push('Arsitek Puzzle');
    if (record.formula >= 80) badges.push('Master Rumus');
    if (record.completedGamesCount === 3) badges.push('Petualang Lengkap');
    if (record.totalScore >= 260) badges.push('Excel Grandmaster');
    return badges;
  }

  // Get Leaderboard entries
  static getLeaderboard(): LeaderboardEntry[] {
    const students = this.getAllStudents();
    const entries: LeaderboardEntry[] = [];

    for (const student of students) {
      const best = this.getStudentBestScores(student.id);
      // Only include students who have played at least one game
      if (best.completedGamesCount > 0 || best.totalScore > 0) {
        entries.push({
          rank: 0,
          studentId: student.id,
          studentName: student.name,
          className: student.className,
          quizScore: best.quiz,
          puzzleScore: best.puzzle,
          formulaScore: best.formula,
          totalScore: best.totalScore,
          completedCount: best.completedGamesCount,
          lastPlayedAt: best.lastPlayedAt,
          badges: this.getBadgesForRecord(best)
        });
      }
    }

    // Sort by total score descending, then by lastPlayedAt
    entries.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return b.lastPlayedAt - a.lastPlayedAt;
    });

    // Assign rank
    return entries.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
  }

  // Teacher statistics
  static getTeacherStats() {
    const students = this.getAllStudents();
    const history = this.getAllHistory().filter(
      h => h.gameType === 'quiz' || h.gameType === 'puzzle' || h.gameType === 'formula'
    );

    const studentsWithPlays = students.filter(s => {
      const best = this.getStudentBestScores(s.id);
      return best.completedGamesCount > 0;
    });

    const totalStudents = studentsWithPlays.length;
    const totalGamePlays = history.length;

    let totalScoreSum = 0;
    let fullCompletions = 0;

    for (const s of studentsWithPlays) {
      const best = this.getStudentBestScores(s.id);
      totalScoreSum += best.totalScore;
      if (best.completedGamesCount >= 3) {
        fullCompletions += 1;
      }
    }

    const averageScore = totalStudents > 0 ? Math.round(totalScoreSum / totalStudents) : 0;

    return {
      totalStudents,
      totalGamePlays,
      averageScore,
      fullCompletions
    };
  }

  // Export results to CSV with UTF-8 BOM
  static exportToCSV(): void {
    const leaderboard = this.getLeaderboard();
    
    // CSV Header
    const headers = [
      'Peringkat',
      'Nama Siswa',
      'Kelas',
      'Skor Kuis (Maks 100)',
      'Skor Puzzle (Maks 100)',
      'Skor Tantangan Rumus (Maks 100)',
      'Total Skor (Maks 300)',
      'Jumlah Game Selesai',
      'Lencana Penghargaan',
      'Waktu Pengerjaan Terakhir'
    ];

    const rows = leaderboard.map(row => [
      row.rank,
      `"${row.studentName.replace(/"/g, '""')}"`,
      `"${row.className.replace(/"/g, '""')}"`,
      row.quizScore,
      row.puzzleScore,
      row.formulaScore,
      row.totalScore,
      `${row.completedCount}/3`,
      `"${row.badges.join(', ')}"`,
      `"${row.lastPlayedAt ? new Date(row.lastPlayedAt).toLocaleString('id-ID') : '-'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hasil_Excel_EduGame_SMK_Muhammadiyah_Tawang_Rejo_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Clear demo data (for teacher reset)
  static resetAllData(): void {
    localStorage.removeItem(STORAGE_KEY_STUDENTS);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT);
  }
}
