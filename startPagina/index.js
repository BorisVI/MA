import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
//import {Icon} from 'react-native-vector-icons/Entypo'; // 4.4.2
import Entypo from 'react-native-vector-icons/Entypo';
  class Home extends React.Component {    
    static navigationOptions = {
      tabBarLabel: 'home',
  
      tabBarIcon: ({ tintColor }) => (
       /* <Image
          source={require('../img/home-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />*/
        <Entypo
        name={'home'}
        size={26}
        style={{ color: tintColor}}
      />
      ),
    };
  render() {
    
    return (
      <View style={styles.container}>
      <Image resizeMode="stretch" source={require('../img/logo.png')} style={{height: 150, width: 175}}/>
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
 export default Home; 




