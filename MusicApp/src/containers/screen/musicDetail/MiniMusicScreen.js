import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Slider} from 'react-native'
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
export default class MiniMusicScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                {/* <TouchableOpacity onPress={()=>this.navigation.navigate('MusicDetail')}> */}
                    <View style={styles.avatar}>
                        <FastImage style={styles.img_avatar} source={require('../../../assets/images/avatar_profile.png')}>

                        </FastImage>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.track_name}>YOUR MUSIC</Text>
                        <Text style={styles.artist_name}>ARTISTS</Text>
                    </View>
                    <View style={styles.icon}>
                        <TouchableOpacity>
                            <Image style={styles.icon_play} source={require('../../../assets/images/ic_play3.png')}></Image>
                        </TouchableOpacity>
                    </View>
                {/* </TouchableOpacity> */}
                
            </View>
        );_
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height:70,
        width:'100%',
        backgroundColor:'#FFF',
        position:'absolute',
        marginTop: 740,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        
    },
    avatar:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    img_avatar:{
        width:65,
        height:65
    },
    name:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    track_name:{
        fontFamily:'Gotham-Book',
        fontSize: 16,
    },
    artist_name:{
        fontFamily: 'Gotham-Book',
        fontSize: 13,
    },   
    icon:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_play:{
        width:45,
        height:45,
    }
})