import React, { useState } from 'react';
import { StatusBar, SectionList, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { songData } from './Data';

const Home = ({ navigation }) => {
    const [sections, setSections] = useState(songData);

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => navigation.navigate('Edit', { song: item })}
        >
            <View style={styles.itemContent}>
                {item.coverImage && (
                    <Image source={item.coverImage} style={styles.coverImage} />
                )}
                <View style={styles.textContent}>
                    <Text style={styles.songName}>{item.name}</Text>
                    <Text style={styles.artistName}>{item.artist}</Text>
                </View>
                <Icon name="heart" size={20} color="#B3B3B3" style={styles.sectionIcon} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Spotify Header */}
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>Spotify</Text>
            </View>

            {/* Song List */}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, color, icon_name } }) => (
                    <View style={[styles.sectionHeader, { backgroundColor: color }]}>
                        <Icon name={icon_name} size={24} color="#FFF" style={styles.sectionIcon} />
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
            />

            {/* Add Song Button at the bottom */}
            <View style={styles.footer}>
                <Button
                    title="Add Song"
                    onPress={() => navigation.navigate('Add')}
                    color="#1DB954"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 20,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#1DB954',
        borderBottomWidth: 2,
        borderBottomColor: '#0B6A3E',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    opacityStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#1DB954',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#282828',
    },
    textStyle: {
        color: 'lightgrey',
        fontSize: 16,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    coverImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    textContent: {
        flex: 1,
    },
    sectionIcon: {
        marginRight: 10,
    },

    songName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    artistName: {
        fontSize: 14,
        color: '#B3B3B3',
    },
});

export default Home;
