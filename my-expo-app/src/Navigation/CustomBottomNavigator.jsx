import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomBottomNavigator = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const navigation = useNavigation();

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        navigation.navigate(tab);
    };

    return (
        <View style={{ paddingHorizontal: 20, paddingBottom: 10, position: 'absolute', flex: 1, width: '100%', bottom: 0 }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        {
                            backgroundColor: activeTab === 'Home' ? '#F7F7F7' : 'transparent',
                            borderRadius: 50,
                        }
                    ]}
                    onPress={() => handleTabPress('Home')}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'Home' ? 'black' : 'white' }]}>Home</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        {
                            backgroundColor: activeTab === 'Favorites' ? '#F7F7F7' : 'transparent',
                            borderRadius: 50
                        }
                    ]}
                    onPress={() => handleTabPress('Favorites')}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'Favorites' ? 'black' : 'white' }]}>Favorites</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 5
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontSize: 16,
        color: 'black',
        fontWeight:'500'
    },
});

export default CustomBottomNavigator;
