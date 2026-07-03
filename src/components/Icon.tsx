import React from 'react';
import * as icons from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color }) => {
  const { colors } = useTheme();
  const LucideIcon = icons[name] as React.ElementType;
  
  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon size={size} color={color || colors.text} />;
};
