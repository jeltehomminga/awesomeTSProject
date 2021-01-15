/* eslint-disable react-native/no-inline-styles */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainStackParamList, RootStackParamList } from '../App';

export type Colors = {
  colorName: string;
  hexCode: string;
}[];

type ColorItem = { paletteName: string; colors: Colors };

type ColorTouchableProps = {
  colorItem: ColorItem;
  headerName: string;
  navigation: StackNavigationProp<
    MainStackParamList & RootStackParamList,
    'Home'
  >;
};

const ColorTouchable = ({
  colorItem,
  headerName,
  navigation,
}: ColorTouchableProps) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ColorPalette', { item: colorItem })}>
      <Text>{headerName}</Text>
      <FlatList
        data={colorItem.colors}
        horizontal
        keyExtractor={({ colorName }) => colorName}
        renderItem={({ item, index }) =>
          index < 5 ? (
            <View
              style={{
                backgroundColor: item.hexCode,
                marginRight: 20,
                marginVertical: 10,
                padding: 20,
              }}
            />
          ) : null
        }
      />
    </TouchableOpacity>
  );
};

type HomeProps = {
  navigation: StackNavigationProp<
    MainStackParamList & RootStackParamList,
    'Home'
  >;
  route: RouteProp<MainStackParamList, 'Home'>;
};

const Home = ({ navigation, route }: HomeProps) => {
  const [palettes, setPalettes] = useState<ColorItem[]>([]);

  useEffect(() => {
    const getColors = async () => {
      const result = await (
        await fetch('https://color-palette-api.kadikraman.now.sh/palettes')
      ).json();
      if (result) {
        setPalettes(result);
      }
    };
    getColors();
  }, []);

  const completePalettes = route?.params
    ? [...palettes, route.params]
    : palettes;

  return (
    <>
      <FlatList
        data={completePalettes}
        keyExtractor={({ paletteName }) => paletteName}
        renderItem={({ item }) => (
          <ColorTouchable
            colorItem={item}
            headerName={item.paletteName}
            navigation={navigation}
          />
        )}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddNewPaletteModal')}>
            <Text style={styles.modal}>Add a color scheme</Text>
          </TouchableOpacity>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
    marginVertical: 24,
  },
});

export default Home;
