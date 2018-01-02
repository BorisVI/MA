import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Button, Picker } from 'react-native';
import TableRow from 'react-native-table-row';

import { TabNavigator } from 'react-navigation';
import ExpensesScreen from './expenses';
import PersonsScreen from './persons';
import {OverzichtInfo} from '../overzicht';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../domain/service';
import { NavigationActions } from 'react-navigation';
import {EditTrip} from './edit';
export class TripInfo extends Component {


  constructor(props){
    super(props);
    this.trips = {id : this.props.navigation.state.params.tripId};
    this.state ={id: this.props.navigation.state.params.tripId,name: '',startdate: '', enddate:'',sumdata:[],tableData:[],tableHead:[],selectedTable: 'trip'};
    //console.log("id: "+this.trips.id);
    Service.getTrip(this.state.id).then((trip)=>{
      //let t = JSON.parse(trip);
     // console.log(t);
     //console.log('jnhiûofezrg '+trip.name);
      this.setState({name: trip.tripName});
      let startDate= new Date(trip.startDate);
      let endDate = new Date(trip.endDate);
      let europeanstartdate = startDate.getDate()+'/'+  (startDate.getMonth()+1)+'/'+  startDate.getFullYear();
      let europeanenddate= endDate.getDate()+'/'+  (endDate.getMonth()+1)+'/'+  endDate.getFullYear();
      this.setState({startdate: europeanstartdate})
      this.setState({enddate: europeanenddate});
    });
    
    //console.log(this.props.navigation.state.params.tripId);
  }
  componentDidMount()
  {
    this.setTable(this.state.selectedTable);
  }
  
  getTableDataTrip()
  {
    Service.getExpensesSummary(this.state.id).then((response)=>{
      items = [];
      response.forEach((value, key)=>{
        var fname = key[1] + ' '+ key[2];
        //console.log(value[2]);
        items.push([fname,value[1],value[0],value[2]]);
      });
      this.setState({tableHead: ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay']});
      this.setState({tableData: items});
    });
  }
  getTableDataCategory()
  {
    Service.getExpensesByCategory(this.state.id).then((response)=>{
      items = [];
      response.forEach((value, key)=>{
        console.log('key: '+ key+' ,value: '+ value);
       items.push([key,value]);
      });
      this.setState({tableHead:['Category', 'Expense']});
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
    //const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
   
    return (
    <View>
      <Text style={styles.titleText}>Trip: {this.state.name}</Text>
      <Text style={styles.objText}>Start date: {this.state.startdate}</Text>
      <Text style={styles.objText}>End date: {this.state.enddate}</Text>
      <Text style={styles.titleText}>Select table: </Text>
      <Picker
  selectedValue={this.state.selectedTable}
  onValueChange={(itemValue, itemIndex) => {this.setTable(itemValue)}}>
  <Picker.Item label="Total by trip" value="trip" />
  <Picker.Item label="Expenses by category" value="category" />
        </Picker>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={this.state.tableHead} extraData={this.state} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} extraData={this.state} style={styles.row} textStyle={styles.text}/>
      </Table>
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.refreshScreen()}
  title="Refresh"/>
  </View>
    </View>
    );
  }
  setTable(table)
  {
    switch(table)
    {
      case 'trip':
        this.getTableDataTrip();
        this.setState({selectedTable: table});
        break;
      case 'category':
        this.getTableDataCategory();
        this.setState({selectedTable: table});
        break;
    }
    

  }
  goToEdit()
  {
    let tripId = this.state.id;
    this.props.navigation.navigate(EditTrip,{tripId});
  }
  refreshScreen()
  {
    this.setTable(this.state.selectedTable);
    this.goToEdit();
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
        buttonStyle: {
          marginTop: 10,
          paddingTop: 10,
         
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
    tabBarOptions: {
      style: {
        backgroundColor:  '#4d9280',
      },
    },});
// skip this line if using Create React Native App

