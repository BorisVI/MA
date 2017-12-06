import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


  class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>2+2=4 </Text>
        <Text style={styles.titleText}>En Kevin is te lelijk </Text>
      </View>
    );
  } 
}
    const styles = StyleSheet.create({ container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
 export default Home; 




