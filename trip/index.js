import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet } from 'react-native';

export default class TripInfo extends Component {
  constructor(props){
    super(props);
    this.trip = {id : this.props.navigation.state.params.tripId};
    console.log(this.props.id);
  }
  static navigationOptions = {
    title: 'Trip Detail',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 1, borderBottomColor: 'white' },
    headerTintColor :'#fff',
  };
  render() {
    const id = this.trip.id;
    return (
      <View style={styles.container}>
      <Text style={styles.titleText}> {id}</Text>
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

