import StatBlock from "@/components/stat-block";
import SummaryCard from "@/components/summary-card";
import ThemedText from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTimer } from "@/hooks/use-timer";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { timeRemaining, mode, isRunning, cycleCount } = useTimer({
    workDuration: 25 * 60,
    restDuration: 5 * 60,
  });

  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const navigateToTimer = () => {
    router.push("/(tabs)/timer");
  };

  return (
    <SafeAreaViewContext
      style={[
        styles.container,
        { backgroundColor: isDark ? "#151718" : "#fff" },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText
              type="defaultSemiBold"
              lightColor="#999"
              darkColor="#999"
              style={styles.greetingTime}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </ThemedText>
            <ThemedText type="title" style={styles.greetingText}>
              {greeting}
            </ThemedText>
          </View>
          <View
            style={[
              styles.avatar,
              { backgroundColor: isDark ? "#262626" : "#F5F5F5" },
            ]}
          >
            <IconSymbol
              name="person.crop.circle.fill"
              size={32}
              color="#6B9E7F"
            />
          </View>
        </View>

        {/* Active Timer Card */}
        <SummaryCard style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <View>
              <ThemedText
                lightColor="#999"
                darkColor="#999"
                style={styles.timerLabel}
              >
                Current Session
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                lightColor="#11181C"
                darkColor="#ECEDEE"
                style={styles.timerTime}
              >
                {mode === "work" ? "Work Mode" : "Rest Mode"}
              </ThemedText>
            </View>
            <View style={styles.timerBadge}>
              <IconSymbol
                name={mode === "work" ? "desktopcomputer" : "star.fill"}
                size={24}
                color={mode === "work" ? "#6B9E7F" : "#7FA87F"}
              />
            </View>
          </View>

          <View style={styles.timerDisplay}>
            <ThemedText
              style={styles.timerBig}
              lightColor="#11181C"
              darkColor="#ECEDEE"
            >
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </ThemedText>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isRunning ? "#6B9E7F20" : "#99999920",
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: isRunning ? "#6B9E7F" : "#999",
                  },
                ]}
              />
              <ThemedText
                style={styles.statusText}
                lightColor={isRunning ? "#6B9E7F" : "#999"}
                darkColor={isRunning ? "#6B9E7F" : "#999"}
              >
                {isRunning ? "Running" : "Paused"}
              </ThemedText>
            </View>
          </View>

          <Pressable
            style={[styles.timerButton, { backgroundColor: "#6B9E7F" }]}
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
        <SummaryCard style={{ marginHorizontal: 20, marginBottom: 20 }}>
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
            value={`${cycleCount * 30 + minutes}m`}
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
        <SummaryCard style={{ marginHorizontal: 20, marginBottom: 20 }}>
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
              style={[
                styles.actionButton,
                { backgroundColor: isDark ? "#262626" : "#F5F5F5" },
              ]}
              onPress={navigateToTimer}
            >
              <IconSymbol name="timer" size={24} color="#6B9E7F" />
              <ThemedText
                style={styles.actionText}
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
                Timer
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.actionButton,
                { backgroundColor: isDark ? "#262626" : "#F5F5F5" },
              ]}
              onPress={() => router.push("/(tabs)/explore")}
            >
              <IconSymbol name="paperplane.fill" size={24} color="#7FA87F" />
              <ThemedText
                style={styles.actionText}
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
                Explore
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.actionButton,
                { backgroundColor: isDark ? "#262626" : "#F5F5F5" },
              ]}
              onPress={() => {}}
            >
              <IconSymbol name="gear" size={24} color="#D4A574" />
              <ThemedText
                style={styles.actionText}
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greetingTime: {
    fontSize: 13,
    marginBottom: 6,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: "800",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  timerCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#6B9E7F08",
  },
  timerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  timerTime: {
    fontSize: 16,
  },
  timerBadge: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6B9E7F15",
  },
  timerDisplay: {
    alignItems: "center",
    marginVertical: 24,
    gap: 16,
  },
  timerBig: {
    fontSize: 64,
    fontWeight: "700",
    letterSpacing: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
  },
  timerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    marginTop: 16,
  },
  timerButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 18,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
