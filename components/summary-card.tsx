import React from "react";
import { StyleSheet, useColorScheme, View, ViewProps } from "react-native";

interface SummaryCardProps extends ViewProps {
  children: React.ReactNode;
  gradient?: boolean;
}

export default function SummaryCard({
  children,
  style,
  gradient,
  ...props
}: SummaryCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#262626" : "#F5F5F5",
          borderColor: isDark ? "#3A3A3A" : "#E8E8E8",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
});
