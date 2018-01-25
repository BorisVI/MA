import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Trip} from '../../domain/trip'
import {LocalStorage} from '../../domain/localStorage';
import { Service as Service} from '../../domain/service';

export default class AddTrip extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    this.state = {startdate: today, enddate: today, name: ''};
    this.datumlimits= {min: '',max:''};

    if(datum.getMonth() >5)
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
    }
  }
  static navigationOptions = {
    
    title:'Add a trip',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Name of the trip: </Text>
  <TextInput style={ {height:40} } placeholder="Enter here the name of your trip!" onChangeText={(text) => this.setState({name:text})}/>
  <Text>Start date: </Text>
 <DatePicker
        style={{width: 200,padding:10,justifyContent: 'center'}}
        date={this.state.startdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.datumlimits.min}
        maxDate={this.datumlimits.max}
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
        onDateChange={(date) => {this.setState({startdate: date})}}
      />
      <Text>End date: </Text>
      <DatePicker
        style={{width: 200,padding:10,justifyContent: 'center'}}
        date={this.state.enddate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.datumlimits.min}
        maxDate={this.datumlimits.max}
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
        onDateChange={(date) => {this.setState({enddate: date})}}
      />
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddTrip()}
  title="Add trip"

/>
  </View>
    </View>
    );
  }
  AddTrip()
  {
    if(this.state.name != '')
    {
    let tid = this.state.name+ this.state.startdate+ this.state.enddate;
   var splitstart = this.state.startdate.split("-");
      var splitend = this.state.enddate.split("-");
    var startmonth = parseInt(splitstart[1]) -1;
    var endmonth = parseInt(splitend[1])-1;
   let startdateTrip= new Date(splitstart[0],startmonth,splitstart[2]);
   let enddateTrip=  new Date(splitend[0],endmonth,splitend[2]);
   if(enddateTrip.getTime() >= startdateTrip.getTime()){

     let t = new Trip(tid,this.state.name,startdateTrip,enddateTrip);
     Service.addTrip(t).then(()=>{
       this.props.navigation.state.params.onNavigateBack(true);
       this.props.navigation.goBack();    
     });
   } else{
     Alert.alert("End date can't come before the start date");
   }
    }else{
      Alert.alert("Name of the trip cannot empty");
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