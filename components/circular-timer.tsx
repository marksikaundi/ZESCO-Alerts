import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import ThemedText from "./themed-text";

interface CircularTimerProps {
  time: number;
  totalTime: number;
  radius?: number;
  strokeWidth?: number;
  color?: string;
  textColor?: string;
  bgCircleColor?: string;
  /** Color of the dot on the ring */
  thumbColor?: string;
}

export default function CircularTimer({
  time,
  totalTime,
  radius = 120,
  strokeWidth = 10,
  color = "#5E8362",
  textColor = "#2C2C2C",
  bgCircleColor = "#E3E6E3",
  thumbColor,
}: CircularTimerProps) {
  const cx = radius + strokeWidth;
  const cy = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const safeTotal = totalTime > 0 ? totalTime : 1;
  const progressRatio = Math.min(1, Math.max(0, time / safeTotal));
  const strokeDashoffset = circumference - progressRatio * circumference;

  const thumb = thumbColor ?? color;
  const angle = -Math.PI / 2 + 2 * Math.PI * progressRatio;
  const thumbX = cx + radius * Math.cos(angle);
  const thumbY = cy + radius * Math.sin(angle);
  const thumbR = Math.max(5, strokeWidth * 0.55);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const displayTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const svgSize = radius * 2 + strokeWidth * 2;

  return (
    <View style={styles.container}>
      <Svg width={svgSize} height={svgSize}>
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={bgCircleColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <Circle cx={thumbX} cy={thumbY} r={thumbR} fill={thumb} />
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
    marginVertical: 8,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 56,
    fontWeight: "700",
    letterSpacing: 1,
    fontVariant: ["tabular-nums"],
  },
});
