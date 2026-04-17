import { PowerGauge } from "@/components/power-gauge";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PowerStat {
  label: string;
  value: string;
  icon: string;
}

interface CleaningFeature {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}

export default function GoPowerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];

  const [powerPercentage] = useState(60);

  const powerStats: PowerStat[] = [
    { label: "Remaining", value: "15 h", icon: "clock.fill" },
    { label: "Temperature", value: "32°C", icon: "thermometer" },
    { label: "Capacity", value: "3000 mAh", icon: "battery.50" },
  ];

  const features: CleaningFeature[] = [
    {
      id: "clean-junk",
      icon: "trash.fill",
      title: "Clean system junk",
      subtitle: "Found system junk, clean now!",
      color: "#2196F3",
    },
    {
      id: "deep-clean",
      icon: "sparkles",
      title: "Deep cleaning",
      subtitle: "Clean up the boot application",
      color: "#FF6B6B",
    },
    {
      id: "photo-vault",
      icon: "photo.on.rectangle",
      title: "Photo vault",
      subtitle: "Encrypt and protect your photos",
      color: "#FFC107",
    },
  ];

  const handleOptimize = () => {
    Alert.alert("Optimization", "Starting power optimization...", [
      { text: "Cancel", style: "cancel" },
      { text: "Continue", onPress: () => alert("Optimizing...") },
    ]);
  };

  const handleFeatureTap = (feature: CleaningFeature) => {
    Alert.alert(`${feature.title}`, feature.subtitle, [
      { text: "Cancel", style: "cancel" },
      { text: "Start", onPress: () => alert(`Starting ${feature.title}...`) },
    ]);
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
      {/* Header with gradient background */}
      <View
        style={[
          styles.headerBg,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#F0F4F8",
          },
        ]}
      >
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.headerTitle}>
              Go Power
            </ThemedText>
            <Text
              style={[
                styles.headerSubtitle,
                { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" },
              ]}
            >
              Battery Management
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View
              style={[
                styles.profileCircle,
                {
                  backgroundColor: "#FF6B6B",
                  shadowColor: "#FF6B6B",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                },
              ]}
            >
              <Text style={styles.profileInitial}>M</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Power Gauge */}
      <View
        style={[
          styles.gaugeContainer,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#fff",
          },
        ]}
      >
        <PowerGauge percentage={powerPercentage} size={180} />
      </View>

      {/* Power Stats */}
      <View style={styles.statsContainer}>
        {powerStats.map((stat, index) => (
          <View
            key={index}
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(33, 150, 243, 0.08)",
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(33, 150, 243, 0.2)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0.3 : 0.05,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            <Text
              style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}
            >
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Optimize Button */}
      <TouchableOpacity
        style={[
          styles.optimizeButton,
          {
            shadowColor: "#2196F3",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          },
        ]}
        onPress={handleOptimize}
        activeOpacity={0.85}
      >
        <Text style={styles.optimizeButtonText}>OPTIMIZE NOW</Text>
      </TouchableOpacity>

      {/* Features Section */}
      <View
        style={[
          styles.featuresContainer,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#fff",
          },
        ]}
      >
        <View style={styles.featuresHeader}>
          <Text
            style={[styles.featuresTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            Maintenance
          </Text>
        </View>

        {features.map((feature, index) => (
          <TouchableOpacity
            key={feature.id}
            onPress={() => handleFeatureTap(feature)}
            activeOpacity={0.6}
          >
            <View
              style={[
                styles.featureItem,
                {
                  borderBottomColor:
                    index !== features.length - 1
                      ? isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)"
                      : "transparent",
                },
              ]}
            >
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: feature.color + "20" },
                ]}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: feature.color },
                  ]}
                >
                  <IconSymbol size={20} name={feature.icon} color="#fff" />
                </View>
              </View>

              <View style={styles.featureContent}>
                <Text
                  style={[
                    styles.featureTitle,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureSubtitle,
                    {
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.5)",
                    },
                  ]}
                >
                  {feature.subtitle}
                </Text>
              </View>

              <IconSymbol size={20} name="chevron.right" color={colors.icon} />
            </View>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  profileButton: {
    padding: 8,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  gaugeContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  optimizeButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optimizeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.6,
  },
  featuresContainer: {
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
  featuresHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  featureIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  featureSubtitle: {
    fontSize: 12,
  },
});
