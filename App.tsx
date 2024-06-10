import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Room from './src/Room';
import Home from './src/Home';

/**
 * Take Room Code from Dashbaord for this sample app.
 * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/get-started/token#get-room-code-from-100ms-dashboard | Room Code}
 */
const ROOM_CODE = 'olz-udar-rty'; // PASTE ROOM CODE FROM DASHBOARD HERE

/**
 * using `ROOM_CODE` is recommended over `AUTH_TOKEN` approach
 *
 * Take Auth Token from Dashbaord for this sample app.
 * For more info, Check out {@link https://www.100ms.live/docs/react-native/v2/foundation/security-and-tokens | Token Concept}
 */


const Stack = createNativeStackNavigator();

//#region Screens
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;