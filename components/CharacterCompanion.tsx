import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Sparkles, MessageCircle } from 'lucide-react-native';

interface CharacterCompanionProps {
  emotion?: string;
  onInteraction?: () => void;
}

export default function CharacterCompanion({ 
  emotion = 'happy', 
  onInteraction 
}: CharacterCompanionProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const bounceAnim = new Animated.Value(0);

  const characters = {
    senang: {
      emoji: '🐰',
      name: 'Kelinci',
      color: '#F59E0B',
      messages: [
        'Kerja bagus belajar hari ini!',
        'Kamu melakukan hal yang luar biasa!',
        'Aku suka rasa ingin tahumu!',
        'Pertahankan kerja yang indah!',
      ],
    },
    bersemangat: {
      emoji: '🦋',
      name: 'Kupu-kupu',
      color: '#8B5CF6',
      messages: [
        'Wah! Itu sangat menyenangkan!',
        'Aku tidak sabar melihat apa yang kamu temukan!',
        'Energimu luar biasa!',
        'Ayo jelajahi bersama!',
      ],
    },
    penasaran: {
      emoji: '🦉',
      name: 'Burung Hantu',
      color: '#059669',
      messages: [
        'Pertanyaan yang bagus!',
        'Aku suka betapa penasarannya kamu!',
        'Ayo cari tahu bersama!',
        'Rasa ingin tahu membantu kita belajar!',
      ],
    },
    fokus: {
      emoji: '🐸',
      name: 'Katak',
      color: '#DC2626',
      messages: [
        'Fokus yang bagus! Kamu berkonsentrasi dengan baik.',
        'Aku bisa melihat kamu berpikir keras!',
        'Perhatian yang bagus terhadap detail!',
        'Fokusmu mengesankan!',
      ],
    },
  };


  useEffect(() => {
    // Random message rotation
    const messageInterval = setInterval(() => {
      const randomMessage = character.messages[
        Math.floor(Math.random() * character.messages.length)
      ];
      setCurrentMessage(randomMessage);
    }, 8000);

    // Bounce animation
    const bounceAnimation = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const bounceInterval = setInterval(bounceAnimation, 5000);

    // Initial message
    setCurrentMessage(character.messages[0]);

    return () => {
      clearInterval(messageInterval);
      clearInterval(bounceInterval);
    };
  }, [emotion]);

  const bounceTransform = {
    transform: [
      {
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.characterContainer, bounceTransform]}>
        <TouchableOpacity 
          style={[styles.character, { backgroundColor: character.color }]}
          onPress={onInteraction}
        >
          <Text style={styles.characterEmoji}>{character.emoji}</Text>
          <View style={styles.sparkle}>
            <Sparkles size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {currentMessage && (
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{currentMessage}</Text>
            <View style={styles.messageTail} />
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setCurrentMessage('')}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  characterContainer: {
    alignItems: 'center',
  },
  character: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  characterEmoji: {
    fontSize: 30,
  },
  sparkle: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 70,
    right: -10,
    maxWidth: 200,
  },
  messageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  messageText: {
    fontSize: 12,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  messageTail: {
    position: 'absolute',
    bottom: -6,
    right: 20,
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});