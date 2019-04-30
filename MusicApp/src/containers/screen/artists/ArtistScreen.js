import React, {Component} from 'react';
import {
    StyleSheet,View,StatusBar,Text,ActivityIndicator,FlatList, TouchableOpacity,Image
} from 'react-native'
// import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import FastImage from '../../../../node_modules/react-native-fast-image';
import {getArtist} from './actions/artists.action'
const mapStateToProps = (state) => ({
    dataArtist: state.getArtistReducer.data,
    dataToken: state.getTokenReducer.data
})
 class ArtistScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        header:null,
    }
  }
// constructor(props){
//         super(props);
//     this.props.dispatch(getArtits(this.props.dataToken.access_token))

//         };
componentDidMount(){
    this.props.dispatch(getArtist(this.props.dataToken.access_token))
}
  renderItem = (item,index) =>{
    return( 
        <TouchableOpacity style={styles.item_flat} onPress={()=>this.props.navigation.navigate('Track_Artist',{id:item.id,img:item.images[0].url,name:item.name,})}>
                <View style={styles.frame_images}>
                    <FastImage style={styles.images} source={{uri:item.images[0].url}}></FastImage>
                </View>
                <View style={styles.item}>
                    <Text style={styles.item_name}>{item.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.item_follower}>Followers:{item.followers.total}</Text>
                </View>
        </TouchableOpacity>

    )
  }

  render() {
    if (this.props.dataToken === null || this.props.dataArtist===null) {
        return(
            <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
                <ActivityIndicator/>
            </View>
        )
    }else
    return (
        
        <View style={styles.container}>
            <StatusBar hidden />
                <TouchableOpacity style={styles.button_back} onPress={()=>this.props.navigation.navigate('Home')}>
                    <Image style={styles.icon_back} source={require('../../../assets/images/ic_hide_songs2.png')}></Image>
                </TouchableOpacity>
            <View style={styles.title}>
                <Text style={styles.txt_title}>ARTISTS</Text>
            </View>
            <View style={styles.line}></View>
                <FlatList
                    style={styles.list_artists}
                    numColumns={2}
                    data={this.props.dataArtist.artists}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item,index})=>this.renderItem(item,index)}>
                </FlatList>
        </View>
    );
    }
 }
 export default connect(mapStateToProps)(ArtistScreen)
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E6E6FA',
    },
    banner:{
        height:220,

    },
    button_back:{
        marginTop:30,
        marginLeft:20
    },
    icon_back:{
        width:15,
        height:25,
        tintColor:'black'
        // marginTop: 5
    },
    name:{
        marginTop:100,
        justifyContent:'center',
        alignItems:'center'
    },
    txt_name: {
        fontFamily: 'Gotham-Book',
        fontSize: 25,
        color: '#D8D8D8',
        // marginLeft: 125


    },
    title:{
        // margin: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    txt_title:{
        // fontFamily: 'Gotham-Light',
        // fontSize: 16,
       
    },

    line:{
        borderBottomColor:'gray',
        borderBottomWidth: 0.5,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        marginBottom: 10,


        
    },
    list_artists:{

    },
    handle_listItem:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 5,
        padding: 5,
    },
    item_flat:{
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:'4.5%',
        // marginRight:15,
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5,
        // borderRadius: 10,
        // paddingBottom: 5,
        backgroundColor: '#FFFFFF',
        // width:160,
        // height:190,
        marginBottom: 10,

    },
    item:{
        flex:1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    item_name:{
        fontFamily: 'Gotham-Light',
        fontSize: 20,
    },
    frame_images:{
        flex:1
    },
    images:{
        width:160,
        height:160,
        // borderRadius:10
    },
    item_follower: {
        fontSize:10,
        color:'gray'
    },


})