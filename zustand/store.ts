import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Feedback } from "../screens/FeedbackManagement";
import { Event } from "../screens/RegisteredEvents";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Store {
    events: Array<Event>;
    registeredEvents: Array<Event>;
    feedback: Array<Feedback>;
    addNewEvent: (event: Event) => void;
    addEvent: (event: Event) => void;
    addFeedback: (feedback: Feedback) => void;
    removeEvent: (id: string) => void;
    removeFeedback: (id: string) => void;
    removeNewEvent: (id: string) => void;
}

export const useStore = create<Store>()(persist(devtools((set) => (
    {
        events: [],
        registeredEvents: [],
        feedback: [],
        addNewEvent: (event) => set((state) => ({ events: [...state.events, event] })),
        addEvent: (event) => set((state) => ({ registeredEvents: [...state.registeredEvents, event] })),
        addFeedback: (feedback) => set((state) => ({ feedback: [...state.feedback, feedback] })),
        removeEvent: (id) => set((state) => ({ registeredEvents: state.registeredEvents.filter((e) => e.eventId !== id) })),
        removeFeedback: (id) => set((state) => ({ feedback: state.feedback.filter((f) => f.id !== id) })),
        removeNewEvent: (id: string) => set((state) => ({ events: state.events.filter((e) => e.eventId !== id) })),
    })),
    {
        name: "event-app-store",
        storage: {
            getItem: async (name) => {
                const value = await AsyncStorage.getItem(name);
                return value ? JSON.parse(value) : null;
            },
            setItem: async (name, value) => {
                await AsyncStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: async (name) => {
                await AsyncStorage.removeItem(name);
            },
        },
    }
));