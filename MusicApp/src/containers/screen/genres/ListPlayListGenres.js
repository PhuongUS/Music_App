import React, {Component} from 'react';
import {
    StyleSheet,View,StatusBar,Text,ActivityIndicator,FlatList, TouchableOpacity,Image ,Dimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import {getPlaylistOfGenres} from './actions/genres.action'

const {height, width} = Dimensions.get('window');
const mapStateToProps = (state) => ({
    dataToken: state.getTokenReducer.data,
    categoryPlaylist:state.getPlaylistOfGenres.data
})

class ListPlayListGenres extends Component{


    constructor(props){
        super(props),
        this.state={
            category_id:this.props.navigation.getParam('id'),
            image:this.props.navigation.getParam('image'),
            name:this.props.navigation.getParam('name'),
        }
    };
        
    componentDidMount(){
        this.props.dispatch(getPlaylistOfGenres(this.props.dataToken.access_token,this.state.category_id))
    }
    renderItem=(item,index)=>{
        return(
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PlayList',{playlist_id:item.id})}>
                    <Image source={{uri:item.images[0].url}} style={{width:160,height:160,borderRadius:8}}></Image>
                    {/* <Text>{item.name}</Text> */}
                </TouchableOpacity>
                
            </View>
        )
    }
    render(){
        console.log(this.state.category_id)
        console.log(this.props.categoryPlaylist)
        if(this.props.dataToken===null || this.props.categoryPlaylist===null){
            return(
                <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
                    <ActivityIndicator/>
                </View>
            )
        }else
        return(
            <View style={styles.container }>
                 <View style={{flexDirection:'row',justifyContent:'center',height:40,marginTop:30}}> 
                        <View   style={{width:'32%',justifyContent:'center'}} >
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Genres')} >
                                <Image
                                    source={require('../../../assets/images/ic_hide_songs2.png')}
                                    style={[styles.iconHeaderLeft, {tintColor: 'black'}]}
                                />  
                            </TouchableOpacity>
                        </View>
                        <View   style={{width:'32%',justifyContent:'center',alignItems:'center'}} >
                            <Text style={styles.textHeader} >{this.state.name}</Text>
                        </View>
                        <View   style={{ width:'32%',justifyContent:'center',alignItems: 'flex-end'}} >
                            
                        </View>
                    </View>
                    <Text style={{color:'white'}}>PLAYLIST</Text>
                    <FlatList
                        data={this.props.categoryPlaylist.playlists.items}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item,index})=>this.renderItem(item,index)}
                        numColumns={2}
                        style={{marginLeft:'2.5%'}}
                       
                        />   

                
            </View>
        );
    }
}
 export default connect(mapStateToProps)(ListPlayListGenres)
const styles=StyleSheet.create({
    container:{
        flex: 1, 
        borderBottomWidth: 0.25,

    },
    iconHeaderLeft:{
        width:15,
        height:25,
        
    },
    iconHeaderRight:{
        width:20,
        height:20, 
          
    },
    textHeader:{
        fontSize:18,
    },
    viewItem:{
        marginLeft:'2.5%',
        marginRight:'2.5%',
        width:160,
        height:160,
        marginBottom:10,
    },
    tt_header:{
        fontSize:20,
        color:'white'
    },
    
})