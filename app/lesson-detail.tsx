import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Play } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";

const EXERCISE_TYPE_TO_ROUTE: Record<string, string> = {
  "Rhyme Match": "/games/rhyme-match",
  "Word Tapper": "/games/word-tapper",
  "Syllable Squish": "/games/syllable-squish",
  "Sound Slide": "/games/sound-slide",
  "Sound Detective": "/games/sound-detective",
  "Word Builder": "/games/word-builder",
};

export default function LessonDetailScreen() {
  const router = useRouter();
  const { lessons } = useApp();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const lessonId = parseInt(params.id as string);

  const lesson = lessons.find((l) => l.lesson_number === lessonId);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  const handleStartExercise = (exerciseIndex: number) => {
    const exercise = lesson.exercises[exerciseIndex];
    const route = EXERCISE_TYPE_TO_ROUTE[exercise.exercise_type];

    if (route) {
      router.push({
        pathname: route as never,
        params: { lesson: lessonId, exercise: exerciseIndex },
      } as never);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Lesson ${lesson.lesson_number}`,
          headerBackTitle: "Lessons",
        }}
      />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.description}>{lesson.description}</Text>
          </View>

          {lesson.new_graphemes && lesson.new_graphemes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>New Letter Sounds</Text>
              <View style={styles.graphemesContainer}>
                {lesson.new_graphemes.map((grapheme, index) => (
                  <View key={index} style={styles.graphemeChip}>
                    <Text style={styles.graphemeText}>{grapheme}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {lesson.new_irregular_words &&
            lesson.new_irregular_words.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>New Sight Words</Text>
                <View style={styles.wordsContainer}>
                  {lesson.new_irregular_words.map((word, index) => (
                    <View key={index} style={styles.wordChip}>
                      <Text style={styles.wordText}>{word}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            {lesson.exercises.map((exercise, index) => (
              <TouchableOpacity
                key={exercise.exercise_id}
                style={styles.exerciseCard}
                onPress={() => handleStartExercise(index)}
                activeOpacity={0.7}
              >
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseType}>
                    {exercise.exercise_type}
                  </Text>
                  <Text style={styles.exerciseSkill}>
                    {exercise.skill_focus}
                  </Text>
                </View>
                <View style={styles.playButton}>
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {lesson.story && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Story</Text>
              <View style={styles.storyCard}>
                <Text style={styles.storyTitle}>{lesson.story.title}</Text>
                <Text style={styles.storyText}>{lesson.story.text}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
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
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: "#666",
    lineHeight: 26,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  graphemesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  graphemeChip: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  graphemeText: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  wordChip: {
    backgroundColor: "#FF6B9D",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseType: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  exerciseSkill: {
    fontSize: 14,
    color: "#666",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
  },
  storyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  storyText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 28,
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
    marginTop: 40,
  },
});
