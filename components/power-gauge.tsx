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
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer ring background */}
      <View
        style={[
          styles.circleBackground,
          {
            width: size,
            height: size,
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
          },
        ]}
      />

      {/* Progress arc - creates gradient effect with overlapping borders */}
      <View
        style={[
          styles.circleForeground,
          {
            width: size,
            height: size,
            borderTopColor: "#FF6B6B",
            borderRightColor: "#FF9100",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            transform: [{ rotateZ: `${-45 + (percentage / 100) * 270}deg` }],
          },
        ]}
      />

      {/* Inner white circle for depth */}
      <View
        style={[
          styles.circleInner,
          {
            width: size - 32,
            height: size - 32,
            backgroundColor: isDark
              ? "rgba(30, 30, 40, 0.9)"
              : "rgba(255, 255, 255, 0.95)",
            shadowColor: isDark ? "#000" : "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.4 : 0.1,
            shadowRadius: 8,
            elevation: 8,
          },
        ]}
      >
        {/* Center content */}
        <View style={styles.centerContent}>
          <Text
            style={[
              styles.percentage,
              {
                color: isDark ? "#fff" : "#000",
                fontSize: size * 0.35,
              },
            ]}
          >
            {percentage}%
          </Text>
          <Text
            style={[
              styles.label,
              {
                color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                fontSize: size * 0.08,
              },
            ]}
          >
            {label}
          </Text>
        </View>

        {/* Lightning icon */}
        <View style={styles.lightningIcon}>
          <Text style={{ fontSize: 22 }}>⚡</Text>
        </View>
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
    borderRadius: 200,
    borderWidth: 14,
    position: "absolute",
  },
  circleForeground: {
    borderRadius: 200,
    borderWidth: 14,
    position: "absolute",
  },
  circleInner: {
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
