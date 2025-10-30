# Theme Implementation Plan

## 1. Update Theme Colors
- [x] Modify `src/enhanced-theme.ts` to use ember colors (red, yellow, orange) instead of current orange/amber
- [x] Ensure both light and dark modes have appropriate ember color variations

## 2. Update Theme Usage in Components
- [x] Update `src/components/Button.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/Input.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/Header.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/MoonCard.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/PromoCodeModal.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/TransactionCard.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/PromotionCard.tsx` to use theme colors instead of hardcoded values
- [x] Update `src/components/AchievementCard.tsx` to use theme colors instead of hardcoded values
- [ ] Update other components to use theme colors

## 3. Update Screen Colors
- [x] Update `src/screens/HomeScreen.tsx` to use theme colors instead of hardcoded dark colors
- [x] Update `src/screens/SettingsScreen.tsx` to use theme colors and add theme toggle
- [x] Update `src/screens/LoginScreen.tsx` to fully use theme colors
- [x] Update `src/navigation/MainTabNavigator.tsx` to use theme colors
- [x] Update `src/screens/TopUpPage.tsx` to use theme colors
- [x] Update `src/screens/TransactionPage.tsx` to use theme colors
- [x] Update `src/screens/TransferPage.tsx` to use theme colors
- [ ] Update remaining screens (RewardsScreen, BonusScreen, etc.) to use theme colors

## 4. Add Theme Toggle to Settings
- [x] Add light/dark mode toggle switch to SettingsScreen
- [x] Connect toggle to theme context

## 5. Test and Verify
- [x] Test theme switching functionality
- [x] Verify all screens use theme colors correctly
- [x] Ensure toggle works properly in Settings
