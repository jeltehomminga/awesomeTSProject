/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

export type Colors = {
  colorName: string;
  hexCode: string;
}[];

type ColorTouchableProps = {
  colorItem: { paletteName: string; colors: Colors };
  headerName: string;
};

const ColorTouchable = ({ colorItem, headerName }: ColorTouchableProps) => {
  const navigation = useNavigation();

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

const Home = () => {
  const navigation = useNavigation();
  const route: {
    params: {
      paletteName: string;
      colors: Colors;
    }[];
  } = useRoute();

  const [palettes, setPalettes] = useState<
    {
      paletteName: string;
      colors: Colors;
    }[]
  >([]);

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

  const completePalettes: {
    paletteName: string;
    colors: Colors;
  }[] = route?.params ? [...palettes, route.params] : palettes;

  return (
    <>
      <FlatList
        data={completePalettes}
        keyExtractor={({ paletteName }) => paletteName}
        renderItem={({ item }) => (
          <ColorTouchable colorItem={item} headerName={item.paletteName} />
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
