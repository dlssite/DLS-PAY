const common = {
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 14,
    xxl: 18,
    xxxl: 35,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 50,
  },
  typography: {
    fontSize: {
      xs: 10,
      sm: 11,
      md: 12,
      lg: 13,
      xl: 14,
      xxl: 16,
      xxxl: 20,
    },
    fontWeight: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  button: {
    fontSize: {
        sm: 14,
        md: 16,
        lg: 18,
    },
    padding: {
        sm: { vertical: 8, horizontal: 12 },
        md: { vertical: 12, horizontal: 16 },
        lg: { vertical: 16, horizontal: 20 },
    }
  },
  input: {
    fontSize: 16,
    padding: {
        vertical: 12,
        horizontal: 16
    }
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};

export const enhancedTheme = {
  light: {
    ...common,
    colors: {
      primary: '#FF7043', // Deep Orange
      primaryLight: '#FF8A65',
      primaryDark: '#F4511E',
      secondary: '#FFCA28', // Amber
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: '#212121',
      textSecondary: '#757575',
      border: '#EEEEEE',
      success: '#66BB6A',
      error: '#EF5350',
      warning: '#FFA726',
      accent: '#FF7043',
    },
  },
  dark: {
    ...common,
    colors: {
      primary: '#FF7043', // Deep Orange
      primaryLight: '#FF8A65',
      primaryDark: '#F4511E',
      secondary: '#FFCA28', // Amber
      background: '#121212',
      surface: '#212121',
      text: '#FFFFFF',
      textSecondary: '#BDBDBD',
      border: '#424242',
      success: '#81C784',
      error: '#E57373',
      warning: '#FFB74D',
      accent: '#FF7043',
    },
  },
};
