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
import CheckBox from 'react-native-check-box';
//import Overzicht from '../overzichtscreen';

export default class SplitEvenly extends Component {
  constructor(props){
    super(props);
    this.state = {tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.state.params.expenseId, participants:[], particpantsToExpense:[],totalAmount:''};
   
  }
  componentDidMount()
  {
      this.loadParticipantsList();
    //  this.loadPayerslist();
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
        items.push({key: fname, id: key[0], payed: value, item});
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
            items.push({key: fname, id: p.personId, isChecked: false});
        }
        this.setState({participants: items});
        
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
    <Text style={styles.dropText}>Select persons who particpated to this expense: </Text>
<FlatList
        data={this.state.participants}
        extraData={this.state}
        renderItem={({item}) =><CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.CheckBoxChange(item.id)}
        isChecked={item.isChecked} leftText={item.key}/>}
      />


<Text style={styles.dropText}>Bill: </Text>
  <TextInput style={ {height:40} }
   keyboardType='numeric'
   onChangeText={(text)=> this.onChangedNrPayed(text)}
   value={this.state.participantpayed}
   maxLength={10} />
<Button color='#4d9280' 
 onPress={() => this.splitEvenly()}
  title="SPLIT"  
/>

  </View>
    
    );
  }
  CheckBoxChange(id){
    items= [];
    for(let t of this.state.participants )
    {
        if(t.id == id)
        { 
         if(t.isChecked == false){
          items.push({key: t.key, id:t.id, isChecked:true });
      } else
      {
          items.push({key: t.key, id:t.id, isChecked:false }); 
      }
        }
        else
        {
          items.push(t)
        }
    }
    
   
    result= [];
    for(let t of items)
    {
        if(t.isChecked){
            
            result.push({key: t.id});
        }
    }
    this.setState({participants:items})
    this.setState({particpantsToExpense: result});
  }
  setParticpantToOther(id)
  {
      items= [];
      for(let t of this.state.participants )
      {
          if(t.id == id)
          { 
           if(t.isChecked == false){
            items.push({key: t.key, id:t.id, isChecked:true });
        } else
        {
            items.push({key: t.key, id:t.id, isChecked:false }); 
        }
          }
          else
          {
            items.push(t)
          }
      }
      this.setState({participants:items})
  }
  splitEvenly()
  {
      console.log(this.state.particpantsToExpense +' , '+ this.state.participants +','+ this.state.totalAmount);
  }
  
  onChangedNrPayed(text){
    let newText = '';
    let numbers = '0123456789.';
    if(text[0]=='.')
    {
      newText = '0';
    }
    var comma = false;
    for (var i=0; i < text.length; i++) {
      if(text[i]==','){
        Alert.alert(', should be a .')
      }
       else if(numbers.indexOf(text[i]) > -1 ) {
          if(text[i]=='.'){
            if(comma){
              Alert.alert('only one comma allowed');
            } else{

              newText = newText + text[i];
              comma=true;
            }
          }else{
            newText = newText + text[i];
          }
          
        }
        
        else {
            // your call back function
            text='';
            Alert.alert("please enter numbers only");
           // break;
        }
    }
    this.setState({totalAmount: newText });
  }
  loadParticpantsPickerItems(){
      items =[];
      for(let p of this.state.participants)
      {
          items.push(<Picker.Item label={p.key} value={p.id} key={p.id}/>);
      }
      return items;
  }
  AddPayer()
  {
    if(this.state.participantpayed.trim() != ''){

    
    items = this.state.payers;
    let init= false;
    result= [];
    for(let t of items)
    {
        if(t.id == this.state.selectedParticipant)
        {
          var value = this.getNameForId(this.state.selectedParticipant);
          result.push({key: value, id: this.state.selectedParticipant, payed: this.state.participantpayed});
          init=true
        } else{
          result.push(t);
        }
        
    }
    if(!init)
    {
      var value = this.getNameForId(this.state.selectedParticipant);
        result.push({key: value, id: this.state.selectedParticipant, payed: this.state.participantpayed});
    }
    this.setState({payers: result});
  }
  }
  getNameForId(id)
  {
    var res = '';
    for(let p of this.state.participants)
    {
      if(p.id== id)
      {
        res= p.key;
      }
    }
    return res;
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