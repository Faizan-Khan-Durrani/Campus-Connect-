import AsyncStorage from '@react-native-async-storage/async-storage';

// Save an array to storage
export const saveArray = async (key: string, array: any[]) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(array));
    } catch (error) {
        console.error('Error saving array:', error);
    }
};

// Get an array from storage
export const getArray = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : [];
    } catch (error) {
        console.error('Error getting array:', error);
        return [];
    }
};

// Remove an item from an array
export const removeFromArray = async (key: string, id: string) => {
    try {
        const array = await getArray(key);
        const updatedArray = array.filter((item: any) => item.id !== id);
        await saveArray(key, updatedArray);
    } catch (error) {
        console.error('Error removing item:', error);
    }
};

// Update an item in an array
export const updateArrayItem = async (key: string, id: string, newItem: any) => {
    try {
        const array = await getArray(key);
        const updatedArray = array.map((item: any) =>
            item.id === id ? { ...item, ...newItem } : item
        );
        await saveArray(key, updatedArray);
    } catch (error) {
        console.error('Error updating item:', error);
    }
};
