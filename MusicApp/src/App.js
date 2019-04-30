import React, {Component} from 'react';
import { StyleSheet, View,StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import MainNavigator from './containers/main.router'

export default class App extends Component {
  render() {
    const AppContainer = createAppContainer(MainNavigator)
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <AppContainer ref={ref => this.navigation = ref}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
