import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
  instruction?: string;
  progress?: string;
  backgroundColor?: string;
  primaryColor?: string;
  onBack?: () => void;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  instruction,
  progress,
  backgroundColor = COLORS.background,
  primaryColor = COLORS.primary,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Dynamic styles based on orientation
  const headerHeight = isLandscape ? 60 : 100;
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar hidden={isLandscape && Platform.OS !== 'web'} />
      
      {/* Header Zone */}
      <View 
        style={[
          styles.header, 
          { 
            paddingTop: insets.top + SPACING.s,
            paddingLeft: insets.left + SPACING.m,
            paddingRight: insets.right + SPACING.m,
            height: headerHeight + insets.top,
          }
        ]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: COLORS.white }]} 
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <X size={24} color={primaryColor} />
          </TouchableOpacity>
          
          {progress && (
            <View style={[styles.progressBadge, { backgroundColor: 'rgba(255,255,255,0.5)' }]}>
              <Text style={[styles.progressText, { color: COLORS.textLight }]}>{progress}</Text>
            </View>
          )}
        </View>

        <View style={styles.headerCenter}>
          {instruction && (
            <Text style={[
              styles.instructionText, 
              { 
                color: primaryColor,
                fontSize: isLandscape ? TYPOGRAPHY.h3.fontSize : TYPOGRAPHY.body.fontSize 
              }
            ]}>
              {instruction}
            </Text>
          )}
        </View>
        
        <View style={styles.headerRight} />
      </View>

      {/* Game Content Zone */}
      <View style={[
        styles.contentContainer,
        {
          paddingLeft: insets.left + SPACING.m,
          paddingRight: insets.right + SPACING.m,
          paddingBottom: insets.bottom + SPACING.m,
        }
      ]}>
        <View style={styles.gameArea}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBadge: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  instructionText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  gameArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // Debug border in dev
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
