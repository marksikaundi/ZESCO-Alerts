import { PowerConsumptionChart } from "@/components/power-consumption-chart";
import { ThemedText } from "@/components/themed-text";
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
  const isDark = colorScheme === "dark";
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
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#0F1419" : "#F8FAFC",
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[
          styles.headerBg,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#F0F4F8",
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol
              size={24}
              name="chevron.left"
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>
            Power Consumption
          </ThemedText>
          <View style={styles.backButton} />
        </View>
      </View>

      {/* Chart */}
      <View
        style={[
          styles.chartContainer,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#fff",
          },
        ]}
      >
        <PowerConsumptionChart data={chartData} height={200} />
      </View>

      {/* Time Usage Stats */}
      <View style={styles.timeStatsContainer}>
        {timeUsage.map((stat, index) => (
          <View
            key={index}
            style={[
              styles.timeStatCard,
              {
                backgroundColor: isDark
                  ? "rgba(33, 150, 243, 0.15)"
                  : "rgba(33, 150, 243, 0.12)",
                borderColor: isDark
                  ? "rgba(33, 150, 243, 0.2)"
                  : "rgba(33, 150, 243, 0.15)",
              },
            ]}
          >
            <Text
              style={[
                styles.timeStatLabel,
                { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" },
              ]}
            >
              {stat.label}
            </Text>
            <View style={styles.timeStatValues}>
              <Text
                style={[
                  styles.timeStatValue,
                  { color: isDark ? "#fff" : "#000" },
                ]}
              >
                {stat.used}
              </Text>
              <Text
                style={[
                  styles.timeStatSubValue,
                  {
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                  },
                ]}
              >
                {stat.standby}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* App Usage Section */}
      <View
        style={[
          styles.appUsageContainer,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#fff",
          },
        ]}
      >
        <View style={styles.appUsageHeader}>
          <Text
            style={[styles.appUsageTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            App Consumption
          </Text>
        </View>

        {appUsage.map((app, index) => (
          <View key={index} style={styles.appUsageItem}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Text
                style={[styles.appName, { color: isDark ? "#fff" : "#000" }]}
              >
                {app.name}
              </Text>
              <Text
                style={[
                  styles.appPercentage,
                  {
                    color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                  },
                ]}
              >
                {app.percentage}%
              </Text>
            </View>

            <View
              style={[
                styles.progressBarContainer,
                {
                  backgroundColor: isDark
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.08)",
                },
              ]}
            >
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
          </View>
        ))}
      </View>

      {/* Bottom spacing */}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerBg: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  chartContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  timeStatsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  timeStatCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  timeStatLabel: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "500",
  },
  timeStatValues: {
    gap: 4,
  },
  timeStatValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  timeStatSubValue: {
    fontSize: 12,
  },
  appUsageContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  appUsageHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  appUsageTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  appUsageItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
    gap: 8,
  },
  appNameContainer: {
    marginBottom: 4,
  },
  appName: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  appPercentage: {
    fontSize: 12,
    fontWeight: "600",
  },
});
