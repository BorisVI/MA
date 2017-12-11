import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet } from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import PersonScreen from '../person';

 class TripInfo extends Component {
  constructor(props){
    super(props);
    this.trip = {id : this.props.navigation.state.params.tripId};
 
  console.log(this.props.navigation.state.params.tripId);
  }
  static navigationOptions = {
    
    title:'Trip Details',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    const id = this.trip.id;
    return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Trip: {id}</Text>
      <Text style={styles.objText}>Datum: 7/12/2017</Text>
      <View style={styles.viewStyle}>
        <Text style={styles.hText}>Personen:</Text>
        <TableRow style={styles.row} title={'Jordy'} showArrow={true} onPress={() => this.goToPerson('Jordy')}></TableRow>
        <TableRow style={styles.row} title={'Boris'} showArrow={true}  onPress={() => this.goToPerson('Boris')}></TableRow>
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.hText}>Uitgaves:</Text> 
        <TableRow style={styles.row} title={'Pintjes'} showArrow={true} onPress={() => this.goToExpense('Jordy')}></TableRow>
        <TableRow style={styles.row} title={'McDo'} showArrow={true}  onPress={() => this.goToExpense('Boris')}></TableRow>
      </View>
    </View>
    );
  }
  goToPerson(personId)
  {
    //this.props.id = tripId; 
    this.props.navigation.navigate('PersonInfo',{personId});
  }
  goToExpense(expenseId)
  {
    this.props.navigation.navigate('ExpenseInfo',{expenseId});
  }
}
 const styles = StyleSheet.create(
      { 
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
     }
  });
  export default TripInfo= StackNavigator(
    {
    RecentScreen:{
      screen:TripInfo,
     
    },
    PersonInfo: 
    {
      screen: PersonScreen,
      
    },
   
    
  },{
    headerMode : 'none',
  });
// skip this line if using Create React Native App

