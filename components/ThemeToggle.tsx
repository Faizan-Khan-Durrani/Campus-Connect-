import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/colors';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const styles = StyleSheet.create({
        container: {
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingBottom: 4,
            paddingTop: 40,
        },
        label: { fontSize: 16, color: isDarkMode ? darkTheme.surface : lightTheme.surface, },

    });

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: isDarkMode ? darkTheme.text : lightTheme.text }]}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
                value={isDarkMode}
                onValueChange={() => toggleTheme(isDarkMode ? 'light' : 'dark')}
            />
        </View>
    );
};

export default ThemeToggle;
