import { StyleSheet } from "react-native";
import { colors, spacing } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  list: {
    padding: spacing.md,
  },
  loader: {
    marginTop: 50,
  },
  errorBanner: {
    backgroundColor: "#FFF3E0",
    padding: 12,
    margin: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#E65100",
    fontWeight: "600",
    flex: 1,
    fontSize: 14,
  },
  retryText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
  },
});
