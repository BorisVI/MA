import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert, Picker,ListView, FlatList, ScrollView} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
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
  }
  componentDidMount()
  {
    this.getStates();
    this.getAllCategories();
    this.getAllCurrencies();
  }
  setState(state)
  {
    super.setState(state);
  }
  getStates()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
      let startdate= new Date(trip.startDate);
      let startdates = startdate.getFullYear()+'-'+ (startdate.getMonth()+1)+'-'+ startdate.getDate();
      let enddate = new Date(trip.endDate);
      let enddates = enddate.getFullYear()+'-'+ (enddate.getMonth()+1)+'-'+ enddate.getDate();
      this.setState({startDateTrip: startdates});
      this.setState({endDateTrip: enddates});
    });
    Service.getExpenseById(this.state.tripId, this.state.expenseId).then((expense)=>{
      this.setState({name: expense.name});
      let tdate= new Date(expense.date);
      let tdates = tdate.getFullYear()+'-'+ (tdate.getMonth()+1)+'-'+ tdate.getDate();
      this.setState({date: tdates});
      this.setState({category: expense.category});
      this.setState({currency: expense.currency});
    });
  }
  getAllCategories(){
    items=[];
   let categories = Service.getAllCatergories();
   for(let cat of categories)
   {
    items.push({key: cat});
   }
    this.setState({categories: items});
  }
  getAllCurrencies()
  {
    let list = Service.getAllCurrencyTypes();
      var first= false;
      items =[];
      for(let c of list)
      {
       if(!first)
       {
         first= true;
         this.setState({currency: c});
       }
       items.push({key: c});
      }
      this.setState({currencies: items});
  
  }
  static navigationOptions = {
    
    title:'Edit expense',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
 
  render() {
    return (
    <ScrollView style={styles.container}>
    <Text style={styles.dropText}>Expense name: </Text>
  <TextInput style={ {height:40} } value={this.state.name} placeholder="Enter here the name of your expense!" onChangeText={(text) => this.setState({name:text})}/>
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
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

<Text style={styles.dropText}>Currency: </Text>
<Picker
  selectedValue={this.state.currency}
  onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
 { this.loadPickerItemsCurrency() }
</Picker>
<View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.editExpense()}
  title="Edit expense"
  
/>
</View>
    </ScrollView>
    );
  }
  editExpense()
  {
    var splitdate = this.state.date.split("-");
    var datemonth = parseInt(splitdate[1]) -1;
    Service.editExpenseFromTrip(this.state.tripId, this.state.expenseId,this.state.name, new Date(splitdate[0],datemonth, splitdate[2]), this.state.currency, this.state.category).then(()=>{
      this.props.navigation.state.params.onNavigateBack(true);
      this.props.navigation.goBack();
    });
  }
  loadPickerItemsCategory()
  {
    items=[];
    for(let item of this.state.categories)
    {
      items.push(<Picker.Item key={item.key} label={item.key} value={item.key}/>);
    }
    return items;
  }
  loadPickerItemsCurrency()
  {
    items=[];
    for(let item of this.state.currencies){
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
