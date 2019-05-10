import React, {Component} from 'react';
import { StyleSheet, View,StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import MainNavigator from './containers/main.router'
import MiniMusicScreen from './containers/screen/musicDetail/MiniMusicScreen'

 export default class App extends Component {
  render() {
        const AppContainer = createAppContainer(MainNavigator)
        console.disableYellowBox = true;
        console.log(this.props.showMini)
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                <AppContainer ref={ref => this.navigation = ref}/>
                <MiniMusicScreen></MiniMusicScreen>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
