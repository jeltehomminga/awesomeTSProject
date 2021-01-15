/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { FlatList, Switch, TextInput } from 'react-native-gesture-handler';
import colors from '../data/colors';

type Color = {
  colorName: string;
  hexCode: string;
};
type PaletteListItemProps = {
  item: Color;
  setSelectedColors: (what: any) => void;
  isAdded: boolean;
};

const PaletteListItem = ({
  item,
  setSelectedColors,
  isAdded,
}: PaletteListItemProps) => {
  return (
    <View style={styles.listItem}>
      <Text>{item.colorName}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isAdded ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(isNewAdded) =>
          setSelectedColors((currentColors: Color[]) =>
            isNewAdded
              ? [...currentColors, item]
              : [
                  ...currentColors.filter(
                    (c) => c.colorName !== item.colorName,
                  ),
                ],
          )
        }
        value={isAdded}
      />
    </View>
  );
};

const AddNewPaletteModal = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');
  const [selectedColors, setSelectedColors] = useState<Array<Color>>([]);

  const handleSubmit = () => {
    if (!value) {
      Alert.alert('no Name!');
    } else {
      navigation.navigate('Home', {
        paletteName: value,
        colors: selectedColors,
      });
    }
  };

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text style={styles.modal}>Add color palette</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setValue}
        value={value}
        placeholder="Add palette name"
      />

      <FlatList
        data={colors}
        extraData={selectedColors}
        keyExtractor={({ colorName }) => colorName}
        renderItem={({ item }) => (
          <PaletteListItem
            item={item}
            setSelectedColors={setSelectedColors}
            isAdded={
              !!selectedColors.find(
                (color) => color.colorName === item.colorName,
              )
            }
          />
        )}
      />
      <Button color="teal" onPress={handleSubmit} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'teal',
  },
  listItem: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButton: {
    height: 40,
    color: 'white',
    backgroundColor: 'teal',
    borderRadius: 5,
  },
});

export default AddNewPaletteModal;
