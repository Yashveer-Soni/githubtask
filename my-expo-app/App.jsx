import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import FavoritesScreen from '~/screens/FavoritesScreen';
import { Text } from 'react-native';
import { FavoriteProvider } from '~/context/FavoriteContext';
import CustomBottomNavigator from '~/Navigation/CustomBottomNavigator';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <FavoriteProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen options={{
                  headerShown: false,
                  animationTypeForReplace: 'push',
                  animation: 'slide_from_left'
                }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{
                  headerShown: false,
                  animationTypeForReplace: 'push',
                  animation: 'slide_from_right'
                }} name="Favorites" component={FavoritesScreen} />
              </Stack.Navigator>
              <CustomBottomNavigator />
            </NavigationContainer>
          </FavoriteProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
