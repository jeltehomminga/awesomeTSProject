/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from 'color';

interface ColorBoxProps {
  colorName: string;
  hexColor: string;
}

const ColorBox = ({ colorName, hexColor }: ColorBoxProps) => {
  return (
    <View style={[styles.colorBlock, { backgroundColor: hexColor }]}>
      <Text style={{ color: Color(hexColor).isDark() ? '#fff' : '#000' }}>
        {colorName.toUpperCase()} {hexColor}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cyan: { backgroundColor: '#2aa198' },
  blue: { backgroundColor: '#268bd2' },
  magenta: { backgroundColor: '#d33682' },
  orange: { backgroundColor: '#cb4b16' },
  colorBlock: {
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 12,
  },
  text: {
    color: 'white',
  },
});

export default ColorBox;
