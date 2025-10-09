import { Tabs } from "expo-router";
import { BookOpen, Volume2, Trophy } from "lucide-react-native";
import React from "react";
import { Platform, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_LANDSCAPE = SCREEN_WIDTH > SCREEN_HEIGHT;

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
            ios: IS_LANDSCAPE ? 70 : 88, 
            android: IS_LANDSCAPE ? 60 : 65, 
            default: IS_LANDSCAPE ? 60 : 65 
          }),
          paddingBottom: Platform.select({ ios: IS_LANDSCAPE ? 8 : 20, default: 8 }),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: IS_LANDSCAPE ? 13 : 12,
          fontWeight: "600" as const,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lessons",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={IS_LANDSCAPE ? 26 : 24} />,
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
          tabBarIcon: ({ color }) => <Volume2 color={color} size={IS_LANDSCAPE ? 26 : 24} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => <Trophy color={color} size={IS_LANDSCAPE ? 26 : 24} />,
        }}
      />
    </Tabs>
  );
}
