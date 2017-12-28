import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet,Button } from 'react-native';
import TableRow from 'react-native-table-row';

import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../../domain/service';
import EditExpenseScreen from './edit';
class ExpenseOveriew extends Component {

  constructor(props){
    super(props);
    this.state ={tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,name:'',date:'', tableData:[]};
    //console.log(this.state.tripId+ " , "+ this.state.expenseId);
    
  }
  componentDidMount(){
    this.loadExpenseInfo();
  }
  handleOnNavigateBack= (b) => {
   this.loadExpenseInfo()
  }
  loadExpenseInfo()
  {
    Service.getExpenseById(this.state.tripId, this.state.expenseId).then((expense)=>{
      this.setState({name: expense.name});
      this.setState({date: expense.date});
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
    const tableData = [
      ['John', '120', '30', '90'],
      ['Pete', '0', '40', '40'],
      ['Tiago', '0', '50', '50'],
      ['Jack', '0', '0', '0'],
    ];
    return (
    <View>
      <Text style={styles.titleText}>Expense: {this.state.name}</Text>
      <Text style={styles.titleText}>Date: {this.state.date}</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
      </Table>
      <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.editExpense()} title="Edit expense" />
      </View>
    </View>
    );
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
    
    
  },
  {
    headerMode : 'none',}
  );
// skip this line if using Create React Native App

