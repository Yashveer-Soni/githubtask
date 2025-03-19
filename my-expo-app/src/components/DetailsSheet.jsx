import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFavorites } from '~/context/FavoriteContext';
import Feather from '@expo/vector-icons/Feather';

import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { formatDate } from '~/Helper/FormatTime';
const DetailsSheet = ({ repo, totalContributors, loadingContributors }) => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["50%"], []);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const isFavorite = favorites.some((favorite) => favorite.id === repo.id);

    const handlePresentModalPress = useCallback(() => {
        if (repo) {
            bottomSheetModalRef.current?.present();
        }
    }, [repo]);

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    React.useEffect(() => {
        if (repo) {
            handlePresentModalPress();
        }
    }, [repo]);

    if (!repo) return null;

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={styles.contentContainer}>
                {loadingContributors ? (
                    <ActivityIndicator color={'black'} />
                ) : (
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {repo.owner.avatar_url && (
                                <Image source={{ uri: repo.owner.avatar_url }} style={styles.ownerAvatar} />
                            )}
                            <Text style={[styles.repoStats, { fontWeight: 'bold', fontSize: 15 }]}>{repo.owner.login || 'N/A'}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 20, top: 0 }}
                            onPress={() => {
                                if (isFavorite) {
                                    removeFavorite(repo.id);
                                    ToastAndroid.show('Removed from Favorites', ToastAndroid.SHORT);
                                } else {
                                    addFavorite(repo, totalContributors);
                                    ToastAndroid.show('Added to Favorites', ToastAndroid.SHORT);
                                }
                            }}
                        >
                            {isFavorite ? (
                                <AntDesign name="heart" size={24} color="#E52020" />
                            ) : (
                                <AntDesign name="hearto" size={24} color="#E52020" />
                            )}

                        </TouchableOpacity>
                        <Text style={styles.repoName}>{repo.name || 'N/A'}</Text>
                        <View style={{ flexDirection: 'row', gap: 20,flexWrap:'wrap' }}>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <AntDesign name="staro" size={15} color="black" />
                                <Text style={styles.repoStats}>{repo.stargazers_count || 0} Stars</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <AntDesign name="fork" size={15} color="black" />
                                <Text style={styles.repoStats}>{repo.forks_count || 0} Forks</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Feather name="users" size={15} color="black" />
                                <Text style={styles.repoStats}>
                                    {totalContributors || repo.totalContributors || 0} Contributors
                                </Text>
                            </View>
                        </View>
                        {repo.language && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5,paddingTop:10 }}>
                                <Text style={[styles.repoStats, { fontWeight: 'bold' }]}>Language -</Text>
                                <Text style={[styles.repoStats]}>{repo.language}</Text>
                            </View>
                        )}
                        {repo.description && (
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                <Text style={styles.repoDescription}>{repo.description}</Text>
                            </View>
                        )}
                       
                        {repo.created_at && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={[styles.repoStats, { fontWeight: 'bold' }]}>Created at -</Text>
                                <Text style={styles.repoStats}>{formatDate(repo.created_at)}</Text>
                            </View>
                        )}
                        {repo.updated_at && (

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={[styles.repoStats, { fontWeight: 'bold' }]}>Updated at -</Text>
                                <Text style={styles.repoStats}>{formatDate(repo.updated_at)}</Text>
                            </View>
                        )}
                    </View>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    repoName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    repoName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    repoDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    repoStats: {
        fontSize: 12,
        color: '#333',
        textTransform: 'capitalize'
    },
    ownerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    favoriteText: {
        fontSize: 20,
        color: '#e74c3c',
        marginTop: 16,
        textAlign: 'center',
    },
});

export default DetailsSheet;
