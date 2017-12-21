import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Picker,Button } from 'react-native';
import TableRow from 'react-native-table-row';

import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AddPersonScreen from './add';
export class PersonInfo extends Component {


  constructor(props){
    super(props);
    //this.trip = {id : this.props.navigation.state.params.tripId};
    
   // console.log(this.props.navigation.state.params.tripId);
   this.state = {person: 'Boris'}
  }
  setState(state)
  {
    super.setState(state);
    console.log(`Set state to ${JSON.stringify(state)}`);
  }
  static navigationOptions = {
    
    title:'Persons',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
   // const id = this.trip.id;
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
    const tableData = [
      ['John', '120', '30', '90'],
      ['Pete', '0', '40', '40'],
      ['Tiago', '0', '50', '50'],
      ['Jack', '0', '0', '0'],
    ];
    return (
    <View>
         <Picker
  selectedValue={this.state.person}
  onValueChange={(itemValue, itemIndex) => this.setState({person: itemValue})}>
  <Picker.Item label="Boris" value="Boris" />
  <Picker.Item label="Thomas" value="Thomas" />
  <Picker.Item label="Jordy" value="Jordy" />
  <Picker.Item label="Kevin" value="Kevin" />
</Picker>
      <Table styles={styles.viewTable}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
      </Table>
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddPerson()}
  title="Voeg een persoon toe"
  
/>
  </View>
    </View>
    );
  }
  AddPerson()
  {
    this.props.navigation.navigate('Add');
  }
}
 const styles = StyleSheet.create(
      { 
      viewTable:
      {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
      },
      container: {  
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft :5,
      paddingRight: 5, 
     
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
    rrow: {
       paddingTop: 25,
       paddingBottom: 25,
     },
     hText: {
      fontSize: 16,
      marginTop: 0,
      marginBottom: 5,
      fontWeight: 'bold',
     },
    
     head: {
        height: null, 
        backgroundColor: '#f1f8ff'
      },
     text: { 
       marginLeft: 5 
      },
     row: { height: 30 
      },
      buttonStyle: {
        marginTop: 10,
        paddingTop: 10,
       
      },
     
  });
  export default PersonInfo= StackNavigator(
    {
    Home: 
    {
      screen:PersonInfo,
      
    },
    Add: 
    {
      screen: AddPersonScreen,
      
    },
    
  },
  {
    headerMode : 'none',}
  );
// skip this line if using Create React Native App

