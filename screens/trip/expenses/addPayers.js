import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert,Picker,FlatList} from 'react-native';
import TableRow from 'react-native-table-row';
//import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
//import PersonScreen from '../person';
import DatePicker from 'react-native-datepicker';
import {Service as Service} from '../../../domain/service';
import {Person} from '../../../domain/person.js';
import {Trip} from '../../../domain/trip';
//import Overzicht from '../overzichtscreen';

export default class AddPayersScreen extends Component {
  constructor(props){
    super(props);
    this.state = {tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.state.params.expenseId, participants:[], selectedParticipant:'', selectedParticipantId:'',participantpayed:'',payers:[]};
   
  }
  componentDidMount()
  {
      this.loadParticipantsList();
      this.loadPayerslist();
  }
  setState(state)
  {
      super.setState(state);
      console.log(`Set state to ${JSON.stringify(state)}`);
  }
  loadPayerslist()
  {
    Service.getPayersFromExpense(this.state.tripId, this.state.expenseId).then((payers)=>{
      items =[];
      payers.forEach((value, key)=>{
        var fname = key[1]+ ' '+ key[2];
        items.push({key: fname, id: key[0], payed: value});
      });
      this.setState({payers: items});
    });
  }
  loadParticipantsList()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
        items= [];
        for(let p of trip.participants)
        {
            var fname = p.firstName + ' '+ p.lastName;
            items.push({key: fname, id: p.personId});
        }
        this.setState({participants: items});
        if(this.state.participants.length != 0){
          this.setState({selectedParticipant: this.state.participants[0].key, selectedParticipantId: this.state.participants[0].id});
        }
    });
  }
  static navigationOptions = {
    
    title:'Add payers',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text style={styles.dropText}>Select payer: </Text>
<Picker
  selectedValue={this.state.selectedParticipant}
  onValueChange={(itemValue, itemIndex) => {this.setState({selectedParticipant: itemValue}); this.setKeyForPerson(itemValue)}}>
{this.loadParticpantsPickerItems()}
</Picker>
<Text style={styles.dropText}>Amount payed: </Text>
  <TextInput style={ {height:40} }
   keyboardType='numeric'
   onChangeText={(text)=> this.onChangedNrPayed(text)}
   value={this.state.participantpayed}
   maxLength={10} />
<Button color='#4d9280' 
 onPress={() => this.AddPayer()}
  title="Add payer"  
/>
<Text style={styles.dropText}>Payers: </Text>
<FlatList
        data={this.state.payers}
        extraData={this.state}
        renderItem={({item}) => <Text style={styles.row}>Name: {item.key}  {"\n"}Amount payed: {item.payed}</Text>}
      />
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddPayersToTrip()}
  title="Add"
  
/>
  </View>
  </View>
    
    );
  }
  setKeyForPerson(fname)
  {
    var res = fname.split(" ");
    var firstname = res[0];
    var lastname= '';
    for(i =1; i < res.length;i++)
    {
      if(i == 1)
      {
        lastname+= res[i];
      } 
      else
      {
        lastname += ' '+ res[i];
      }
    }
    Service.getTrip(this.state.tripId).then((trip)=>{
        for(let p of trip.participants){
            if(p.firstName== firstname&& p.lastName== lastname)
            {
                this.setState({selectedParticipantId: p.personId});
            }
        }
    });
  }
  onChangedNrPayed(text){
    let newText = '';
    let numbers = '0123456789,';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            Alert.alert("please enter numbers only");
        }
    }
    this.setState({ participantpayed: newText });
  }
  loadParticpantsPickerItems(){
      items =[];
      for(let p of this.state.participants)
      {
          items.push(<Picker.Item label={p.key} value={p.key} key={p.id}/>);
      }
      return items;
  }
  AddPayer()
  {
    if(this.state.participantpayed.trim() != ''){

    
    items = this.state.payers;
    let init= false
    var counter = 0;
    for(let t of items)
    {
        if(t.id == this.state.selectedParticipantId)
        {
          items[counter]= {key: this.state.selectedParticipant, id: this.state.selectedParticipantId, payed: this.state.participantpayed};
          init = true;
        }
        counter++;
    }
    if(!init)
    {
        items.push({key: this.state.selectedParticipant, id: this.state.selectedParticipantId, payed: this.state.participantpayed});
    }
    this.setState({payers: items});
  }
  }
  AddPayersToTrip()
  {
    var typescript_map_1 = require("../../../node_modules/typescript-map");
    payerslist = new typescript_map_1.TSMap();
    for(let payer of this.state.payers)
    {
        payerslist.set(payer.id,payer.payed);
    }
    console.log(payerslist);
    
    Service.addPayersToExpense(this.state.tripId,this.state.expenseId, payerslist).then(()=>{
        this.props.navigation.state.params.onNavigateBack(true);
        this.props.navigation.goBack();
    });
  }
}
 const styles = StyleSheet.create(
      { 
        dropText:{
            fontSize: 18,
            fontWeight: 'bold',
          },
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
        paddingTop: 10,
        paddingBottom: 10,
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
  /*AddTrip= StackNavigator(
    {
    Actual:
    {        
      screen: AddTrip,     
    },
    Terug:
    {
      screen: TripsOverzichtScreen,
    }
   
    
  },
  {
    headerMode : 'none',
  });
 // export default AddTrip;
// skip this line if using Create React Native App
*/