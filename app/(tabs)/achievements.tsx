import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star, Target, Award, Gift, Sparkles } from 'lucide-react-native';

export default function AchievementsScreen() {
  const achievements = [
    {
      id: 1,
      title: 'Cerita Pertama',
      description: 'Menyelesaikan cerita interaktif pertamamu',
      icon: '📚',
      earned: true,
      date: '1 Feb 2025',
    },
    {
      id: 2,
      title: 'Penjelajah',
      description: 'Menemukan 10 benda berbeda dengan kamera',
      icon: '🔍',
      earned: true,
      date: '3 Feb 2025',
    },
    {
      id: 3,
      title: 'Pelajar Bahagia',
      description: 'Menunjukkan ekspresi bahagia selama 5 pelajaran',
      icon: '😊',
      earned: true,
      date: '5 Feb 2025',
    },
    {
      id: 4,
      title: 'Master Beruntun',
      description: 'Belajar beruntun selama 30 hari',
      icon: '🔥',
      earned: false,
      progress: 80,
    },
    {
      id: 5,
      title: 'Pemikir Kreatif',
      description: 'Membuat 5 ide cerita kustom',
      icon: '🎨',
      earned: false,
      progress: 40,
    },
    {
      id: 6,
      title: 'Ahli Hewan',
      description: 'Belajar tentang 20 hewan berbeda',
      icon: '🦁',
      earned: false,
      progress: 65,
    },
  ];

  const stats = {
    totalPoints: 1250,
    level: 8,
    nextLevelPoints: 1500,
    storiesCompleted: 15,
    objectsDiscovered: 23,
  };

  return (
    <LinearGradient
      colors={['#7C3AED', '#8B5CF6', '#A855F7']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pencapaianmu</Text>
          <Text style={styles.subtitle}>Kamu melakukan pekerjaan yang luar biasa!</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.levelSection}>
              <Trophy size={30} color="#F59E0B" />
              <Text style={styles.levelText}>Level {stats.level}</Text>
              <Text style={styles.pointsText}>{stats.totalPoints} pts</Text>
            </View>
            
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Kemajuan ke Level {stats.level + 1}</Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill, 
                  { width: `${(stats.totalPoints / stats.nextLevelPoints) * 100}%` }
                ]} />
              </View>
              <Text style={styles.progressText}>
                {stats.nextLevelPoints - stats.totalPoints} poin lagi!
              </Text>
            </View>
          </View>

          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>📖</Text>
              </View>
              <Text style={styles.statNumber}>{stats.storiesCompleted}</Text>
              <Text style={styles.statLabel}>Cerita</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🔍</Text>
              </View>
              <Text style={styles.statNumber}>{stats.objectsDiscovered}</Text>
              <Text style={styles.statLabel}>Benda</Text>
            </View>
          </View>
        </View>

        {/* Achievements List */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Lencana Kamu</Text>
          
          {achievements.map((achievement) => (
            <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
              <View style={[
                styles.achievementIcon,
                achievement.earned ? styles.earnedIcon : styles.lockedIcon
              ]}>
                <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <Star size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>
              
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.lockedTitle
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                
                {achievement.earned ? (
                  <Text style={styles.earnedDate}>Diraih pada {achievement.date}</Text>
                ) : achievement.progress ? (
                  <View style={styles.progressContainer}>
                    <View style={styles.achievementProgressBar}>
                      <View style={[
                        styles.achievementProgressFill,
                        { width: `${achievement.progress}%` }
                      ]} />
                    </View>
                    <Text style={styles.progressPercentage}>{achievement.progress}%</Text>
                  </View>
                ) : null}
              </View>
              
              {achievement.earned && (
                <Sparkles size={20} color="#F59E0B" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Hadiah Istimewa</Text>
          
          <TouchableOpacity style={styles.rewardCard}>
            <Gift size={24} color="#8B5CF6" />
            <Text style={styles.rewardText}>Buka karakter baru di Level 10!</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.rewardCard}>
            <Award size={24} color="#F59E0B" />
            <Text style={styles.rewardText}>Tema cerita baru tersedia di 20 cerita</Text>
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
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  levelSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginTop: 8,
  },
  pointsText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  progressSection: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontFamily: 'Inter_600SemiBold',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  achievementsSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  earnedIcon: {
    backgroundColor: '#FEF3C7',
  },
  lockedIcon: {
    backgroundColor: '#E5E7EB',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  earnedBadge: {
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
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  lockedTitle: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  earnedDate: {
    fontSize: 10,
    color: '#059669',
    fontFamily: 'Inter_400Regular',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  achievementProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: 10,
    color: '#8B5CF6',
    fontFamily: 'Inter_600SemiBold',
  },
  rewardsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  rewardText: {
    fontSize: 14,
    color: '#1F2937',
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
});