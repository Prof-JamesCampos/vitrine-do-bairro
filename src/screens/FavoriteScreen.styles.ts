import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  header: { 
    padding: spacing.md, 
    backgroundColor: colors.white 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: colors.text },
  list: { 
    padding: spacing.md 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: spacing.xl 
  },
  emptyText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: colors.text 
  },
  emptySubtext: { 
    fontSize: 14, 
    color: colors.textLight, 
    marginTop: spacing.sm, 
    textAlign: 'center' 
  },
});