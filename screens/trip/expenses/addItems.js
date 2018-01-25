import React, { Component } from 'react';
import { AppRegistry, Image, View, Text,StyleSheet, TextInput,Button ,Alert, FlatList,ScrollView} from 'react-native';
import TableRow from 'react-native-table-row';
import { StackNavigator } from 'react-navigation';
import { Service as Service} from '../../../domain/service';
import CheckBox from 'react-native-check-box';
import CheckboxField from 'react-native-checkbox-field';

export default class AddItem extends Component {
  constructor(props){
    super(props);
    var datum = new Date();
    this.state = {name: '',tripId: this.props.navigation.state.params.tripId,expenseId: this.props.navigation.state.params.expenseId, itemPrice:'', isShared: false, participants:[], participantsToItem:[],billItems:[]};

  }
  componentDidMount()
  {
   
    this.setState({name: '', itemPrice: '', participantsToItem:[],participants: [], isShared:false});
    this.loadParticipants();
  }
 
  loadParticipants()
  {
    Service.getTrip(this.state.tripId).then((trip)=>{
      items= [];
      already=[];
      for(let p of trip.participants)
      {
        var fname = p.firstName + ' '+ p.lastName;
        items.push({key: fname, id: p.personId, isChecked: false});
      }
      this.setState({participants: items});
      
    });

  }
  setState(state)
  {
    super.setState(state);
    console.log(JSON.stringify(state));
  }
  static navigationOptions = {
    
    title:'Add an item',
    headerStyle: { backgroundColor: '#4d9280', borderWidth: 0, shadowColor: 'transparent'},
    headerTintColor :'#fff',
  };
  render() {
    return (
      <ScrollView style={styles.container}>
     
      <Text style={styles.dropText}>Item name: </Text>
      <TextInput style={ {height:40} } value={this.state.name} placeholder="Enter here the name of your item!" onChangeText={(text) => this.setState({name:text})}/>
      <Text style={styles.dropText}>Item price: </Text>
      <TextInput style={ {height:40} }  value={this.state.itemPrice} keyboardType='numeric' maxLength={10} placeholder="Enter here the price of your item!" onChangeText={(text) => this.onChangedPrice(text)}/>
      <Text style={styles.dropText}>Shared/not shared</Text>
      <CheckboxField style={{ padding: 10}} extraData={this.state}  onSelect={()=>this.setState({isShared: !this.state.isShared})} selected={this.state.isShared} label="shared" labelSide="left" />
      <Text style={styles.dropText}>Consumers of this item: </Text>
      <FlatList
        data={this.state.participants}
        extraData={this.state}
        renderItem={({item}) =><CheckBox style={{paddingBottom: 10}} onClick={()=>this.CheckBoxChange(item.id)}
        isChecked={item.isChecked} leftText={item.key}/>}
      />
      <Text style={styles.dropText}>Bill overview: </Text>
<FlatList
        data={this.state.billItems}
        extraData={this.state}
        renderItem={({item}) => <Text style={styles.row}>Item: {item.key} ,  price: {item.price} {"\n"} {item.isShared? "shared":"not shared"}, persons:
        {item.consumers.length}</Text> }
      
      
      />
    <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.addItemAndClear()}
  title="Add Item"
  
/>
  </View>
  <View style={styles.buttonStyle}>
      <Button color='#4d9280' 
 onPress={() => this.finishBill()}
  title="Finish the bill"
  
/>
  </View>
    
    </ScrollView>
    );
  }

  finishBill(){
    if(this.state.name.trim() != ""  ||this.state.itemPrice.trim() != "" || this.state.participantsToItem.length > 0)
    {
      
      Alert.alert("Item is not added, please first add the item to the bill and then finish the bill");
    }
    else
    {
     
      Service.finalizeBill(this.state.tripId, this.state.expenseId, JSON.stringify(this.state.billItems)).then(()=>{
        this.props.navigation.state.params.onNavigateBack(true);
        this.props.navigation.goBack();
      });
      console.log(JSON.stringify(this.state.billItems));
    }
  }
  addItemAndClear()
  {
    //console.log('Item name:' +this.state.name+ ', price: '+ this.state.itemPrice +', shared: '+this.state.isShared+ ",persons:"+ this.state.participantsToItem);
    if(this.state.name.trim() != ""  &&this.state.itemPrice.trim() != "" && this.state.participantsToItem.length> 0)
    {
      let items = this.state.billItems;
      items.push({key: this.state.name, price: this.state.itemPrice, consumers: this.state.participantsToItem, isShared: this.state.isShared});
     
      this.componentDidMount();
    
    }
    else
    {
      Alert.alert("Item is not complete")
    }
  }

  CheckBoxChange(id)
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
    
   
    result= [];
    for(let t of items)
    {
        if(t.isChecked){
            
            result.push({key: t.id});
        }
    }
    this.setState({participants:items})
    this.setState({participantsToItem: result});
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
      this.setState({itemPrice: newText});
    }
  AddItem()
  {
    if(this.state.name.trim() != ''&& this.state.itemPrice.trim()!= null)
    {
        
    console.log('Item: '+ this.state.name+ ', price: '+ this.state.itemPrice + ', isshared: '+ this.state.isShared);
    }else{
      Alert.alert("Name of the expense cannot be empty");
    }
  }
}
 const styles = StyleSheet.create(
    { 
      container: 
      {  
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
  
      objText: 
      {
        fontSize: 16,
        marginTop: 0,
        marginBottom: 5,
      },
      row: 
      {
        paddingTop: 25,
        paddingBottom: 25,
      },
      hText: 
      {
        fontSize: 16,
        marginTop: 0,
        marginBottom: 5,
        fontWeight: 'bold',
      },
      viewStyle: 
      {
        marginBottom :5,
      },
      buttonStyle: 
      {
       marginTop: 10,
       paddingTop: 10,
       marginBottom: 10,
       paddingBottom: 10,
      },
      dropText:{
        fontSize: 18,
        fontWeight: 'bold',
      },
  });