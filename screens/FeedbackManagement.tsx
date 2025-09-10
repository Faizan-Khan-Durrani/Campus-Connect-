import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getArray, saveArray } from '../services/storage';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/colors';
import { useStore } from '../zustand/store';

export interface Feedback {
    id: string;
    eventName: string;
    rating: string;
    comments: string;
}

const FeedbackManagement = () => {
    const [feedbackList, setFeedbackList] = useState<Array<Feedback>>([]);
    const { theme } = useTheme();
    const { feedback, removeFeedback } = useStore();

    const isDarkMode = theme === 'dark';

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background },
        title: { color: isDarkMode ? darkTheme.text : lightTheme.text, fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
        feedbackCard: {
            backgroundColor: isDarkMode ? darkTheme.surface : lightTheme.surface,
            borderWidth: 1,
            borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
            shadowColor: isDarkMode ? darkTheme.text : lightTheme.text,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            padding: 16,
            marginBottom: 10,
            borderRadius: 8,
        },
        feedbackText: { fontSize: 16, color: isDarkMode ? darkTheme.text : lightTheme.text, marginBottom: 4 },
        deleteButton: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 6 },
        deleteText: { color: '#fff', fontWeight: 'bold' },
        noFeedback: { fontSize: 16, color: '#555', textAlign: 'center' },
    });

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = async () => {
        const feedback = await getArray('feedback');
        setFeedbackList(feedback);
    };

    const handleDelete = async (id: string) => {
        const updatedFeedback = feedbackList.filter(item => item.id !== id);
        await saveArray('feedback', updatedFeedback);
        setFeedbackList(updatedFeedback);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Feedback Management</Text> */}
            {feedback.length > 0 ? (
                <FlatList
                    data={feedback}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.feedbackCard}>
                            <Text style={styles.feedbackText}>Event: {item.eventName}  </Text>
                            <Text style={styles.feedbackText}>Rating: {item.rating}</Text>
                            <Text style={styles.feedbackText}>Comments: {item.comments}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeFeedback(item.id)}
                            >
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        
                    )}
                />
            ) : (
                <Text style={styles.noFeedback}>No feedback submitted yet.</Text>
            )}
        </View>
    );
};


export default FeedbackManagement;
