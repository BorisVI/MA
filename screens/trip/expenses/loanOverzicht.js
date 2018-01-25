import React from 'react';
import { StyleSheet, Text, View,Image, StatusBar,Alert, FlatList,ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 4.4.2
import Entypo from 'react-native-vector-icons/Entypo';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import { Service as Service} from '../../../domain/service';
import {NavigationActions } from 'react-navigation';

 class LoansOverview extends React.Component{
   constructor(props)
   {
    super(props);
  
    this.state = {tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,loans: [],currency:''};
  }
  
  componentDidMount()
  {
    this.getCur();
    this.Loans();
  }
  getCur()
  {
    Service.getExpenseById(this.state.tripId,this.state.expenseId).then((expense)=>{
this.setState({currency: expense.currency});
    });
  }
  Loans() 
  {

    Service.getLoans(this.state.tripId, this.state.expenseId).then((response)=>{
      items=[];

     response.forEach((value,key)=>{
      var fnamepayer = key[1]+ ' ' + key[2];
      var fnamereceiver = key[4]+ ' '+ key[5];
      
       var textl = fnamepayer + ' needs to pay ' + fnamereceiver + ' ' + value.amount+ ' '+ this.state.currency;
               items.push({text: textl, key:value.loanId, payed: value.payed});
             
              });   
              this.setState({loans:items});
    });
  }
  static navigationOptions = {
   
      title: 'Loans overview',
      headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
      headerTintColor :'#fff',
}

  render() {
    
    return (
        <ScrollView style={styles.container}>
        <StatusBar hidden={true}/> 
        <FlatList
          data={this.state.loans}
          renderItem={({item}) => <TableRow style={styles.row} titleStyle={styles.rowTitle} title={item.text} key={item.key} 
          subElement={item.payed ? <MaterialIcons name="done" size={40}
          style={styles.addButton}
          onPress={() => Alert.alert("Already payed")}/>:  <MaterialIcons name="payment" size={40}
          style={styles.addButton} onPress={()=>{this.pay(item.key)}} />}></TableRow>}
        />
       
        </ScrollView>
    );
  }
  pay(id)
  {
    Service.payLoan(this.state.tripId,this.state.expenseId,id).then(()=>{
      this.componentDidMount();
    });
  }
  fillList()
  {
    items=[];
    for(let item of this.state.trips)
    {
      items.push(<TableRow style={styles.row} title={item.name} key={item.key} showArrow={true} onPress={() => this.goToTrip(item.key)}/>);
    }
    return items;
  }
  goToAdd()
  {
    this.props.navigation.navigate('Add', {onNavigateBack: this.handleOnNavigateBack});

  }
  goToTrip(tripId)
  {
    this.props.navigation.navigate('Trip',{tripId,onNavigateBack: this.handleOnNavigateBack});
  }

}

const styles = StyleSheet.create(
  { 
    rowTitle:{
      marginLeft:40,
    },
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
titleText: {
  fontSize: 20,
  fontWeight: 'bold',
},
row: {
 
  paddingTop: 25,
  paddingBottom: 25,
},
addButton: {
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: 0,
  paddingBottom: 10,
  paddingRight: 10,
  color: '#4d9280',
},
});



export default LoansOverview;



