import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
//import {Ionicons} from 'react-native-vector-icons'; // 4.4.2
import HomeScreen from './startPagina';
import SecondScreen from './second';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

 class App extends React.Component{
  render() {
    
    return (
      <View style={styles.container}>
      <Text>TEST BABY!!!!</Text>
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
export default App;
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


