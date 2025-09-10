import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { darkTheme, lightTheme } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../zustand/store';

const EventDetail = ({ route, navigation }: { route: any; navigation: any }) => {
    const { event } = route.params;
    const { theme } = useTheme();
    const { addEvent } = useStore();

    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            padding: 16,
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
            alignItems: 'center',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 16,
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        date: {
            fontSize: 18,
            color: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
            marginBottom: 8,
            textAlign: 'center',
        },
        venue: {
            fontSize: 16,
            color: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
            marginBottom: 12,
            textAlign: 'center',
        },
        description: {
            fontSize: 16,
            color: isDarkMode ? darkTheme.text : lightTheme.text,
            lineHeight: 24,
            textAlign: 'justify',
            marginBottom: 16,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
        },
        button: {
            backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
            padding: 12,
            borderRadius: 8,
            marginHorizontal: 8,
            flex: 1,
            alignItems: 'center',
        },
        registerButton: {
            backgroundColor: isDarkMode ? darkTheme.accent : lightTheme.accent,
        },
        buttonText: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{event.eventName}</Text>
            <Text style={styles.date}>{event.eventDate}</Text>
            <Text style={styles.venue}>Venue: {event.eventLocation}</Text>
            <Text style={styles.description}>{event.eventDescription}</Text>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Back to Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => {
                        addEvent({ ...event, eventId: new Date().getTime().toString() });
                        navigation.navigate('RegistrationSuccess', { event: event })
                    }}
                >
                    <Text style={styles.buttonText}>Register for Event</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};



export default EventDetail;
