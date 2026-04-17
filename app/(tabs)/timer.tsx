import CircularTimer from "@/components/circular-timer";
import ProgressIndicator from "@/components/progress-indicator";
import ThemedText from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTimer } from "@/hooks/use-timer";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimerScreen() {
  const colorScheme = useColorScheme();

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
  const restColor = "#6B9E7F";
  const currentColor = mode === "work" ? workColor : restColor;

  // Background color changes based on mode
  const bgColor = mode === "work" ? "#FFFFFF" : "#6B9E7F";
  const textColor = mode === "work" ? "#11181C" : "#FFFFFF";
  const isDarkMode = mode === "rest";

  const modeText = mode === "work" ? "Work Mode" : "Rest";
  const modeIcon = mode === "work" ? "desktopcomputer" : "sparkles";
  const buttonText = isRunning ? "Pause" : "Resume";
  const buttonIcon = isRunning ? "pause.fill" : "play.fill";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={reset}>
          <IconSymbol
            name="chevron.left"
            size={28}
            color={isDarkMode ? "#FFFFFF" : "#6B9E7F"}
          />
        </Pressable>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressSection}>
        <ProgressIndicator
          total={4}
          current={Math.min(cycleCount + (mode === "rest" ? 1 : 0), 4)}
          color={isDarkMode ? "#FFFFFF" : currentColor}
          inactiveColor={isDarkMode ? "#FFFFFF60" : "#D3D3D3"}
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Circular Timer */}
        <CircularTimer
          time={timeRemaining}
          totalTime={totalDuration}
          color={isDarkMode ? "#FFFFFF" : currentColor}
          radius={100}
          strokeWidth={10}
          textColor={isDarkMode ? "#FFFFFF" : "#11181C"}
          bgCircleColor={isDarkMode ? "#FFFFFF40" : "#E0E0E0"}
        />

        {/* Mode Text */}
        <ThemedText
          style={[styles.modeText, { color: textColor }]}
          lightColor={textColor}
          darkColor={textColor}
        >
          {modeText}
        </ThemedText>

        {/* Mode Icon */}
        <View style={styles.iconContainer}>
          <IconSymbol
            name={modeIcon}
            size={40}
            color={isDarkMode ? "#FFFFFF" : currentColor}
          />
        </View>

        {/* Main Button */}
        <Pressable
          style={[
            styles.mainButton,
            {
              backgroundColor: isDarkMode ? "#FFFFFF" : currentColor,
            },
          ]}
          onPress={toggle}
        >
          <IconSymbol
            name={buttonIcon}
            size={36}
            color={isDarkMode ? currentColor : "#FFFFFF"}
          />
        </Pressable>

        {/* Button Label */}
        <ThemedText
          style={[styles.buttonLabel, { color: textColor }]}
          lightColor={textColor}
          darkColor={textColor}
        >
          {buttonText}
        </ThemedText>

        {/* Skip Button */}
        <Pressable onPress={skip} style={styles.skipButton}>
          <ThemedText
            style={[
              styles.skipText,
              { color: isDarkMode ? "#FFFFFF99" : "#99999999" },
            ]}
            lightColor={isDarkMode ? "#FFFFFF99" : "#999999"}
            darkColor={isDarkMode ? "#FFFFFF99" : "#999999"}
          >
            Skip
          </ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modeText: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
  },
  iconContainer: {
    marginVertical: 16,
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 32,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
