import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert, Picker,ListView, FlatList, ScrollView} from 'react-native';
import TableRow from 'react-native-table-row';
//import TripsOverzichtScreen from '../overzicht/index';
import { StackNavigator } from 'react-navigation';
//import PersonScreen from '../person';
import DatePicker from 'react-native-datepicker';
//import {Trip} from '../../domain/trip'
//import Overzicht from '../overzichtscreen';
import {LocalStorage} from '../../../domain/localStorage';
import {Service as Service} from '../../../domain/service';
import {Person} from '../../../domain/person';
import {Expense} from '../../../domain/expense';
import {Category} from '../../../domain/category';
export default class AddExpenseScreen extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    this.state = {date: today, name: '',categories:[], category : '', currency: 'EUR', particpant: '', participants : [],participantconsumed: '', payer: '', payers: [], payedamount:'',trippersons:[]};
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
    //this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
    //console.log(this.datumlimits.max);
    //console.log(this.datumlimits.min);
    
  }
  componentDidMount()
  {
    this.loadTripPersons();
    this.getAllCategories();
  }
  setState(state)
  {
    super.setState(state);
  }
  loadTripPersons(){
    console.log(this.props.navigation.state.params.tripId);
    Service.getTrip(this.props.navigation.state.params.tripId).then((trip)=>{
      var items =[];
      var first = false;
      for(let p of trip.participants){
        
        let fname = p.firstname + ' '+p.name;
        if(!first)
        {
          this.setState({particpant: fname});
          first= true;
        }
        items.push({key: fname, firstname: p.firstname, name: p.name});
      }
      this.setState({trippersons: items});
    });
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
  <Text style={styles.dropText}>Category: </Text>
  <Picker
  selectedValue={this.state.category}
  onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
{this.loadPickerItemsCategory()}
</Picker>
  <Text style={styles.dropText}>Date: </Text>
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
{this.loadPickerItems()}
</Picker>
<Text style={styles.dropText}>Amount consumed: </Text>
  <TextInput style={ {height:40} }
   keyboardType='numeric'
   onChangeText={(text)=> this.onChangedNrConsumed(text)}
   value={this.state.participantconsumed}
   maxLength={10} />
<Button color='#4d9280' 
 onPress={() => this.AddParticpant()}
  title="Add participant"
  
/>
<Text style={styles.dropText}>Participants: </Text>
<FlatList
        data={this.state.participants}
        extraData={this.state}
        renderItem={({item}) => <Text style={styles.row}>Name: {item.key}  {"\n"}Amount consumed: {item.consumed}</Text>}
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
          renderItem={({item}) => <Text style={styles.row}>Name: {item.key}    Amount payed: {item.amount}</Text>}
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
  loadPickerItems()
  {
    items=[];
    for(let item of this.state.trippersons){
     //console.log(item.key);
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
    return items;
  }
  loadPickerItemsCategory()
  {
    items=[];
    for(let item of this.state.categories){
     //console.log(item.key);
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
    return items;
  }
  AddPayer()
  {
    var pa = this.state.payers
    pa.push({key: this.state.payer, amount: this.state.payedamount});
    
    this.setState({payers: pa});
  }
  getAllCategories(){
    items=[];
 
   // console.log( Category[0]);
   //console.log('nofreonf '+Category.length);
   var reg = new RegExp('^[0-9]+$');
    for(var cat in Category)
    {
     if(cat.match(reg)){
       items.push({key: Category[cat]});
     }
    }
    console.log(items);
    this.setState({categories: items});
    let b = Category[0];
    this.setState({category: b})
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
  }
  renderPar(){
   
    items=[];
    for(let item of this.state.participants){
     
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
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
    p.push({key: this.state.particpant, consumed: this.state.participantconsumed});
    this.setState({participants:p});
    this.setState({payer: this.state.particpant})
  }
  }
  AddExpense()
  {
    var typescript_map_1 = require("../../../node_modules/typescript-map");
     parlist  = new typescript_map_1.TSMap();
     for(let p of this.state.participants)
     {
      var res = p.key.split(" ");
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
     // console.log(firstname+' ' +lastname);
      let person = new Person(firstname,lastname);
     parlist.set(person,p.consumed);
     }
     payerslist = new typescript_map_1.TSMap();
     for(let payer of this.state.payers)
     {
      var rese = payer.key.split(' ');
      var firstnamee = rese[0];
      var lastnamee= '';
      for(i=1; i < rese.length;i++)
      {
        //console.log('nRZO%ND '+ rese.length);
        //console.log('jrje '+i);
       // console.log(i+ ' '+ rese[i]);
        if(i == 1)
        {
         // console.log('rfbnpeziqnfi '+ rese[i]);
          lastnamee+= rese[i];
        } 
        else
        {
         // console.log('rfbnpeziqnfi '+ rese[i]);
          lastnamee += ' '+ rese[i];
        }
      }
      //console.log('nfzjmr '+ firstnamee + ' ' + lastnamee);
      let persone = new Person(firstnamee,lastnamee);
     // console.log('tel me op');
     payerslist.set(persone,payer.amount);
     }
     
     let exp = new Expense(this.state.name, this.state.date,payerslist,parlist,this.state.category, currency);
     
     //console.log(payerslist.size());
  
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
