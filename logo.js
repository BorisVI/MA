import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet } from 'react-native';

export default class KaravaanLogo extends Component {
  static navigationOptions = {
    title: 'Logo Karavaan',
  };
  render() {
    
    return (
      <View>
      <Image resizeMode="stretch" source={require('./img/shaq.png')} style={{height: 250, width: null}}/>
      </View>
    );
  }
}
 const styles = StyleSheet.create(
      { 
      container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
// skip this line if using Create React Native App

