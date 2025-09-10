import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
    <TextInput
        style={styles.input}
        placeholder="Search events..."
        onChangeText={onSearch}
    />
);

const styles = StyleSheet.create({
    input: {
        margin: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
});

export default SearchBar;
