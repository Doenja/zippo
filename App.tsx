import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {colors} from './colors';
import Room from './containers/Room';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Room
            title="Living room"
            color={colors.charlie}
            group="living_room"
          />
          <Room title="Bed room" color={colors.delta} group="bed_room" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
