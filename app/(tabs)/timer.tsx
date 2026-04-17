import CircularTimer from "@/components/circular-timer";
import ProgressIndicator from "@/components/progress-indicator";
import ThemedText from "@/components/themed-text";
import { FokusColors } from "@/constants/fokus-theme";
import { useTimer } from "@/hooks/use-timer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WORK_SEC = 25 * 60;
const REST_SEC = 5 * 60;
const SESSIONS = 4;

export default function TimerScreen() {
  const { timeRemaining, totalDuration, mode, isRunning, cycleCount, toggle, reset } =
    useTimer({
      workDuration: WORK_SEC,
      restDuration: REST_SEC,
    });

  const isRest = mode === "rest";
  const bgColor = isRest ? FokusColors.sage : FokusColors.white;
  const textColor = isRest ? FokusColors.white : FokusColors.textWork;
  const accent = isRest ? FokusColors.white : FokusColors.sage;

  const numSolid = isRest ? cycleCount + 1 : cycleCount;
  const activePieIndex = isRest ? numSolid : cycleCount;
  const activeFraction =
    mode === "work"
      ? 1 - timeRemaining / WORK_SEC
      : 1 - timeRemaining / REST_SEC;

  const inactiveDots = isRest ? FokusColors.inactiveDotRest : FokusColors.inactiveDot;

  const modeLabel = mode === "work" ? "Work Mode" : "Rest";
  const controlLabel = isRunning ? "pause" : "resume";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={reset}
          style={styles.headerSide}
          accessibilityRole="button"
          accessibilityLabel="Reset timer"
        >
          <Ionicons name="chevron-back" size={26} color={accent} />
        </Pressable>
        <View style={styles.headerCenter}>
          <ProgressIndicator
            total={SESSIONS}
            numSolid={numSolid}
            activePieIndex={activePieIndex}
            activeFraction={Number.isFinite(activeFraction) ? activeFraction : 0}
            activeColor={accent}
            inactiveColor={inactiveDots}
          />
        </View>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.content}>
        <CircularTimer
          time={timeRemaining}
          totalTime={totalDuration}
          radius={118}
          strokeWidth={11}
          color={isRest ? FokusColors.white : FokusColors.sage}
          textColor={textColor}
          bgCircleColor={isRest ? FokusColors.trackRest : FokusColors.trackWork}
          thumbColor={isRest ? FokusColors.white : FokusColors.sage}
        />

        <Text style={[styles.modeText, { color: textColor }]}>{modeLabel}</Text>

        <View style={styles.iconContainer}>
          {mode === "work" ? (
            <Ionicons name="desktop-outline" size={40} color={accent} />
          ) : (
            <Ionicons name="leaf-outline" size={40} color={accent} />
          )}
        </View>

        <Pressable
          style={[
            styles.mainButton,
            {
              backgroundColor: isRest ? FokusColors.white : FokusColors.sage,
            },
          ]}
          onPress={toggle}
          accessibilityRole="button"
          accessibilityLabel={isRunning ? "Pause" : "Resume"}
        >
          <Ionicons
            name={isRunning ? "pause" : "play"}
            size={32}
            color={isRest ? FokusColors.sage : FokusColors.white}
          />
        </Pressable>

        <ThemedText
          style={[styles.buttonLabel, { color: textColor }]}
          lightColor={textColor}
          darkColor={textColor}
        >
          {controlLabel}
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerSide: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingBottom: 32,
  },
  modeText: {
    marginTop: 28,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  iconContainer: {
    marginTop: 14,
    marginBottom: 8,
  },
  mainButton: {
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  buttonLabel: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.2,
    textTransform: "lowercase",
  },
});
