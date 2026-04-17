import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import ThemedText from "./themed-text";

interface CircularTimerProps {
  time: number; // remaining time in seconds
  totalTime: number; // total time in seconds
  radius?: number;
  strokeWidth?: number;
  color?: string;
  textColor?: string;
  bgCircleColor?: string;
}

export default function CircularTimer({
  time,
  totalTime,
  radius = 120,
  strokeWidth = 8,
  color = "#6B9E7F",
  textColor = "#11181C",
  bgCircleColor = "#E0E0E0",
}: CircularTimerProps) {
  const circumference = 2 * Math.PI * radius;
  const progress = (time / totalTime) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const displayTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
      >
        {/* Background circle */}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke={bgCircleColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.timeContainer]}>
        <ThemedText
          style={[styles.timeText, { color: textColor }]}
          lightColor={textColor}
          darkColor={textColor}
        >
          {displayTime}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 56,
    fontWeight: "600",
    letterSpacing: 2,
  },
});
