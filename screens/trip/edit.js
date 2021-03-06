import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Trip} from '../../domain/trip'
import {LocalStorage} from '../../domain/localStorage';
import { Service as Service} from '../../domain/service';

export default class EditTrip extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    this.state = {startdate: '', enddate: '', name: '', tripId: this.props.navigation.state.params.tripId};
    this.datumlimits= {min: '',max:''};
    //this.max= {max: ''};
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
  componentDidMount()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
      this.setState({name: trip.name});
      let startdate= new Date(trip.startDate);
      
      let startdates = startdate.getFullYear()+'-'+ (startdate.getMonth()+1)+'-'+ startdate.getDate();
      let enddate = new Date(trip.endDate);
      let enddates = enddate.getFullYear()+'-'+ (enddate.getMonth()+1)+'-'+ enddate.getDate();
      this.setState({startdate:startdates});
      this.setState({enddate:enddates});
    })
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
  <TextInput style={ {height:40} } placeholder="Type hier de naam van uw trip!" onChangeText={(text) => this.setState({name:text})}/>
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
          // ... You can check the source to find the other keys. 
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
 onPress={() => this.EditTrip()}
  title="Edit the trip"

/>
  </View>
    </View>
    );
  }
  EditTrip()
  {
    if(this.state.name != '')
    {
    //let tid = this.state.name+ this.state.startdate+ this.state.enddate;
   // var d = new Date(this.state.startdate);
  //  console.log(d+ ' '+ this.state.startdate);
   // var dd = new Date(this.state.enddate);
   var splitstart = this.state.startdate.split("-");
      var splitend = this.state.enddate.split("-");
    var startmonth = parseInt(splitstart[1]) -1;
    var endmonth = parseInt(splitend[1])-1;
   // console.log(startmonth+ ' '+ endmonth);
    let t = new Trip(tid,this.state.name,new Date(splitstart[0],startmonth,splitstart[2]), new Date(splitend[0],endmonth,splitend[2]));
    //:console.log('gubhiknmj'+d);    
    Service.updateTrip(t).then(()=>{
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