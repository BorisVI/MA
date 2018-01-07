import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import { Service as Service} from '../../../domain/service';
import CheckBox from 'react-native-check-box';

export default class AddItem extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    this.state = {name: '',tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.expenseId, expensePrice:'', isShared: false};

  }
  setState(state)
  {
    super.setState(state);
  }
  static navigationOptions = {
    
    title:'Add an item',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
    <View style={styles.container}>
    <Text>Item name: </Text>
  <TextInput style={ {height:40} } placeholder="Enter here the name of your item!" onChangeText={(text) => this.setState({name:text})}/>
  <Text>Item price: </Text>
  <TextInput style={ {height:40} }  keyboardType='numeric' maxLength={10} placeholder="Enter here the price of your item!" onChangeText={(text) => this.onChangedPrice(text)}/>
  <CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.setState({isShared: !this.state.isShared})}
        isChecked={this.state.isShared} leftText="shared"/>
      <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.AddItem()}
  title="Add item" />
  </View>
    </View>
    );
  }
  onChangedPrice(text){
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
              Alert.alert('Only one comma allowed');
            } else{

              newText = newText + text[i];
              comma=true;
            }
          }else{
            newText = newText + text[i];
          }
          
        }
        
        else {
            text='';
            Alert.alert("Please enter numbers only");
        }
      }
      this.setState({expensePrice: newText});
    }
  AddItem()
  {
    if(this.state.name.trim() != ''&& this.state.expensePrice.trim()!= null)
    {
        
    console.log('Item: '+ this.state.name+ ', price: '+ this.state.expensePrice+ ', isshared: '+ this.state.isShared);
    }else{
      Alert.alert("Name of the expense cannot be empty");
    }
  }
}
 const styles = StyleSheet.create(
      { 
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