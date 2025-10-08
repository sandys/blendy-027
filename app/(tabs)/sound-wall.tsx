import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, Lock } from "lucide-react-native";
import { useApp } from "@/contexts/AppContext";
import { PhonemeCard } from "@/types/curriculum";

export default function SoundWallScreen() {
  const { phonemeCards } = useApp();
  const [selectedCard, setSelectedCard] = useState<PhonemeCard | null>(null);
  const insets = useSafeAreaInsets();

  const consonants = phonemeCards.filter((c) => c.category === "consonant");
  const vowels = phonemeCards.filter((c) => c.category === "vowel");

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Sound Wall</Text>
        <Text style={styles.subtitle}>
          Tap a sound to learn more about it
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consonants</Text>
          <View style={styles.cardsGrid}>
            {consonants.map((card) => (
              <TouchableOpacity
                key={card.phoneme}
                style={[
                  styles.soundCard,
                  !card.unlocked && styles.soundCardLocked,
                ]}
                onPress={() => card.unlocked && setSelectedCard(card)}
                disabled={!card.unlocked}
                activeOpacity={0.7}
              >
                {!card.unlocked && (
                  <View style={styles.lockOverlay}>
                    <Lock size={20} color="#999" />
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
                  style={[
                    styles.soundWord,
                    !card.unlocked && styles.soundWordLocked,
                  ]}
                >
                  {card.anchorWord}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vowel Valley</Text>
          <View style={styles.cardsGrid}>
            {vowels.map((card) => (
              <TouchableOpacity
                key={card.phoneme}
                style={[
                  styles.soundCard,
                  styles.soundCardVowel,
                  !card.unlocked && styles.soundCardLocked,
                ]}
                onPress={() => card.unlocked && setSelectedCard(card)}
                disabled={!card.unlocked}
                activeOpacity={0.7}
              >
                {!card.unlocked && (
                  <View style={styles.lockOverlay}>
                    <Lock size={20} color="#999" />
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
                  style={[
                    styles.soundWord,
                    !card.unlocked && styles.soundWordLocked,
                  ]}
                >
                  {card.anchorWord}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={selectedCard !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCard(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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

                <View style={styles.graphemesSection}>
                  <Text style={styles.graphemesTitle}>Spellings:</Text>
                  <View style={styles.graphemesList}>
                    {selectedCard.graphemes.map((grapheme, index) => (
                      <View key={index} style={styles.graphemeChip}>
                        <Text style={styles.graphemeText}>{grapheme}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {selectedCard.subcategory && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {selectedCard.subcategory}
                    </Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  soundCard: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  soundCardVowel: {
    backgroundColor: "#FFF9E6",
  },
  soundCardLocked: {
    opacity: 0.4,
  },
  lockOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  soundEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  soundPhoneme: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  soundPhonemeLocked: {
    color: "#CCC",
  },
  soundWord: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600" as const,
  },
  soundWordLocked: {
    color: "#DDD",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingTop: 24,
    minHeight: 400,
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
    marginBottom: 32,
  },
  graphemesSection: {
    marginBottom: 24,
  },
  graphemesTitle: {
    fontSize: 18,
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
    paddingVertical: 8,
    borderRadius: 12,
  },
  graphemeText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  categoryBadge: {
    alignSelf: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#666",
    textTransform: "capitalize" as const,
  },
});
