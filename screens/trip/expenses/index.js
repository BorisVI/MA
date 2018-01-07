import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Picker, TouchableWithoutFeedback,Button ,FlatList} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import{Service as Service} from '../../../domain/service';
import AddExpenseScreen from './add';
import OverviewExpenseScreen from './overview';

class ExpenseInfo extends Component {
  constructor(props){
    super(props);
    this.trip = {id : this.props.navigation.state.params.tripId};
    this.state = {id: this.props.navigation.state.params.tripId,expenses: []}
  }
  componentDidMount()
  {
    this.loadExpenses();
  }
  
  handleOnNavigateBack= (b) => 
  {
    this.loadExpenses();   
  }
  
  loadExpenses()
  {
    var items =[];    
      Service.getTrip(this.state.id).then((trip)=>{
       
     for(let p of trip.expenses){
      items.push({key: p.name, id: p.expenseId})
     }
     this.setState({expenses: items});
    }
  );
    
  }
  setState(state)
  {
    super.setState(state);
  }
  static navigationOptions = {
    
    title:'Expenses',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View>
      <Text style={styles.dropText}>Selected expense: </Text>
      <FlatList
          data={this.state.expenses}
          extraData={this.state}
          renderItem={({item}) => <TableRow style={styles.row} title={item.key} key={item.key} showArrow={true}  onPress={() => this.goToExpense(item.id,item.key)}></TableRow>}
        />
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddExpense()}
  title="Voeg expense toe"
  
/>
  </View>
    </View>
    );
  }
  goToExpense(expenseId, expenseName)
  {
    let tripId = this.props.navigation.state.params.tripId;
    this.props.navigation.navigate('Expense',{tripId,expenseId,expenseName});
  }
  AddExpense()
  {
    let tripId = this.props.navigation.state.params.tripId;
    this.props.navigation.navigate('Add',{tripId,onNavigateBack: this.handleOnNavigateBack});
  }
}
 const styles = StyleSheet.create(
      { 
      dropText:{
        fontSize: 18,
        fontWeight: 'bold',
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
     viewStyle: {
       marginBottom :5,
     },
     head: {
        height: 50, 
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
  export default ExpenseInfo = StackNavigator(
    {
    Home: 
    {
      screen:ExpenseInfo,
      
    },
    Add: 
    {
      screen: AddExpenseScreen,
      
    },
    Expense:
    {
      screen : OverviewExpenseScreen,
    }
    
  },
  {
    headerMode : 'none',}
  );

