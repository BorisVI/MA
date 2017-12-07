import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Logo from '../logo'

 class Second extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
         <Text>4-1=3 </Text>
        <Text style={styles.titleText}>quick maths </Text>
        <Button title="Logo Karavaan" onPress={() => this.goToLogo()} />
      </View>
    );
  }
  
  goToLogo()
  {
    this.props.navigation.navigate('Logo');
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
  });
export default Second= StackNavigator(
  {
  Second: 
  {
    screen:Second,
  },
  Logo: 
  {
    screen: Logo,
  }
});


