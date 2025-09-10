import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useStore } from '../zustand/store';
import { darkTheme, lightTheme } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';

const EventRegistrationForm = ({ navigation }: { navigation: any }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const { theme } = useTheme()
    const isDarkMode = theme === 'dark';

    const { addNewEvent } = useStore()

    const handleSubmit = () => {
        // Handle event registration logic here
        addNewEvent({
            eventId: new Date().toString(),
            eventName,
            eventDate,
            eventLocation,
            eventDescription,
        });

        navigation.navigate('Dashboard')
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        input: {
            height: 40,
            borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 8,
            color: isDarkMode ? darkTheme.text : lightTheme.text,
            backgroundColor: isDarkMode ? darkTheme.surface : lightTheme.surface,
            borderRadius: 8,
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                placeholderTextColor={darkTheme.secondary}
                value={eventName}
                onChangeText={setEventName}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Date"
                placeholderTextColor={darkTheme.secondary}
                value={eventDate}
                onChangeText={setEventDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Location"
                placeholderTextColor={darkTheme.secondary}
                value={eventLocation}
                onChangeText={setEventLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Description"
                placeholderTextColor={darkTheme.secondary}
                value={eventDescription}
                onChangeText={setEventDescription}
            />
            <Button
                title="Create Event"
                onPress={handleSubmit}
                color={darkTheme.primary}
            />
        </View>
    );
};

export default EventRegistrationForm;