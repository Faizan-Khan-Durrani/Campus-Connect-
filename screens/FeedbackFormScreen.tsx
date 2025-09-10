import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getArray, saveArray } from '../services/storage';
import { darkTheme, lightTheme } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../zustand/store';

const FeedbackFormScreen = ({ route, navigation }: { route: any; navigation: any }) => {
    const { event } = route.params;
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const { theme } = useTheme();
    const { addFeedback } = useStore();
    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        label: {
            fontSize: 16,
            marginBottom: 8,
            color: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
        },
        input: {
            borderWidth: 1,
            borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            backgroundColor: isDarkMode ? darkTheme.surface : lightTheme.surface,
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        textArea: {
            height: 100,
            textAlignVertical: 'top',
        },
        button: {
            backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: lightTheme.surface,
            fontWeight: 'bold',
            fontSize: 16,
        },
    });

    const handleSubmit = async () => {
        if (!rating || parseInt(rating) < 1 || parseInt(rating) > 5) {
            alert('Please enter a rating between 1 and 5.');
            return;
        }

        const feedback = {
            id: new Date().getTime().toString(), // Unique ID
            eventName: event.name,
            rating,
            comments,
        };
        
        addFeedback(feedback);

        const existingFeedback = await getArray('feedback');
        const updatedFeedback = [...existingFeedback, feedback];
        await saveArray('feedback', updatedFeedback);

        alert(`Thank you for your feedback on "${event.eventName}"!`);
        navigation.navigate('Dashboard'); // Ensure it redirects to the correct screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback for "{event.eventName}"</Text>
            <Text style={styles.label}>Rate the Event (1-5):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
                placeholder="Enter rating"
                placeholderTextColor={isDarkMode ? darkTheme.secondary : lightTheme.secondary}
            />
            <Text style={styles.label}>Comments:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                value={comments}
                onChangeText={setComments}
                placeholder="Enter your comments"
                placeholderTextColor={isDarkMode ? darkTheme.secondary : lightTheme.secondary}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeedbackFormScreen;
