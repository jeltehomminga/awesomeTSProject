import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ColorBox from '../components/ColorBox';
import { useRoute } from '@react-navigation/native';
import { Colors } from './Home';

const ColorPalette = () => {
  const { params }: { params?: { item?: { colors: Colors } } } = useRoute();
  return (
    <View style={[styles.container]}>
      <Text style={styles.header}>
        Here are some of the boxes of different colors
      </Text>
      <FlatList
        data={params?.item?.colors || []}
        renderItem={({ item }) => {
          return (
            <ColorBox
              colorName={item.colorName}
              hexColor={item.hexCode}
              key={item.colorName}
            />
          );
        }}
        keyExtractor={({ colorName }) => colorName}
        ListHeaderComponent={() => <Text>Solarized colors</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pink: { backgroundColor: 'pink' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorBlock: {
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 12,
  },
  text: {
    color: 'white',
  },
  safeArea: { flex: 1 },
});

export default ColorPalette;
