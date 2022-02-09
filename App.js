/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  useColorScheme,
  View,
  DeviceEventEmitter,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DataWedgeIntents from 'react-native-datawedge-intents';

const App = () => {
  /*
  DataWedgeIntents.registerBroadcastReceiver({
    filterActions: [
      'com.zebra.reactnativedemo.ACTION',

      'com.symbol.datawedge.api.RESULT_ACTION',
    ],

    filterCategories: ['android.intent.category.DEFAULT'],
  });
  */
  const broadcastReceiverHandler = intent => {
    broadcastReceiver(intent);
  };
  console.log('broadcastReceiverHandler: ', broadcastReceiverHandler);
  const sendCommandResult = 'false';

  DataWedgeIntents.registerBroadcastReceiver({
    filterActions: [
      'com.zebra.reactnativedemo.ACTION',
      'com.symbol.datawedge.api.RESULT_ACTION',
    ],
    filterCategories: ['android.intent.category.DEFAULT'],
  });

  const scanHandler = deviceEvent => {
    console.log(deviceEvent);
  };

  DeviceEventEmitter.addListener('barcode_scan', scanHandler);

  const sendCommand = (extraName, extraValue) => {
    console.log(
      'Sending Command: ' + extraName + ', ' + JSON.stringify(extraValue),
    );
    let broadcastExtras = {};
    broadcastExtras[extraName] = extraValue;
    broadcastExtras['SEND_RESULT'] = sendCommandResult;
    DataWedgeIntents.sendBroadcastWithExtras({
      action: 'com.symbol.datawedge.api.ACTION',
      extras: broadcastExtras,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          scanHandler(DeviceEventEmitter);
        }}>
        <Text>Evento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          DataWedgeIntents.sendIntent(
            DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
            DataWedgeIntents.START_SCANNING,
          );
        }}>
        <Text>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          sendCommand(
            'com.symbol.datawedge.api.SOFT_SCAN_TRIGGER',
            'TOGGLE_SCANNING',
          );
        }}>
        <Text>Scan 2</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
