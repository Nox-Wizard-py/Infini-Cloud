import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../../components/Icon';

export default function LoginScreen() {
  const { colors, spacing, radii } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ScreenContainer useSafeArea style={styles.container}>
      <View style={styles.header}>
        <Typography variant="display" weight="medium" align="center" style={styles.title}>
          Your Phone Number
        </Typography>
        <Typography variant="md" color={colors.textSecondary} align="center" style={styles.subtitle}>
          Please confirm your country code and enter your phone number.
        </Typography>
      </View>

      <View style={styles.formContainer}>
        {/* Country Selector (UI Only) */}
        <TouchableOpacity
          style={[
            styles.countrySelector,
            {
              borderColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
        >
          <Typography variant="lg">United States</Typography>
          <Icon name="ChevronRight" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Phone Input */}
        <View
          style={[
            styles.phoneInputContainer,
            {
              borderColor: isFocused ? colors.primary : colors.border,
              borderBottomWidth: isFocused ? 2 : 1,
            },
          ]}
        >
          <View style={[styles.countryCode, { borderRightColor: colors.border }]}>
            <Typography variant="lg">+1</Typography>
          </View>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Phone number"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            selectionColor={colors.primary}
          />
        </View>

        <View style={styles.syncContainer}>
          <TouchableOpacity style={styles.checkboxRow}>
            <Icon name="CheckSquare" size={20} color={colors.primary} />
            <Typography style={styles.syncText}>Sync Contacts</Typography>
          </TouchableOpacity>
        </View>

        <Button
          label="Continue"
          onPress={() => {}}
          style={styles.continueButton}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.qrButton}>
          <Typography color={colors.primary} weight="medium" variant="lg">
            Log in by QR Code
          </Typography>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  countryCode: {
    paddingVertical: 16,
    paddingRight: 16,
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 16,
    paddingLeft: 16,
  },
  syncContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncText: {
    marginLeft: 12,
  },
  continueButton: {
    marginTop: 16,
  },
  footer: {
    paddingBottom: 48,
    alignItems: 'center',
  },
  qrButton: {
    padding: 16,
  },
});
