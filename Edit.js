import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { songData } from './Data';

const Edit = ({ route, navigation }) => {
    const { song } = route.params || {};
    const [name, setName] = useState(song?.name || '');
    const [artist, setArtist] = useState(song?.artist || '');
    const [songType, setSongType] = useState(song?.section || 'Pop Hits');
    const [coverImage, setCoverImage] = useState(song?.coverImage || null);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Song</Text>

            {coverImage && (
                <Image
                    source={coverImage}
                    style={styles.coverImage}
                    resizeMode="contain"
                />
            )}

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

            <Text style={styles.label}>Song Type:</Text>
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
            <View style={styles.buttonContainer}>
                <Button
                    title="Save Changes"
                    onPress={() => {
                        songData.forEach((section) => {
                            const songIndex = section.data.findIndex((item) => item.key === song.key);
                            if (songIndex !== -1) {
                                section.data.splice(songIndex, 1);
                            }
                        });

                        let indexnum = songType === 'Trending Now' ? 1 : 0;

                        songData[indexnum].data.push({
                            key: `${name} - ${artist}`,
                            name,
                            artist,
                            section: songType,
                            coverImage,
                        });

                        navigation.navigate('Home');
                    }}
                    color="#1DB954"
                />

                <Button
                    title="Delete Song"
                    onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'This song will be deleted permanently.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    onPress: () => {
                                        // Remove the song from its current section
                                        songData.forEach((section) => {
                                            const songIndex = section.data.findIndex((item) => item.key === song.key);
                                            if (songIndex !== -1) {
                                                section.data.splice(songIndex, 1);
                                            }
                                        });

                                        // Navigate back to Home after deletion
                                        navigation.navigate('Home');
                                    },
                                },
                            ],
                        );
                    }}
                    color="#FF4136"
                />
            </View>
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
    coverImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 370
    },

});

export default Edit;
