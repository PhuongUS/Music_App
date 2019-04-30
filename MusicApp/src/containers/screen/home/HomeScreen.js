import React, {Component} from 'react';
import { StyleSheet, View,StatusBar, Text, TouchableOpacity,Image,Dimensions,FlatList, ActivityIndicator} from 'react-native'
import FastImage from 'react-native-fast-image'
import {connect} from 'react-redux'
import {AlbumRequest,AlbumFeature,getGenres} from './actions/home.action'
import LinearGradient from 'react-native-linear-gradient';

//import HeaderHome from './Header'
const {height, Constwidth} = Dimensions.get('window');
const mapStateToProps = (state) => ({
    dataToken:state.getTokenReducer.data,
    dataAlbum:state.getAbumReducer.data,
    dataFeatured:state.getAbumFeaturedReducer.data,
    dataGenres: state.getGenresReducer.data,
})
class HomeScreen extends Component {
    componentDidMount(){
        this.props.dispatch(AlbumRequest(this.props.dataToken.access_token))
        this.props.dispatch(AlbumFeature(this.props.dataToken.access_token))
        this.props.dispatch(getGenres(this.props.dataToken.access_token))
    }
    onPress=(item)=>{
        this.props.navigation.navigate('ListMusic',{data:item})
    }
    renderItem = (item,index) =>{
        return( 
            <TouchableOpacity onPress={()=>this.onPress(item)}>
                 <View style={{width:150,height:200,marginRight:6,backgroundColor:'white'}}>
                    <FastImage source={{uri:item.images[1].url}} style={{width:150,height:150}}>
                    </FastImage>
                    <View style={{alignItems:'center'}}>
                        <Text >{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
      }
    render() {
        {console.log(this.props.dataToken.access_token)}
        //this.props.dispatch(AlbumRequest(this.props.dataToken.access_token))
        {console.log(this.props.dataAlbum)}
        {console.log(this.props.dataFeatured)}
        if(this.props.dataToken===null || this.props.dataFeatured===null || this.props.dataGenres===null || this.props.dataAlbum===null){
            return(
                <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
                <ActivityIndicator/>
                </View>
            )
        }else
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                <LinearGradient colors={['#FE5339', 'pink', '#E6E6FA']} style={styles.banner}>
                    <View style={{flexDirection:'row',justifyContent:'center',height:40,marginTop:30,position:'absolute',flex:1}}> 
                        <View   style={{width:'32%',justifyContent:'center'}} >
                            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                                <Image
                                    source={require('../../../assets/images/menu.png')}
                                    style={[styles.iconHeaderLeft, {tintColor: 'white'}]}
                                />  
                            </TouchableOpacity>
                        </View>
                        <View   style={{width:'32%',justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color:'white',fontSize:20}}>BROWSE</Text>
                        </View>
                        <View   style={{ width:'32%',justifyContent:'center',alignItems: 'flex-end'}} >
                            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                                <Image
                                    source={require('../../../assets/images/ic_search.png')}
                                    style={[styles.iconHeaderRight, {tintColor: 'white'}]}
                                />  
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </LinearGradient>
                <View style={styles.view3}>
                    
                </View>
                <View style={styles.view2}>
                        <FlatList
                            style={styles.list_artists}
                            //numColumns={2}
                            data={this.props.dataAlbum.albums}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item,index})=>this.renderItem(item,index)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            //scrollEnabled={false}
                            //style={{justifyContent:'flex-end'}}
                        /> 
                   
                    <View style={{marginTop:30,marginRight:'15%'}}>
                        <Text style={styles.text}>FEATURED ALBUM</Text>
                        <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:0.5,borderTopWidth:0.5,marginRight:'15%'}}
                            onPress={()=>this.onPress(this.props.dataFeatured)}
                        >
                            <FastImage source={{uri:this.props.dataFeatured.images[2].url}} style={{width:64,height:64,margin:5}}/>
                            <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <Text style={{width:200}}>
                                    {this.props.dataFeatured.name}
                                </Text>
                                <Text>
                                    {this.props.dataFeatured.name +" . " +this.props.dataFeatured.total_tracks + " song"}
                                </Text>
                            </View>
                            <View style={{marginLeft:30,justifyContent:'center',width:60}}>
                                <Image source={require('../../../assets/images/ic_hide_songs3.png')} style={{width:20,height:20}}></Image>
                            </View>
                            
                        </TouchableOpacity>             
                    </View>
                    <View style={{marginTop:30}}>
                        <Text style={styles.text}>GENRES & MOODS</Text>
                        <FlatList
                        //style={styles.list_artists}
                        //numColumns={2}
                        data={this.props.dataAlbum.albums}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item,index})=>this.renderItem(item,index)}
                        horizontal={true}
                        //style={{justifyContent:'flex-end'}}
                        />             
                    </View>
                    
                </View>
                <View style={styles.footer}>
                    <Text>5s Quảng cáo</Text>
                </View>
            </View>
           

        )
    }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
         backgroundColor:'white',
    },
    iconHeaderLeft:{
        width:25,
        height:20,
        
    },
    iconHeaderRight:{
        width:20,
        height:20, 
          
    },
    banner:{

        width:Constwidth,
        height:220,
        //justifyContent: 'center',
        // alignContent: 'center',

    }, 
    view2:{
        flex:1,
        marginLeft:20,
        marginTop:140,
        //backgroundColor:'#E6E6FA',
        position:'absolute',
    },
  
    view3:{
        flex:1,
        backgroundColor:'#E6E6FA'
        //backgroundColor:'yellow'
    },
    footer:{
        //flex:1,
        height:80,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        marginBottom:10,
    },
    viewImage:{
        width:140,
        height:180,
        //backgroundColor:'white'
    },
    list_artists:{
    }
});
