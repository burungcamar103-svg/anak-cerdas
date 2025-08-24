/**
 * AI Service for LLM Integration
 * Handles story generation, educational content, and child-safe interactions
 */

export interface StoryRequest {
  prompt: string;
  age?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
}

export interface StoryResponse {
  story: string;
  moral?: string;
  vocabulary?: string[];
  followUpQuestions?: string[];
}

export interface ObjectAnalysis {
  objectName: string;
  confidence: number;
  educationalFacts: string[];
  relatedActivities: string[];
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  recommendation: string;
  encouragement: string;
}

class AIService {
  private apiKey: string | null = null;
  private baseURL: string = 'https://api.openai.com/v1'; // Example endpoint

  constructor() {
    // In production, this would be loaded securely
    this.apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || null;
  }

  /**
   * Generate an interactive story based on user input
   */
  async generateStory(request: StoryRequest): Promise<StoryResponse> {
    try {
      // For demo purposes, return mock data
      // In production, this would call actual LLM API
      
      const mockStories: { [key: string]: StoryResponse } = {
        'petualangan': {
          story: 'Dahulu kala, di hutan ajaib, hiduplah seekor rubah kecil yang berani bernama Luna. Luna memiliki bulu oranye yang indah dan suka menjelajahi tempat-tempat baru. Suatu pagi yang cerah, Luna memutuskan untuk mencari Air Terjun Pelangi legendaris yang diceritakan neneknya...',
          moral: 'Menjadi berani dan penasaran membantu kita menemukan hal-hal menakjubkan!',
          vocabulary: ['petualangan', 'hutan', 'berani', 'jelajahi', 'legendaris'],
          followUpQuestions: [
            'Menurutmu apa yang Luna temukan di air terjun?',
            'Apakah kamu ingin berpetualang seperti Luna?',
            'Apa yang akan kamu bawa dalam petualangan?',
          ],
        },
        'persahabatan': {
          story: 'Di taman yang berwarna-warni, hiduplah seekor kupu-kupu kesepian bernama Bella. Dia cantik tapi pemalu, dan menghabiskan sebagian besar waktunya bersembunyi di balik bunga matahari besar. Suatu hari, seekor lebah ramah bernama Buzz melihat Bella dan terbang menghampiri untuk menyapa...',
          moral: 'Persahabatan membuat segalanya lebih menyenangkan dan indah!',
          vocabulary: ['persahabatan', 'kupu-kupu', 'taman', 'pemalu', 'berwarna-warni'],
          followUpQuestions: [
            'Bagaimana perasaan Bella saat Buzz menyapa?',
            'Apa yang membuat teman yang baik?',
            'Apakah kamu punya sahabat?',
          ],
        },
      };

      // Simple keyword matching for demo
      const storyType = Object.keys(mockStories).find(key => 
        request.prompt.toLowerCase().includes(key)
      ) || 'petualangan';

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return mockStories[storyType];
    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error('Gagal membuat cerita. Silakan coba lagi.');
    }
  }

  /**
   * Analyze detected objects and provide educational content
   */
  async analyzeObject(objectName: string): Promise<ObjectAnalysis> {
    try {
      // Mock object analysis - in production, this would use actual AI
      const objectDatabase: { [key: string]: ObjectAnalysis } = {
        'apel': {
          objectName: 'apel',
          confidence: 0.95,
          educationalFacts: [
            'Apel ada dalam banyak warna: merah, hijau, dan kuning!',
            'Apel tumbuh di pohon di kebun buah.',
            'Makan apel membantu menjaga gigi tetap bersih dan sehat.',
            'Ada lebih dari 7.500 varietas apel di dunia!',
          ],
          relatedActivities: [
            'Hitung apel dengan warna berbeda',
            'Belajar tentang makan sehat',
            'Jelajahi kategori buah dan sayuran',
          ],
        },
        'bola': {
          objectName: 'bola',
          confidence: 0.92,
          educationalFacts: [
            'Bola berbentuk bulat dan bisa menggelinding serta memantul!',
            'Olahraga berbeda menggunakan jenis bola yang berbeda.',
            'Gravitasi membuat bola jatuh ke bawah saat dijatuhkan.',
            'Bermain bola membantu mengembangkan koordinasi mata-tangan.',
          ],
          relatedActivities: [
            'Belajar tentang bentuk dan lingkaran',
            'Latihan berhitung dengan memantul',
            'Jelajahi berbagai olahraga dan permainan',
          ],
        },
        'buku': {
          objectName: 'buku',
          confidence: 0.98,
          educationalFacts: [
            'Buku berisi cerita dan pengetahuan!',
            'Membaca membantu otak tumbuh lebih kuat.',
            'Buku bisa membawamu dalam petualangan imajiner.',
            'Buku pertama ditulis di tablet tanah liat!',
          ],
          relatedActivities: [
            'Latihan membaca bersama',
            'Buat ceritamu sendiri',
            'Belajar tentang berbagai genre buku',
          ],
        },
      };

      await new Promise(resolve => setTimeout(resolve, 500));
      
      return objectDatabase[objectName.toLowerCase()] || {
        objectName,
        confidence: 0.8,
        educationalFacts: [
          `Ini adalah ${objectName}! Bagus sekali menemukannya!`,
          'Setiap benda memiliki tujuan khususnya sendiri.',
          'Belajar tentang benda membantu kita memahami dunia.',
        ],
        relatedActivities: [
          'Jelajahi lebih banyak benda di sekitarmu',
          'Belajar tentang kategori benda',
          'Latihan mendeskripsikan apa yang kamu lihat',
        ],
      };
    } catch (error) {
      console.error('Error analyzing object:', error);
      throw new Error('Gagal menganalisis benda.');
    }
  }

