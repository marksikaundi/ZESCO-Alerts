import { StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

interface StatBlockProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

export default function StatBlock({
  label,
  value,
  icon,
  color = "#6B9E7F",
}: StatBlockProps) {
  return (
    <View style={styles.container}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <IconSymbol name={icon} size={24} color={color} />
        </View>
      )}
      <View style={styles.textContainer}>
        <ThemedText style={styles.label} lightColor="#999" darkColor="#999">
          {label}
        </ThemedText>
        <ThemedText
          style={styles.value}
          type="defaultSemiBold"
          lightColor="#11181C"
          darkColor="#ECEDEE"
        >
          {value}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
});
