import { useState, useCallback } from 'react';
import AIService, { StoryRequest, StoryResponse } from '@/services/AIService';
import TensorFlowService, { DetectionResult, EmotionResult } from '@/services/TensorFlowService';
import ContentFilter from '@/utils/ContentFilter';

export interface AIInteractionState {
  isLoading: boolean;
  currentStory: StoryResponse | null;
  detectedObjects: DetectionResult[];
  currentEmotion: EmotionResult | null;
  error: string | null;
}

export function useAIInteraction() {
  const [state, setState] = useState<AIInteractionState>({
    isLoading: false,
    currentStory: null,
    detectedObjects: [],
    currentEmotion: null,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  /**
   * Generate a story based on user input
   */
  const generateStory = useCallback(async (request: StoryRequest) => {
    try {
      setLoading(true);
      setError(null);

      // Validate input
      const validation = ContentFilter.validateUserInput(request.prompt);
      if (!validation.isValid) {
        throw new Error(validation.reason);
      }

      // Generate story using AI service
      const story = await AIService.generateStory(request);
      
      // Filter content for safety
      const filteredStory = {
        ...story,
        story: ContentFilter.sanitizeContent(story.story),
      };

      setState(prev => ({
        ...prev,
        currentStory: filteredStory,
        isLoading: false,
      }));

      return filteredStory;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal membuat cerita';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, []);

  /**
   * Detect objects in camera image
   */
  const detectObjects = useCallback(async (imageUri: string) => {
    try {
      setLoading(true);
      setError(null);

      const objects = await TensorFlowService.detectObjects(imageUri);
      
      setState(prev => ({
        ...prev,
        detectedObjects: objects,
        isLoading: false,
      }));

      return objects;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal mendeteksi objek';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, []);

  /**
   * Analyze facial emotion
   */
  const analyzeEmotion = useCallback(async (imageUri: string) => {
    try {
      setLoading(true);
      setError(null);

      const emotion = await TensorFlowService.analyzeEmotion(imageUri);
      
      setState(prev => ({
        ...prev,
        currentEmotion: emotion,
        isLoading: false,
      }));

      return emotion;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menganalisis emosi';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  }, []);

  /**
   * Get educational content about detected objects
   */
  const getObjectEducation = useCallback(async (objectName: string) => {
    try {
      const analysis = await AIService.analyzeObject(objectName);
      return analysis;
    } catch (error) {
      console.error('Gagal mendapatkan edukasi objek:', error);
      throw error;
    }
  }, []);

  /**
   * Clear current state
   */
  const clearState = useCallback(() => {
    setState({
      isLoading: false,
      currentStory: null,
      detectedObjects: [],
      currentEmotion: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    generateStory,
    detectObjects,
    analyzeEmotion,
    getObjectEducation,
    clearState,
  };
}