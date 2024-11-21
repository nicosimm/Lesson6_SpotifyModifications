import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { songData } from './Data';

const Add = ({ navigation }) => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [songType, setSongType] = useState('Pop Hits'); // Default section

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Song</Text>
            <Text style={styles.label}>Song Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter song name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Artist Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter artist name"
                value={artist}
                onChangeText={(text) => setArtist(text)}
            />

            <Text style={styles.label}>Section:</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setSongType(value)}
                    items={[
                        { label: 'Pop Hits', value: 'Pop Hits' },
                        { label: 'Trending Now', value: 'Trending Now' },
                    ]}
                    value={songType}
                />
            </View>
            <Button
                title="Add Song"
                onPress={() => {
                    if (!name || !artist) {
                        Alert.alert('Error', 'Please fill out all fields.');
                        return;
                    }

                    // Find the correct section index
                    let indexnum = 0;
                    if (songType === 'Trending Now') {
                        indexnum = 1;
                    }

                    // Add the song to the correct section
                    songData[indexnum].data.push({
                        key: `${name} - ${artist}`, // Create a unique key
                        name: name,
                        artist: artist,
                        section: songType,
                    });

                    // Navigate back to Home
                    navigation.navigate('Home');
                }}
                color="#1DB954"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#FFF',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
});

export default Add;
