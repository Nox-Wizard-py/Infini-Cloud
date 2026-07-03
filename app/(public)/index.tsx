import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { Typography } from '../../src/components/Typography';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { Icon } from '../../src/components/Icon';
import { useTheme } from '../../src/theme/ThemeContext';

export default function SplashScreen() {
  const { colors } = useTheme();
  
  useEffect(() => {
    // Simulate a brief loading period before navigating to onboarding
    const timer = setTimeout(() => {
      router.replace('/(public)/onboarding');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenContainer style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <View style={styles.logoContainer}>
          <Icon name="Cloud" size={64} color={colors.primary} />
        </View>
        <Typography variant="display" weight="bold" style={styles.title}>
          Infini Cloud
        </Typography>
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    letterSpacing: 1.2,
  },
});
