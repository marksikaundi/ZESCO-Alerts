import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DataPoint {
  time: string;
  standby: number;
  used: number;
}

interface PowerConsumptionChartProps {
  data: DataPoint[];
  height?: number;
}

export function PowerConsumptionChart({
  data,
  height = 200,
}: PowerConsumptionChartProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];

  if (data.length === 0) return null;

  const maxValue = Math.max(...data.flatMap((d) => [d.standby, d.used]), 100);
  const width = data.length * 40;

  const generatePathString = (values: number[]) => {
    return values.map((v, i) => {
      const x = i * 40 + 20;
      const y = height - 40 - (v / maxValue) * (height - 80);
      return { x, y };
    });
  };

  const standbyPoints = generatePathString(data.map((d) => d.standby));
  const usedPoints = generatePathString(data.map((d) => d.used));

  return (
    <View style={styles.container}>
      {/* Y-axis labels */}
      <View style={styles.yAxisLabels}>
        <Text
          style={[
            styles.yLabel,
            { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" },
          ]}
        >
          100
        </Text>
        <Text
          style={[
            styles.yLabel,
            { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" },
          ]}
        >
          50
        </Text>
        <Text
          style={[
            styles.yLabel,
            { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" },
          ]}
        >
          0
        </Text>
      </View>

      {/* Chart area */}
      <View
        style={[
          styles.chartArea,
          {
            height,
            backgroundColor: isDark
              ? "rgba(30, 30, 40, 0.5)"
              : "rgba(33, 150, 243, 0.03)",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
          },
        ]}
      >
        {/* Grid lines */}
        <View
          style={[
            styles.gridLine,
            {
              top: "25%",
              borderTopColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            },
          ]}
        />
        <View
          style={[
            styles.gridLine,
            {
              top: "50%",
              borderTopColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            },
          ]}
        />
        <View
          style={[
            styles.gridLine,
            {
              top: "75%",
              borderTopColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            },
          ]}
        />

        {/* Line chart - Standby (Blue) */}
        <View style={styles.lineContainer}>
          {standbyPoints.map((point, i) => (
            <View
              key={`standby-${i}`}
              style={[
                styles.dataPoint,
                {
                  left: point.x - 5,
                  top: point.y - 5,
                  backgroundColor: "#2196F3",
                  shadowColor: "#2196F3",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                  elevation: 3,
                },
              ]}
            />
          ))}
        </View>

        {/* Line chart - Used (Red) */}
        <View style={styles.lineContainer}>
          {usedPoints.map((point, i) => (
            <View
              key={`used-${i}`}
              style={[
                styles.dataPoint,
                {
                  left: point.x - 5,
                  top: point.y - 5,
                  backgroundColor: "#FF6B6B",
                  shadowColor: "#FF6B6B",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                  elevation: 3,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {data.map((d, i) => (
          <Text
            key={`time-${i}`}
            style={[
              styles.xLabel,
              {
                color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
              },
            ]}
          >
            {d.time}
          </Text>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#2196F3" }]} />
          <Text
            style={[styles.legendText, { color: isDark ? "#fff" : "#000" }]}
          >
            Standby
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]} />
          <Text
            style={[styles.legendText, { color: isDark ? "#fff" : "#000" }]}
          >
            Used
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  yAxisLabels: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 200,
    justifyContent: "space-between",
    width: 30,
  },
  yLabel: {
    fontSize: 10,
    textAlign: "right",
    paddingRight: 4,
    fontWeight: "500",
  },
  chartArea: {
    marginLeft: 40,
    position: "relative",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    borderTopWidth: 1,
    opacity: 0.5,
  },
  lineContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  xAxisLabels: {
    flexDirection: "row",
    marginLeft: 40,
    marginTop: 12,
  },
  xLabel: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "500",
  },
  legend: {
    flexDirection: "row",
    marginTop: 16,
    gap: 20,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
