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
    borderRadius: 16,
    borderWidth: 0,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