  /**
   * Analyze facial emotion and provide appropriate response
   */
  async analyzeEmotion(emotionData: any): Promise<EmotionAnalysis> {
    try {
      // Mock emotion analysis - in production, this would use TensorFlow
      const emotions = ['senang', 'bersemangat', 'penasaran', 'fokus', 'tenang'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

      const emotionResponses: { [key: string]: EmotionAnalysis } = {
        senang: {
          emotion: 'senang',
          confidence: 0.9,
          recommendation: 'Pertahankan energi positifmu! Ini sempurna untuk belajar.',
          encouragement: 'Senyummu membuat belajar jadi lebih menyenangkan! 😊',
        },
        bersemangat: {
          emotion: 'bersemangat',
          confidence: 0.85,
          recommendation: 'Antusiasme yang luar biasa! Ayo salurkan energi ini ke aktivitas yang menyenangkan.',
          encouragement: 'Aku suka semangatmu! Ayo belajar sesuatu yang menakjubkan! ✨',
        },
        penasaran: {
          emotion: 'penasaran',
          confidence: 0.88,
          recommendation: 'Pola pikir yang sempurna untuk penemuan! Ayo jelajahi sesuatu yang baru.',
          encouragement: 'Rasa ingin tahumu luar biasa! Apa yang ingin kamu pelajari? 🤔',
        },
        fokus: {
          emotion: 'fokus',
          confidence: 0.92,
          recommendation: 'Konsentrasi yang luar biasa! Ini bagus untuk pembelajaran detail.',
          encouragement: 'Fokus yang menakjubkan! Kamu siap menghadapi tantangan apa pun! 🎯',
        },
        tenang: {
          emotion: 'tenang',
          confidence: 0.87,
          recommendation: 'Keadaan sempurna untuk pembelajaran yang penuh pemikiran dan refleksi.',
          encouragement: 'Energi tenangmu sempurna untuk pembelajaran mendalam! 🧘‍♀️',
        },
      };

      await new Promise(resolve => setTimeout(resolve, 800));
      
      return emotionResponses[randomEmotion];
    } catch (error) {
      console.error('Error analyzing emotion:', error);
      throw new Error('Gagal menganalisis emosi.');
    }
  }

  /**
   * Filter and moderate content to ensure child safety
   */
  private moderateContent(content: string): string {
    // Basic content filtering - in production, use comprehensive moderation
    const inappropriateWords = ['menakutkan', 'berbahaya', 'kekerasan', 'takut'];
    let moderatedContent = content;

    inappropriateWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      moderatedContent = moderatedContent.replace(regex, 'menyenangkan');
    });

    return moderatedContent;
  }

  /**
   * Get age-appropriate vocabulary suggestions
   */
  getVocabularyForAge(age: number): string[] {
    const vocabularyByAge: { [key: number]: string[] } = {
      3: ['besar', 'kecil', 'senang', 'warna', 'hewan', 'keluarga'],
      4: ['petualangan', 'teman', 'jelajahi', 'pelangi', 'taman', 'ajaib'],
      5: ['penasaran', 'temukan', 'indah', 'bayangkan', 'kreatif', 'cemerlang'],
      6: ['misterius', 'menakjubkan', 'luar biasa', 'perjalanan', 'berani', 'megah'],
    };

    return vocabularyByAge[age] || vocabularyByAge[4];
  }
}

export default new AIService();