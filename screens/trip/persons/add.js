import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Service as Service} from '../../../domain/service';
import {Person} from '../../../domain/person.js';
import {Trip} from '../../../domain/trip';

export default class AddPersonScreen extends Component {
  constructor(props){
    super(props);
    this.state = {id: this.props.navigation.state.params.tripId,firstname: '', name: ''};
   
  }
  static navigationOptions = {
    
    title:'Add a person',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>First name: </Text>
  <TextInput style={ {height:40} } placeholder="Enter here the firstname!" onChangeText={(text) => this.setState({firstname:text})}/>
  <Text>Last name: </Text>
  <TextInput style={ {height:40} } placeholder="Enter here the lastname!" onChangeText={(text) => this.setState({name:text})}/>
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddPerson()}
  title="Add person"
  
/>
  </View>
  </View>
    
    );
  }
  AddPerson()
  {
    if(this.state.name.trim() != ''&& this.state.firstname.trim()!= '')
    {
      let valid = true;
      for(let i = 0; i <this.state.name.length; i++){
        if(valid){
          let code = this.state.name.charCodeAt(i);
          if(code > 255){
            Alert.alert("The input contains invalid characters");
            valid = false;
          }
        }
      }
      for(let j = 0; j <this.state.firstname.length; j++){
        if(valid){
          let code = this.state.name.charCodeAt(j);
          if(code > 255){
            Alert.alert("The input contains invalid characters");
            valid = false;
          }
        }
      }
      if(valid){
        var firstname = this.state.firstname;
        var lastname = this.state.name;
        while(firstname.endsWith(' '))
        {
          firstname= firstname.slice(0,firstname.length-1);
        }
        while(lastname.endsWith(' '))
        {
          lastname= lastname.slice(0,lastname.length-1);
        }
        Service.addPersonToTrip(this.state.id, firstname,lastname).then(()=>{
          this.props.navigation.state.params.onNavigateBack(true);
          this.props.navigation.goBack();
        });
      }
    }else{
      Alert.alert('Firstname and lastname cannot be empty!');
    }
  }
}
 const styles = StyleSheet.create(
      { 
      container: {  
      flex: 1,
      backgroundColor: '#fff',
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