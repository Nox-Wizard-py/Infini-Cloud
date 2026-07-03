import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ViewProps,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  dismissKeyboardOnTap?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  useSafeArea = true,
  dismissKeyboardOnTap = true,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const content = (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, style]} {...props}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );

  const wrappedContent = dismissKeyboardOnTap ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {content}
    </TouchableWithoutFeedback>
  ) : (
    content
  );

  const ContainerElement = useSafeArea ? SafeAreaView : View;

  return (
    <ContainerElement style={[styles.root, { backgroundColor: colors.background }]}>
      {wrappedContent}
    </ContainerElement>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
