import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TypographyProps extends TextProps {
  variant?: 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'md',
  weight = 'regular',
  color,
  align = 'left',
  style,
  ...props
}) => {
  const { colors, typography } = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: typography.sizes[variant],
          fontWeight: typography.weights[weight],
          color: color || colors.text,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
