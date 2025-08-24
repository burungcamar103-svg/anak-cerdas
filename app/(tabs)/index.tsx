import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Fredoka_400Regular, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { Play, Trophy, Calendar, Target, Chrome as Home, BookOpen, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Fredoka_400Regular,
    Fredoka_600SemiBold,
  });

  const [currentDate, setCurrentDate] = useState('');
  const [userName] = useState('Jonathan');
  const [streakCount] = useState(32);

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'long' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const activities = [
    {
      id: 1,
      title: 'Fun animal name games for kids',
      progress: 10,
      levels: 8,
      image: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Animals',
    },
    {
      id: 2,
      title: 'Number counting adventure',
      progress: 60,
      levels: 12,
      image: 'https://images.pexels.com/photos/8613086/pexels-photo-8613086.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Math',
    },
    {
      id: 3,
      title: 'Color learning with friends',
      progress: 80,
      levels: 6,
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Colors',
    },
  ];

  const weekProgress = [
    { day: 'Mo', completed: true },
    { day: 'Tu', completed: true },
    { day: 'We', completed: true },
    { day: 'Th', completed: true },
    { day: 'Fr', completed: false },
    { day: 'Sa', completed: false },
    { day: 'Su', completed: false },
  ];

  return (
    <LinearGradient
      colors={['#8B5CF6', '#A78BFA', '#C4B5FD']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Good morning,</Text>
            <Text style={styles.nameText}>{userName}!</Text>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👦</Text>
              <View style={styles.geniusBadge}>
                <Text style={styles.geniusText}>GENIUS</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.dateStreakContainer}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <View style={styles.streakContainer}>
              <Text style={styles.streakNumber}>{streakCount}</Text>
              <Text style={styles.streakIcon}>🔥</Text>
            </View>
          </View>
        </View>

        {/* Week Progress */}
        <View style={styles.weekProgress}>
          {weekProgress.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={[
                styles.dayCircle,
                day.completed ? styles.completedDay : styles.pendingDay
              ]}>
                <Text style={[
                  styles.dayEmoji,
                  day.completed && styles.completedEmoji
                ]}>
                  {day.completed ? '✨' : '🔥'}
                </Text>
              </View>
              <Text style={styles.dayText}>{day.day}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Play size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.actionText}>Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Target size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.actionText}>Class</Text>
          </TouchableOpacity>
        </View>

        {/* Activities Section */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Learning Adventures</Text>
          
          {activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityMeta}>Progress ({activity.progress}%)</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${activity.progress}%` }]} />
                  </View>
                  <Text style={styles.levelsText}>♥ {activity.levels} Levels</Text>
                </View>
              </View>
              <View style={styles.rewardsBadge}>
                <Text style={styles.rewardsText}>Rewards</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation Tabs */}
        <View style={styles.bottomTabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Home size={24} color="#8B5CF6" />
            <Text style={styles.activeTabText}>Beranda</Text>
            <View style={styles.activeIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tab}>
            <BookOpen size={24} color="#9CA3AF" />
            <Text style={styles.tabText}>Jelajahi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tab}>
            <Calendar size={24} color="#9CA3AF" />
            <Text style={styles.tabText}>Kalender</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tab}>
            <User size={24} color="#9CA3AF" />
            <Text style={styles.tabText}>Profil</Text>
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
    paddingBottom: 20,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  nameText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    position: 'absolute',
    top: 20,
  },
  avatar: {
    position: 'relative',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  geniusBadge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  geniusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  dateStreakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakNumber: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginRight: 4,
  },
  streakIcon: {
    fontSize: 16,
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedDay: {
    backgroundColor: '#FCD34D',
  },
  pendingDay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dayEmoji: {
    fontSize: 18,
  },
  completedEmoji: {
    fontSize: 18,
  },
  dayText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  activitiesSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: 400,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activityContent: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  activityMeta: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  levelsText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  rewardsBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rewardsText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tab: {
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  activeTabText: {
    fontSize: 10,
    color: '#8B5CF6',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 40,
    height: 3,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
});