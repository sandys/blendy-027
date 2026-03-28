import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Play, Volume2 } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { speakText } from "@/utils/audio";
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from "@/constants/theme";

const EXERCISE_TYPE_TO_ROUTE: Record<string, string> = {
  "Rhyme Match": "/games/rhyme-match",
  "Word Tapper": "/games/word-tapper",
  "Syllable Squish": "/games/syllable-squish",
  "Sound Slide": "/games/sound-slide",
  "Sound Detective": "/games/sound-detective",
  "Word Builder": "/games/word-builder",
  "Sound Search": "/games/sound-search",
};

export default function LessonDetailScreen() {
  const router = useRouter();
  const { lessons } = useApp();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
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

  // Responsive container width
  const containerWidth = Math.min(width, LAYOUT.maxContentWidth);

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
          contentContainerStyle={[
              styles.scrollContent, 
              { 
                  paddingHorizontal: Math.max(32, (width - containerWidth) / 2 + 32),
              }
          ]}
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
                  <TouchableOpacity
                    key={index}
                    style={styles.graphemeChip}
                    onPress={() => speakText(grapheme, { rate: 0.6 })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.graphemeText}>{grapheme}</Text>
                    <Volume2 size={16} color={COLORS.white} style={styles.graphemeIcon} />
                  </TouchableOpacity>
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
                    <TouchableOpacity
                      key={index}
                      style={styles.wordChip}
                      onPress={() => speakText(word, { rate: 0.7 })}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.wordText}>{word}</Text>
                      <Volume2 size={14} color={COLORS.white} style={styles.wordIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            {lesson.exercises.map((exercise, index) => {
              const getExerciseContent = () => {
                const data = exercise.data as any;
                switch (exercise.exercise_type) {
                  case "Rhyme Match":
                    return `Find rhyme for: ${data.target?.word || ""}`;
                  case "Word Tapper":
                    return `"${data.sentence || ""}"`;
                  case "Syllable Squish":
                    return `Count syllables: ${data.word || ""}`;
                  case "Sound Slide":
                    return `Blend: ${data.onset || ""}${data.rime || ""} → ${data.word || ""}`;
                  case "Sound Detective":
                    return `Find ${data.targetPosition || ""} sound in: ${data.word || ""}`;
                  case "Word Builder":
                    return `Build: ${data.word || ""}`;
                  case "Sound Search":
                    return `Complete: ${data.wordWithBlank || ""}`;
                  default:
                    return exercise.skill_focus;
                }
              };

              return (
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
                      {getExerciseContent()}
                    </Text>
                  </View>
                  <View style={styles.playButton}>
                    <Play size={24} color={COLORS.white} fill={COLORS.white} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {lesson.story && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Story</Text>
              <View style={styles.storyCard}>
                <Text style={styles.storyTitle}>{lesson.story.title}</Text>
                <Text style={styles.storyText}>{lesson.story.text}</Text>
                <TouchableOpacity
                  style={styles.storyAudioButton}
                  onPress={() => speakText(lesson.story!.text, { rate: 0.75 })}
                  activeOpacity={0.7}
                >
                  <Volume2 size={24} color={COLORS.secondary} />
                  <Text style={styles.storyAudioText}>Read Story</Text>
                </TouchableOpacity>
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
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 32,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 19,
    color: COLORS.textLight,
    lineHeight: 28,
  },
  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: COLORS.text,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  graphemesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  graphemeChip: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 80,
    justifyContent: "center",
  },
  graphemeText: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: COLORS.white,
  },
  graphemeIcon: {
    marginLeft: 4,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  wordChip: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wordText: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: COLORS.white,
  },
  wordIcon: {
    marginLeft: 2,
  },
  exerciseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 100,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseType: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: COLORS.text,
    marginBottom: 6,
  },
  exerciseSkill: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  storyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: COLORS.text,
    marginBottom: 16,
  },
  storyText: {
    fontSize: 19,
    color: "#374151",
    lineHeight: 32,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    textAlign: "center",
    marginTop: 40,
  },
  storyAudioButton: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#E8F9F8",
  },
  storyAudioText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: COLORS.secondary,
  },
});
