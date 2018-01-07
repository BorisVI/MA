import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert,Picker,FlatList} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Service as Service} from '../../../domain/service';
import {Person} from '../../../domain/person.js';
import {Trip} from '../../../domain/trip';
import CheckBox from 'react-native-check-box';

export default class AssignItems extends Component {
  constructor(props){
    super(props);
    this.state = {tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.state.params.expenseId, participants:[], particpantsToItem:[]};
   
  }
  componentDidMount()
  {
   // this.loadConsumersToExpnse();
      this.loadParticipantsList();
  }
  setState(state)
  {
      super.setState(state);
  }
  loadParticipantsList()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
      items= [];
      already=[];
      for(let p of trip.participants)
      {
        if(this.alreadyConsumer(p.personId)){

          var fname = p.firstName + ' '+ p.lastName;
        items.push({key: fname, id: p.personId, isChecked: true});
        }else{
        var fname = p.firstName + ' '+ p.lastName;
        items.push({key: fname, id: p.personId, isChecked: false});
        }
      }
      this.setState({participants: items});
      
    });
  }
loadConsumersToExpnse()
  {
    Service.getConsumersFromExpense(this.state.tripId, this.state.expenseId).then((payers)=>{
      items=[];
      payers.forEach((value, key)=>{
       items.push({key: key[0]});
      });
      this.setState({particpantsToExpense: items});
    });
  
  }
  alreadyConsumer(id)
  {
    var result = false;
    /*for(let p of this.state.particpantsToExpense)
    {
      if(p.key== id){
        result = true;
      }
    }*/
    return result;
  }
  static navigationOptions = {
    
    title:'Split evenly',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text style={styles.dropText}>Select persons who particpated to this item: </Text>
<FlatList
        data={this.state.participants}
        extraData={this.state}
        renderItem={({item}) =><CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.CheckBoxChange(item.id)}
        isChecked={item.isChecked} leftText={item.key}/>}
      />

<Button color='#4d9280' 
 onPress={() => this.splitByTheBill()}
  title="Apply"  
/>

  </View>
    
    );
  }
  splitByTheBill()
  {
      
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
 
  getIdsAsArray()
  {
    var result = [];
    for(let t of this.state.particpantsToExpense)
    {
      result.push(t.key);
    }
    return result;    
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