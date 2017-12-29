import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Button } from 'react-native';
import TableRow from 'react-native-table-row';

import { TabNavigator } from 'react-navigation';
import ExpensesScreen from './expenses';
import PersonsScreen from './persons';
import {OverzichtInfo} from '../overzicht';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../domain/service';
import { NavigationActions } from 'react-navigation';
export class TripInfo extends Component {


  constructor(props){
    super(props);
    this.trips = {id : this.props.navigation.state.params.tripId};
    this.state ={id: this.props.navigation.state.params.tripId,name: '',startdate: '', enddate:'',sumdata:[],tableData:[]};
    //console.log("id: "+this.trips.id);
    Service.getTrip(this.state.id).then((trip)=>{
      //let t = JSON.parse(trip);
     // console.log(t);
     //console.log('jnhiûofezrg '+trip.name);
      this.setState({name: trip.tripName});
      this.setState({startdate: trip.startDate})
      this.setState({enddate: trip.endDate});
    });
    this.loadTableData();
    //console.log(this.props.navigation.state.params.tripId);
  }
  loadTableData(){
    Service.getExpensesSummary(this.state.id).then((response)=>{
      items = [];
      response.forEach((value, key)=>{
                                                                    
        items.push([key,value[1],value[0],value[2]]);
      });
      this.setState({tableData: items});
    });
  }
  static navigationOptions = {
    
    title:'Trip Details',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    //const id = this.trips.id;
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
   
    return (
    <View>
      <Text style={styles.titleText}>Trip: {this.state.name}</Text>
      <Text style={styles.objText}>Start date: {this.state.startdate}</Text>
      <Text style={styles.objText}>End date: {this.state.enddate}</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text}/>
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
      buttonStyle: {
        marginTop: 10,
        paddingTop: 10,
       
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
    Persons:
    {
      screen: PersonsScreen,
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

