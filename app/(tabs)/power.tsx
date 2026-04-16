import { PowerGauge } from "@/components/power-gauge";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Go Power
        </ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={[styles.profileCircle, { backgroundColor: "#FF6B6B" }]}>
            <Text style={styles.profileInitial}>M</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Power Gauge */}
      <ThemedView style={styles.gaugeContainer}>
        <PowerGauge percentage={powerPercentage} size={160} />
      </ThemedView>

      {/* Power Stats */}
      <View style={styles.statsContainer}>
        {powerStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Optimize Button */}
      <TouchableOpacity
        style={styles.optimizeButton}
        onPress={handleOptimize}
        activeOpacity={0.8}
      >
        <Text style={styles.optimizeButtonText}>OPTIMIZE</Text>
      </TouchableOpacity>

      {/* Features Section */}
      <ThemedView style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={feature.id}
            onPress={() => handleFeatureTap(feature)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.featureItem,
                {
                  borderBottomColor:
                    index !== features.length - 1
                      ? colorScheme === "dark"
                        ? "#2a2a2a"
                        : "#e0e0e0"
                      : "transparent",
                },
              ]}
            >
              <View
                style={[styles.featureIcon, { backgroundColor: feature.color }]}
              >
                <IconSymbol size={20} name={feature.icon} color="#fff" />
              </View>

              <View style={styles.featureContent}>
                <ThemedText type="defaultSemiBold">{feature.title}</ThemedText>
                <Text style={[styles.featureSubtitle, { color: colors.icon }]}>
                  {feature.subtitle}
                </Text>
              </View>

              <IconSymbol size={20} name="chevron.right" color={colors.icon} />
            </View>
          </TouchableOpacity>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  profileButton: {
    padding: 8,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  gaugeContainer: {
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 12,
  },
  optimizeButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 14,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optimizeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  featuresContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 12,
    overflow: "hidden",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
    gap: 4,
  },
  featureSubtitle: {
    fontSize: 12,
  },
});
