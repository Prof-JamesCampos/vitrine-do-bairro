import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';


export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: spacing.lg, 
    backgroundColor: colors.background 
},
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: colors.secondary, 
    marginBottom: spacing.xl, 
    textAlign: 'center' 
},
  input: { 
    backgroundColor: colors.white, 
    padding: spacing.md, 
    borderRadius: borderRadius.md, 
    marginBottom: spacing.md, 
    borderWidth: 1, 
    borderColor: colors.border 
},
  button: { 
    backgroundColor: colors.primary, 
    padding: spacing.md, 
    borderRadius: borderRadius.md, 
    alignItems: 'center', 
    marginTop: spacing.md 
},
  buttonText: { 
    color: colors.white, 
    fontWeight: '700', 
    fontSize: 16 
},
  link: { 
    color: colors.secondary, 
    textAlign: 'center', 
    marginTop: spacing.lg, 
    fontWeight: '600' 
}
});