import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FeedbackForm = ({ onSubmit }: { onSubmit: (feedback: any) => void }) => {
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Event Rating (1–5):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />
            <Text style={styles.label}>Comments:</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                value={comments}
                onChangeText={setComments}
            />
            <Button title="Submit Feedback" onPress={() => onSubmit({ rating, comments })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    label: { fontSize: 16, marginVertical: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginBottom: 12,
    },
});

export default FeedbackForm;
