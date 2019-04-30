import React, { Component } from 'react';
import{View,Image,TouchableOpacity,Text,StyleSheet} from 'react-native'
export default class HeaderHome extends Component{
    render(){
        return(
            <View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'center',height:40,marginTop:30}}> 
                    <View   style={{width:'32%',justifyContent:'center'}} >
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                            <Image
                                source={require('../../../assets/images/menu.png')}
                                style={[styles.iconHeaderLeft, {tintColor: 'black'}]}
                            />  
                        </TouchableOpacity>
                    </View>
                    <View   style={{width:'32%',justifyContent:'center',alignItems:'center'}} >
                        <Text >BROWSE</Text>
                    </View>
                    <View   style={{ width:'32%',justifyContent:'center',alignItems: 'flex-end'}} >
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                        <Image
                            source={require('../../../assets/images/ic_search.png')}
                            style={[styles.iconHeaderRight, {tintColor: 'black'}]}
                        />  
                    </TouchableOpacity>
                    </View>
                    
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
         backgroundColor:'white'
    },
    iconHeaderLeft:{
        width:25,
        height:20,
        
    },
    iconHeaderRight:{
        width:20,
        height:20, 
          
    }
});