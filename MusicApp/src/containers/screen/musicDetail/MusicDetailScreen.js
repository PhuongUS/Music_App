import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Slider,Platform,Alert,ActivityIndicator} from 'react-native'
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
import Sound from 'react-native-sound';
import {connect} from 'react-redux'
import {showMiniDetail,sendIndexMusic,nowPlaying} from '../listMusic/action/listMusic.action'
import Singleton from '../../singleton/singleton'
import { thisExpression } from '../../../../node_modules/@babel/types';
import {PLAYING,PAUSED}from '../../../utils/utils'
Sound.setCategory('Playback');

const mapStateToProps = (state) => ({
    
    dataMusic:state.sendDataMusic.data,
    index:state.sendIndexMusic.index,
    isPlaying:state.nowPlayingReducer.isPlaying
})
class MusicDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50,
            playSeconds:0,
            duration:0,
            random:false,
            shuffleColor:'white',
            repeat:false,
            repeatColor:'white'
        };
        this.sliderEditing = false;
    }

    componentDidMount(){
        if(this.props.isPlaying){
            this.soung=Singleton.getSound()
            if(this.sound!=null)
            {
                
            }
            this.timeout = setInterval(() => {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds,duration:this.sound.getDuration()});
                })
        }, 100);
        }
        this.play(this.playComplete)
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.props.isPlaying == true && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    //console.log(isPlaying)
                        this.setState({playSeconds:seconds});
                })
            }
        }, 100);
    }
    onPress=()=>{   //dispatch show mini detail
        this.props.dispatch(showMiniDetail())
        this.props.navigation.goBack()
    }
    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value)
            };
        });
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if(this.sound){
            this.sound.setCurrentTime(value);
            this.setState({playSeconds:value});
        }
    }
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing'); 
                
                if(this.state.repeat){
                    this.sound.play(this.playComplete) //if user click repeat =>loop
                    this.setState({ playSeconds:0});
                    this.props.dispatch({type:PLAYING})
                    //
                }
                else{
                    this.next() // auto next
                }
            } else {
                console.log('playback failed due to audio decoding errors');
                //Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({ playSeconds:0});
            this.props.dispatch({type:PLAYING})
            //
            this.sound.setCurrentTime(0);
        }
    }
    random =()=>{
        if(this.state.random){
            this.setState({random:false,shuffleColor:'white'})
        }else{
            this.setState({random:true,shuffleColor:'blue'})
        }
    }
    loadComplete=()=>{
        console.log('loaded')
        this.setState({duration:this.sound.getDuration()});
        this.sound.play(this.playComplete)
        this.props.dispatch({type:PLAYING})
    }
    play=async()=>{
        if(this.sound){
            this.sound.play(this.playComplete);
            this.props.dispatch({type:PLAYING})
        }else{
            this.sound=Singleton.getSound()
            if(this.sound==null){
                var preview_url=this.props.dataMusic[this.props.index].preview_url
                this.sound =  Singleton.getInstance(preview_url,this.loadComplete);
            }
        }
    }
    pause = () => {
        if(this.sound){
            this.sound.pause();
        }
        this.props.dispatch({type:PAUSED})
    }
   
    next=()=>{
        if(this.sound){
            this.sound.release();
            this.sound=null;
        }
        var index
        if(this.state.random){
            index=Math.floor(Math.random() * this.props.dataMusic.length);
        }else{
            index=this.props.index+1
        }
        console.log(index)
        console.log(this.props.dataMusic.length)
        if(index == this.props.dataMusic.length)
        {
            index=0
        }
        this.props.dispatch(sendIndexMusic(index))
        let url = this.props.dataMusic[index].preview_url
        this.sound=Singleton.next(url,this.loadComplete)
    }
    prev=()=>{
        if(this.sound){
            this.sound.release();
            this.sound=null;
        }
        var index=this.props.index-1;
        if(index<0){
            index=this.props.dataMusic.length-1
        }

        let url = this.props.dataMusic[index].preview_url
        this.sound=Singleton.next(url,this.loadComplete)
        this.props.dispatch(sendIndexMusic(index)) 
    }
    repeat=()=>{
        if(this.state.repeat){
            this.setState({repeat:false,repeatColor:'white'})
        }else{
            this.setState({repeat:true,repeatColor:'blue'})
        }
    }
    getAudioTimeString(seconds){
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);
        //(h<10?'0'+h:h) + ':' +
        return ( (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }
    
    render() {
        
        //console.log(this.sound)
        const { value } = this.state;
        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);
        if(this.props.dataMusic===null||this.props.index==null){
            return(
                <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
                <ActivityIndicator/>
                </View>
            )
        }else
    return (
        <View style={styles.container}>
            <ImageBackground
            style={{ width: width, height: height }}
            blurRadius={20}
            source={require("../../../assets/images/BORN.png")}
            />
            <View style={styles.header}>
            <View style={styles.icon_menu}>
                <TouchableOpacity
                onPress={() => this.onPress()}
                >
                <Image
                    source={require("../../../assets/images/ic_hide_songs.png")}
                    style={styles.iconHeaderLeft}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.frame_name}>
                <Text style={styles.name}>{this.props.dataMusic[this.props.index].name}</Text>
                {/* <Text style={styles.artistName}>{this.state.artistName}</Text> */}
            </View>
            </View>

            <View style={styles.banner}>
            <View style={styles.banner1}>
                <FastImage
                style={styles.banner_image1}
                source={require("../../../assets/images/Bahamas.png")}
                />
            </View>
            <View style={styles.banner2}>
                <FastImage
                style={styles.banner_image2}
                source={require("../../../assets/images/TheShins.png")}
                />
            </View>
            <View style={styles.banner3}>
                <FastImage
                style={styles.banner_image3}
                source={require("../../../assets/images/BORN.png")}
                />
            </View>
            </View>
            <View style={styles.content1}>
            <View style={styles.star}>
                <Image
                style={styles.ic_star}
                source={require("../../../assets/images/ic_fav_song.png")}
                />
            </View>
            <View style={styles.frame_nameTrack}>
                <Text style={styles.nameTrack}>{this.state.name}</Text>
            </View>
            </View>
            <View style={styles.slider}>
                    <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={this.onSliderEditStart}
                        // onTouchMove={() => console.log('onTouchMove')}
                        onTouchEnd={this.onSliderEditEnd}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                    <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
            </View>
            
            <View style={styles.content2}>
            <TouchableOpacity style={styles.shuffle} onPress={this.random}>
                <Image
                //style={styles.ic_shuffle}
                style={{tintColor:this.state.shuffleColor,width:20,height:20,}}
                source={require("../../../assets/images/ic_shuffle.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.prev} onPress={this.prev}>
                <Image
                style={styles.ic_prev}
                source={require("../../../assets/images/ic_prev_song.png")}
                />
            </TouchableOpacity>

            {this.props.isPlaying==false&& 
                <TouchableOpacity style={styles.play} onPress={this.play}>
                    <Image
                    style={styles.ic_play}
                    source={require("../../../assets/images/ic_play.png")}
                    />
                </TouchableOpacity>}
            {this.props.isPlaying==true&& 
                <TouchableOpacity style={styles.play} onPress={this.pause}>
                    <Image
                    style={styles.ic_play}
                    source={require("../../../assets/images/ic_pause.png")}
                    />
                </TouchableOpacity>}
            <TouchableOpacity style={styles.next} onPress={this.next}>
                <Image
                style={styles.ic_next}
                source={require("../../../assets/images/ic_next_song.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.repeat} onPress={this.repeat}>
                <Image
                style={{width:20,height:20,tintColor:this.state.repeatColor}}
                source={require("../../../assets/images/ic_repeat.png")}
                />
            </TouchableOpacity>
            </View>
        </View>
        );
    }
}

export default connect(mapStateToProps)(MusicDetailScreen)
const styles= StyleSheet.create({
    container:{
        flex:1,
        position:'absolute'
    },
     header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        marginTop: 30,
        position: 'absolute',
        width:'100%',
        flex: 1
    },
    icon_menu: {
        width: '20%',
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconHeaderLeft: {
        width: 25,
        height: 20,

    },

    frame_name: {
        flex:1,
        height:70,
        justifyContent: 'center',
        // alignItems: 'center',
        width:'80%',
        marginRight: 5,
        
    },
    name:{
        fontFamily:'Gotham-Light',
        fontSize: 18,
        color:'white',
        paddingBottom:5
    },
    artistName:{
        fontFamily:'Gotham-Light',
        fontSize: 14,
        color:'white'
    },
    banner:{
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 70,
        flex:1,
        width:'100%',
        height:'50%',
        // backgroundColor:'red' ,       
        alignItems:'center'
    },
    banner1:{
        justifyContent: 'center',
        alignItems: 'center',
        width:270,
        height:270,
        position: 'absolute',
        paddingBottom:25 ,
        


    },
    banner_image1:{
        width:240,
        height:300,
        borderRadius: 5,

    },
    banner2:{
        justifyContent: 'center',
        alignItems: 'center',
        width:270,
        height:270,
        position: 'absolute',
        paddingBottom:10 ,

    },
    banner_image2:{
        width:260,
        height:290,
        borderRadius: 5,


    },
    banner3:{
        width:290,
        height:280,
        position: 'absolute',

    },
    banner_image3:{
        width:290,
        height:300,
        borderRadius: 5,

    },
    
    content1:{
        flex:1,
        flexDirection:'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:460,
        // marginLeft: 30,
        height:70,
        width:300

    },
    star:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ic_star:{
        width:20,
        height:20
    },
    frame_nameTrack:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    nameTrack:{

        fontFamily:'Gotham-Light',
        fontSize: 20,
        color:'white'
    },
    slider:{
        flex:1,
        position: 'absolute',
        // alignItems: 'center',
        marginTop: 550,
        flexDirection: 'row',
        justifyContent: 'center',
        width:'100%',
        height:50,
        paddingLeft:30,
        paddingRight:30




    },
    content2:{
        flex:1,
        flexDirection:'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:630,
        // marginLeft: 25,
        height:70,
        width:'100%'
    },
    shuffle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ic_shuffle:{
        width:20,
        height:20,
    },
    prev:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',


    },
    ic_prev:{
        width:22,
        height:30
    },
    play:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    ic_play:{
        width:60,
        height:60
    },
    next:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ic_next:{
        width:22,
        height:30
    },
    repeat:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ic_repeat:{
        width:20,
        height:20
    }
    
})
