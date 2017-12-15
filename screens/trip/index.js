import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet } from 'react-native';
import TableRow from 'react-native-table-row';

import { TabNavigator } from 'react-navigation';
import ExpensesScreen from './expenses';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export class TripInfo extends Component {


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
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
    const tableData = [
      ['John', '120', '30', '90'],
      ['Pete', '0', '40', '40'],
      ['Tiago', '0', '50', '50'],
      ['Jack', '0', '0', '0'],
    ];
    return (
    <View>
      <Text style={styles.titleText}>Trip: {id}</Text>
      <Text style={styles.objText}>Datum: 7/12/2017</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
      </Table>
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
     
  });
  export default TripInfo= TabNavigator(
    {
    RecentScreen:{
      screen:TripInfo,
    },
    Expensens: 
    {
      screen: ExpensesScreen,  
    },    
    },
    {
    headerMode : 'none',
    tabBarPosition: 'bottom',
    },{
    tabBarOptions: {
      headerStyle: {
        backgroundColor:  '#4d9280',
      },
    },});
// skip this line if using Create React Native App

