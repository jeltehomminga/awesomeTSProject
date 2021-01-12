import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import ColorPalette from './screens/ColorPalette';
import Home, { Colors } from './screens/Home';

export type RootStackParamList = {
  Home: undefined;
  ColorPalette: { key: string; colors: Colors };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }) => ({ title: route.params.key })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
