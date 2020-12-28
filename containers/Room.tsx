import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {HOST} from '@env';

import Button from '../components/Button';
import {colors} from '../colors';

type target = 'living_room' | 'bed_room';
type setting = 'state' | 'brightness' | 'color_temp';

interface Props {
  title: string;
  group: target;
  color?: string;
}

const Room: React.FunctionComponent<Props> = ({title, group, color}) => {
  const [colorTemp, setColorTemp] = React.useState<number>();
  const [brightness, setBrightness] = React.useState<number>();

  function onLightSet(setting: setting, value: number | string) {
    try {
      fetch(
        `${HOST}/setLights?target=${group}&setting=${setting}&value=${value}`,
        {
          method: 'POST',
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onColorTempChange(value: string) {
    const number = parseInt(value, 10);
    if (number && number >= 150 && number <= 500) {
      setColorTemp(number);
    }
  }

  function onBrigtnessChange(value: string) {
    const number = parseInt(value, 10);
    if (number && number >= 0 && number <= 254) {
      setBrightness(number);
    }
  }

  return (
    <>
      <View style={{...styles.container, backgroundColor: color}}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>State</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="ON"
              onPress={() => onLightSet('state', 'ON')}
              style={styles.firstButton}
            />
            <Button title="OFF" onPress={() => onLightSet('state', 'OFF')} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Color temp</Text>
          <Text style={styles.subLabel}>150 - 500</Text>
          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.numberInput}
              onChangeText={(value) => onColorTempChange(value)}
              keyboardType="number-pad"
            />
            <Button
              title="SET"
              onPress={() => {
                if (colorTemp) {
                  onLightSet('color_temp', colorTemp);
                }
              }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Brightness</Text>
          <Text style={styles.subLabel}>0 - 254</Text>
          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.numberInput}
              onChangeText={(value) => onBrigtnessChange(value)}
              keyboardType="number-pad"
            />
            <Button
              title="SET"
              onPress={() => {
                if (brightness) {
                  onLightSet('brightness', brightness);
                }
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: colors.charlie,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.golf,
  },
  label: {
    fontSize: 16,
    color: colors.golf,
    textAlignVertical: 'center',
  },
  subLabel: {
    fontSize: 10,
    color: colors.foxtrot,
  },
  firstButton: {marginRight: 10},
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  numberInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.foxtrot,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
    marginRight: 10,
  },
});

export default Room;
