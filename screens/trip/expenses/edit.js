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

export default class EditExpenseScreen extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    var today = datum.getFullYear() + '-' +(datum.getMonth()+1)+'-'+datum.getDate();
    this.state = {tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,startDateTrip: '', endDateTrip: '',date: '', name: '',categories:[], category : '', currency: '', currencies:[]};
   
    //this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
    //console.log(this.datumlimits.max);
    //console.log(this.datumlimits.min);
    
  }
  componentDidMount()
  {
    this.getStates();
    this.getAllCategories();
    
    //this.getAllCurrencies();
  }
  setState(state)
  {
    super.setState(state);
    console.log(`Set state to ${JSON.stringify(state)}`);
  }
  getStates()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
      this.setState({startDateTrip: trip.startDate});
      this.setState({endDateTrip: trip.endDate});
      this.setState({currency: trip.standardCurrency});
      for(let e of trip.expenses)
      {
       // console.log('dxcfygh '+e.expenseId+ ' , '+ this.state.expenseId);
        if(e.expenseId == this.state.expenseId)
        {
          //console.log('efzbiphu '+e.name);
          this.setState({name: e.name});
          this.setState({date: e.date})
        }
      }
    });
  }
  getAllCategories(){
    items=[];
    var reg = new RegExp('^[0-9]+$');
    for(var cat in Category)
    {
      if(cat.match(reg)){
        items.push({key: Category[cat]});
      }
    }
    //console.log(items);
    this.setState({categories: items});
    let b = Category[0];
    this.setState({category: b})
  }
  getAllCurrencies()
  {
    
   /* CurrencyLocalStorage.getAllCurrenciesPossible().then((currencies)=>{
      var first= false;
      items =[];
      for(let c of currencies)
      {
       if(!first)
       {
         first= true;
         this.setState({currency: c});
       }
       items.push({key: c});
      }
      this.setState({currencies: items});
    });*/
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
  <TextInput style={ {height:40} } value={this.state.name} placeholder="Type hier de naam van uw expense!" onChangeText={(text) => this.setState({name:text})}/>
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

<Text style={styles.dropText}>Currency: </Text>
<Picker
  selectedValue={this.state.currency}
  onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
  <Picker.Item label="EUR" value="EUR"/> 
  <Picker.Item label="USD" value="USD"/> 
</Picker>
<View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.editExpense()}
  title="Voeg expense toe"
  
/>
</View>
    </ScrollView>
    );
  }
  editExpense()
  {
    Service.editExpenseFromTrip(this.state.tripId, this.state.expenseId,this.state.name, this.state.date, this.state.currency, this.state.category).then(()=>{
      this.props.navigation.state.params.onNavigateBack(true);
      this.props.navigation.goBack();
    });
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
  loadPickerItemsCurrency()
  {
    items=[];
    for(let item of this.state.currencies){
     //console.log(item.key);
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
    return items;
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
