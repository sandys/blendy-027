import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, Lock, Volume2 } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { PhonemeCard } from "@/types/curriculum";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_SIZE = Math.min((SCREEN_WIDTH - 80) / 8, 100);

export default function SoundWallScreen() {
  const { phonemeCards } = useApp();
  const [selectedCard, setSelectedCard] = useState<PhonemeCard | null>(null);
  const insets = useSafeAreaInsets();

  const consonantsByCategory = {
    stops: phonemeCards.filter((c) => c.subcategory === "stop"),
    affricates: phonemeCards.filter((c) => c.subcategory === "affricate"),
    nasals: phonemeCards.filter((c) => c.subcategory === "nasal"),
    fricatives: phonemeCards.filter((c) => c.subcategory === "fricative"),
    glides: phonemeCards.filter((c) => c.subcategory === "glide"),
    liquids: phonemeCards.filter((c) => c.subcategory === "liquid"),
    two_sounds: phonemeCards.filter((c) => c.subcategory === "two_sounds"),
  };

  const vowelsByCategory = {
    short_vowels: phonemeCards.filter((c) =>
      ["short_a", "short_e", "short_i", "short_o", "short_u"].includes(
        c.subcategory || ""
      )
    ),
    long_vowels: phonemeCards.filter((c) =>
      ["long_a", "long_e", "long_i", "long_o", "long_u", "yoo"].includes(
        c.subcategory || ""
      )
    ),
    r_controlled: phonemeCards.filter((c) =>
      c.subcategory?.includes("r_controlled")
    ),
    diphthongs: phonemeCards.filter((c) =>
      ["oi", "ou", "aw", "oo_short"].includes(c.subcategory || "")
    ),
    schwa: phonemeCards.filter((c) => c.subcategory === "schwa"),
  };

  const renderPhonemeCard = (card: PhonemeCard) => (
    <TouchableOpacity
      key={card.phoneme + card.anchorWord}
      style={[
        styles.soundCard,
        card.category === "vowel" && styles.soundCardVowel,
        !card.unlocked && styles.soundCardLocked,
      ]}
      onPress={() => card.unlocked && setSelectedCard(card)}
      disabled={!card.unlocked}
      activeOpacity={0.7}
    >
      {!card.unlocked && (
        <View style={styles.lockOverlay}>
          <Lock size={16} color="#999" />
        </View>
      )}
      <Text style={styles.soundEmoji}>{card.anchorImage}</Text>
      <Text
        style={[
          styles.soundPhoneme,
          !card.unlocked && styles.soundPhonemeLocked,
        ]}
      >
        {card.phoneme}
      </Text>
      <Text
        style={[styles.soundWord, !card.unlocked && styles.soundWordLocked]}
        numberOfLines={1}
      >
        {card.anchorWord}
      </Text>
    </TouchableOpacity>
  );

  const renderCategory = (
    title: string,
    cards: PhonemeCard[],
    color: string
  ) => {
    if (cards.length === 0) return null;

    return (
      <View style={styles.categorySection}>
        <View style={[styles.categoryHeader, { backgroundColor: color }]}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Text style={styles.categoryCount}>
            {cards.filter((c) => c.unlocked).length}/{cards.length}
          </Text>
        </View>
        <View style={styles.cardsGrid}>{cards.map(renderPhonemeCard)}</View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>Sound Wall</Text>
        <Text style={styles.subtitle}>
          All 44 phonemes organized by articulation
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.mainSection}>
          <Text style={styles.sectionTitle}>🗣️ CONSONANTS</Text>
          <Text style={styles.sectionSubtitle}>
            Organized by manner and place of articulation
          </Text>

          {renderCategory("Stops", consonantsByCategory.stops, "#FFE5E5")}
          {renderCategory(
            "Affricates",
            consonantsByCategory.affricates,
            "#FFF0E5"
          )}
          {renderCategory("Nasals", consonantsByCategory.nasals, "#E5F5FF")}
          {renderCategory(
            "Fricatives",
            consonantsByCategory.fricatives,
            "#F0E5FF"
          )}
          {renderCategory("Glides", consonantsByCategory.glides, "#E5FFE5")}
          {renderCategory("Liquids", consonantsByCategory.liquids, "#FFFFE5")}
          {renderCategory(
            "Two Sounds",
            consonantsByCategory.two_sounds,
            "#FFE5F5"
          )}
        </View>

        <View style={styles.mainSection}>
          <Text style={styles.sectionTitle}>🌈 VOWEL VALLEY</Text>
          <Text style={styles.sectionSubtitle}>
            Organized by jaw and tongue position
          </Text>

          {renderCategory(
            "Short Vowels",
            vowelsByCategory.short_vowels,
            "#FFF9E6"
          )}
          {renderCategory(
            "Long Vowels",
            vowelsByCategory.long_vowels,
            "#FFF0CC"
          )}
          {renderCategory(
            "R-Controlled",
            vowelsByCategory.r_controlled,
            "#FFE8CC"
          )}
          {renderCategory(
            "Diphthongs & Special",
            vowelsByCategory.diphthongs,
            "#FFE0B3"
          )}
          {renderCategory("Schwa", vowelsByCategory.schwa, "#FFD699")}
        </View>
      </ScrollView>

      <Modal
        visible={selectedCard !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCard(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedCard(null)}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>

            {selectedCard && (
              <>
                <Text style={styles.modalEmoji}>{selectedCard.anchorImage}</Text>
                <Text style={styles.modalPhoneme}>{selectedCard.phoneme}</Text>
                <Text style={styles.modalWord}>{selectedCard.anchorWord}</Text>

                <TouchableOpacity style={styles.playButton} activeOpacity={0.7}>
                  <Volume2 size={24} color="#FFFFFF" />
                  <Text style={styles.playButtonText}>Play Sound</Text>
                </TouchableOpacity>

                <View style={styles.graphemesSection}>
                  <Text style={styles.graphemesTitle}>
                    Ways to spell this sound:
                  </Text>
                  <View style={styles.graphemesList}>
                    {selectedCard.graphemes.map((grapheme, index) => (
                      <View key={index} style={styles.graphemeChip}>
                        <Text style={styles.graphemeText}>{grapheme}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {selectedCard.subcategory && (
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryInfoLabel}>Category:</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {selectedCard.category === "consonant"
                          ? "Consonant"
                          : "Vowel"}{" "}
                        • {selectedCard.subcategory.replace(/_/g, " ")}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 26,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500" as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  mainSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
    fontWeight: "500" as const,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  categoryCount: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#666",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  soundCard: {
    width: CARD_SIZE,
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  soundCardVowel: {
    backgroundColor: "#FFF9E6",
  },
  soundCardLocked: {
    opacity: 0.35,
  },
  lockOverlay: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  soundEmoji: {
    fontSize: 22,
    marginBottom: 3,
  },
  soundPhoneme: {
    fontSize: 14,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 1,
  },
  soundPhonemeLocked: {
    color: "#CCC",
  },
  soundWord: {
    fontSize: 9,
    color: "#666",
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  soundWordLocked: {
    color: "#DDD",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingTop: 24,
    minHeight: 500,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalEmoji: {
    fontSize: 80,
    textAlign: "center" as const,
    marginBottom: 16,
  },
  modalPhoneme: {
    fontSize: 48,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    textAlign: "center" as const,
    marginBottom: 8,
  },
  modalWord: {
    fontSize: 24,
    color: "#666",
    textAlign: "center" as const,
    fontWeight: "600" as const,
    marginBottom: 24,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ECDC4",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 32,
    gap: 12,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  graphemesSection: {
    marginBottom: 24,
  },
  graphemesTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  graphemesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  graphemeChip: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  graphemeText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  categoryInfo: {
    alignItems: "center",
  },
  categoryInfoLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#666",
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#666",
    textTransform: "capitalize" as const,
  },
});
