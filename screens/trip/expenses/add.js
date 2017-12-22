import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert, Picker,ListView, FlatList, ScrollView} from 'react-native';
import TableRow from 'react-native-table-row';
//import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
//import PersonScreen from '../person';
import DatePicker from 'react-native-datepicker';
//import {Trip} from '../../domain/trip'
//import Overzicht from '../overzichtscreen';

export default class AddExpenseScreen extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    console.log(today);
    this.state = {date: today, name: '', category : '', currency: 'EUR', particpant: 'Jordy', participants : [], payer: '', payers: [], payedamount:''};
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
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
    //console.log(this.datumlimits.max);
    //console.log(this.datumlimits.min);
  }
  setState(state)
  {
    super.setState(state);
    console.log(`Set state to ${JSON.stringify(state)}`);
  }
  static navigationOptions = {
    
    title:'Add expense',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
 
  render() {
    return (
    <ScrollView style={styles.container}>
    <Text style={styles.dropText}>Expense name: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de naam van uw expense!" onChangeText={(text) => this.setState({name:text})}/>
  <Text style={styles.dropText}>Category name: </Text>
  <TextInput style={ {height:40} } placeholder="Type hier de naam van uw category!" onChangeText={(text) => this.setState({category:text})}/>
  <Text style={styles.dropText}>Datum: </Text>
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

<Text style={styles.dropText}>Currency: </Text>
<Picker
  selectedValue={this.state.currency}
  onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
  <Picker.Item label="EUR" value="EUR" />
  <Picker.Item label="USD" value="USD" />
</Picker>
<Text style={styles.dropText}>Select participants: </Text>

<Picker
  selectedValue={this.state.particpant}
  onValueChange={(itemValue, itemIndex) => this.setState({particpant: itemValue})}>
 <Picker.Item label="Jordy" value="Jordy" />
  <Picker.Item label="Boris" value="Boris" />
  <Picker.Item label="Kevin" value="Kevin" />
  <Picker.Item label="Thomas" value="Thomas" />
</Picker>

<Button color='#4d9280' 
 onPress={() => this.AddParticpant()}
  title="Add participant"
  
/>
<Text style={styles.dropText}>Participants: </Text>
<FlatList
        data={this.state.participants}
        extraData={this.state}
        renderItem={({item}) => <TableRow style={styles.row} title={item.key}></TableRow>}
      />
     
      <Text style={styles.dropText}>Select payer: </Text>
      <Picker selectedValue={this.state.payer}
  onValueChange={(itemValue, itemIndex) => this.setState({payer: itemValue})}
  >
  {this.renderPar()}
  </Picker>
  <Text style={styles.dropText}>Amount payed: </Text>
  <TextInput style={ {height:40} }
   keyboardType='numeric'
   onChangeText={(text)=> this.onChangedNr(text)}
   value={this.state.payedamount}
   maxLength={10} />
   <Button color='#4d9280' 
 onPress={() => this.AddPayer()}
  title="Add Payer"
  
/>
  <Text style={styles.dropText}>Payers: </Text>
  <FlatList
          data={this.state.payers}
          extraData={this.state}
          renderItem={({item}) => <Text style={styles.row}>Name: {item.key}    Amount: {item.amount}</Text>}
        />
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddExpense()}
  title="Voeg expense toe"
  
/>
  </View>
    </ScrollView>
    );
  }
  AddPayer()
  {
    var pa = this.state.payers
    pa.push({key: this.state.payer, amount: this.state.payedamount});
    this.setState({payers: pa});
    console.log(this.state.payers)
  }
  onChangedNr(text){
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
    this.setState({ payedamount: newText });
    console.log(this.state.payedamount);
  }
  renderPar(){
   
    items=[];
    for(let item of this.state.participants){
     
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
    console.log('test4');
    return items;
  }
  AddParticpant(){
    var p = this.state.participants;
    var bam = false;
    for(let item of this.state.participants)
    {
      if(item.key == this.state.particpant){
        bam = true;
      }
    }
    if(!bam){
    p.push({key: this.state.particpant});
    this.setState({participants:p});
    this.setState({payer: this.state.particpant})
    console.log(this.state.participants);
  }
  }
  AddExpense()
  {
   /* if(this.state.name != '')
    {
     // let tid = this.state.name+ this.state.date;
    //let t = new Trip(tid,this.state.name,this.state.startdate, this.state.enddate);
    //var alerttext= 'Trip naam: ' +`${this.state.name}` + ', Datum van de trip: ' +`${this.state.date}`;
    //Alert.alert(t);
    
    console.log(t.id + ' ' + t.name + ' ' + t.startdate + ' '+ t.enddate);
   this.props.navigation.goBack();
    }else{
      Alert.alert('Naam mag niet worden leeg gelaten');
    }*/
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
       paddingBottom:15,
      
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
