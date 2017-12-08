import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
//import {Icon} from 'react-native-vector-icons/Entypo'; // 4.4.2
//import Entypo from 'react-native-vector-icons/Entypo';
  
class PersonInfo extends React.Component {  
  constructor(props)
  {
    super(props);
    this.person = {id : this.props.navigation.state.params.personId};
    console.log(this.props.navigation.state.params.personId);
  }
  
    static navigationOptions = {
      title:'Person Details',
      headerStyle: { backgroundColor: '#4d9280', borderWidth: 1, borderBottomColor: 'white' },
      headerTintColor :'#fff',
    };
  render() {
    const id = this.person.id;
    return (
      <View style={styles.container}>
      <Text>{id}</Text>
      </View>
    );
  }
}
 const styles = StyleSheet.create(
      { 
      container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
 export default PersonInfo; 




