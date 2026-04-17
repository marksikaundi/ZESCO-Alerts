import { StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface ProgressIndicatorProps {
  total: number;
  /** Completed “full” pomodoros before the active pie slot logic in timer screen */
  numSolid: number;
  /** Index that shows partial pie (work or rest progress) */
  activePieIndex: number;
  /** 0–1 elapsed fraction for the active phase */
  activeFraction: number;
  activeColor: string;
  inactiveColor: string;
}

function PieSegment({
  size,
  fraction,
  color,
}: {
  size: number;
  fraction: number;
  color: string;
}) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const clamped = Math.min(1, Math.max(0, fraction));

  if (clamped <= 0) {
    return null;
  }

  if (clamped >= 1) {
    return <Circle cx={cx} cy={cy} r={r} fill={color} />;
  }

  const start = -Math.PI / 2;
  const end = start + 2 * Math.PI * clamped;
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  const largeArc = clamped > 0.5 ? 1 : 0;
  const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

  return <Path d={d} fill={color} />;
}

export default function ProgressIndicator({
  total,
  numSolid,
  activePieIndex,
  activeFraction,
  activeColor,
  inactiveColor,
}: ProgressIndicatorProps) {
  const dotSize = 11;

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isSolid = index < numSolid && index !== activePieIndex;
        const isPie = index === activePieIndex;

        return (
          <View
            key={index}
            style={[
              styles.dotWrap,
              {
                width: dotSize,
                height: dotSize,
              },
            ]}
          >
            <Svg width={dotSize} height={dotSize}>
              <Circle
                cx={dotSize / 2}
                cy={dotSize / 2}
                r={dotSize / 2 - 0.5}
                fill={
                  isSolid
                    ? activeColor
                    : isPie
                      ? inactiveColor
                      : inactiveColor
                }
              />
              {isPie ? (
                <PieSegment
                  size={dotSize}
                  fraction={activeFraction}
                  color={activeColor}
                />
              ) : null}
            </Svg>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dotWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
});
