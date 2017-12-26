import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Picker,Button,FlatList } from 'react-native';
import TableRow from 'react-native-table-row';

import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AddPersonScreen from './add';
import {Service as Service} from '../../../domain/service';
import {Trip} from '../../../domain/trip';

export class PersonInfo extends Component {


  constructor(props){
    super(props);
    //this.trip = {id : this.props.navigation.state.params.tripId};
    
   // console.log(this.props.navigation.state.params.tripId);
   this.state = {id: this.props.navigation.state.params.tripId,persons: []};
   //this.loadPersons();
  }
  componentDidMount()
  {
    this.loadPersons();
   console.log(this.state.persons);
  }

  loadPersons()
  {
      var items =[];    
      console.log('njfsdnjofeon'+ this.props.navigation.state.params.tripId);
      Service.getTrip(this.props.navigation.state.params.tripId).then((trip)=>{
    //  let t = JSON.parse(trip);
      console.log('jhkbrfgzbjphfregz'+ trip);
      //let pl = JSON.parse(t.participants);
      console.log('hvbfedzpibefzbihpefz'+trip.id);
    //  console.log('bjidgfsjbdsfbijhfed'+ trip.participants());
     for(let p of trip.participants)
     {
       let bam = JSON.parse(p);
       console.log('ezfdrHGVUO '+bam.firstname);
      var fname= p.firstname + ' ' + p.name;
      items.push({key: fname});   
     }
    });
    this.setState({persons: items});
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
   {console.log("hbdvsibf"+this.state.persons)}
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
    const tableData = [
      ['John', '120', '30', '90'],
      ['Pete', '0', '40', '40'],
      ['Tiago', '0', '50', '50'],
      ['Jack', '0', '0', '0'],
    ];
    
    return (
      
    <View>
      <Text style={styles.dropText}>Persons: </Text>
      <FlatList
          data={this.state.persons}
          extraData={this.state}
          renderItem={({item}) => <TableRow style={styles.row} title={item.key} key={item.key} showArrow={true}  onPress={() => this.goToPerson(item.key)}></TableRow>}
        />
     
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddPerson()}
  title="Voeg een persoon toe"
  
/>
  </View>
    </View>
    );
  }
  goToPerson(name){
    this.props.navigation.navigate('Person', {name})
  }
  AddPerson()
  {
    this.props.navigation.navigate('Add');
  }
}
 const styles = StyleSheet.create(
      { 
        dropText:{
          fontSize: 18,
          fontWeight: 'bold',
        },
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
    Person:
    {
      screen: AddPersonScreen,
    },
    
  },
  {
    headerMode : 'none',}
  );
// skip this line if using Create React Native App

