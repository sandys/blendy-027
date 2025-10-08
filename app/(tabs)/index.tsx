import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Sparkles, BookOpen, Star } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { PHASES } from "@/constants/curriculum-data";

export default function HomeScreen() {
  const router = useRouter();
  const { progress, lessons } = useApp();
  const insets = useSafeAreaInsets();

  const currentLesson = lessons.find(
    (l) => l.lesson_number === progress.currentLesson
  );
  const currentPhase = PHASES.find((p) => p.phase === currentLesson?.phase);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Reader! 👋</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Star size={16} color="#FFD93D" fill="#FFD93D" />
              <Text style={styles.statText}>{progress.totalStars}</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statText}>{progress.streakDays} days</Text>
            </View>
          </View>
        </View>

        {currentLesson && currentPhase && (
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => router.push(`/(tabs)/lesson-detail?id=${currentLesson.lesson_number}` as never)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[currentPhase.color, currentPhase.color + "CC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <View style={styles.continueContent}>
                <View style={styles.continueIcon}>
                  <Sparkles size={32} color="#FFFFFF" />
                </View>
                <View style={styles.continueText}>
                  <Text style={styles.continueLabel}>Continue Learning</Text>
                  <Text style={styles.continueTitle}>
                    Lesson {currentLesson.lesson_number}
                  </Text>
                  <Text style={styles.continueDescription}>
                    {currentLesson.title}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Phases</Text>
          <View style={styles.phasesGrid}>
            {PHASES.map((phase) => {
              const lessonsInPhase = lessons.filter(
                (l) => l.phase === phase.phase
              );
              const completedInPhase = lessonsInPhase.filter((l) =>
                progress.completedLessons.includes(l.lesson_number)
              ).length;
              const totalInPhase = lessonsInPhase.length;
              const progressPercent =
                totalInPhase > 0 ? (completedInPhase / totalInPhase) * 100 : 0;

              return (
                <TouchableOpacity
                  key={phase.phase}
                  style={styles.phaseCard}
                  onPress={() => router.push("/(tabs)/lessons" as never)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.phaseColorBar,
                      { backgroundColor: phase.color },
                    ]}
                  />
                  <View style={styles.phaseContent}>
                    <Text style={styles.phaseNumber}>Phase {phase.phase}</Text>
                    <Text style={styles.phaseTitle}>{phase.title}</Text>
                    <Text style={styles.phaseDescription}>
                      {phase.description}
                    </Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${progressPercent}%`,
                            backgroundColor: phase.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {completedInPhase} of {totalInPhase} lessons
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(tabs)/lessons" as never)}
            >
              <BookOpen size={32} color="#4ECDC4" />
              <Text style={styles.actionTitle}>Browse Lessons</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(tabs)/sound-wall" as never)}
            >
              <Text style={styles.actionEmoji}>🔊</Text>
              <Text style={styles.actionTitle}>Sound Wall</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 16,
  },
  statText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  continueCard: {
    marginBottom: 32,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  gradientCard: {
    padding: 24,
  },
  continueContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  continueIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    flex: 1,
  },
  continueLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  continueTitle: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  continueDescription: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "rgba(255, 255, 255, 0.95)",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  phasesGrid: {
    gap: 16,
  },
  phaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  phaseColorBar: {
    height: 6,
    width: "100%",
  },
  phaseContent: {
    padding: 20,
  },
  phaseNumber: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#999",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600" as const,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 32,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    textAlign: "center" as const,
  },
});
