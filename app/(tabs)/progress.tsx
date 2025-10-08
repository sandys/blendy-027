import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Star, Award, Flame, BookOpen } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";

export default function ProgressScreen() {
  const { progress, lessons, phonemeCards } = useApp();
  const insets = useSafeAreaInsets();

  const unlockedPhonemes = phonemeCards.filter((c) => c.unlocked).length;
  const totalPhonemes = phonemeCards.length;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Keep up the great work!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Star size={32} color="#FFD93D" fill="#FFD93D" />
            </View>
            <Text style={styles.statValue}>{progress.totalStars}</Text>
            <Text style={styles.statLabel}>Stars Earned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flame size={32} color="#FF6B9D" />
            </View>
            <Text style={styles.statValue}>{progress.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <BookOpen size={32} color="#4ECDC4" />
            </View>
            <Text style={styles.statValue}>{progress.completedLessons.length}</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Award size={32} color="#A78BFA" />
            </View>
            <Text style={styles.statValue}>{unlockedPhonemes}</Text>
            <Text style={styles.statLabel}>Sounds Learned</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Lessons Completed</Text>
              <Text style={styles.progressValue}>
                {progress.completedLessons.length} / {lessons.length}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${(progress.completedLessons.length / lessons.length) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Sounds Unlocked</Text>
              <Text style={styles.progressValue}>
                {unlockedPhonemes} / {totalPhonemes}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${(unlockedPhonemes / totalPhonemes) * 100}%`,
                    backgroundColor: "#A78BFA",
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Last active:{" "}
              {new Date(progress.lastActivityDate).toLocaleDateString()}
            </Text>
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600" as const,
    textAlign: "center" as const,
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
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1A1A1A",
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#4ECDC4",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4ECDC4",
    borderRadius: 4,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  activityText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500" as const,
  },
});
