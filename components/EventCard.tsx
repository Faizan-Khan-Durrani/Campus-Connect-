import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { darkTheme, lightTheme } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';
import { Event } from '../screens/RegisteredEvents';

const EventCard = ({ event, onRegister, }: { event: Event; onRegister: () => void; }) => {
    const { theme } = useTheme();

    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        card: {
            backgroundColor: isDarkMode ? darkTheme.surface : lightTheme.surface,
            margin: 8,
            borderRadius: 8,
            padding: 16,
            shadowColor: isDarkMode ? darkTheme.text : lightTheme.text,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
            borderWidth: 1,
        },
        title: { fontSize: 18, fontWeight: 'bold', color: isDarkMode ? darkTheme.text : lightTheme.text },
        subtitle: { fontSize: 14, color: isDarkMode ? darkTheme.secondary : lightTheme.secondary, marginVertical: 4 },
        description: { fontSize: 14, color: isDarkMode ? darkTheme.secondary : lightTheme.secondary, marginBottom: 8 },
        button: {
            backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
            padding: 10,
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 8,
        },
        buttonText: { color: '#FFF', fontWeight: 'bold' },
    });

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{event.eventName}</Text>
            <Text style={styles.subtitle}>
                {event.eventDate} | {event.eventLocation}
            </Text>
            <Text style={styles.description}>{event.eventDescription}</Text>
            <TouchableOpacity style={styles.button} onPress={onRegister}>
                <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
        </View>
    )
};

export default EventCard;
