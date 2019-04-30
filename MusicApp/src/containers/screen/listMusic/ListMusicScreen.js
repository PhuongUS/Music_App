import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions,FlatList} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
const {height, width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    
    dataAlbum:state.getAbumReducer.data,
})
class ListMusicScreen extends Component{
    constructor(props){
        super(props),
        this.state={
            data:this.props.navigation.getParam('data')
        }
    }
    onPress=(index)=>{
        this.props.navigation.navigate('MusicDetail',{items:this.state.data.tracks.items,index:index})
    }
    renderItem = (item,index) =>{
        return( 

                <TouchableOpacity onPress={()=>this.onPress(index)} style={styles.frame_item}>
                    <View style={styles.frame_index}>
                        <Text style={styles.index}>{index +1}</Text>
                    </View>
                    <View style={styles.frame_name}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
           
            
        )
      }
    render(){
        console.log(this.state.data)
        return(
            
            <View style={styles.container}>
                   <FastImage style={styles.banner} source={require('../../../assets/images/Bitmap3.png')}>
                        
                        </FastImage>
                        <View style={styles.list_track}>
                            <View style={styles.frame_title}>
                                <Text style={styles.title}>Playlist</Text>
                            </View> 
    
                            <FlatList
                                data={this.state.data.tracks.items}
                                keyExtractor={({id}, index) => id}
                                renderItem={({item,index})=>this.renderItem(item,index)}>
                            </FlatList>
                        </View>
        
                        <View style={styles.frame_banner} >
                            <Image style={styles.banner1} source={require('../../../assets/images/Oval1.png')}/>
                            <Image style={styles.banner2} source={require('../../../assets/images/Oval1.png')}/>
                            <Image style={styles.banner3} source={require('../../../assets/images/Oval1.png')}/>
                            <FastImage style={styles.banner4} source={{uri:this.state.data.images[1].url}}></FastImage>               
                        </View>
                        <View style={styles.frame_artist}>
                            <Text style={styles.tt_album}>Album</Text>
                            <Text style={styles.tt_name}>{this.state.data.name}</Text>
                        </View>
                        <View style={styles.frame_icon}>
                            <View style={styles.icon}>
                                <Image style={styles.icon_heart} source={require('../../../assets/images/ic_heart.png')}></Image>
                            </View>
                            <TouchableOpacity style={styles.play} onPress={()=>this.onPress(0)}>
                                <Image style={styles.icon_play} source={require('../../../assets/images/ic_play2.png')}></Image>
                            </TouchableOpacity>
                            <View style={styles.icon}>
                                <Image style={styles.icon_arrow} source={require('../../../assets/images/ic_arrow.png')}></Image>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button_back} 
                                 onPress={()=>this.props.navigation.navigate('Home')}>
                                 <Image style={styles.icon_back} source={require('../../../assets/images/ic_hide_songs2.png')}></Image>
                        </TouchableOpacity>
            </View>
        )
    }
}
export default connect(mapStateToProps)(ListMusicScreen)
const styles=StyleSheet.create({
    container:{
        flex: 1, 
        borderBottomWidth: 0.25,

    },
    button_back:{
        position: 'absolute',
        marginTop:30,
        marginLeft:20
    },
    icon_back:{
        width:15,
        height:25,
        // marginTop: 5
    },
    frame_banner: {
        position: 'absolute',
        width: width,
        alignItems: 'center',
        justifyContent: 'center',

    },
    banner: {
        height: 270,
        // justifyContent: 'center',

    },
    banner1: {
        height: 300,
        width:300,
        justifyContent: 'center',
        color:'white',
        tintColor: 'black'


    },
    banner2: {
        height: 230, 
        width:230,
        position: 'absolute',
        tintColor: 'white'


    },
    banner3: {
        height: 160, 
        width: 160,
        position: 'absolute',
        tintColor: 'white'

    },
    banner4: {
        height: 120, width: 120,
        position: 'absolute',
        tintColor: 'white',
        borderRadius: 60,


    },
    frame_artist: {
        position: 'absolute',
        marginTop:55,
        // marginLeft:140,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        width:'100%',
        height:40,
        paddingBottom:20,
        


    },tt_album:{
        fontFamily:'Gotham-Light',
        color: '#FFFFFF',
        fontSize:12,
        textAlign: 'center',
    },
    tt_name:{
        fontFamily:'Gotham-Light',
        color: '#FFFFFF',
        fontSize:15,
        textAlign: 'center',
        
    },
    artist:{
        fontFamily:'Gotham-Light',
        color: '#FFFFFF',
        fontSize:15

    },
    frame_icon:{
        flex:1,
        flexDirection: 'row',
        position:'absolute',
        marginTop:230,
        marginLeft:90,


    },
    icon:{
        borderColor: '#FFFFFF',
        borderWidth:1,
        borderRadius:50,
        backgroundColor:'gray',
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginRight: 10,

    },
    icon_heart:{
        width:20,
        height:15

    },
    icon_arrow:{
        width:17,
        height:22

    },
    play:{
        borderColor:'#FFFFFF',
        borderWidth:1,
        borderRadius:50,
        backgroundColor:'gray',
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        marginRight: 10,

    },
    icon_play:{
        width:18,
        height:28

    },
    
    frame_item:{
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        borderColor:'gray',
        height:55,
        paddingLeft:10,
        // paddingTop: 20,
        // paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',

        
    },
    frame_index:{
        // flex:1,

    },
    index:{
        fontSize:15,
        paddingRight:20

    },
    frame_title:{
        marginLeft:10,

    },
    title:{
        fontFamily:'Gotham-Book',
        fontSize:20

    },
    list_track:{
        marginTop: 45,
        margin: 30
        
    },
    frame_name:{
        flex:2,
    },
    name:{
        fontFamily:'Gotham Medium',
        fontSize: 15,
    },
    frame_artistName: {
        flex:1,

    },
    artistName:{
        fontFamily:'Gotham-Book',
        fontSize: 12,
    }
})