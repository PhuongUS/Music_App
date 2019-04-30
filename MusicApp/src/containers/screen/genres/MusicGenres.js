import React, { Component } from 'react';
import{View,Text,StyleSheet} from 'react-native';

export default class MusicGenres extends Component{
    constructor(props){
        super(props)
        this.state={
            dataItem:this.props.navigation.getParam('item')
        }
    }
    render(){
        console.log(this.state.dataItem)
        return(
            <View>
                <Text>this is Music View</Text>
            </View>
        )
    }
}