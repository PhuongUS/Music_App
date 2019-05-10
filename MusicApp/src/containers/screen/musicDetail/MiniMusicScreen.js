import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ImageBackground,TouchableOpacity,Slider} from 'react-native'
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
import SwipeUpDown from 'react-native-swipe-up-down';
import MusicDetailScreen from './MusicDetailScreen'
import ArtistScreen from '../artists/ArtistScreen'
import {connect} from 'react-redux'
import ItemMini from './ItemMini'
import Sound from 'react-native-sound';

const mapStateToProps = (state) => ({
    showMini:state.hidenShowMini.data,
    dataMusic:state.sendDataMusic.data,
    index:state.sendIndexMusic.index
})

class MiniMusicScreen extends Component {
    constructor(props){
        super(props)
       //this.song = React.createRef();

    }
    componentDidMount(){
        
    }
    render(){
        // console.log(this.sound)
        // if(this.props.dataMusic!=null){
        //     this.sound = new Sound(this.props.dataMusic[this.props.index].preview_url, '', (error) => {
        //         if (error) {
        //             console.log('failed to load the sound', error);
        //             Alert.alert('Notice', 'audio file error. (Error code : 1)');
        //             this.setState({playState:'paused'});
        //         }else{
        //             //this.setState({playState:'playing', duration:this.sound.getDuration()});// fix index here
        //             //this.sound.play(this.playComplete);
        //             //this.sound.play()
        //         }
        //     });  
        // }
        if(this.props.showMini=='hiden'){
            return(
                <View></View>
            )
        }else

        return(
            
                <SwipeUpDown		
                itemFull={<MusicDetailScreen />} // Pass props component when show full
                itemMini={<ItemMini />} // Pass props component when collapsed
                onShowMini={() => console.log('mini')}
                onShowFull={() => console.log('full')}
                onMoveDown={() => console.log('down')}
                onMoveUp={() => console.log('up')}
                disablePressToShow={false} // Press item mini to show full
                // style={{ marginTop:50 }} // style for swipe
            />
                
            
        );_
    }
}
export default connect(mapStateToProps)(MiniMusicScreen)
