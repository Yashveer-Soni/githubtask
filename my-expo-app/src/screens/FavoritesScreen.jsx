import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '~/context/FavoriteContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DetailsSheet from '~/components/DetailsSheet';
import Topheader from '~/Navigation/Topheader';
const FavoritesScreen = ({ navigation }) => {
    const { favorites, removeFavorite } = useFavorites();
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const openDetailsSheet = (repo) => {
        setSelectedRepo(null);
        setTimeout(() => {
            setSelectedRepo(repo);
            setIsSheetVisible(true);
        }, 100);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Topheader />
                {favorites.length === 0 ? (
                    <Text style={styles.noFavoritesText}>No favorite repositories yet.</Text>
                ) : (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.repoItem}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => openDetailsSheet(item)} >
                                    <Text style={styles.repoName}>{item.name?.split('').slice(0, 40).join('')}{item.name?.split('').length > 40 ? '...' : ''}</Text>
                                    <Text style={styles.repoDescription}>{item.description?.split('').slice(0, 50).join('')}{item.description?.split('').length > 50 ? '...' : ''}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    removeFavorite(item.id); ToastAndroid.show('Removed from Favorites', ToastAndroid.SHORT);
                                }}>
                                    <MaterialIcons name="delete-forever" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}

                {selectedRepo && isSheetVisible && (
                    <DetailsSheet
                        key={selectedRepo.id}
                        repo={selectedRepo}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    noFavoritesText: {
        textAlign: 'center',
        color: '#555',
    },
    repoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flex: 1
    },
    repoName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    repoDescription: {
        color: '#555',
    },
    removeFavoriteText: {
        color: '#e74c3c',
        fontSize: 18,
    },
});

export default FavoritesScreen;
