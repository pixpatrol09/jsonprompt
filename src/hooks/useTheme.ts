import { useThemeStore } from '../stores/themeStore'
import { THEME, COLORS } from '../constants/theme'

export function useTheme() {
  const { isDark } = useThemeStore()
  
  const theme = isDark ? THEME.dark : THEME.light
  
  return {
    isDark,
    theme,
    colors: COLORS,
    
    // Helper functions for consistent styling
    getBackgroundColor: (level: 'primary' | 'secondary' | 'tertiary' = 'primary') => 
      theme.background[level],
    
    getTextColor: (level: 'primary' | 'secondary' | 'tertiary' = 'primary') => 
      theme.text[level],
    
    getBorderColor: (level: 'primary' | 'secondary' = 'primary') => 
      theme.border[level],
    
    getIconColor: (type: 'primary' | 'secondary' | 'neutral' = 'primary') => 
      theme.icon[type],
    
    // Component style helpers
    getCardStyle: () => ({
      backgroundColor: theme.background.primary,
      borderColor: theme.border.primary,
      color: theme.text.primary,
    }),
    
    getButtonStyle: (variant: 'primary' | 'secondary' = 'primary') => ({
      backgroundColor: variant === 'primary' ? COLORS.primary[500] : theme.background.tertiary,
      borderColor: variant === 'primary' ? COLORS.primary[500] : theme.border.primary,
      color: variant === 'primary' ? '#ffffff' : theme.text.primary,
    }),
  }
}
