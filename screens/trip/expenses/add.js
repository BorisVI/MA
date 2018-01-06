import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
//import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
//import {Trip} from '../../domain/trip'
//import {LocalStorage} from '../../domain/localStorage';
import { Service as Service} from '../../../domain/service';

export default class AddExpense extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    this.state = {date: '', name: '',id: this.props.navigation.state.params.tripId,startDateTrip: '', endDateTrip:''};
    Service.getTrip(this.state.id).then((trip)=>{
      let startdate= new Date(trip.startDate);     
      let startdates = startdate.getFullYear()+'-'+ (startdate.getMonth()+1)+'-'+ startdate.getDate();
      let enddate = new Date(trip.endDate);
      let enddates = enddate.getFullYear()+'-'+ (enddate.getMonth()+1)+'-'+ enddate.getDate();
      this.setState({date: startdates});
      this.setState({startDateTrip: startdates});
      this.setState({endDateTrip: enddates});
    });

  }
  setState(state)
  {
    super.setState(state);
  }
  static navigationOptions = {
    
    title:'Add an expense',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Name of the expense: </Text>
  <TextInput style={ {height:40} } placeholder="Enter here the name of your expense!" onChangeText={(text) => this.setState({name:text})}/>
  <Text>Start date: </Text>
 <DatePicker
        style={{width: 200,padding:10,justifyContent: 'center'}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.startDateTrip}
        maxDate={this.state.endDateTrip}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          } 
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddExpense()}
  title="Add expense"
  
/>
  </View>
    </View>
    );
  }
  AddExpense()
  {
    if(this.state.name != '')
    {
    var splitdate = this.state.date.split("-");
    var datemonth = parseInt(splitdate[1]) -1;
    Service.addExpenseToTrip(this.state.id, this.state.name, new Date(splitdate[0],datemonth, splitdate[2])).then(()=>{
      this.props.navigation.state.params.onNavigateBack(true);
      this.props.navigation.goBack();
      
    });
    }else{
      Alert.alert("Name of the expense cannot be empty");
    }
  }
}
 const styles = StyleSheet.create(
      { 
      container: {  
      flex: 1,
      backgroundColor: '#fff',
      padding: 10, 
     
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
    row: {
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
     buttonStyle: {
       marginTop: 10,
       paddingTop: 10,
      
     }
  });