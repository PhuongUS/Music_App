import React, {Component} from 'react';
import {
    StyleSheet, View, StatusBar, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {hidenMiniDetail,sendDataMusic,sendIndexMusic} from '../listMusic/action/listMusic.action'
import { addFavorite } from './actions/myMusic.action';
const {height, width} = Dimensions.get('window');
import FastImage from 'react-native-fast-image'
const mapStateToProps = (state) => ({
    dataFavorite:state.addFavoriteReducer.items
})
class MyMusicScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            // track_id: this.props.navigation.getParam('id'),
            refreshing:false,
            display:true,
            color: '#FF6633'
        }};
    
    
        renderItem = (item,index) =>{
            console.log(item)
            return( 
                // <Text>{item.name}</Text>
                <TouchableOpacity onPress={()=>this.onPress(item)}>
                     <View style={{width:150,height:200,marginRight:6,backgroundColor:'white'}}>
                        <FastImage source={{uri:item.images[1].url}} style={{width:150,height:150}}>
                        </FastImage>
                        <View style={{alignItems:'center',flex:1,justifyContent:'center'}}>
                            <Text >{item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    render(){
        console.log(this.props.dataFavorite)
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerLeft} onPress={()=>this.props.navigation.openDrawer()} >
                        <Image
                            source={require('../../../assets/images/menu.png')}
                            style={styles.iconHeaderLeft}
                        />  
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text>MY MUSIC</Text>
                    </View>
                </View>  
                {/* <View style={styles.frame_tab}>
                    <View style={styles.headerTab}>
                        <TouchableOpacity style={styles.tabFavorite} onPress={()=>this.setState({display:true,color:'#FF6633' })}
                                                                     onPressOut={()=>this.setState({color: '#E6E6FA'})}>
                            <Text>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabRecently} onPress={()=>this.setState({display:false })}>
                            <Text>Recently Played</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* <View>
                    {this.state.display?                  */}
                    <View style={{flex:1,marginLeft:'2.5%',marginRight:'2.5%'}}>
                        <FlatList 
                            data={this.props.dataFavorite}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item,index})=>this.renderItem(item,index)}
                            refreshing = {this.state.refreshing}
                            onRefresh={()=>this.handleRefresh}
                            numColumns={2}
                            >   
                        </FlatList>
                {/* :<Text> Hello Recently Played</Text>} 
                </View> */}
                </View>
    
            </View>
        );
    }
}
 export default connect(mapStateToProps)(MyMusicScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    frame_tab:{
        justifyContent:'center',
        alignItems:'center'
    },
    headerTab:{
        // flex:1,
        flexDirection:'row',
        backgroundColor: '#E6E6FA',
        width:'50%',
        height:40,
        justifyContent:'center',
        alignItems:'center'

    },
    tabFavorite:{
        alignItems: 'center',
        justifyContent:'center',
        width:'50%'
    },
    tabRecently:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'50%'  
    },
    header:{
        flex: 1/16,
        flexDirection: 'row',
        marginTop: 40,

    },
    headerLeft:{
        marginLeft: 20

    },
    iconHeaderLeft:{
        width: 25,
        height: 20,
        tintColor: 'black'
    },
    title:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%',
        height:30

    },
    content:{
        // flex:1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#E6E6FA',
        width:'100%',
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
    },

})
