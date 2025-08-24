import { useState, useCallback } from 'react';
import AIService, { StoryRequest, StoryResponse } from '@/services/AIService';
import TensorFlowService, { DetectionResult, EmotionResult, EmotionType } from '@/services/TensorFlowService';
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
   * Analyzes facial emotion from a given image URI.
    * Handles loading states, errors, and updates the emotion state.
    *
    * @param {string} imageUri - The URI of the image to analyze.
    * @returns {Promise<Emotion | null>} A promise that resolves with the detected emotion or null if an error occurs.
    * @throws {Error} If the image URI is invalid or the analysis fails.
    */
   const analyzeEmotion = useCallback(async (imageUri: string) => {
      setLoading(true);
      setError(null);

      if (typeof imageUri !== 'string' || !imageUri) {
        const errorMessage = 'Image URI tidak valid atau kosong.';
        console.error('analyzeEmotion Error:', errorMessage); // Logging
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }

      if (!TensorFlowService || typeof TensorFlowService.analyzeEmotion !== 'function') {
        const errorMessage = 'TensorFlowService atau metode analyzeEmotion tidak tersedia.';
        console.error('analyzeEmotion Error:', errorMessage); // Logging
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }

      try {
        console.log('Menganalisis emosi untuk:', imageUri); // Logging
        const emotion: EmotionResult = await TensorFlowService.analyzeEmotion(imageUri);
        let validationErrorMessage = '';
        if (!emotion) {
          validationErrorMessage = 'Hasil analisis emosi kosong atau tidak terdefinisi.';
        } else if (typeof emotion !== 'string') {
          validationErrorMessage = `Hasil analisis emosi bukan string, melainkan tipe: ${typeof emotion}.`;
        } else if (!Object.values(EmotionType).includes(emotion as EmotionType)) {
          validationErrorMessage = `Hasil analisis emosi tidak dikenal atau tidak valid: "${emotion}".`;
        }

        if (validationErrorMessage) { // If any of the above conditions were met
          console.error('analyzeEmotion Error:', validationErrorMessage, emotion); // Logging
          setError(validationErrorMessage);
          // Add the problematic value to the error message for more specificity
          throw new Error(`${validationErrorMessage} Received value: ${JSON.stringify(emotion)}`);
        }
        console.log('Emosi terdeteksi:', emotion); // Logging
        
        setState(prev => ({
          ...prev,
          currentEmotion: emotion,
          isLoading: false,
        }));

        return emotion;
      } catch (error) {
        let errorMessage = 'Gagal menganalisis emosi';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        console.error('analyzeEmotion Error:', errorMessage, error); // Logging
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
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