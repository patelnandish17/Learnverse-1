export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  completionPercent: number;
  lastAccessedAt: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  learningGoals: string[];
  savedCourses: string[];
  progress: UserProgress[];
  streak: number;
  totalHoursLearned: number;
  joinedAt: string;
}
