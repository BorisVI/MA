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

export default class AddConsumerScreen extends Component {
  constructor(props){
    super(props);
    this.state = {tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.state.params.expenseId, participants:[], selectedParticipant:'', selectedParticipantId:'',participantconsumed:'',consumers:[]};
   
  }
  componentDidMount()
  {
      this.loadParticipantsList();
  }
  setState(state)
  {
      super.setState(state);
      console.log(`Set state to ${JSON.stringify(state)}`);
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
   
        this.setState({selectedParticipant: this.state.participants[0].key, selectedParticipantId: this.state.participants[0].id});
    });
  }
  static navigationOptions = {
    
    title:'Add a person',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text style={styles.dropText}>Select consumer: </Text>
<Picker
  selectedValue={this.state.selectedParticipant}
  onValueChange={(itemValue, itemIndex) => {this.setState({selectedParticipant: itemValue}); this.setKeyForPerson(itemValue)}}>
{this.loadParticpantsPickerItems()}
</Picker>
<Text style={styles.dropText}>Amount consumed: </Text>
  <TextInput style={ {height:40} }
   keyboardType='numeric'
   onChangeText={(text)=> this.onChangedNrConsumed(text)}
   value={this.state.participantconsumed}
   maxLength={10} />
<Button color='#4d9280' 
 onPress={() => this.AddConsumer()}
  title="Add consumer"  
/>
<Text style={styles.dropText}>Participants: </Text>
<FlatList
        data={this.state.consumers}
        extraData={this.state}
        renderItem={({item}) => <Text style={styles.row}>Name: {item.key}  {"\n"}Amount consumed: {item.consumed}</Text>}
      />
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddConsumersToTrip()}
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
  onChangedNrConsumed(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            Alert.alert("please enter numbers only");
        }
    }
    this.setState({ participantconsumed: newText });
  }
  loadParticpantsPickerItems(){
      items =[];
      for(let p of this.state.participants)
      {
          items.push(<Picker.Item label={p.key} value={p.key} key={p.id}/>);
      }
      return items;
  }
  AddConsumer()
  {
 
    items = this.state.consumers;
    let notinit= false
    for(let t of items)
    {
        if(t.id == this.state.selectedParticipantId)
        {
            notinit = true;
        }
    }
    if(!notinit && this.state.participantconsumed.trim() != ''){

        items.push({key: this.state.selectedParticipant, id: this.state.selectedParticipantId, consumed: this.state.participantconsumed});
        this.setState({consumers: items});
    }

  }
  AddConsumersToTrip()
  {
    var typescript_map_1 = require("../../../node_modules/typescript-map");
    consumerslist = new typescript_map_1.TSMap();
    for(let consumer of this.state.consumers)
    {
        consumerslist.set(consumer.id,consumer.consumed);
    }
    Service.addConsumersToExpense(this.state.tripId,this.state.expenseId, consumerslist).then(()=>{
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