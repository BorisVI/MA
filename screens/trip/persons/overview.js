import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Button ,Picker} from 'react-native';
import TableRow from 'react-native-table-row';

import { TabNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../../domain/service';
export class PersonOveriew extends Component {

  constructor(props){
    super(props);
    this.state ={tableData: [],trip: this.props.navigation.state.params.tripId,personId: this.props.navigation.state.params.personId, fname: this.props.navigation.state.params.fname, selectedTable:'total',tableData:[],tableHead:[]};

    
  }
  componentDidMount()
  {
   this.setTable(this.state.selectedTable);
  }
  setState(state)
  {
    super.setState(state);
    //console.log(`Set state to ${JSON.stringify(state)}`);
  }
  getTableDataTotal()
  {
    Service.getExpensesPerPerson(this.state.trip,this.state.personId).then((response)=>{
      items = [];
      response.forEach((value, key)=>{
        
        items.push([key,value[1],value[0],value[2]]);
      });
      
      this.setState({tableHead: ['Expense Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay']});
      this.setState({tableData: items});
    });
  }
  getTableDateTransactions()
  {
   // console.log('vgubhinj');
    Service.getTransactionSummaryForPerson(this.state.trip, this.state.personId).then((response)=>{
      items=[];
      for(let value of response){
      
        items.push([value[2],value[3],value[4],value[5]])
      }
      this.setState({tableHead:['Payer', 'Reciever','Amount','Status']});
      this.setState({tableData: items});
    });
  }
  getTableDataCategory()
  {
    Service.getExpenseForPersonPerCategory(this.state.trip, this.state.personId).then((response)=>{
      items=[];
      response.forEach((value, key)=>{
        
        items.push([key,value]);
      });
      console.log(items);
      this.setState({tableHead: ['Category', 'Expenses']});
      this.setState({tableData: items});
    });
  }
  getTableDataDay()
  {
    Service.getExpenseForPersonPerDay(this.state.trip, this.state.personId).then((response)=>{
      items=[];
      response.forEach((value, key)=>{
        items.push([key,value]);
      });
      console.log(items);
      this.setState({tableHead: ['Day', 'Expenses']});
      this.setState({tableData: items});
    });
  }
  static navigationOptions = {
    
    title:'Person Details',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    //const id = this.trips.id;
   // const tableHead = ['Expense Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
   
    return (
    <View>
      <Text style={styles.titleText}>Person: {this.state.fname}</Text>
      <Text style={styles.titleText}>Select table: </Text>
      <Picker
      selectedValue={this.state.selectedTable}
      onValueChange={(itemValue, itemIndex) => {this.setTable(itemValue)}}>
      <Picker.Item label="Total" value="total" />
      <Picker.Item label="Per category" value="category" />
      <Picker.Item label="Per day" value="day" />
      <Picker.Item label="Transactions" value="transactions" />
      </Picker>

     <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
      <Row data={this.state.tableHead} extraData={this.state} style={styles.head} textStyle={styles.text}/>
      <Rows data={this.state.tableData} extraData={this.state} style={styles.row} textStyle={styles.text}/>
     </Table>
      
     
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.refreshScreen()}
  title="refresh"
  
/>
  </View>
    </View>
    );
  }
  setTable(table)
  {
  
    switch(table)
    {
      case 'total':
        this.getTableDataTotal();
        this.setState({selectedTable: table});
        break;
      case 'category':
        this.getTableDataCategory();
        this.setState({selectedTable: table});
        break;
      case 'day':
        this.getTableDataDay();
        this.setState({selectedTable: table});
        break;
      case 'transactions':
        this.getTableDateTransactions();
        this.setState({selectedTable: table});
        break;
    }
    

  }
  refreshScreen()
  {
    this.componentDidMount();
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
        height: 40, 
        backgroundColor: '#f1f8ff'
      },
     text: { 
       marginLeft: 5 
      },
     row: { height: null,
      },
      buttonStyle: {
        marginTop: 10,
        paddingTop: 10,
       
      }
     
  });
  export default PersonOveriew;
// skip this line if using Create React Native App

