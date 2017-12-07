import React from 'react';
import { StyleSheet, Text, View,Image, StatusBar } from 'react-native';
//import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
//import {Ionicons} from 'react-native-vector-icons'; // 4.4.2
import HomeScreen from './startPagina';
import SecondScreen from './second';
import TripScreen from './trip';
//import Row from 'react-native-row';
//import 'react-table/react-table.css';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';

 class App extends React.Component{
   constructor(props)
   {
     super(props);
     
   }
  static navigationOptions = {
    title: 'Overzicht trips',
  }
  render() {
    
    return (
      <View style={styles.container}>
            <StatusBar hidden={true}/>
            <TableRow style={styles.row} title={'trip 1'} showArrow={true} onPress={() => this.goToTrip('trip 1')}></TableRow>
            <TableRow style={styles.row} title={'trip 2'} showArrow={true}  onPress={() => this.goToTrip('trip 2')}></TableRow>
            <TableRow style={styles.row} title={'trip 3'} showArrow={true}  onPress={() => this.goToTrip('whoehoe')}></TableRow>
    
        </View>
    );
  }
  goToTrip(tripId)
  {
    console.log(tripId);
    this.props.id = tripId;
   
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
});

export default App= StackNavigator(
  {
  Home: 
  {
    screen:App,
    
  },
  Trip: 
  {
    screen: TripScreen,
    
  }
});
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


