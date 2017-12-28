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
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    this.state = {date: '', name: '',id: this.props.navigation.state.params.tripId,startDateTrip: '', endDateTrip:''};
    //this.datumlimits= {min: '',max:''};
    //this.max= {max: ''};
    /*if(datum.getMonth() >5)
    {
     var varmonth = (datum.getMonth() + 7) -12
      this.datumlimits.max= (datum.getFullYear()+1) + '-'+varmonth+'-'+datum.getDate();
      this.datumlimits.min =datum.getFullYear() + '-' +(datum.getMonth())+'-'+datum.getDate();
    } else if(datum.getMonth()==0)
    {
      this.datumlimits.max= (datum.getFullYear()) + '-' +(datum.getMonth()+7)+'-'+datum.getDate();
      this.datumlimits.min=(datum.getFullYear()-1) + '-' +'12'+'-'+datum.getDate();
    } else
    {
      this.datumlimits.max= (datum.getFullYear()) + '-' +(datum.getMonth()+7)+'-'+datum.getDate();
      this.datumlimits.min=(datum.getFullYear()) + '-' +(datum.getMonth())+'-'+datum.getDate();
    }*/
    Service.getTrip(this.state.id).then((trip)=>{
      this.setState({date: trip.startDate});
      this.setState({startDateTrip: trip.startDate});
      this.setState({endDateTrip: trip.endDate});
    });
   // console.log(this.datumlimits.min+ ','+ this.datumlimits.max);
  }
  setState(state)
  {
    super.setState(state);
   // console.log(`Set state to ${JSON.stringify(state)}`);
  }
  static navigationOptions = {
    
    title:'Add a expense',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Name of the expense: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de naam van uw expense!" onChangeText={(text) => this.setState({name:text})}/>
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
          // ... You can check the source to find the other keys. 
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddExpense()}
  title="add expense"
  
/>
  </View>
    </View>
    );
  }
  AddExpense()
  {
    if(this.state.name != '')
    {
    //let tid = this.state.name+ this.state.startdate+ this.state.enddate;
    //let t = new Trip(tid,this.state.name,this.state.startdate, this.state.enddate);    
    Service.addExpenseToTrip(this.state.id, this.state.name, this.state.date).then(()=>{
      this.props.navigation.state.params.onNavigateBack(true);
      this.props.navigation.goBack();
      
    });
    }else{
      Alert.alert('Naam mag niet worden leeg gelaten');
    }
  }
}
 const styles = StyleSheet.create(
      { 
      container: {  
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'flex-start',
      //justifyContent: 'flex-start',
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