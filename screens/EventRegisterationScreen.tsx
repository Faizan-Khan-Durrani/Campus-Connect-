import React from 'react';
import { View, StyleSheet } from 'react-native';
import EventRegistrationForm from '../components/EventRegisterationForm';
import { darkTheme, lightTheme } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';

const EventRegistrationScreen = ({ navigation }: { navigation: any }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
        },
    });
    return (
        <View style={styles.container}>
            <EventRegistrationForm navigation={navigation} />
        </View>
    );
};


export default EventRegistrationScreen;