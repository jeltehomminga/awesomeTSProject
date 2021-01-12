/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FlatList } from 'react-native';

export type Colors = {
  colorName: string;
  hexCode: string;
}[];

type ColorTouchableProps = {
  colorItem: { key: string; colors: Colors };
  headerName: string;
};

const rainbowColors = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const femColors = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const moreColors = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const allColors = [
  { key: 'rainbowColors', colors: rainbowColors },
  { key: 'femColors', colors: femColors },
  { key: 'moreColors', colors: moreColors },
];

const ColorTouchable = ({ colorItem, headerName }: ColorTouchableProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ColorPalette', { item: colorItem })}>
      <FlatList
        data={colorItem.colors}
        horizontal
        keyExtractor={({ colorName }) => colorName}
        ListHeaderComponent={<Text>{headerName}</Text>}
        renderItem={({ item, index }) =>
          index < 5 ? (
            <View
              style={{
                backgroundColor: item.hexCode,
                margin: 10,
                padding: 10,
              }}>
              <Text>{item.colorName}</Text>
            </View>
          ) : null
        }
      />
    </TouchableOpacity>
  );
};

const Home = () => {
  return (
    <>
      <FlatList
        data={allColors}
        renderItem={({ item }) => (
          <ColorTouchable colorItem={item} headerName={item.key} />
        )}
      />
    </>
  );
};

export default Home;
