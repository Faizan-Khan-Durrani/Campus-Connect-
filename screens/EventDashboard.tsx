import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button,Image, TouchableOpacity, Text } from 'react-native';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
// import { fetchEvents } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/colors';
import { useStore } from '../zustand/store';
import { Event } from './RegisteredEvents';

// interface Event {
//     id: string;
//     name: string;
//     date: string;
//     location: string;
// }

const EventDashboard = ({ navigation }: { navigation: any }) => {
    // const [events, setEvents] = useState<Array<Event>>([]);
    const [filteredEvents, setFilteredEvents] = useState<Array<Event>>([]);
    const [query, setQuery] = useState('');
    const { theme, toggleTheme } = useTheme()
    const { events } = useStore()

    const isDarkMode = theme === 'dark';
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background, paddingTop: 10 },
        button: {
            backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            margin: 10,
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });


    // useEffect(() => {
    //     fetchEvents().then(data => {
    //         setEvents(data);
    //         setFilteredEvents(data);
    //     });
    // }, []);

    useEffect(() => {
        setFilteredEvents(
            events.filter(event =>
                event.eventName.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query]);

    const handleViewDetails = (event: Event) => {
        navigation.navigate('EventDetail', { event });
    };

    const handleCreateEvent = () => {
        navigation.navigate('EventRegistration');
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/SlideImage.png")} style={{width: "100%",height:200}}></Image>
            <SearchBar onSearch={setQuery} />
            <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Create New Event</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredEvents}
                keyExtractor={item => item.eventId}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        onRegister={() => handleViewDetails(item)}
                    />
                )}
            />
        </View>
    );
};


export default EventDashboard;
