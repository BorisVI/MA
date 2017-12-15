import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Picker, TouchableWithoutFeedback } from 'react-native';
import TableRow from 'react-native-table-row';
import { Navigator } from 'react-navigation';
//import PersonScreen from '../person';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



class TripInfo extends Component {
  constructor(props){
    super(props);
    this.trip = {id : this.props.navigation.state.params.tripId};
    console.log(this.props.navigation.state.params.tripId);
    this.state = {expense: 'Bier'}
  }
  setState(state)
  {
    super.setState(state);
    console.log(`Set state to ${JSON.stringify(state)}`);
  }
  static navigationOptions = {
    
    title:'Expenses',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
   // const id = this.trip.id;
    const tableHead = ['Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
    const tableData = [
      ['John', '120', '30', '90'],
      ['Pete', '0', '40', '40'],
      ['Tiago', '0', '50', '50'],
      ['Jack', '0', '0', '0'],
    ];
    return (
    <View>
      <Text style={styles.dropText}>Selected expense: </Text>
      <Picker
  selectedValue={this.state.expense}
  onValueChange={(itemValue, itemIndex) => this.setState({expense: itemValue})}>
  <Picker.Item label="Bier" value="Bier" />
  <Picker.Item label="McDo" value="McDo" />
  <Picker.Item label="Jordy heeft honger om 23:30 wtf" value="FuckingJordy" />
  <Picker.Item label="Glazen Bokal" value="snoop dogg" />
</Picker>
      <Table style={styles.viewTable}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
      </Table>
    </View>
    );
  }
  /*goToPerson(personId)
  {
    //this.props.id = tripId; 
    this.props.navigation.navigate('PersonInfo',{personId});
  }
  goToExpense(expenseId)
  {
    this.props.navigation.navigate('ExpenseInfo',{expenseId});
  }*/
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
        height: null, 
        backgroundColor: '#f1f8ff'
      },
     text: { 
       marginLeft: 5 
      },
     row: { height: 30 
      },
     
  });
  export default TripInfo;/*= StackNavigator(
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
  });*/
// skip this line if using Create React Native App

