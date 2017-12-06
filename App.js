import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import HomeScreen from './home';
import SecondScreen from './second';


const RootTabs = TabNavigator(
  {
  Home: {
    screen: HomeScreen,
  },
  Second: {
    screen: SecondScreen,
  },
});

export default RootTabs;

