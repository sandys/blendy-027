import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Star, Award, Flame, BookOpen } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_LANDSCAPE = SCREEN_WIDTH > SCREEN_HEIGHT;

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
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 40,
  },
  statCard: {
    width: IS_LANDSCAPE ? "23%" : "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    marginBottom: 16,
  },
  statValue: {
    fontSize: 40,
    fontWeight: "800" as const,
    color: "#1A1A2E",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#1A1A2E",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 17,
    fontWeight: "600" as const,
    color: "#1A1A2E",
  },
  progressValue: {
    fontSize: 17,
    fontWeight: "700" as const,
    color: "#4ECDC4",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4ECDC4",
    borderRadius: 5,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  activityText: {
    fontSize: 17,
    color: "#6B7280",
    fontWeight: "500" as const,
  },
});
