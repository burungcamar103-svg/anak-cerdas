import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Send, BookOpen, Sparkles } from 'lucide-react-native';

export default function StoriesScreen() {
  const [currentStory, setCurrentStory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyHistory, setStoryHistory] = useState<string[]>([]);

  const storyPrompts = [
    'A brave little mouse who wants to explore the big world',
    'A magical tree that grows different fruits each season',
    'A friendly dragon who loves to bake cookies',
    'An underwater adventure with colorful fish friends',
  ];

  const generateStory = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate LLM API call
    setTimeout(() => {
      const stories = {
        'mouse': 'Once upon a time, there was a tiny mouse named Pip who lived in a cozy hole near a big oak tree. Pip had always wondered what lay beyond the garden walls. One sunny morning, Pip decided to be brave and explore the world. As Pip crawled through a small gap in the fence, they discovered a beautiful meadow filled with colorful flowers and friendly butterflies. "What an amazing world!" Pip squeaked with joy.',
        'tree': 'In a magical forest stood a very special tree named Willow. Every season, Willow would grow different magical fruits! In spring, she grew rainbow apples that tasted like sunshine. In summer, she grew singing berries that made beautiful music. In autumn, her golden pears could grant one small wish. And in winter, her crystal fruits would tell wonderful stories to anyone who listened carefully.',
        'dragon': 'Meet Flame, a purple dragon who loved baking more than breathing fire! Every morning, Flame would wake up early and put on a special chef hat. In Flame\'s kitchen, there was a magical oven that could bake the most delicious cookies. The secret ingredient was always kindness! Flame would share these special cookies with all the forest animals, and they would giggle with joy at how yummy they were.',
        'underwater': 'Deep in the ocean, there lived a little girl named Marina who could breathe underwater like a fish! She had a best friend named Splash, a bright orange clownfish with purple stripes. Together, they would swim through coral gardens, play hide and seek with sea turtles, and collect pretty shells. One day, they discovered a secret cave filled with glowing pearls that sang lullabies!',
      };
      
      const storyKey = Object.keys(stories).find(key => prompt.toLowerCase().includes(key)) || 'mouse';
      const story = stories[storyKey as keyof typeof stories];
      
      setCurrentStory(story);
      setStoryHistory(prev => [...prev, story]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCustomStory = () => {
    if (!userInput.trim()) {
      Alert.alert('Story Idea', 'Please tell me what kind of story you\'d like to hear!');
      return;
    }
    generateStory(userInput);
    setUserInput('');
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#8B5CF6', '#A855F7']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Magic Stories</Text>
          <Text style={styles.subtitle}>Let's create amazing adventures together!</Text>
        </View>

        {/* Story Display */}
        <View style={styles.storySection}>
          <View style={styles.storyCard}>
            {isGenerating ? (
              <View style={styles.generatingContainer}>
                <Sparkles size={30} color="#8B5CF6" />
                <Text style={styles.generatingText}>Creating your magical story...</Text>
              </View>
            ) : currentStory ? (
              <View>
                <Text style={styles.storyText}>{currentStory}</Text>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue Story</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.welcomeContainer}>
                <BookOpen size={40} color="#8B5CF6" />
                <Text style={styles.welcomeText}>Choose a story prompt below or tell me what story you'd like!</Text>
              </View>
            )}
          </View>
        </View>

        {/* Story Prompts */}
        <View style={styles.promptsSection}>
          <Text style={styles.promptsTitle}>Ide Cerita</Text>
          {storyPrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.promptCard}
              onPress={() => generateStory(prompt)}
            >
              <Text style={styles.promptText}>{prompt}</Text>
              <Sparkles size={16} color="#8B5CF6" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Atau ceritakan ide ceritamu sendiri:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Aku ingin cerita tentang..."
              placeholderTextColor="#9CA3AF"
              multiline
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={handleCustomStory}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Buat Cerita</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  storySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  generatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  generatingText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 12,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 12,
  },
  promptsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  promptsTitle: {
    fontSize: 18,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  promptCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promptText: {
    fontSize: 14,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
    maxHeight: 80,
  },
  micButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});