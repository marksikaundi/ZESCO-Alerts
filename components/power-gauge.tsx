import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PowerGaugeProps {
  percentage: number;
  label?: string;
  size?: number;
}

export function PowerGauge({
  percentage,
  label = "Power issues found",
  size = 150,
}: PowerGaugeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Convert percentage to rotation angle (0-270 degrees for semicircle starting from top)
  const rotation = (percentage / 100) * 270;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.circleBackground,
          {
            width: size,
            height: size,
            borderColor: colorScheme === "dark" ? "#2a2a2a" : "#e0e0e0",
          },
        ]}
      />

      {/* Foreground gradient circle (simulated with colored arc) */}
      <View
        style={[
          styles.circleForeground,
          {
            width: size,
            height: size,
            borderColor: percentage > 60 ? "#FF6B6B" : "#4CAF50",
            transform: [{ rotate: `${rotation}deg` }],
          },
        ]}
      />

      {/* Center content */}
      <View style={styles.centerContent}>
        <Text
          style={[
            styles.percentage,
            { color: colors.text, fontSize: size * 0.4 },
          ]}
        >
          {percentage}%
        </Text>
        <Text
          style={[styles.label, { color: colors.icon, fontSize: size * 0.1 }]}
        >
          {label}
        </Text>
      </View>

      {/* Lightning icon placeholder */}
      <View style={styles.lightningIcon}>
        <Text style={{ fontSize: 24 }}>⚡</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleBackground: {
    borderRadius: 150,
    borderWidth: 12,
    position: "absolute",
    opacity: 0.3,
  },
  circleForeground: {
    borderRadius: 150,
    borderWidth: 12,
    position: "absolute",
    borderTopColor: "#FF6B6B",
    borderRightColor: "#FF6B6B",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  percentage: {
    fontWeight: "700",
  },
  label: {
    marginTop: 4,
  },
  lightningIcon: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    marginLeft: -12,
  },
});
