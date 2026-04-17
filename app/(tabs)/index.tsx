import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme, Pressable, SafeAreaView } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import ThemedText from '@/components/themed-text';
import SummaryCard from '@/components/summary-card';
import StatBlock from '@/components/stat-block';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTimer } from '@/hooks/use-timer';
import { useLink } from 'expo-router';
import { router } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { timeRemaining, mode, isRunning, cycleCount } = useTimer({
    workDuration: 25 * 60,
    restDuration: 5 * 60,
  });

  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const navigateToTimer = () => {
    router.push('/(tabs)/timer');
  };

  return (
    <SafeAreaViewContext style={[styles.container, { backgroundColor: isDark ? '#151718' : '#fff' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText type="defaultSemiBold" lightColor="#999" darkColor="#999" style={styles.greetingTime}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </ThemedText>
            <ThemedText type="title" style={styles.greetingText}>
              {greeting}
            </ThemedText>
          </View>
          <View style={[styles.avatar, { backgroundColor: isDark ? '#262626' : '#F5F5F5' }]}>
            <IconSymbol name="person.crop.circle.fill" size={32} color="#6B9E7F" />
          </View>
        </View>

        {/* Active Timer Card */}
        <SummaryCard style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <View>
              <ThemedText lightColor="#999" darkColor="#999" style={styles.timerLabel}>
                Current Session
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                lightColor="#11181C"
                darkColor="#ECEDEE"
                style={styles.timerTime}
              >
                {mode === 'work' ? 'Work Mode' : 'Rest Mode'}
              </ThemedText>
            </View>
            <View style={styles.timerBadge}>
              <IconSymbol
                name={mode === 'work' ? 'desktopcomputer' : 'star.fill'}
                size={24}
                color={mode === 'work' ? '#6B9E7F' : '#7FA87F'}
              />
            </View>
          </View>

          <View style={styles.timerDisplay}>
            <ThemedText style={styles.timerBig} lightColor="#11181C" darkColor="#ECEDEE">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </ThemedText>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isRunning ? '#6B9E7F20' : '#99999920',
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: isRunning ? '#6B9E7F' : '#999',
                  },
                ]}
              />
              <ThemedText
                style={styles.statusText}
                lightColor={isRunning ? '#6B9E7F' : '#999'}
                darkColor={isRunning ? '#6B9E7F' : '#999'}
              >
                {isRunning ? 'Running' : 'Paused'}
              </ThemedText>
            </View>
          </View>

          <Pressable
            style={[styles.timerButton, { backgroundColor: '#6B9E7F' }]}
            onPress={navigateToTimer}
          >
            <IconSymbol name="timer" size={18} color="white" />
            <ThemedText
              style={styles.timerButtonText}
              lightColor="white"
              darkColor="white"
            >
              Go to Timer
            </ThemedText>
          </Pressable>
        </SummaryCard>

        {/* Today's Summary */}
        <SummaryCard>
          <ThemedText
            type="defaultSemiBold"
            lightColor="#11181C"
            darkColor="#ECEDEE"
            style={styles.cardTitle}
          >
            Today's Summary
          </ThemedText>

          <StatBlock
            label="Cycles Completed"
            value={cycleCount}
            icon="checkmark.circle"
            color="#6B9E7F"
          />
          <StatBlock
            label="Total Time"
            value={`${(cycleCount * 30) + minutes}m`}
            icon="clock"
            color="#7FA87F"
          />
          <StatBlock
            label="Focus Sessions"
            value={cycleCount}
            icon="flame"
            color="#D4A574"
          />
        </SummaryCard>

        {/* Quick Actions */}
        <SummaryCard>
          <ThemedText
            type="defaultSemiBold"
            lightColor="#11181C"
            darkColor="#ECEDEE"
            style={styles.cardTitle}
          >
            Quick Access
          </ThemedText>

          <View style={styles.quickActions}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: isDark ? '#262626' : '#F5F5F5' }]}
              onPress={navigateToTimer}
            >
              <IconSymbol name="timer" size={24} color="#6B9E7F" />
              <ThemedText style={styles.actionText} lightColor="#11181C" darkColor="#ECEDEE">
                Timer
              </ThemedText>
            </Pressable>

            <Pressable
              style={[styles.actionButton, { backgroundColor: isDark ? '#262626' : '#F5F5F5' }]}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <IconSymbol name="paperplane.fill" size={24} color="#7FA87F" />
              <ThemedText style={styles.actionText} lightColor="#11181C" darkColor="#ECEDEE">
                Explore
              </ThemedText>
            </Pressable>

            <Pressable
              style={[styles.actionButton, { backgroundColor: isDark ? '#262626' : '#F5F5F5' }]}
              onPress={() => {}}
            >
              <IconSymbol name="gear" size={24} color="#D4A574" />
              <ThemedText style={styles.actionText} lightColor="#11181C" darkColor="#ECEDEE">
                Settings
              </ThemedText>
            </Pressable>
          </View>
        </SummaryCard>

        {/* Footer Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  timerBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B9E7F15',
  },
  timerDisplay: {
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  timerBig: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    marginTop: 12,
  },
  timerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
