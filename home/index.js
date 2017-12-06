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
      <StatusBar hidden={true}/>
        <Text>2+2=4 skrrrrrrrrrrraaaaa</Text>
        <Text style={styles.titleText}>En Kevin is te lelijk voor woorden</Text>
       

      </View>
    );
  } 
}
    const styles = StyleSheet.create({ 
      container: 
      {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
        titleText: 
      {
        fontSize: 20,
        fontWeight: 'bold',
      },
  });
 export default Home; 




