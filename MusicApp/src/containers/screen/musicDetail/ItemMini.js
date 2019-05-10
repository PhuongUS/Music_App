import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Slider, Animated,Easing} from 'react-native'
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux'
import Sound from 'react-native-sound';
import {showMiniDetail,sendIndexMusic} from '../listMusic/action/listMusic.action'
import Singleton from '../../singleton/singleton'
import {PLAYING,PAUSED} from '../../../utils/utils'
const mapStateToProps = (state) => ({
    dataMusic:state.sendDataMusic.data,
    index:state.sendIndexMusic.index,
    isPlaying:state.nowPlayingReducer.isPlaying
})
class ItemMini extends Component{
    constructor(){
        super()
      
              this.spinValue = new Animated.Value(0)
    
    }
    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }
    componentDidMount(){
          this.spin()

        //this.play()
        if(this.props.isPlaying){
            this.play
        }
        // if(this.props.isPlaying==true&&this.sound==null){
        //     this.props.dispatch({type:PAUSED})
        // }
        //this.props.dispatch({type:'PAUSE'})
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
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing'); 
                this.next() // auto next
                    //this.setState({playState:'paused', playSeconds:0});
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            // this.setState({playState:'paused', playSeconds:0});
           // this.sound.setCurrentTime(0);
        }
    }
   
    loadComplete=()=>{
        console.log('loaded')
        //this.setState({playState:'playing', duration:this.sound.getDuration()});
        this.sound.play(this.playComplete)
        this.props.dispatch({type:PLAYING})
    }
    play=()=>{
        if(this.sound){
            this.props.dispatch({type:PLAYING})
            this.sound.play(this.playComplete);
            //this.setState({playState:'playing'});
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
        this.setState({playState:'paused'});
    }
    render(){
        console.log(this.props.dataMusic)
        console.log(this.props.isPlaying)
        const spin = this.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: [0,200]
        })
        return(
            <View style={styles.container}>

                {/* <TouchableOpacity onPress={()=>this.navigation.navigate('MusicDetail')}> */}
                    <View style={styles.avatar}>
                        <FastImage style={styles.img_avatar} source={require('../../../assets/images/avatar_profile.png')}>

                        </FastImage>
                    </View>
                    <View style={styles.name}>
                    <Animated.Text
                        style={[styles.track_name,{marginLeft: spin }]}
                    >{this.props.dataMusic[this.props.index].name}</Animated.Text>
                        {/* <Text style={styles.track_name}>{this.props.dataMusic[this.props.index].name}</Text> */}
                        {/* <Text style={styles.artist_name}>ARTISTS</Text> */}
                    </View>
                    <View style={styles.icon}>
                        {this.props.isPlaying ==false&& 
                        <TouchableOpacity onPress={this.play}>
                            <Image style={styles.icon_play} source={require('../../../assets/images/ic_play3.png')}></Image>
                        </TouchableOpacity>}
                        {this.props.isPlaying ==true&& 
                        <TouchableOpacity onPress={this.pause}>
                            <Image style={styles.icon_play} source={require("../../../assets/images/ic_pause.png")}></Image>
                        </TouchableOpacity>}
                        
                    </View>
                {/* </TouchableOpacity> */}
                
            </View>
        );
    }
}
export default connect(mapStateToProps)(ItemMini)
const styles = StyleSheet.create({

    container: {
        flex: 1/5   ,
        flexDirection: 'row',
        // backgroundColor:'#FFF',
        // justifyContent: 'flex-end',
        // borderWidth: 0.25,
        // borderColor: 'gray',
        // borderRadius: 5,
        // marginBottom:5,
        
    },
    avatar:{
        flex:1/3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    img_avatar:{
        width:60,
        height:60
    },
    name:{
        flex:1,
        flexDirection:'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    track_name:{
        // paddingBottom: 2,
        fontFamily:'Gotham-Book',
        fontSize: 15,
    },
    artist_name:{
        fontFamily: 'Gotham-Book',
        fontSize: 12,
    },   
    icon:{
        flex:1/3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_play:{
        width:40,
        height:40,
    }
})