import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
//import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
//import PersonScreen from '../person';
import DatePicker from 'react-native-datepicker';

import {Person} from '../../../domain/person.js'
//import Overzicht from '../overzichtscreen';

export default class AddPerson extends Component {
  constructor(props){
    super(props);
    this.state = {firstname: '', name: ''};
   
  }
  static navigationOptions = {
    
    title:'Voeg een Persoon toe',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Voornaam: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de voornaam!" onChangeText={(text) => this.setState({firstname:text})}/>
  <Text>Achternaam: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de achternaam!" onChangeText={(text) => this.setState({name:text})}/>
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddPerson()}
  title="Voeg de persoon toe"
  
/>
  </View>
  </View>
    
    );
  }
  AddPerson()
  {
    if(this.state.name.trim() != ''&& this.state.firstname.trim()!= '')
    {
      console.log(this.state.firstname);
    let t = new Person(this.state.firstname, this.state.name);
    //var alerttext= 'Trip naam: ' +`${this.state.name}` + ', Datum van de trip: ' +`${this.state.date}`;
    //Alert.alert(t);
    
    console.log(t.firstName + ' ' + t.name + ' ');
   this.props.navigation.goBack();
    }else{
      Alert.alert('Naam en voornaam mogen niet worden leeg gelaten');
    }
  }
}
 const styles = StyleSheet.create(
      { 
      container: {  
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'flex-start',
      //justifyContent: 'flex-start',
    padding: 10, 
     
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
     
    },
  
    objText: {
      fontSize: 16,
      marginTop: 0,
      marginBottom: 5,
    },
    row: {
       paddingTop: 25,
       paddingBottom: 25,
     },
     hText: {
      fontSize: 16,
      marginTop: 0,
      marginBottom: 5,
      fontWeight: 'bold',
     },
     viewStyle: {
       marginBottom :5,
     },
     buttonStyle: {
       marginTop: 10,
       paddingTop: 10,
      
     }
  });
  /*AddTrip= StackNavigator(
    {
    Actual:
    {        
      screen: AddTrip,     
    },
    Terug:
    {
      screen: TripsOverzichtScreen,
    }
   
    
  },
  {
    headerMode : 'none',
  });
 // export default AddTrip;
// skip this line if using Create React Native App
*/
