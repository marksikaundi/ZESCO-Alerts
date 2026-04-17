import CircularTimer from "@/components/circular-timer";
import ProgressIndicator from "@/components/progress-indicator";
import ThemedText from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useTimer } from "@/hooks/use-timer";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
    workDuration: 25 * 60,
    restDuration: 5 * 60,
  });

  const workColor = "#6B9E7F";
  const restColor = "#7FA87F";
  const currentColor = mode === "work" ? workColor : restColor;

  const modeText = mode === "work" ? "Work Mode" : "Rest";
  const modeIcon = mode === "work" ? "desktopcomputer" : "star.fill";

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#151718" : "#fff" },
      ]}
    >
      <View style={styles.header}>
        <Pressable onPress={reset}>
          <IconSymbol
            name="chevron.left"
            size={28}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </Pressable>
      </View>

      <ProgressIndicator
        total={4}
        current={Math.min(cycleCount + (mode === "rest" ? 1 : 0), 4)}
        color={currentColor}
      />

      <View style={styles.content}>
        <CircularTimer
          time={timeRemaining}
          totalTime={totalDuration}
          color={currentColor}
          radius={120}
          strokeWidth={8}
        />

        <ThemedText
          type="title"
          style={styles.modeText}
          lightColor="#11181C"
          darkColor="#ECEDEE"
        >
          {modeText}
        </ThemedText>

        <View style={styles.iconContainer}>
          <IconSymbol name={modeIcon} size={48} color={currentColor} />
        </View>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: currentColor,
            },
          ]}
          onPress={toggle}
        >
          <IconSymbol
            name={isRunning ? "pause.fill" : "play.fill"}
            size={28}
            color="white"
          />
          <ThemedText
            style={styles.buttonText}
            darkColor="white"
            lightColor="white"
          >
            {isRunning ? "Pause" : "Resume"}
          </ThemedText>
        </Pressable>

        <Pressable onPress={skip} style={styles.skipButton}>
          <ThemedText
            style={styles.skipText}
            lightColor={currentColor}
            darkColor={currentColor}
          >
            Skip to {mode === "work" ? "Rest" : "Work"}
          </ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modeText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  iconContainer: {
    marginVertical: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    marginTop: 32,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
