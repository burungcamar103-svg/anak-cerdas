import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProgress {
  level: number;
  totalPoints: number;
  storiesCompleted: number;
  objectsDiscovered: number;
  emotionsRecognized: number;
  streakDays: number;
  achievements: string[];
  lastActivityDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'stories' | 'objects' | 'emotions' | 'streak' | 'points';
    count: number;
  };
  points: number;
}

const STORAGE_KEY = 'user_progress';

const defaultProgress: UserProgress = {
  level: 1,
  totalPoints: 0,
  storiesCompleted: 0,
  objectsDiscovered: 0,
  emotionsRecognized: 0,
  streakDays: 0,
  achievements: [],
  lastActivityDate: new Date().toISOString(),
};

const achievements: Achievement[] = [
  {
    id: 'cerita_pertama',
    title: 'Cerita Pertama',
    description: 'Menyelesaikan cerita interaktif pertamamu',
    icon: '📚',
    requirement: { type: 'stories', count: 1 },
    points: 50,
  },
  {
    id: 'penjelajah',
    title: 'Penjelajah',
    description: 'Menemukan 10 objek berbeda',
    icon: '🔍',
    requirement: { type: 'objects', count: 10 },
    points: 100,
  },
  {
    id: 'master_emosi',
    title: 'Master Emosi',
    description: 'Mengenali 5 emosi berbeda',
    icon: '😊',
    requirement: { type: 'emotions', count: 5 },
    points: 75,
  },
  {
    id: 'pejuang_minggu',
    title: 'Pejuang Minggu',
    description: 'Belajar beruntun selama 7 hari',
    icon: '🔥',
    requirement: { type: 'streak', count: 7 },
    points: 150,
  },
  {
    id: 'master_cerita',
    title: 'Master Cerita',
    description: 'Menyelesaikan 20 cerita',
    icon: '📖',
    requirement: { type: 'stories', count: 20 },
    points: 200,
  },
  {
    id: 'kolektor_poin',
    title: 'Kolektor Poin',
    description: 'Meraih 1000 poin',
    icon: '⭐',
    requirement: { type: 'points', count: 1000 },
    points: 250,
  },
];

export function useProgressTracking() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Load progress from storage
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProgress = JSON.parse(stored);
        setProgress(parsedProgress);
      }
    } catch (error) {
      console.error('Gagal memuat kemajuan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Gagal menyimpan kemajuan:', error);
    }
  };

  /**
   * Add points and update progress
   */
  const addPoints = useCallback((points: number, activity: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalPoints: prev.totalPoints + points,
        level: Math.floor((prev.totalPoints + points) / 200) + 1,
        lastActivityDate: new Date().toISOString(),
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  /**
   * Record story completion
   */
  const completeStory = useCallback((points: number = 25) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        storiesCompleted: prev.storiesCompleted + 1,
        totalPoints: prev.totalPoints + points,
        level: Math.floor((prev.totalPoints + points) / 200) + 1,
        lastActivityDate: new Date().toISOString(),
      };

      checkForNewAchievements(newProgress);
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  /**
   * Record object discovery
   */
  const discoverObject = useCallback((points: number = 15) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        objectsDiscovered: prev.objectsDiscovered + 1,
        totalPoints: prev.totalPoints + points,
        level: Math.floor((prev.totalPoints + points) / 200) + 1,
        lastActivityDate: new Date().toISOString(),
      };

      checkForNewAchievements(newProgress);
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  /**
   * Record emotion recognition
   */
  const recognizeEmotion = useCallback((points: number = 10) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        emotionsRecognized: prev.emotionsRecognized + 1,
        totalPoints: prev.totalPoints + points,
        level: Math.floor((prev.totalPoints + points) / 200) + 1,
        lastActivityDate: new Date().toISOString(),
      };

      checkForNewAchievements(newProgress);
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  /**
   * Update streak counter
   */
  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastActivity = new Date(progress.lastActivityDate).toDateString();
    
    if (today !== lastActivity) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        // Continue streak
        setProgress(prev => {
          const newProgress = {
            ...prev,
            streakDays: prev.streakDays + 1,
            lastActivityDate: new Date().toISOString(),
          };
          
          checkForNewAchievements(newProgress);
          saveProgress(newProgress);
          return newProgress;
        });
      } else {
        // Reset streak
        setProgress(prev => {
          const newProgress = {
            ...prev,
            streakDays: 1,
            lastActivityDate: new Date().toISOString(),
          };
          
          saveProgress(newProgress);
          return newProgress;
        });
      }
    }
  }, [progress.lastActivityDate]);

  /**
   * Check for newly earned achievements
   */
  const checkForNewAchievements = useCallback((currentProgress: UserProgress) => {
    const newlyEarned = achievements.filter(achievement => {
      // Skip if already earned
      if (currentProgress.achievements.includes(achievement.id)) {
        return false;
      }

      // Check if requirement is met
      switch (achievement.requirement.type) {
        case 'stories':
          return currentProgress.storiesCompleted >= achievement.requirement.count;
        case 'objects':
          return currentProgress.objectsDiscovered >= achievement.requirement.count;
        case 'emotions':
          return currentProgress.emotionsRecognized >= achievement.requirement.count;
        case 'streak':
          return currentProgress.streakDays >= achievement.requirement.count;
        case 'points':
          return currentProgress.totalPoints >= achievement.requirement.count;
        default:
          return false;
      }
    });

    if (newlyEarned.length > 0) {
      setNewAchievements(newlyEarned);
      
      // Add achievement IDs to progress
      const achievementIds = newlyEarned.map(a => a.id);
      const bonusPoints = newlyEarned.reduce((sum, a) => sum + a.points, 0);
      
      setProgress(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...achievementIds],
        totalPoints: prev.totalPoints + bonusPoints,
      }));
    }
  }, []);

  /**
   * Clear new achievements notification
   */
  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  /**
   * Reset all progress (for testing or fresh start)
   */
  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProgress(defaultProgress);
      setNewAchievements([]);
    } catch (error) {
      console.error('Gagal mereset kemajuan:', error);
    }
  }, []);

  return {
    progress,
    newAchievements,
    isLoading,
    addPoints,
    completeStory,
    discoverObject,
    recognizeEmotion,
    updateStreak,
    clearNewAchievements,
    resetProgress,
  };
}