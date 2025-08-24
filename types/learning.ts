/**
 * Type definitions for the learning application
 */

export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  preferences: LearningPreferences;
  progress: UserProgress;
  parent?: Parent;
}

export interface LearningPreferences {
  favoriteTopics: string[];
  difficultyLevel: 'easy' | 'medium' | 'hard';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  sessionDuration: number; // in minutes
  soundEnabled: boolean;
  charactersEnabled: boolean;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  children: string[]; // Child IDs
  settings: ParentalSettings;
}

export interface ParentalSettings {
  screenTimeLimit: number; // in minutes
  allowedHours: {
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
  contentRestrictions: {
    allowedTopics: string[];
    blockedWords: string[];
    requireApproval: boolean;
  };
  reportingEnabled: boolean;
}

export interface LearningSession {
  id: string;
  childId: string;
  startTime: Date;
  endTime?: Date;
  activities: SessionActivity[];
  pointsEarned: number;
  emotionsDetected: string[];
  objectsDiscovered: string[];
}

export interface SessionActivity {
  type: 'story' | 'object_detection' | 'emotion_recognition' | 'quiz';
  startTime: Date;
  endTime: Date;
  data: any;
  pointsEarned: number;
  success: boolean;
}

export interface EducationalContent {
  id: string;
  type: 'story' | 'activity' | 'quiz' | 'game';
  title: string;
  description: string;
  ageRange: [number, number];
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  estimatedDuration: number; // in minutes
  content: any;
  learningObjectives: string[];
}

export interface AIResponse {
  content: string;
  confidence: number;
  source: 'llm' | 'template' | 'fallback';
  metadata?: {
    tokens?: number;
    processingTime?: number;
    safety?: {
      score: number;
      warnings: string[];
    };
  };
}

export interface CameraAnalysis {
  objects: DetectedObject[];
  faces: DetectedFace[];
  scenes: SceneContext[];
  educationalOpportunities: string[];
}

export interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox: BoundingBox;
  category: string;
  educationalValue: string[];
}

export interface DetectedFace {
  emotions: { [emotion: string]: number };
  primaryEmotion: string;
  confidence: number;
  boundingBox: BoundingBox;
  ageEstimate?: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SceneContext {
  setting: string;
  confidence: number;
  suggestedActivities: string[];
}

export interface UserProgress {
  level: number;
  totalPoints: number;
  storiesCompleted: number;
  objectsDiscovered: number;
  emotionsRecognized: number;
  streakDays: number;
  achievements: string[];
  lastActivityDate: string;
  badges: Badge[];
  favoriteTopics: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedDate: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}