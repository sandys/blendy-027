import { Tabs } from "expo-router";
import { BookOpen, Volume2, Trophy } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4ECDC4",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          height: Platform.select({ ios: 85, android: 70, default: 70 }),
          paddingBottom: Platform.select({ ios: 25, android: 10, default: 10 }),
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600" as const,
          marginBottom: Platform.select({ ios: 0, android: 5, default: 5 }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({ ios: 5, android: 0, default: 0 }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lessons",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="sound-wall"
        options={{
          title: "Sound Wall",
          tabBarIcon: ({ color }) => <Volume2 color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => <Trophy color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
