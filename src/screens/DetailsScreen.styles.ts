import { StyleSheet } from "react-native";
import { colors, spacing } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  desc: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
});
