import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/colors';
import { useStore } from '../zustand/store';

export interface Event {
    eventId: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventDescription: string;
}

const RegisteredEvents = () => {
    // const [registeredEvents, setRegisteredEvents] = useState<Array<Event>>([]);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { registeredEvents, removeEvent } = useStore();

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background },
        title: { color: isDarkMode ? darkTheme.text : lightTheme.text, fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
        eventCard: {
            backgroundColor: isDarkMode ? darkTheme.surface : lightTheme.surface,
            borderWidth: 1,
            borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
            shadowColor: isDarkMode ? darkTheme.text : lightTheme.text,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            padding: 16,
            marginBottom: 10,
            borderRadius: 8,
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
        },
        eventName: { fontSize: 18, color: isDarkMode ? darkTheme.text : lightTheme.text },
        deleteButton: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 6,width: '100%', alignItems: 'center', marginTop: 8 },
        deleteText: { color: '#fff', fontWeight: 'bold' },
        noEvents: { fontSize: 16, color: '#555', textAlign: 'center' },
    });


    // useEffect(() => {
    //     loadRegisteredEvents();
    // }, []);

    // const loadRegisteredEvents = async () => {
    //     const events = await getArray('registeredEvents');
    //     setRegisteredEvents(events);
    // };

    // const handleDelete = async (id: string) => {
    //     await removeFromArray('registeredEvents', id);
    //     loadRegisteredEvents();
    // };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Registered Events</Text> */}
            {registeredEvents.length > 0 ? (
                <FlatList
                    data={registeredEvents}
                    keyExtractor={(item) => item.eventId}
                    renderItem={({ item }) => (
                        <View style={styles.eventCard}>
                            <Text style={styles.eventName}>{item.eventName}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => removeEvent(item.eventId)}
                            >
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noEvents}>No registered events found.</Text>
            )}
        </View>
    );
};


export default RegisteredEvents;
