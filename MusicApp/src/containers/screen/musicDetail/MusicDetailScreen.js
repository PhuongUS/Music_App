import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Slider,Platform,Alert} from 'react-native'
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
import Sound from 'react-native-sound';
import { thisExpression } from '../../../../node_modules/@babel/types';

export default class MusicDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.getParam("name"),
            artistName: this.props.navigation.getParam("artistName"),
            items:this.props.navigation.getParam('items'),
            index:this.props.navigation.getParam('index'),
            value: 50,
            playState:'paused',
            pause:0,
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
        this.play();
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds});
                })
            }
        }, 100);
    }
    componentWillUnmount(){
        if(this.sound){
            //this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
    }
    onPress=()=>{
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
                    this.setState({playState:'playing', playSeconds:0});

                }
                else{
                    this.next() // auto next
                    //this.setState({playState:'paused', playSeconds:0});
                }
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            // this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }
    //onPressLoop setState loop.
    //onPressRamdom radom index number in array items length => setState index
    random =()=>{
        if(this.state.random){
            this.setState({random:false,shuffleColor:'white'})
        }else{
            this.setState({random:true,shuffleColor:'blue'})
        }
    }
    play = async () => {
        if(this.sound){
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});
        }else{
            this.sound = new Sound(this.state.items[this.state.index].preview_url, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState:'paused'});
                }else{
                    this.setState({playState:'playing', duration:this.sound.getDuration()});
                    this.sound.play(this.playComplete);
                }
            });    
        }
    }
    pause = () => {
        if(this.sound){
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }
    next=()=>{
        if(this.sound){
            this.sound.release();
            this.sound=null;
        }
        //radom
        var index
        if(this.state.random){
            index=Math.floor(Math.random() * this.state.items.length);
        }else{
            index=this.state.index+1
        }
        console.log(index)
            console.log(this.state.items.length)
        if(index == this.state.items.length)
        {
            index=0
        }
        this.sound = new Sound(this.state.items[index].preview_url, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                Alert.alert('Notice', 'audio file error. (Error code : 1)');
                this.setState({playState:'paused'});
            }else{
                this.setState({playState:'playing',index:index, duration:this.sound.getDuration()});
                this.sound.play(this.playComplete);
            }
        });  
    }
    prev=()=>{
        if(this.sound){
            this.sound.release();
            this.sound=null;
        }
        var index=this.state.index-1;
        if(index<0){
            index=this.state.items.length-1
        }
        this.sound = new Sound(this.state.items[index].preview_url, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                Alert.alert('Notice', 'audio file error. (Error code : 1)');
                this.setState({playState:'paused'});
            }else{
                this.setState({playState:'playing',index:index, duration:this.sound.getDuration()});
                this.sound.play(this.playComplete);
            }
        });  
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
         console.log(this.state.items)
        const { value } = this.state;
        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);
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
                <Text style={styles.name}>{this.state.items[this.state.index].name}</Text>
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

            {this.state.playState=='paused'&& 
                <TouchableOpacity style={styles.play} onPress={this.play}>
                    <Image
                    style={styles.ic_play}
                    source={require("../../../assets/images/ic_play.png")}
                    />
                </TouchableOpacity>}
            {this.state.playState=='playing'&& 
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
const styles= StyleSheet.create({
    container:{
        flex:1,
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
