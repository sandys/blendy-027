import { Tabs } from "expo-router";
import { BookOpen, Volume2, Trophy } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4ECDC4",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E8EB",
          height: Platform.select({ 
            ios: 75,
            android: 70,
            default: 70
          }),
          paddingBottom: Platform.select({ 
            ios: 10,
            android: 10,
            default: 10
          }),
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600" as const,
          marginTop: 2,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
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
