import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet } from 'react-native';

export default class TripInfo extends Component {
  constructor(props){
    super(props);
    this.state = {id : this.props.navigation.state.params.tripId};
    console.log(this.state.id);
  }
  static navigationOptions = {
    title: 'Trip Detail',
  };
  render() {
    const id = this.state.id;
    return (
      <View>
      <Text> {id}</Text>
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

