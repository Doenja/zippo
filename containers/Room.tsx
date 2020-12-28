import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';

import {API_HOST} from '@env';
import Button from '../components/Button';
import {colors} from '../colors';

type target = 'living_room' | 'bed_room';
type setting = 'state' | 'brightness' | 'color_temp';

interface Props {
  title: string;
  group: target;
  color?: string;
}

const {height} = Dimensions.get('window');

const Room: React.FunctionComponent<Props> = ({title, group, color}) => {
  const [isOn, setIsOn] = React.useState(true);
  const [colorTemp, setColorTemp] = React.useState<number>();
  const [brightness, setBrightness] = React.useState<number>();

  function onLightSet(setting: setting, value: number | string) {
    const url = `${API_HOST}/setLights`;
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: group,
          setting: setting,
          value: value,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    onLightSet('state', isOn ? 'ON' : 'OFF');
  }, [isOn]);

  React.useEffect(() => {
    if (typeof colorTemp === 'number') {
      onLightSet('color_temp', colorTemp);
    }
  }, [colorTemp]);

  React.useEffect(() => {
    if (typeof brightness === 'number') {
      onLightSet('brightness', brightness);
    }
  }, [brightness]);

  function onColorTempChange(value: number) {
    const number = Math.round(value);
    if (number && number >= 150 && number <= 500) {
      setColorTemp(number);
    }
  }

  function onBrigtnessChange(value: number) {
    const number = Math.round(value);
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
          <Switch
            trackColor={{false: colors.lightCharlie, true: colors.lightCharlie}}
            thumbColor={isOn ? colors.hotCharlie : colors.darkAlpha}
            ios_backgroundColor={colors.darkAlpha}
            onValueChange={() => {
              setIsOn((x) => !x);
            }}
            value={isOn}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Color temp</Text>
          <Slider
            style={styles.slider}
            minimumValue={150}
            maximumValue={500}
            thumbTintColor={colors.hotCharlie}
            maximumTrackTintColor={'dogerblue'}
            minimumTrackTintColor={colors.hotCharlie}
            onSlidingComplete={(value) => onColorTempChange(value)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Brightness</Text>
          <Slider
            style={styles.slider}
            minimumValue={150}
            maximumValue={500}
            thumbTintColor={'#fff'}
            maximumTrackTintColor={colors.darkBeta}
            minimumTrackTintColor={'#fff'}
            onSlidingComplete={(value) => onBrigtnessChange(value)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.darkBeta,
    minHeight: height,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.lightAlpha,
  },
  label: {
    fontSize: 16,
    color: colors.lightAlpha,
    textAlignVertical: 'center',
  },
  subLabel: {
    fontSize: 10,
    color: colors.darkCharlie,
  },
  firstButton: {marginRight: 10},
  row: {
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  slider: {
    width: 200,
    height: 40,
  },
  numberInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.darkCharlie,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
    marginRight: 10,
  },
});

export default Room;
