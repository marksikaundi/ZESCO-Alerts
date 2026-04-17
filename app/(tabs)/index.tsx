import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuickStat {
  icon: string;
  title: string;
  value: string;
  color: string;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];

  const quickStats: QuickStat[] = [
    { icon: "battery.50", title: "Battery", value: "60%", color: "#FF9100" },
    {
      icon: "thermometer",
      title: "Temperature",
      value: "32°C",
      color: "#FF6B6B",
    },
    { icon: "bolt.fill", title: "Power Used", value: "12h", color: "#2196F3" },
    {
      icon: "exclamationmark.circle.fill",
      title: "Issues",
      value: "3",
      color: "#FFC107",
    },
  ];

  const recentActions = [
    {
      id: "1",
      title: "System Cleaned",
      subtitle: "2 hours ago",
      icon: "checkmark.circle.fill",
    },
    {
      id: "2",
      title: "Deep Scan Done",
      subtitle: "4 hours ago",
      icon: "checkmark.circle.fill",
    },
    {
      id: "3",
      title: "Photos Backed Up",
      subtitle: "Yesterday",
      icon: "checkmark.circle.fill",
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#0F1419" : "#F8FAFC",
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[
          styles.headerBg,
          {
            backgroundColor: isDark ? "#1A1F2E" : "#F0F4F8",
          },
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text
              style={[styles.greeting, { color: isDark ? "#fff" : "#000" }]}
            >
              Good Morning
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" },
              ]}
            >
              Welcome to ZESCO Alerts
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.notificationButton,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              },
            ]}
          >
            <IconSymbol
              size={24}
              name="bell.fill"
              color={isDark ? "#fff" : "#000"}
            />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats Grid */}
      <View style={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? "#1A1F2E" : "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0.2 : 0.08,
                shadowRadius: 8,
                elevation: 3,
              },
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.statIconBg,
                { backgroundColor: stat.color + "20" },
              ]}
            >
              <IconSymbol size={20} name={stat.icon} color={stat.color} />
            </View>
            <Text
              style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}
            >
              {stat.value}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" },
              ]}
            >
              {stat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          Quick Actions
        </Text>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#2196F3",
              shadowColor: "#2196F3",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <IconSymbol size={24} name="bolt.fill" color="#fff" />
          <Text style={styles.actionButtonText}>Optimize Now</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            Recent Activity
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {recentActions.map((action) => (
          <View
            key={action.id}
            style={[
              styles.activityItem,
              {
                backgroundColor: isDark ? "#1A1F2E" : "#fff",
                borderBottomColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
              },
            ]}
          >
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: "#4CAF50" + "20" },
              ]}
            >
              <IconSymbol size={18} name={action.icon} color="#4CAF50" />
            </View>
            <View style={styles.activityContent}>
              <Text
                style={[
                  styles.activityTitle,
                  { color: isDark ? "#fff" : "#000" },
                ]}
              >
                {action.title}
              </Text>
              <Text
                style={[
                  styles.activitySubtitle,
                  {
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                  },
                ]}
              >
                {action.subtitle}
              </Text>
            </View>
            <IconSymbol
              size={20}
              name="chevron.right"
              color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
            />
          </View>
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerBg: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 0.5,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  seeAll: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "600",
  },
  actionButton: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  activitySubtitle: {
    fontSize: 12,
  },
});
