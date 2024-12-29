import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const discoverProfiles = [
    {
        id: '1',
        name: 'Mathias',
        age: 19,
        location: 'BERLIN',
        image: require('../assets/square-avatar.png'),
        isNew: true,
        latitude: 52.520008,
        longitude: 13.404954,
    },
    {
        id: '2',
        name: 'Vanessa',
        age: 18,
        location: 'MUNICH',
        image: require('../assets/square-avatar.png'),
        isNew: true,
        latitude: 48.1351,
        longitude: 11.582,
    },
    {
        id: '3',
        name: 'James',
        age: 20,
        location: 'HANOVER',
        image: require('../assets/square-avatar.png'),
        isNew: true,
        latitude: 52.3705,
        longitude: 9.7332,
    }
];

const interests = [
    { id: '1', name: 'Football', icon: '⚽' },
    { id: '2', name: 'Nature', icon: '🌿' },
    { id: '3', name: 'Language', icon: '🗣' },
    { id: '4', name: 'Photography', icon: '📸' },
    { id: '5', name: 'Music', icon: '🎵' },
    { id: '6', name: 'Writing', icon: '✍️' },
];

export default function ExploreScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.location}>Germany</Text>
                        <Text style={styles.title}>Discover</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="search-outline" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="filter-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Discover Profiles */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.profilesContainer}
                >
                    {discoverProfiles.map(profile => (
                        <TouchableOpacity key={profile.id} style={styles.profileCard}>
                            <Image source={profile.image} style={styles.profileImage} />
                            {profile.isNew && (
                                <View style={styles.newBadge}>
                                    <Text style={styles.newBadgeText}>NEW</Text>
                                </View>
                            )}
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
                                <Text style={styles.profileLocation}>{profile.location}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Interests Section */}
                <View style={styles.interestsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Interest</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.interestsGrid}>
                        {interests.map(interest => (
                            <TouchableOpacity key={interest.id} style={styles.interestItem}>
                                <Text style={styles.interestIcon}>{interest.icon}</Text>
                                <Text style={styles.interestName}>{interest.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            {/* Map View with People */}
            <View style={styles.mapSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>People Nearby</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mapContainer}>
                    {Platform.OS === 'ios' ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 51.1657,
                                longitude: 10.4515,
                                latitudeDelta: 5,
                                longitudeDelta: 5,
                            }}
                        >
                            {discoverProfiles.map(profile => (
                                <Marker
                                    key={profile.id}
                                    coordinate={{
                                        latitude: profile.latitude,
                                        longitude: profile.longitude,
                                    }}
                                    title={profile.name}
                                >
                                    <Image 
                                        source={profile.image} 
                                        style={styles.markerImage}
                                    />
                                </Marker>
                            ))}
                        </MapView>
                    ) : (
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: 51.1657,
                                longitude: 10.4515,
                                latitudeDelta: 5,
                                longitudeDelta: 5,
                            }}
                        >
                            {discoverProfiles.map(profile => (
                                <Marker
                                    key={profile.id}
                                    coordinate={{
                                        latitude: profile.latitude,
                                        longitude: profile.longitude,
                                    }}
                                    title={profile.name}
                                >
                                    <Image 
                                        source={profile.image} 
                                        style={styles.markerImage}
                                    />
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 16,
    },
    headerRight: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 16,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 12,
    },
    location: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 4,
        color: '#1a1a1a',
    },
    profilesContainer: {
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    profileCard: {
        width: 220,
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: 280,
        resizeMode: 'cover',
    },
    newBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    newBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    profileInfo: {
        padding: 16,
        backgroundColor: '#fff',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    profileLocation: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        fontWeight: '500',
    },
    interestsSection: {
        padding: 16,
        paddingTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    viewAll: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    interestItem: {
        width: '33.33%',
        padding: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    interestIcon: {
        fontSize: 32,
        marginBottom: 8,
        backgroundColor: '#f5f5f5',
        width: 60,
        height: 60,
        borderRadius: 30,
        textAlign: 'center',
        lineHeight: 58,
    },
    interestName: {
        fontSize: 14,
        textAlign: 'center',
        color: '#1a1a1a',
        fontWeight: '500',
    },
    mapSection: {
        marginTop: 16,
        marginBottom: 24,
    },
    mapContainer: {
        height: 300,
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
