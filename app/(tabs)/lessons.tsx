import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Lock, CheckCircle, Circle } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { PHASES } from "@/constants/curriculum-data";

export default function LessonsScreen() {
  const router = useRouter();
  const { progress, lessons } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>All Lessons</Text>
        <Text style={styles.subtitle}>
          {progress.completedLessons.length} of {lessons.length} completed
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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
                  const isUnlocked =
                    lesson.lesson_number <= progress.currentLesson;
                  const isCurrent = lesson.lesson_number === progress.currentLesson;

                  return (
                    <TouchableOpacity
                      key={lesson.lesson_number}
                      style={[
                        styles.lessonCard,
                        isCurrent && styles.lessonCardCurrent,
                        !isUnlocked && styles.lessonCardLocked,
                      ]}
                      onPress={() => {
                        if (isUnlocked) {
                          router.push(`/lesson-detail?id=${lesson.lesson_number}` as never);
                        }
                      }}
                      disabled={!isUnlocked}
                      activeOpacity={0.7}
                    >
                      <View style={styles.lessonNumber}>
                        <Text
                          style={[
                            styles.lessonNumberText,
                            !isUnlocked && styles.lessonNumberTextLocked,
                          ]}
                        >
                          {lesson.lesson_number}
                        </Text>
                      </View>

                      <View style={styles.lessonContent}>
                        <Text
                          style={[
                            styles.lessonTitle,
                            !isUnlocked && styles.lessonTitleLocked,
                          ]}
                          numberOfLines={2}
                        >
                          {lesson.title}
                        </Text>
                        <Text
                          style={[
                            styles.lessonDescription,
                            !isUnlocked && styles.lessonDescriptionLocked,
                          ]}
                          numberOfLines={2}
                        >
                          {lesson.description}
                        </Text>
                      </View>

                      <View style={styles.lessonStatus}>
                        {!isUnlocked && <Lock size={20} color="#CCC" />}
                        {isUnlocked && !isCompleted && (
                          <Circle size={20} color={phase.color} />
                        )}
                        {isCompleted && (
                          <CheckCircle size={20} color={phase.color} fill={phase.color} />
                        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500" as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  phaseSection: {
    marginBottom: 32,
  },
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  phaseHeaderText: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  phaseDescription: {
    fontSize: 14,
    color: "#666",
  },
  lessonsGrid: {
    gap: 12,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lessonCardCurrent: {
    borderWidth: 2,
    borderColor: "#4ECDC4",
  },
  lessonCardLocked: {
    opacity: 0.5,
  },
  lessonNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#1A1A1A",
  },
  lessonNumberTextLocked: {
    color: "#CCC",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  lessonTitleLocked: {
    color: "#999",
  },
  lessonDescription: {
    fontSize: 14,
    color: "#666",
  },
  lessonDescriptionLocked: {
    color: "#CCC",
  },
  lessonStatus: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
