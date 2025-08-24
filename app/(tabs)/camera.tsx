import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, RotateCcw, Sparkles, Eye } from 'lucide-react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedObject, setDetectedObject] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Memuat kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <LinearGradient
        colors={['#8B5CF6', '#A78BFA']}
        style={styles.permissionContainer}
      >
        <View style={styles.permissionContent}>
          <Camera size={60} color="#FFFFFF" />
          <Text style={styles.permissionTitle}>Izin Kamera</Text>
          <Text style={styles.permissionMessage}>
            Kami memerlukan akses kamera untuk membantumu menjelajahi dan belajar tentang benda-benda di sekitarmu!
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Berikan Izin</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const analyzeImage = async () => {
    if (Platform.OS === 'web') {
      // Simulate object detection for web demo
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const objects = ['boneka beruang', 'buku', 'apel', 'bola', 'mobil mainan', 'pensil'];
        const randomObject = objects[Math.floor(Math.random() * objects.length)];
        setDetectedObject(randomObject);
        setIsAnalyzing(false);
        
        // Generate educational content about the object
        Alert.alert(
          'Benda Terdeteksi!',
          `Aku bisa melihat ${randomObject}! Tahukah kamu bahwa ${getObjectFact(randomObject)}`,
          [{ text: 'Keren!', style: 'default' }]
        );
      }, 2000);
    } else {
      // TODO: Implement actual TensorFlow Lite object detection
      Alert.alert('Fitur Segera Hadir', 'Deteksi objek akan tersedia di pembaruan berikutnya!');
    }
  };

  const detectEmotion = async () => {
    if (Platform.OS === 'web') {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const emotions = ['senang', 'bersemangat', 'penasaran', 'fokus'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(randomEmotion);
        setIsAnalyzing(false);
        
        Alert.alert(
          'Emosi Terdeteksi!',
          `Kamu terlihat ${randomEmotion}! ${getEmotionResponse(randomEmotion)}`,
          [{ text: 'Terima kasih!', style: 'default' }]
        );
      }, 1500);
    } else {
      // TODO: Implement actual emotion detection
      Alert.alert('Fitur Segera Hadir', 'Deteksi emosi akan tersedia di pembaruan berikutnya!');
    }
  };

  const getObjectFact = (object: string): string => {
    const facts: { [key: string]: string } = {
      'boneka beruang': 'boneka beruang dinamai dari Presiden Theodore Roosevelt!',
      'buku': 'membaca buku membantu otakmu tumbuh lebih kuat setiap hari!',
      'apel': 'apel mengapung di air karena 25% nya adalah udara!',
      'bola': 'bola pertama dibuat dari kantung hewan zaman dulu!',
      'mobil mainan': 'mobil mainan pertama dibuat dari kayu dan logam!',
      'pensil': 'satu pensil bisa menggambar garis sepanjang 56 kilometer!',
    };
    return facts[object] || 'belajar hal-hal baru selalu menyenangkan!';
  };

  const getEmotionResponse = (emotion: string): string => {
    const responses: { [key: string]: string } = {
      senang: 'Itu luar biasa! Wajah bahagia membuat belajar jadi lebih menyenangkan!',
      bersemangat: 'Aku suka semangatmu! Ayo jelajahi sesuatu yang baru bersama!',
      penasaran: 'Rasa ingin tahu adalah cara terbaik untuk belajar! Apa yang ingin kamu temukan?',
      fokus: 'Fokus yang bagus! Kamu siap belajar sesuatu yang menakjubkan!',
    };
    return responses[emotion] || 'Kamu hebat! Terus jelajahi!';
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Header */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.header}
        >
          <Text style={styles.title}>Penjelajah AI</Text>
          <Text style={styles.subtitle}>Arahkan kameramu ke benda untuk belajar!</Text>
        </LinearGradient>

        {/* Analysis Results */}
        {(detectedObject || emotion) && (
          <View style={styles.resultsContainer}>
            {detectedObject && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Benda Terdeteksi:</Text>
                <Text style={styles.resultValue}>{detectedObject}</Text>
              </View>
            )}
            {emotion && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Emosimu:</Text>
                <Text style={styles.resultValue}>{emotion}</Text>
              </View>
            )}
          </View>
        )}

        {/* Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.mainButton, isAnalyzing && styles.analyzingButton]} 
            onPress={analyzeImage}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <Sparkles size={30} color="#FFFFFF" />
            ) : (
              <Eye size={30} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={detectEmotion}>
            <Text style={styles.emotionIcon}>😊</Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Ketuk mata untuk mendeteksi benda • Ketuk senyum untuk cek emosimu
          </Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
  },
  permissionMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  permissionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  camera: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  resultsContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  resultLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  resultValue: {
    fontSize: 18,
    color: '#1F2937',
    fontFamily: 'Fredoka_600SemiBold',
    marginTop: 4,
  },
  controls: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#8B5CF6',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  analyzingButton: {
    backgroundColor: '#A78BFA',
  },
  emotionIcon: {
    fontSize: 24,
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});