import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CheckCircle, Circle } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { PHASES } from "@/constants/curriculum-data";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_LANDSCAPE = SCREEN_WIDTH > SCREEN_HEIGHT;

export default function LessonsScreen() {
  const router = useRouter();
  const { progress, lessons } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>All Lessons</Text>
        <Text style={styles.subtitle}>
          {progress.completedLessons.length} of {lessons.length} completed
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {PHASES.map((phase) => {
          const phaseLessons = lessons.filter((l) => l.phase === phase.phase);
          if (phaseLessons.length === 0) return null;

          return (
            <View key={phase.phase} style={styles.phaseSection}>
              <View style={styles.phaseHeader}>
                <View
                  style={[styles.phaseDot, { backgroundColor: phase.color }]}
                />
                <View style={styles.phaseHeaderText}>
                  <Text style={styles.phaseTitle}>{phase.title}</Text>
                  <Text style={styles.phaseDescription}>
                    {phase.description}
                  </Text>
                </View>
              </View>

              <View style={styles.lessonsGrid}>
                {phaseLessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(
                    lesson.lesson_number
                  );
                  const isCurrent = lesson.lesson_number === progress.currentLesson;

                  return (
                    <TouchableOpacity
                      key={lesson.lesson_number}
                      style={[
                        styles.lessonCard,
                        isCurrent && styles.lessonCardCurrent,
                      ]}
                      onPress={() => {
                        router.push(`/lesson-detail?id=${lesson.lesson_number}` as never);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.lessonHeader}>
                        <View style={styles.lessonNumber}>
                          <Text style={styles.lessonNumberText}>
                            {lesson.lesson_number}
                          </Text>
                        </View>
                        <View style={styles.lessonStatus}>
                          {!isCompleted && (
                            <Circle size={24} color={phase.color} />
                          )}
                          {isCompleted && (
                            <CheckCircle size={24} color={phase.color} fill={phase.color} />
                          )}
                        </View>
                      </View>

                      <View style={styles.lessonContent}>
                        <Text
                          style={styles.lessonTitle}
                          numberOfLines={2}
                        >
                          {lesson.title}
                        </Text>
                        <Text
                          style={styles.lessonDescription}
                          numberOfLines={2}
                        >
                          {lesson.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = IS_LANDSCAPE 
  ? Math.min((SCREEN_WIDTH - 80) / 4, 240)
  : Math.min((SCREEN_WIDTH - 64) / 2, 280);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    paddingHorizontal: 32,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E8EB",
  },
  title: {
    fontSize: 34,
    fontWeight: "800" as const,
    color: "#1A1A2E",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500" as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 32,
    paddingTop: 24,
  },
  phaseSection: {
    marginBottom: 40,
  },
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  phaseDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  phaseHeaderText: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#1A1A2E",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  phaseDescription: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  lessonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: CARD_WIDTH,
    minHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  lessonCardCurrent: {
    borderWidth: 2,
    borderColor: "#4ECDC4",
    shadowColor: "#4ECDC4",
    shadowOpacity: 0.15,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#1A1A2E",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A2E",
    marginBottom: 8,
    lineHeight: 24,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  lessonStatus: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
