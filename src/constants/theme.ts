// Design System - Color Palette
export const COLORS = {
  // Primary Colors
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff', 
    500: '#6366f1', // Main primary
    600: '#5b21b6',
    700: '#4c1d95',
    900: '#312e81',
  },
  
  // Secondary Colors (Purple)
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    500: '#8b5cf6', // Main secondary
    600: '#7c3aed',
    700: '#6d28d9',
    900: '#581c87',
  },
  
  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const

// Theme Configurations
export const THEME = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: COLORS.neutral[50],
      tertiary: COLORS.neutral[100],
    },
    text: {
      primary: COLORS.neutral[900],
      secondary: COLORS.neutral[600],
      tertiary: COLORS.neutral[500],
    },
    border: {
      primary: COLORS.neutral[200],
      secondary: COLORS.neutral[300],
    },
    icon: {
      primary: COLORS.primary[500],
      secondary: COLORS.secondary[500],
      neutral: COLORS.neutral[500],
    }
  },
  dark: {
    background: {
      primary: '#141414',
      secondary: '#1f1f1f',
      tertiary: '#2a2a2a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a6a6a6',
      tertiary: '#8c8c8c',
    },
    border: {
      primary: '#303030',
      secondary: '#404040',
    },
    icon: {
      primary: COLORS.primary[500],
      secondary: COLORS.secondary[500],
      neutral: COLORS.neutral[400],
    }
  }
} as const

// Component Styles
export const COMPONENTS = {
  button: {
    height: 40,
    borderRadius: 8,
    fontWeight: 500,
  },
  card: {
    borderRadius: 12,
    padding: 24,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  icon: {
    size: {
      small: 16,
      medium: 20,
      large: 24,
      xlarge: 48,
    }
  }
} as const

// Typography Scale
export const TYPOGRAPHY = {
  fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  }
} as const

// Spacing Scale
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const

// Animation Presets
export const ANIMATIONS = {
  transition: 'all 0.3s ease',
  hover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.15)',
  }
} as const
