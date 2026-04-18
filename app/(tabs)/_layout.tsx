import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="timer" />
      <Stack.Screen name="rest" />
      <Stack.Screen name="work" />
    </Stack>
  );
}
