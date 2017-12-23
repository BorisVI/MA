import React from 'react';
import { StyleSheet, Text, View,Image, StatusBar,Alert, FlatList } from 'react-native';
//import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 4.4.2
import Entypo from 'react-native-vector-icons/Entypo';
//import HomeScreen from './screensstartPagina';
//import SecondScreen from './second';
import TripScreen from '../trip';
import AddTripScreen from '../addtrip';
//import Row from 'react-native-row';
//import 'react-table/react-table.css';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import {LocalStorage} from '../../domain/localStorage';
import { Trip } from '../../domain/trip';

import { Person } from '../../domain/person';

 export default class OverzichtInfo extends React.Component{
   constructor(props)
   {
    super(props);
    
    this.storage = {db: new LocalStorage()};
   // let storage = new LocalStorage();
    //let storage = new LocalStorage();
    let person1 = new Person('Peelman', 'Kevin');
    let person2 = new Person('Vanzegbroeck', 'Thomas');
    let person3 = new Person('Van Ingelgom', 'Boris');
    let person4 = new Person('Van den Brande', 'Jordy');
    let person5 = new Person('Vanzegbroeck', 'Thomas');
    let trip1 = new Trip('1','trip 1', new Date(), new Date());
    let trip2 = new Trip('2','trip ezahbv', new Date(), new Date());
    let trip3 = new Trip('3','trip 3', new Date(), new Date());

    trip1.addPerson(person1);
    trip1.addPerson(person2);
    trip1.addPerson(person3);
    trip1.addPerson(person4);

    this.storage.db.addTrip(trip1);
    this.storage.db.addTrip(trip2);
    this.storage.db.addTrip(trip3);
    //this.storage.db.clearDb();
    this.localitems = {trips: []};
    /*storage.getTrip('2').then((trip)=>{
    trip1.addPerson(person1);
    trip1.addPerson(person2);
    trip1.addPerson(person3);
    trip1.addPerson(person4);
    trip1.removePerson(person5);
    storage.addTrip(trip1);
    storage.addTrip(trip2);
    storage.addTrip(trip3);

    storage.getTrip('1').then((trip)=>{
      let t = JSON.parse(trip);
      console.log(t._id);
      console.log(t._name);
    });*/
    this.storage.db.getAllTrips().then((trips) =>{
     // this.items.trips = [];
      var array = this.localitems.trips;
      for(let t of trips )
      {
        array.push({key: t.id, name: t.name});
        console.log('result: ' + t.id + ', ' + t.name + ', ' + t.startdate + ', ' + t.enddate + ', ' + t.participants + ', ' + t.expenses + ', ' + t.currencies);
      }
      this.localitems = {trips: array};
      //console.log(">>>>>>>>>>>>>>>>>>>>>"+`${JSON.stringify(this.localitems)}`);
    });
  }
  static navigationOptions = {
   
      title: 'Overzicht trips',
      headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
      headerTintColor :'#fff',
    
  
}
  render() {
    
    return (
    /*  <View style={styles.container}>
            <StatusBar hidden={true}/> 
           <TableRow style={styles.row} title={'trip 1'} showArrow={true} onPress={() => this.goToTrip('trip 1')}></TableRow>
            <TableRow style={styles.row} title={'trip 2'} showArrow={true}  onPress={() => this.goToTrip('trip 2')}></TableRow>
            <TableRow style={styles.row} title={'trip 3'} showArrow={true}  onPress={() => this.goToTrip('whoehoe')}></TableRow>
            <MaterialIcons
        name={'add-box'}
        size={50}
        style={styles.addButton}
        onPress={() => this.goToAdd()}/>

        </View>*/
        <View style={styles.container}>
        <StatusBar hidden={true}/> 
        <FlatList
          data={this.localitems.trips}
          renderItem={({item}) => <TableRow style={styles.row} title={item.name} key={item.key} showArrow={true}  onPress={() => this.goToTrip(item.key)}></TableRow>}
        />
        <MaterialIcons
        name={'add-box'}
        size={50}
        style={styles.addButton}
        onPress={() => this.goToAdd()}/>
        </View>
    );
  }
  goToAdd()
  {
    let db = this.storage.db;
    this.props.navigation.navigate('Add',{db});

  }
  goToTrip(tripId)
  {
    //this.props.id = tripId; 
    let db = this.storage.db;
    this.props.navigation.navigate('Trip',{tripId});
  }

}
const styles = StyleSheet.create(
  { 
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
titleText: {
  fontSize: 20,
  fontWeight: 'bold',
},
row: {
 
  paddingTop: 25,
  paddingBottom: 25,
},
addButton: {
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: 0,
  paddingBottom: 10,
  paddingRight: 10,
  color: '#4d9280',
},
});

OverzichtInfo= StackNavigator(
  {
  Home: 
  {
    screen:OverzichtInfo,
    
  },
  Trip: 
  {
    screen: TripScreen,
    
  },
  Add:
  {
    screen: AddTripScreen,
  },
  
});
//export default Overzicht;
/*const RootTabs = TabNavigator(
  {
  Home: {
    screen: HomeScreen,
    
  },
  Second: {
    screen: SecondScreen,
  },
 
},
{ 
  tabBarPosition: 'top',
  tabBarOptions: {
  showIcon:true,
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#4d9280',
  },
}}
);*/

//export default RootTabs;


