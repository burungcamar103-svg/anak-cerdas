/**
 * Content filtering and safety utilities for child-appropriate content
 */

export interface ContentAnalysis {
  isSafe: boolean;
  concerns: string[];
  suggestions: string[];
  ageAppropriate: boolean;
}

export interface SafetySettings {
  maxAge: number;
  allowedTopics: string[];
  blockedWords: string[];
  requireParentalApproval: boolean;
}

class ContentFilter {
  private defaultSafetySettings: SafetySettings = {
    maxAge: 6,
    allowedTopics: [
      'hewan', 'alam', 'persahabatan', 'keluarga', 'petualangan',
      'warna', 'bentuk', 'angka', 'huruf', 'musik',
      'seni', 'makanan', 'mainan', 'buku', 'belajar'
    ],
    blockedWords: [
      'menakutkan', 'berbahaya', 'kekerasan', 'takut', 'mimpi buruk',
      'kematian', 'cedera', 'senjata', 'berkelahi', 'sakit'
    ],
    requireParentalApproval: false,
  };

  /**
   * Analyze content for child safety
   */
  analyzeContent(content: string, settings?: Partial<SafetySettings>): ContentAnalysis {
    const safetySettings = { ...this.defaultSafetySettings, ...settings };
    const concerns: string[] = [];
    const suggestions: string[] = [];

    // Check for blocked words
    const lowerContent = content.toLowerCase();
    const foundBlockedWords = safetySettings.blockedWords.filter(word =>
      lowerContent.includes(word)
    );

    if (foundBlockedWords.length > 0) {
      concerns.push(`Berisi kata-kata yang berpotensi tidak pantas: ${foundBlockedWords.join(', ')}`);
      suggestions.push('Pertimbangkan menggunakan bahasa yang lebih positif dan mendorong');
    }

    // Check content length (age-appropriate attention span)
    const wordCount = content.split(' ').length;
    const maxWords = safetySettings.maxAge * 30; // Rough guideline

    if (wordCount > maxWords) {
      concerns.push('Konten mungkin terlalu panjang untuk kelompok usia target');
      suggestions.push('Pertimbangkan memecah konten menjadi bagian-bagian kecil yang mudah dicerna');
    }

    // Check for educational value
    const hasEducationalKeywords = safetySettings.allowedTopics.some(topic =>
      lowerContent.includes(topic)
    );

    if (!hasEducationalKeywords) {
      suggestions.push('Pertimbangkan menambahkan elemen edukatif atau kesempatan belajar');
    }

    const isSafe = concerns.length === 0;
    const ageAppropriate = wordCount <= maxWords && hasEducationalKeywords;

    return {
      isSafe,
      concerns,
      suggestions,
      ageAppropriate,
    };
  }

  /**
   * Filter and clean content for children
   */
  sanitizeContent(content: string): string {
    let sanitized = content;

    // Replace inappropriate words with child-friendly alternatives
    const replacements: { [key: string]: string } = {
      'menakutkan': 'menyenangkan',
      'berbahaya': 'petualangan',
      'takut': 'heran',
      'khawatir': 'penasaran',
      'masalah': 'teka-teki',
      'sulit': 'menantang',
      'mustahil': 'rumit',
    };

    Object.entries(replacements).forEach(([bad, good]) => {
      const regex = new RegExp(bad, 'gi');
      sanitized = sanitized.replace(regex, good);
    });

    // Ensure positive language
    sanitized = this.addPositiveLanguage(sanitized);

    return sanitized;
  }

  /**
   * Add encouraging and positive language to content
   */
  private addPositiveLanguage(content: string): string {
    const encouragingPhrases = [
      'Kamu bisa melakukannya!',
      'Kerja bagus!',
      'Terus jelajahi!',
      'Betapa indahnya!',
      'Itu menakjubkan!',
      'Kamu sangat pintar!',
    ];

    // Randomly add encouraging phrases (with low frequency)
    if (Math.random() < 0.3) {
      const randomPhrase = encouragingPhrases[
        Math.floor(Math.random() * encouragingPhrases.length)
      ];
      content += ` ${randomPhrase}`;
    }

    return content;
  }

  /**
   * Validate user input for safety
   */
  validateUserInput(input: string): { isValid: boolean; reason?: string } {
    if (input.length > 200) {
      return { isValid: false, reason: 'Input terlalu panjang. Tolong buat lebih pendek.' };
    }

    const analysis = this.analyzeContent(input);
    if (!analysis.isSafe) {
      return { 
        isValid: false, 
        reason: 'Tolong gunakan kata-kata yang baik dan positif dalam pesanmu.' 
      };
    }

    return { isValid: true };
  }

  /**
   * Get age-appropriate content suggestions
   */
  getContentSuggestions(age: number): string[] {
    const suggestionsByAge: { [key: number]: string[] } = {
      3: [
        'Suara dan nama hewan sederhana',
        'Warna dan bentuk dasar',
        'Anggota keluarga dan hubungan',
        'Berhitung sederhana (1-5)',
      ],
      4: [
        'Cerita petualangan pendek',
        'Belajar tentang hewan yang berbeda',
        'Emosi dan perasaan dasar',
        'Berhitung dan matematika sederhana',
      ],
      5: [
        'Cerita pemecahan masalah interaktif',
        'Konsep sains (cuaca, tumbuhan)',
        'Keterampilan sosial dan persahabatan',
        'Aktivitas persiapan membaca',
      ],
      6: [
        'Narasi kompleks dengan moral',
        'Eksperimen sains pemula',
        'Kesadaran budaya dan keberagaman',
        'Konsep berhitung dan matematika lanjutan',
      ],
    };

    return suggestionsByAge[age] || suggestionsByAge[4];
  }
}

export default new ContentFilter();