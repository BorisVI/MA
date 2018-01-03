import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet,Button } from 'react-native';
import TableRow from 'react-native-table-row';

import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../../domain/service';
import EditExpenseScreen from './edit';
import AddConsumerScreen from './addConsumer';
import AddPayersScreen from './addPayers';
class ExpenseOveriew extends Component {

  constructor(props){
    super(props);
    this.state ={tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,name:'',date:'', tableData:[]};
    //console.log(this.state.tripId+ " , "+ this.state.expenseId);
    //Service.getTableByExpense(this.props.navigation.state.params.tripId,this.props.navigation.state.params.expenseId);
    
  }
  componentDidMount(){
    this.loadExpenseInfo();
    this.loadTable();
  }
  handleOnNavigateBack= (b) => {
   this.loadExpenseInfo();
   this.loadTable();
  }
  loadExpenseInfo()
  {
    Service.getExpenseById(this.state.tripId, this.state.expenseId).then((expense)=>{
      this.setState({name: expense.name});
      let date = new Date(expense.date);
      let europeandate = date.getDate()+'/'+ (date.getMonth()+1)+'/'+ date.getFullYear();
      this.setState({date: europeandate});
    });
  }
  loadTable()
  {
    Service.getTableByExpense(this.state.tripId, this.state.expenseId).then((response)=>{
      items=[];
      response.forEach((value, key)=>{
         var fname = key[1] + ' '+ key[2];
         //console.log(value[2]);
        // console.log(key+' , '+ value);
         items.push([fname,value[1],value[0],value[2]]);
         
       });
       this.setState({tableData: items});
    });
  }
  static navigationOptions = {
    
    title:'Expense Details',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    //const id = this.trips.id;
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
   
    return (
    <View>
      <Text style={styles.titleText}>Expense: {this.state.name}</Text>
      <Text style={styles.titleText}>Date: {this.state.date}</Text>
      <Text style={styles.titleText}>Table for this expense:</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} extraData={this.state} style={styles.row} textStyle={styles.text}/>
      </Table>
      <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.editExpense()} title="Edit expense" />
      </View>
      <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.addConsumer()} title="add consumers" />
      </View>
      <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.addPayers()} title="add payers" />
      </View>
      <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.finalizeExpense()} title="finalise expense" />
      </View>
    </View>
    
    );
  }
  finalizeExpense()
  {
    console.log('ben hier');
    Service.finaliseExpense(this.state.tripId, this.state.expenseId).then(()=>{
      
    });
  }
  addConsumer()
  {
    let tripId = this.state.tripId;
    let expenseId = this.state.expenseId;
    this.props.navigation.navigate('Consumer',{tripId, expenseId,onNavigateBack: this.handleOnNavigateBack})
  }
  addPayers()
  {
    let tripId = this.state.tripId;
    let expenseId = this.state.expenseId;
    this.props.navigation.navigate('Payer',{tripId, expenseId,onNavigateBack: this.handleOnNavigateBack})
  }
  editExpense()
  {
      let tripId = this.state.tripId;
      let expenseId = this.state.expenseId;
     
      this.props.navigation.navigate('Edit', {tripId, expenseId,onNavigateBack: this.handleOnNavigateBack});
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
     
  });
 export default ExpenseOveriew= StackNavigator(
    {
    Home: 
    {
      screen:ExpenseOveriew,
      
    },
    Edit: 
    {
      screen: EditExpenseScreen,
      
    },
    Consumer:
    {
      screen: AddConsumerScreen,
    },
    Payer:
    {
      screen: AddPayersScreen,
    },
    
    
  },
  {
    headerMode : 'none',}
  );
// skip this line if using Create React Native App

