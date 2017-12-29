import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, Button } from 'react-native';
import TableRow from 'react-native-table-row';

import { TabNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Service as Service} from '../../../domain/service';
export class PersonOveriew extends Component {

  constructor(props){
    super(props);
    this.state ={tableData: [],trip: this.props.navigation.state.params.tripId,personId: this.props.navigation.state.params.personId, fname: this.props.navigation.state.params.fname};
   // console.log("id: "+this.trips.id);
    //console.log(this.props.navigation.state.params.tripId);
   // console.log(this.state.trip+' , '+ this.state.personId);
    
  }
  componentDidMount()
  {
    Service.getExpensesPerPerson(this.state.trip,this.state.personId).then((response)=>{
      items = [];
      response.forEach((value, key)=>{
        
        items.push([key,value[1],value[0],value[2]]);
      });
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
    const tableHead = ['Expense Name', 'Amount already paid', 'Amount due', 'Receives/stillneeds to pay'];
   
    return (
    <View>
      <Text style={styles.titleText}>Person: {this.state.fname}</Text>
      <Table styles={{marginTop:10, marginRight: 5, marginLeft :5}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} extraData={this.state} style={styles.row} textStyle={styles.text}/>
      </Table>
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.refreshScreen()}
  title="Refresh"
  
/>
  </View>
    </View>
    );
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
       
      }
     
  });
  export default PersonOveriew;
// skip this line if using Create React Native App

