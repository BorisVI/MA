import React from 'react';
import { StyleSheet, Text, View,Image, StatusBar,Alert, FlatList } from 'react-native';
//import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 4.4.2
import Entypo from 'react-native-vector-icons/Entypo';
//import HomeScreen from './screensstartPagina';
//import SecondScreen from './second';
//import Row from 'react-native-row';
//import 'react-table/react-table.css';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import { Service as Service} from '../../../domain/service';
//import { Trip } from '../../domain/trip';

//import { Person } from '../../domain/person';
import {NavigationActions } from 'react-navigation';

 class LoansOverview extends React.Component{
   constructor(props)
   {
    super(props);
  
    this.state = {tripId: this.props.navigation.state.params.tripId, expenseId: this.props.navigation.state.params.expenseId,loans: []};
    //console.log('hehe');
   
    //console.log('jnbfgszro');
  }
  /*handleOnNavigateBack= (b) => {
    this.storeTripsLocaly();
  }*/
  componentDidMount()
  {
    this.getAllLoans();
  }
  getAllLoans() 
  {
    //console.log(this.state.tripId, this.state.expenseId);
    Service.getLoans(this.state.tripId, this.state.expenseId).then((response)=>{
      items=[];
      for(let l of response){
var textl = l.payer + 'need to pay ' + l.receiver + ' ' + l.amount;
console.log(l.payed);
        items.push({text: textl, key:l.loanId, payed: l.payed});
      }
      this.setState({loans:items});
    });
   // console.log('hybuezaf');
    //set state for loans[]
  }
  static navigationOptions = {
   
      title: 'Loans overview',
      headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
      headerTintColor :'#fff',
}

  render() {
    
    return (
    /*  <View style={styles.container}>
            <StatusBar hidden={true}/> 
           <TableRow style={styles.row} title={'trip 1'} showArrow={true} onPress={() => this.goToTrip('trip 1')}></TableRow>
            <TableRow style={styles.row} title={'trip 2'} showArrow={true}  onPress={() => this.goToTrip('trip 2')}></TableRow>
            <TableRow style={styles.row} title={'trip 3'} showArrow={true}  onPress={() => this.goToTrip('whoehoe')}></TableRow>
            <MaterialIcons
        name={'add-box'}
        size={50}
        style={styles.addButton}
        onPress={() => this.goToAdd()}/>

        </View>*/
        <View style={styles.container}>
        <StatusBar hidden={true}/> 
        <FlatList
          data={this.state.loans}
          renderItem={({item}) => <TableRow style={styles.row} titleStyle={styles.rowTitle} title={item.text} key={item.key} 
          subElement={item.payed ? <MaterialIcons name="done" size={40}
          style={styles.addButton}
          onPress={() => Alert.alert("Already payed")}/>:  <MaterialIcons name="payment" size={40}
          style={styles.addButton} onPress={()=>{this.pay(item.key)}} />}></TableRow>}
        />
       
        </View>
    );
  }
  pay(id)
  {
    //pay the
    Alert.alert("I know you want to pay but pls w8 a sec");
  }
  fillList()
  {
    items=[];
    for(let item of this.state.trips)
    {
      items.push(<TableRow style={styles.row} title={item.name} key={item.key} showArrow={true} onPress={() => this.goToTrip(item.key)}/>);
    }
    return items;
  }
  goToAdd()
  {
    this.props.navigation.navigate('Add', {onNavigateBack: this.handleOnNavigateBack});

  }
  goToTrip(tripId)
  {
    this.props.navigation.navigate('Trip',{tripId,onNavigateBack: this.handleOnNavigateBack});
  }

}

const styles = StyleSheet.create(
  { 
    rowTitle:{
      marginLeft:40,
    },
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
titleText: {
  fontSize: 20,
  fontWeight: 'bold',
},
row: {
 
  paddingTop: 25,
  paddingBottom: 25,
},
addButton: {
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: 0,
  paddingBottom: 10,
  paddingRight: 10,
  color: '#4d9280',
},
});



export default LoansOverview;
//export default Overzicht;
/*const RootTabs = TabNavigator(
  {
  Home: {
    screen: HomeScreen,
    
  },
  Second: {
    screen: SecondScreen,
  },
 
},
{ 
  tabBarPosition: 'top',
  tabBarOptions: {
  showIcon:true,
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#4d9280',
  },
}}
);*/

//export default RootTabs;


