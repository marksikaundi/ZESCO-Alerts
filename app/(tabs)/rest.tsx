import ThemedText from "@/components/themed-text";
import { FokusColors } from "@/constants/fokus-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function RestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: "#8AAF89" }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />
      <View style={[styles.phoneCard, { backgroundColor: "#5E8C63" }]}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.headerSide}
            accessibilityRole="button"
            accessibilityLabel="Back to timer"
          >
            <Ionicons name="arrow-back" size={24} color={FokusColors.white} />
          </Pressable>
          <View style={styles.headerCenter} />
          <View style={styles.headerSide} />
        </View>

        <View style={styles.content}>
          <View style={styles.centerBlock}>
            <Ionicons name="leaf-outline" size={58} color={FokusColors.white} />
            <ThemedText
              style={styles.title}
              lightColor={FokusColors.white}
              darkColor={FokusColors.white}
            >
              Rest Break
            </ThemedText>
            <ThemedText
              style={styles.subtitle}
              lightColor={FokusColors.white}
              darkColor={FokusColors.white}
            >
              Breathe, hydrate, and reset for the next focus sprint.
            </ThemedText>
          </View>

          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Pressable
              style={styles.mainButton}
              onPress={() => router.push("/(tabs)/timer")}
              accessibilityRole="button"
              accessibilityLabel="Back to timer"
            >
              <Ionicons name="play" size={30} color={FokusColors.sage} />
            </Pressable>

            <ThemedText
              style={styles.buttonLabel}
              lightColor={FokusColors.white}
              darkColor={FokusColors.white}
            >
              Back to Timer
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
    gap: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 22,
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
    backgroundColor: FokusColors.white,
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
