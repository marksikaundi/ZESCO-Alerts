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
  const colors = Colors[colorScheme ?? "light"];

  if (data.length === 0) return null;

  const maxValue = Math.max(...data.flatMap((d) => [d.standby, d.used]));
  const width = data.length * 40;

  const generatePath = (values: number[], color: string) => {
    const points = values.map((v, i) => {
      const x = i * 40 + 20;
      const y = height - 40 - (v / maxValue) * (height - 80);
      return `${x},${y}`;
    });

    return points.join(" ");
  };

  const generatePathString = (values: number[]) => {
    return values.map((v, i) => {
      const x = i * 40 + 20;
      const y = height - 40 - (v / maxValue) * (height - 80);
      return { x, y };
    });
  };

  const standbyPoints = generatePathString(data.map((d) => d.standby));
  const usedPoints = generatePathString(data.map((d) => d.used));

  // Create SVG path string
  const createSVGPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  };

  return (
    <View style={styles.container}>
      {/* Y-axis labels */}
      <View style={styles.yAxisLabels}>
        <Text style={[styles.yLabel, { color: colors.icon }]}>100</Text>
        <Text style={[styles.yLabel, { color: colors.icon }]}>50</Text>
        <Text style={[styles.yLabel, { color: colors.icon }]}>0</Text>
      </View>

      {/* Chart area */}
      <View
        style={[
          styles.chartArea,
          {
            height,
            backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f5f5f5",
          },
        ]}
      >
        {/* Grid lines */}
        <View
          style={[styles.gridLine, { top: "25%", borderTopColor: colors.icon }]}
        />
        <View
          style={[styles.gridLine, { top: "50%", borderTopColor: colors.icon }]}
        />
        <View
          style={[styles.gridLine, { top: "75%", borderTopColor: colors.icon }]}
        />

        {/* Line chart - Standby (Blue) */}
        <View style={styles.lineContainer}>
          {standbyPoints.map((point, i) => (
            <View
              key={`standby-${i}`}
              style={[
                styles.dataPoint,
                {
                  left: point.x - 4,
                  top: point.y - 4,
                  backgroundColor: "#2196F3",
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
                  left: point.x - 4,
                  top: point.y - 4,
                  backgroundColor: "#FF6B6B",
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
            style={[styles.xLabel, { color: colors.icon }]}
          >
            {d.time}
          </Text>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#2196F3" }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>
            Standby
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]} />
          <Text style={[styles.legendText, { color: colors.text }]}>Used</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
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
  },
  chartArea: {
    marginLeft: 40,
    position: "relative",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    borderTopWidth: 1,
    opacity: 0.2,
  },
  lineContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  xAxisLabels: {
    flexDirection: "row",
    marginLeft: 40,
    marginTop: 8,
  },
  xLabel: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
  },
});
