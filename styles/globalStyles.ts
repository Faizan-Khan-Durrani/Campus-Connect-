import { StyleSheet } from 'react-native';
import { lightTheme } from './colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: lightTheme.background,
    },
    text: {
        fontSize: 16,
        color: lightTheme.text,
    },
    card: {
        backgroundColor: lightTheme.surface,
        borderRadius: 8,
        padding: 16,
        borderColor: lightTheme.border,
        borderWidth: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: lightTheme.primary,
        marginBottom: 16,
    },
});
