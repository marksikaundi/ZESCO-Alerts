import { PowerConsumptionChart } from "@/components/power-consumption-chart";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AppUsage {
  name: string;
  percentage: number;
  color: string;
}

interface TimeUsage {
  label: string;
  used: string;
  standby: string;
}

export default function PowerConsumptionScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const chartData = [
    { time: "00:00", standby: 30, used: 20 },
    { time: "06:00", standby: 35, used: 15 },
    { time: "12:00", standby: 45, used: 60 },
    { time: "18:00", standby: 40, used: 55 },
    { time: "24:00", standby: 50, used: 45 },
  ];

  const appUsage: AppUsage[] = [
    { name: "Gmail", percentage: 43.2, color: "#FF6B6B" },
    { name: "WeChat", percentage: 27, color: "#4CAF50" },
    { name: "Face Book", percentage: 72.1, color: "#2196F3" },
  ];

  const timeUsage: TimeUsage[] = [
    { label: "Used", used: "12h", standby: "36m" },
    { label: "Standby", used: "25h", standby: "18m" },
  ];

  const handleBack = () => {
    // Handle back navigation
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol size={24} name="chevron.left" color={colors.text} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Power consumption
        </ThemedText>
        <View style={styles.backButton} />
      </View>

      {/* Chart */}
      <ThemedView style={styles.chartContainer}>
        <PowerConsumptionChart data={chartData} height={200} />
      </ThemedView>

      {/* Time Usage Stats */}
      <View style={styles.timeStatsContainer}>
        {timeUsage.map((stat, index) => (
          <View key={index} style={styles.timeStatCard}>
            <Text style={[styles.timeStatLabel, { color: colors.icon }]}>
              {stat.label}
            </Text>
            <View style={styles.timeStatValues}>
              <Text style={styles.timeStatValue}>{stat.used}</Text>
              <Text style={[styles.timeStatSubValue, { color: colors.icon }]}>
                {stat.standby}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* App Usage Section */}
      <ThemedView style={styles.appUsageContainer}>
        {appUsage.map((app, index) => (
          <View key={index} style={styles.appUsageItem}>
            <View style={styles.appNameContainer}>
              <Text style={[styles.appName, { color: colors.text }]}>
                {app.name}
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${app.percentage}%`,
                    backgroundColor: app.color,
                  },
                ]}
              />
            </View>

            <Text style={[styles.appPercentage, { color: colors.text }]}>
              {app.percentage}%
            </Text>
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  chartContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  timeStatsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  timeStatCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    borderRadius: 8,
  },
  timeStatLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  timeStatValues: {
    gap: 4,
  },
  timeStatValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeStatSubValue: {
    fontSize: 12,
  },
  appUsageContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 16,
  },
  appUsageItem: {
    gap: 8,
  },
  appNameContainer: {
    marginBottom: 4,
  },
  appName: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  appPercentage: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
  },
});
