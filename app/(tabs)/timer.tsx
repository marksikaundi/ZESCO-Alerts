import CircularTimer from "@/components/circular-timer";
import ProgressIndicator from "@/components/progress-indicator";
import ThemedText from "@/components/themed-text";
import { FokusColors } from "@/constants/fokus-theme";
import { useTimer } from "@/hooks/use-timer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const WORK_SEC = 25 * 60;
const REST_SEC = 5 * 60;
const SESSIONS = 4;

export default function TimerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    timeRemaining,
    totalDuration,
    mode,
    isRunning,
    cycleCount,
    toggle,
    reset,
    skip,
  } = useTimer({
    workDuration: WORK_SEC,
    restDuration: REST_SEC,
  });

  const isRest = mode === "rest";
  const shellBg = "#8AAF89";
  const cardBg = isRest ? "#5E8C63" : FokusColors.white;
  const textColor = isRest ? FokusColors.white : FokusColors.textWork;
  const accent = isRest ? FokusColors.white : FokusColors.sage;
  const backIconColor = isRest ? FokusColors.white : FokusColors.sageMuted;

  const numSolid = isRest ? cycleCount + 1 : cycleCount;
  const activePieIndex = isRest
    ? Math.min(cycleCount + 1, SESSIONS - 1)
    : cycleCount;
  const activeFraction =
    mode === "work"
      ? 1 - timeRemaining / WORK_SEC
      : 1 - timeRemaining / REST_SEC;

  const inactiveDots = isRest
    ? FokusColors.inactiveDotRest
    : FokusColors.inactiveDot;

  const modeLabel = mode === "work" ? "Work Mode" : "Rest";
  const controlLabel = isRunning ? "Pause" : "Resume";

  const handleDotPress = () => {
    if (mode === "work") {
      skip();
    }
    router.push("/(tabs)/rest");
  };

  const handleModePress = () => {
    if (mode === "work") {
      router.push("/(tabs)/work");
    } else {
      router.push("/(tabs)/rest");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: shellBg }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar style={isRest ? "light" : "dark"} />
      <View style={[styles.phoneCard, { backgroundColor: cardBg }]}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={reset}
            style={styles.headerSide}
            accessibilityRole="button"
            accessibilityLabel="Reset timer"
          >
            <Ionicons name="arrow-back" size={24} color={backIconColor} />
          </Pressable>
          <View style={styles.headerCenter}>
            <ProgressIndicator
              total={SESSIONS}
              numSolid={numSolid}
              activePieIndex={activePieIndex}
              activeFraction={
                Number.isFinite(activeFraction) ? activeFraction : 0
              }
              activeColor={accent}
              inactiveColor={inactiveDots}
              onDotPress={handleDotPress}
            />
          </View>
          <View style={styles.headerSide} />
        </View>

        <View style={styles.content}>
          <View style={styles.centerBlock}>
            <CircularTimer
              time={timeRemaining}
              totalTime={totalDuration}
              radius={102}
              strokeWidth={6}
              timeTextSize={52}
              color={isRest ? FokusColors.white : FokusColors.sage}
              textColor={textColor}
              bgCircleColor={
                isRest ? "rgba(20,52,33,0.3)" : FokusColors.trackWork
              }
              thumbColor={isRest ? FokusColors.white : FokusColors.sage}
            />

            <Pressable
              onPress={handleModePress}
              accessibilityRole="button"
              accessibilityLabel={`Open ${modeLabel} screen`}
            >
              <Text style={[styles.modeText, { color: textColor }]}>
                {modeLabel}
              </Text>
            </Pressable>

            <View style={styles.iconContainer}>
              {mode === "work" ? (
                <Ionicons name="desktop-outline" size={35} color={accent} />
              ) : (
                <Ionicons name="leaf-outline" size={35} color={accent} />
              )}
            </View>
          </View>

          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Pressable
              style={[
                styles.mainButton,
                {
                  backgroundColor: isRest
                    ? FokusColors.white
                    : FokusColors.sage,
                },
              ]}
              onPress={toggle}
              accessibilityRole="button"
              accessibilityLabel={controlLabel}
            >
              <Ionicons
                name={isRunning ? "pause" : "play"}
                size={30}
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  phoneCard: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#1B3A24",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 2,
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  centerBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 0,
  },
  modeText: {
    marginTop: 18,
    fontSize: 33,
    fontWeight: "600",
    letterSpacing: 1,
    opacity: 0.95,
  },
  iconContainer: {
    marginTop: 8,
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 6,
  },
});
