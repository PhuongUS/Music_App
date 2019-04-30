import React, {Component} from 'react';
import {
    StyleSheet, View, StatusBar, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, Dimensions, Button
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import MiniMusicScreen from '../musicDetail/MiniMusicScreen'
import {getTrackArtist} from './actions/artists.action'


const {height, width} = Dimensions.get('window');
const mapStateToProps = (state) => ({
    dataToken: state.getTokenReducer.data,
    dataTrackArtist: state.getTrackArtistReducer.data,
})

class Track_ArtistScreen extends Component{
constructor(props){
        super(props);
        this.state={
            track_id: this.props.navigation.getParam('id')
        }};
       
componentDidMount(){
    this.props.dispatch(getTrackArtist(this.props.dataToken.access_token,this.state.track_id))
    
}
renderItem = (item,index) =>{
    console.log(item);
    return( 
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MusicDetail',{artistName:item.artists[0].name,name:item.name,music:item.preview_url})}>
            <View item={item} index={index} style={styles.frame_item}>
                <View style={styles.frame_index}>
                    <Text style={styles.index}>{index +1}</Text>
                </View>
                <View style={styles.frame_name}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.frame_artistName}>
                    <Text style={styles.artistName}>{item.artists[0].name}</Text>
                </View>

            </View>

        </TouchableOpacity>
        
        
    )
  }
  onPress=()=>{
      this.props.navigation.goBack()
  }
    render(){
        {
            console.log(this.props.dataTrackArtist)
            console.log(this.props.dataToken)

        }
        if (this.props.dataToken === null || this.props.dataTrackArtist=== null ) {
            return(
                <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
                    <ActivityIndicator/>
                </View>
            )
        }else
        return(
            <View style={styles.container }>
                    <FastImage style={styles.banner} source={require('../../../assets/images/Bitmap3.png')}>
                        
                    </FastImage>

                    <View style={styles.list_track}>
                        <View style={styles.frame_title}>
                            <Text style={styles.title}>Popular</Text>
                        </View> 
                        <FlatList
                            data={this.props.dataTrackArtist.tracks}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item,index})=>this.renderItem(item,index)}>
                        </FlatList>
                    </View>
    
                    <View style={styles.frame_banner} >
                        <Image style={styles.banner1} source={require('../../../assets/images/Oval1.png')}/>
                        <Image style={styles.banner2} source={require('../../../assets/images/Oval1.png')}/>
                        <Image style={styles.banner3} source={require('../../../assets/images/Oval1.png')}/>
                        <FastImage style={styles.banner4} source={{uri:this.props.navigation.getParam('img')}}></FastImage>               
                    </View>
                    <View style={styles.frame_artist}>
                        <Text style={styles.tt_name}>Artist</Text>
                        <Text style={styles.artist}>{this.props.navigation.getParam('name')}</Text>
                    </View>
                    <View style={styles.frame_icon}>
                        <View style={styles.icon}>
                            <Image style={styles.icon_heart} source={require('../../../assets/images/ic_heart.png')}></Image>
                        </View>
                        <View style={styles.play}>
                            <Image style={styles.icon_play} source={require('../../../assets/images/ic_play2.png')}></Image>
                        </View>
                        <View style={styles.icon}>
                            <Image style={styles.icon_arrow} source={require('../../../assets/images/ic_arrow.png')}></Image>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button_back} onPress={()=>this.props.navigation.navigate('Artist')}>
                             <Image style={styles.icon_back} source={require('../../../assets/images/ic_hide_songs2.png')}></Image>
                    </TouchableOpacity>
                    {/* <View style={styles.footer}> */}
                        <MiniMusicScreen/>
                    {/* </View> */}
                
           </View>
        );
    }
}
 export default connect(mapStateToProps)(Track_ArtistScreen)
const styles=StyleSheet.create({
    container:{
        flex: 1, 
        borderBottomWidth: 0.25,

    },
    footer:{
        flex:1

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
        height: 120,
         width: 120,
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
        


    },
    tt_name:{
        fontFamily:'Gotham-Light',
        color:'#FFFFFF',
        fontSize:12,
        textAlign: 'center',
    },
    artist:{
        fontFamily:'Gotham-Light',
        color: '#FFFFFF',
        fontSize:15,
        textAlign: 'center',


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
        paddingLeft:20,
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
        marginTop:15,
        paddingRight: 20

    },
    title:{
        fontFamily:'Gotham-Book',
        fontSize:20

    },
    list_track:{

        marginTop: 20,
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