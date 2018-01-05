import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet,Button, ScrollView, Picker, Alert,FlatList } from 'react-native';
import TableRow from 'react-native-table-row';

import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../../domain/service';
import EditExpenseScreen from './edit';
import AddConsumerScreen from './addConsumer';
import AddPayersScreen from './addPayers';
import LoansOverview from './loanOverzicht';
import SplitEvenly from './split';
class ExpenseOveriew extends Component {

  constructor(props){
    super(props);
    this.state ={buttons:[],tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,name:'',date:'', tableData:[], finalised:'', selectedSplitter:'normal'};
    //console.log(this.state.tripId+ " , "+ this.state.expenseId);
    //Service.getTableByExpense(this.props.navigation.state.params.tripId,this.props.navigation.state.params.expenseId);
    
  }
  componentDidMount(){
    this.loadExpenseInfo();
    this.loadTable();
    this.setButtons(this.state.selectedSplitter);
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
    Service.isFinal(this.state.tripId, this.state.expenseId).then((final)=>{
      this.setState({finalised: final});
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
    <ScrollView>
      <Text style={styles.titleText}>Expense: {this.state.name}</Text>
      <Text style={styles.titleText}>Date: {this.state.date}</Text>
      <Text style={styles.titleText}>Table for this expense:</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} extraData={this.state} style={styles.row} textStyle={styles.text}/>
      </Table>
      {this.state.finalised ? <View style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.goToViewLoans()} title="view loans" />
       
      </View>
     :
    <View>
    <View style={styles.buttonStyle}>
      <Button color='#4d9280' onPress={() => this.editExpense()} title="Edit expense" />
    </View>
    <View style={styles.buttonStyle}>
      <Button color='#4d9280' onPress={() => this.finalizeExpense()} title="finalise expense" />
    </View>
    <Picker
      selectedValue={this.state.selectedSplitter}
      onValueChange={(itemValue, itemIndex) => {this.setButtons(itemValue)}}>
      <Picker.Item label="What you consumed" value="normal" key="normal"/>
      <Picker.Item label="Split evenly" value="split" key="split"/>
      </Picker>

      <FlatList
        data={this.state.buttons}
        extraData={this.state}
        renderItem={({item}) => <View key={item.key} style={styles.buttonStyle}><Button color='#4d9280' onPress={() => this.switchForExutionOfAction(item.action)} title={item.title}/></View> }
      />
    </View>}
   {this.state.finalised? <View style={styles.buttonStyle} style={styles.buttonStyle}>
        <Button color='#4d9280' onPress={() => this.refresh()} title="refresh" />
      </View>:<Text></Text>}
      
    </ScrollView>
    
    );
  }
  setButtons(type){
    items =[]
    switch (type)
    {
      case 'normal':
      items.push( {key: 'normalconsumerskey', buttonkey:'normalconsumers' , action:'addConsumer', title:"add consumers"});
  
      items.push({key: 'normalpayerskey',buttonkey:'normalpayers',action: 'addPayers', title:'add payers'});
      this.setState({selectedSplitter:type});
      break;
      case 'split':
      items.push( {key:'splitkey', buttonkey:'splitbutton', action:'goToSplitEven', title:'Enter and split the bill'} );
        this.setState({selectedSplitter:type}); 
      break;
    }
    this.setState({buttons: items});
  }
  switchForExutionOfAction(action)
  {
    switch(action)
    {
      case 'addConsumer':
      this.addConsumer();
      break;
      case 'addPayers':
      this.addPayers();
      break;
      case 'goToSplitEven':
      this.goToSplitEven();
      break;
    }
  }
  goToSplitEven()
  {
    let tripId = this.state.tripId;
    let expenseId = this.state.expenseId;
    this.props.navigation.navigate('Even',{tripId,expenseId});
  }
  refresh()
  {
    this.componentDidMount();
  }
  goToViewLoans()
  {
    let tripId = this.state.tripId;
    let expenseId = this.state.expenseId;
    this.props.navigation.navigate('Loans',{tripId,expenseId});
  }
  finalizeExpense()
  {
    //console.log('ben hier');
    Service.finaliseExpense(this.state.tripId, this.state.expenseId).then(()=>{
      this.componentDidMount();
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
     row: { height: null,
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
    Loans:
    {
      screen: LoansOverview,
    },
    Even:
    {
      screen: SplitEvenly, 
    },
    
  },
  {
    headerMode : 'none',}
  );
// skip this line if using Create React Native App

