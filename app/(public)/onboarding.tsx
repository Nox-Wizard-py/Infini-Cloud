import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Typography } from '../../src/components/Typography';
import { Button } from '../../src/components/Button';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { useTheme } from '../../src/theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PAGES = [
  {
    id: 1,
    title: 'Welcome to Infini Cloud',
    description: 'Your personal cloud, powered by Telegram.',
  },
  {
    id: 2,
    title: 'Free & Open Source',
    description: 'Infini Cloud is completely free, open source and community driven.\n\nNo subscriptions.\nNo advertisements.',
  },
  {
    id: 3,
    title: 'Private by Design',
    description: 'You own your data. Optional end-to-end encryption is planned for a future release.',
  },
];

export default function OnboardingScreen() {
  const { colors, spacing, radii } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const setIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      // Allow slight overscroll but restrict bounds
      const nextX = contextX.value + event.translationX;
      const minX = -(PAGES.length - 1) * SCREEN_WIDTH;
      const maxX = 0;
      
      if (nextX > maxX) {
        translateX.value = maxX + (nextX - maxX) * 0.2; // Overscroll left
      } else if (nextX < minX) {
        translateX.value = minX + (nextX - minX) * 0.2; // Overscroll right
      } else {
        translateX.value = nextX;
      }
    })
    .onEnd((event) => {
      let targetIndex = Math.round(-translateX.value / SCREEN_WIDTH);
      
      // Add velocity for faster swiping
      if (event.velocityX < -500 && targetIndex < PAGES.length - 1) {
        targetIndex++;
      } else if (event.velocityX > 500 && targetIndex > 0) {
        targetIndex--;
      }

      // Bound target index
      targetIndex = Math.max(0, Math.min(targetIndex, PAGES.length - 1));
      
      translateX.value = withSpring(-targetIndex * SCREEN_WIDTH, {
        damping: 20,
        stiffness: 100,
      });
      runOnJS(setIndex)(targetIndex);
    });

  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleNext = () => {
    if (currentIndex === PAGES.length - 1) {
      router.replace('/(public)/login');
    } else {
      const nextIndex = currentIndex + 1;
      translateX.value = withSpring(-nextIndex * SCREEN_WIDTH, {
        damping: 20,
        stiffness: 100,
      });
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <ScreenContainer useSafeArea>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.pagerContainer, scrollStyle]}>
            {PAGES.map((page, index) => {
              return (
                <View key={page.id} style={styles.page}>
                  <View style={styles.contentContainer}>
                    <Typography variant="display" weight="bold" align="center" style={styles.title}>
                      {page.title}
                    </Typography>
                    <Typography variant="lg" color={colors.textSecondary} align="center" style={styles.description}>
                      {page.description}
                    </Typography>
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </GestureDetector>

        <View style={styles.footer}>
          <View style={styles.indicatorContainer}>
            {PAGES.map((_, index) => {
              const dotStyle = useAnimatedStyle(() => {
                const width = interpolate(
                  -translateX.value / SCREEN_WIDTH,
                  [index - 1, index, index + 1],
                  [8, 24, 8],
                  Extrapolation.CLAMP
                );
                const opacity = interpolate(
                  -translateX.value / SCREEN_WIDTH,
                  [index - 1, index, index + 1],
                  [0.3, 1, 0.3],
                  Extrapolation.CLAMP
                );
                return {
                  width,
                  opacity,
                };
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    { backgroundColor: colors.primary, borderRadius: radii.full },
                    dotStyle,
                  ]}
                />
              );
            })}
          </View>

          <Button
            label={currentIndex === PAGES.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.button}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3, // For 3 pages
  },
  page: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentContainer: {
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: 24,
  },
  description: {
    lineHeight: 28,
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    height: 10, // Fixed height to prevent layout shifts
  },
  dot: {
    height: 8,
    marginHorizontal: 4,
  },
  button: {
    width: '100%',
  },
});
