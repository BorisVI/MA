import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
//import PersonScreen from '../person';
import DatePicker from 'react-native-datepicker';


 class AddTrip extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    console.log(today);
    this.state = {date: today, name: ''};
    this.datumlimits= {min: '',max:''};
    //this.max= {max: ''};
    if(datum.getMonth() == 11)
    {
      this.datumlimits.max= (datum.getFullYear()+1) + '-1-'+datum.getDate();
      this.datumlimits.min =datum.getFullYear() + '-' +(datum.getMonth())+'-'+datum.getDate();
    } else if(datum.getMonth()==0)
    {
      this.datumlimits.max= (datum.getFullYear()) + '-' +(datum.getMonth()+2)+'-'+datum.getDate();
      this.datumlimits.min=(datum.getFullYear()-1) + '-' +'12'+'-'+datum.getDate();
    }else
    {
      this.datumlimits.max= (datum.getFullYear()) + '-' +(datum.getMonth()+2)+'-'+datum.getDate();
      this.datumlimits.min=(datum.getFullYear()) + '-' +(datum.getMonth())+'-'+datum.getDate();
    }
    console.log(this.datumlimits.max);
    console.log(this.datumlimits.min);
  }
  static navigationOptions = {
    
    title:'Voeg een trip toe',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Trip naam: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de naam van uw trip!" onChangeText={(text) => this.setState({name:text})}/>
 <DatePicker
        style={{width: 200,padding:10,justifyContent: 'center'}}
        date={this.state.date}
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
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <View style={styles.buttonStyle}>
      <Button color='#4d9280'
 onPress={() => this.AddTrip()}
  title="Voeg trip toe"
  
/>
  </View>
    </View>
    );
  }
  AddTrip()
  {
    var alerttext= 'Trip naam: ' +`${this.state.name}` + ', Datum van de trip: ' +`${this.state.date}`;
    Alert.alert(alerttext);
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
  export default AddTrip;/*= StackNavigator(
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

