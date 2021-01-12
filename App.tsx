import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import ColorPalette from './screens/ColorPalette';
import ColorPaletteModal from './screens/ColorPaletteModal';
import Home, { Colors } from './screens/Home';

export type MainStackParamList = {
  Home: undefined;
  ColorPalette: { key: string; colors: Colors };
};

export type RootStackParamList = {
  Main: undefined;
  ColorPaletteModal: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.key })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ColorPaletteModal"
          component={ColorPaletteModal}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
