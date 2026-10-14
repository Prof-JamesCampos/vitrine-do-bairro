import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.md,
  },
  desc: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    marginTop: 16, 
    color: colors.textLight, 
    fontSize: 16 
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: spacing.xl 
  },
  errorText: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: spacing.lg 
  },
  scrollContent: { paddingBottom: spacing.xl },
  heroPlaceholder: {
    height: 200,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: { fontSize: 18, color: colors.textLight },
  name: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  badge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  rating: { fontSize: 14, color: colors.text },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: spacing.md, marginBottom: spacing.sm },
  description: { fontSize: 14, color: colors.textLight, lineHeight: 20 },
  info: { fontSize: 14, color: colors.text },
  whatsappButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    minHeight: 48,
    justifyContent: 'center',
  },
  whatsappText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '500', color: colors.text },
  productPrice: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  backButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  backButtonText: { color: colors.white, fontWeight: '600' },
});
