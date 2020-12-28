import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {colors} from './colors';
import Room from './containers/Room';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          <Room
            title="Living room"
            color={colors.darkDelta}
            group="living_room"
          />
          <Room title="Bed room" color={colors.darkEcho} group="bed_room" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
