import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Volume2, Moon, Shield, CircleHelp as HelpCircle, Heart, Star } from 'lucide-react-native';

export default function ProfileScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [parentalMode, setParentalMode] = useState(true);

  const profileStats = {
    name: 'Jonathan',
    level: 8,
    totalPoints: 1250,
    favoriteActivity: 'Cerita Hewan',
    learningTime: '2j 15m minggu ini',
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#8B5CF6', '#A855F7']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarEmoji}>👦</Text>
            <View style={styles.levelBadge}>
              <Star size={12} color="#FFFFFF" />
              <Text style={styles.levelText}>{profileStats.level}</Text>
            </View>
          </View>
          <Text style={styles.profileName}>{profileStats.name}</Text>
          <Text style={styles.profileTitle}>Pelajar Super</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Heart size={20} color="#EF4444" />
            <Text style={styles.statNumber}>{profileStats.totalPoints}</Text>
            <Text style={styles.statLabel}>Total Poin</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⏰</Text>
            <Text style={styles.statTime}>{profileStats.learningTime}</Text>
            <Text style={styles.statLabel}>Waktu Belajar</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          {/* Learning Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferensi Belajar</Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Volume2 size={20} color="#6B7280" />
                <Text style={styles.preferenceText}>Efek Suara</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                thumbColor={soundEnabled ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Moon size={20} color="#6B7280" />
                <Text style={styles.preferenceText}>Mode Gelap</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                thumbColor={darkMode ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Shield size={20} color="#6B7280" />
                <Text style={styles.preferenceText}>Kontrol Orang Tua</Text>
              </View>
              <Switch
                value={parentalMode}
                onValueChange={setParentalMode}
                trackColor={{ false: '#E5E7EB', true: '#059669' }}
                thumbColor={parentalMode ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          </View>

          {/* Favorite Activities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aktivitas Favorit</Text>
            <View style={styles.favoriteCard}>
              <Text style={styles.favoriteEmoji}>🦁</Text>
              <View style={styles.favoriteContent}>
                <Text style={styles.favoriteTitle}>{profileStats.favoriteActivity}</Text>
                <Text style={styles.favoriteDescription}>
                  Kamu suka belajar tentang hewan! Terus jelajahi dunia hewan.
                </Text>
              </View>
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bantuan & Dukungan</Text>
            
            <TouchableOpacity style={styles.supportItem}>
              <HelpCircle size={20} color="#6B7280" />
              <Text style={styles.supportText}>Pusat Bantuan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportItem}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.supportText}>Pengaturan Aplikasi</Text>
            </TouchableOpacity>
          </View>

          {/* Parent Dashboard Button */}
          <TouchableOpacity style={styles.parentButton}>
            <Text style={styles.parentButtonText}>Dashboard Orang Tua</Text>
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
  profileAvatar: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    width: 80,
    height: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  levelBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter_400Regular',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginTop: 8,
  },
  statTime: {
    fontSize: 14,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginTop: 8,
  },
  statEmoji: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  contentSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceText: {
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
  },
  favoriteCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  favoriteEmoji: {
    fontSize: 30,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  supportText: {
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
  },
  parentButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  parentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});