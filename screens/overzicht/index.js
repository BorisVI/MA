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
import { Service as Service} from '../../domain/service';
import { Trip } from '../../domain/trip';
import {connect} from 'react-redux'
import { Person } from '../../domain/person';
import {NavigationActions } from 'react-navigation';

 class OverzichtInfo extends React.Component{
   constructor(props)
   {
    super(props);
    //Service.clearDb();
   // Service.clearTripDb();
    let trip1 = new Trip('1','trip 123', '2017-12-26', '2017-12-26');
    let trip2 = new Trip('2','trip ezahbv', new Date(), new Date());
    let trip3 = new Trip('3','trip 3', new Date(), new Date());
    //Service.addTrip(trip1);

   // Service.addTrip(trip1);
    //Service.addPersonToTrip(trip1.tripId, 'Kevin', 'Peelman');
   /* Service.getTrip('1').then((trip)=>{
      console.log(trip.tripName);
      trip.getExpensesSummary();
    });*/

    this.state = {trips: []};
    //console.log('hehe');
    this.storeTripsLocaly();
    console.log('j');
    //console.log('jnbfgszro');
  }
  handleOnNavigateBack= (b) => {
    this.storeTripsLocaly();
  }
  storeTripsLocaly() 
  {
   // console.log('hybuezaf');
    Service.getAllTrips().then((trips) =>
    {
      //console.log('njefoza');
       var array = [];
       for(let t of trips )
       {
         array.push({key: t.tripId, name: t.tripName});
       }
       this.setState({trips: array});
     });
  }
  static navigationOptions = {
   
      title: 'Trips overview',
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
          data={this.state.trips}
          renderItem={({item}) => <TableRow style={styles.row} titleStyle={styles.rowTitle} title={item.name} key={item.key} showArrow={true} subElement={<MaterialIcons name="delete-forever" size={40}
          style={styles.addButton}
          onPress={() => this.delete(item.key)}/>} onPress={() =>this.goToTrip(item.key)}></TableRow>}
        />
        <MaterialIcons
        name={'add-box'}
        size={50}
        style={styles.addButton}
        onPress={() => this.goToAdd()}/>
       
        </View>
    );
  }
  testGoToTrip(tripId){
    Alert.alert('jeej');
    this.props.navigation.navigate('Trip',{tripId});
  }
  delete(tripid)
  {
    Service.removeTrip(tripid).then(()=>{
     // console.log('delete: '+ tripid);
      this.handleOnNavigateBack(true);
      //console.log('hzfeuR');
    });
  }
  fillList()
  {
    items=[];
    for(let item of this.state.trips)
    {
      items.push(<TableRow style={styles.row} title={item.name} key={item.key} showArrow={true} onPress={() => this.goToTrip(item.key)}/>);
    }
    return items;
  }
  goToAdd()
  {
    this.props.navigation.navigate('Add', {onNavigateBack: this.handleOnNavigateBack});

  }
  goToTrip(tripId)
  {
    this.props.navigation.navigate('Trip',{tripId,onNavigateBack: this.handleOnNavigateBack});
  }

}

const styles = StyleSheet.create(
  { 
    rowTitle:{
      marginLeft:40,
    },
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

export default OverzichtInfo;


