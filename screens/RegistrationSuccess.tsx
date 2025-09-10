import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/colors';

const RegistrationSuccess = ({ route, navigation }: { route: any; navigation: any }) => {
    const { event } = route.params;
    const { theme } = useTheme();

    const isDarkMode = theme === 'dark'

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
        },
        successMessage: {
            fontSize: 34,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 16,
            color: '#28a745',
        },
        info: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 24,
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        button: {
            backgroundColor: '#1d304dff',
            padding: 12,
            borderRadius: 8,
            width: '80%',
            alignItems: 'center',
            marginVertical: 10,
        },
        feedbackButton: {
            backgroundColor: '#178fffff',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.successMessage}> You are registered for "{event.eventName}"!</Text>
            <Text style={styles.info}>
                We appreciate your registration. Have a great time at the event and remember to share your thoughts with us.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.feedbackButton]}
                onPress={() => navigation.navigate('FeedbackForm', { event })}
            >
                <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    successMessage: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#28a745',
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#555',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    feedbackButton: {
        backgroundColor: '#ffc107',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RegistrationSuccess;
