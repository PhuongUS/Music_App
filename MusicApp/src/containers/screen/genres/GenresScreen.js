import React, { Component } from 'react';
import{View,Text,StyleSheet,TouchableOpacity,Image,FlatList} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps=(state)=>({
    dataGenres: state.getGenresReducer.data,
})
class GenresScreen extends Component{
    renderItem = (item,index) =>{
        return( 
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ListPlayListGenres',{id:item.id, image:item.icons[0].url,name:item.name})}}>
                    <Image source={{uri:item.icons[0].url}} style={{width:160,height:160}}/>
                    <View style={{justifyContent:'center',alignItems:'center',height:30}}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        {console.log(this.props.dataGenres)}
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'center',height:40,marginTop:30,position:'absolute',flex:1,}}> 
                    <View   style={{width:'32%',justifyContent:'center'}} >
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                            <Image
                                source={require('../../../assets/images/menu.png')}
                                style={[styles.iconHeaderLeft, {tintColor: 'black'}]}
                            />  
                        </TouchableOpacity>
                    </View>
                    <View   style={{width:'32%',justifyContent:'center',alignItems:'center'}} >
                        <Text>GENRES</Text>
                    </View>
                    <View   style={{ width:'32%',justifyContent:'center',alignItems: 'flex-end'}} >
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                            <Image
                                source={require('../../../assets/images/ic_search.png')}
                                style={[styles.iconHeaderRight, {tintColor: 'black'}]}
                            />  
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,marginTop:80,marginLeft:'2.5%',marginRight:'2.5%'}}>
                    <FlatList
                        //style={styles.list_artists}
                        numColumns={2}
                        data={this.props.dataGenres.categories.items}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item,index})=>this.renderItem(item,index)}
                    
                    /> 
                </View>
            </View>

        )
    }
}
export default connect(mapStateToProps)(GenresScreen)

const styles=StyleSheet.create({
    container:{
        //justifyContent:'center',
        flex:1,
        backgroundColor:'#E6E6FA'
        //alignItems:'center'
    },
    iconHeaderLeft:{
        width:25,
        height:20,
        
    },
    iconHeaderRight:{
        width:20,
        height:20, 
          
    },
    viewItem:{
        marginLeft:'2.5%',
        marginRight:'2.5%',
        width:160,
        height:190,
        marginBottom:10,
        backgroundColor:'white'
    },
})