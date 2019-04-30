import React, {Component} from 'react';
import { StyleSheet, View,StatusBar, Text ,ImageBackground,TextInput,TouchableOpacity,WebView} from 'react-native'
import { connect } from 'react-redux'
import {loginRequest,loginGetAccessToken,checkGetToken,cleanCheck} from './actions/login.actions'
import { Buffer } from 'buffer';
const queryString = require('query-string');
const ClIENT_ID = 'c106055a73514c3d96172527734bc5bd'; // Your client id
const CLIENT_SECRET = '122609d12887460ca60cbd6ddcd0b8c3'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Or Your redirect uri

const mapStateToProps = (state) => ({
    dataToken:state.getTokenReducer.data,
    check:state.checkTokenSuccess.check,
    dataUser:state.loginReducer.data
})

// const mapDispatchToProps = (dispatch) => ({
//     //loginRequest: (email, password) => dispatch(loginRequest(email,password)),
//     cleanForgotReducer: () => dispatch(cleanForgotReducer()),
// })


class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header:null,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }
    onPress=()=>{
        this.props.navigation.navigate('Home')
    }
    fetchAccessToken=(params)=>{
        if(this.props.check==false){
            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(ClIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
                })
            .catch((error) => {
                console.error(error);
                return error;
            })
            .then((res)=>res.json())
            .then((response)=>{
                console.log(response);
                    this.props.dispatch({type:'GET_TOKEN_SUCCESS',payload:response})
                    this.props.dispatch(loginRequest(response.access_token,response.token_type))

               this.props.dispatch({type:'RECEIVED'})
            })
            
        }
        this.props.dispatch(cleanCheck())

    }
    
    handleNavigationStateChange = (webViewState)=>{
             const {url} = webViewState
            if (url && url.startsWith("http://localhost:8081/")) {
                const match = url.match(/(#|\?)(.*)/)
                const results = queryString.parse(match[2])
                console.log(results.code)
                let params = queryString.stringify({
                     grant_type: 'authorization_code',
                     code: results.code,
                     redirect_uri: 'http://localhost:8081/callback',
                 })
                 console.log(params);
                this.fetchAccessToken(params)
               
                 
            }   
        //}    
    }

    render() {
        if(this.props.dataUser){
            return this.props.navigation.navigate('Home')
        }
         else{
            return (
                <View style={styles.container}>
                        <StatusBar hidden/>
                        
                        <WebView
                            source={{uri: 'https://accounts.spotify.com/authorize?response_type=code&client_id=c106055a73514c3d96172527734bc5bd&scope=%20user-read-private%20user-read-email&redirect_uri=http://localhost:8081/callback'}}
                            style={{marginTop: 20}}
                            onNavigationStateChange={this.handleNavigationStateChange.bind(this)}
                            //onError={this.handleNavigationStateChange.bind(this)}
                        />
                        {/* {this.fetchDataWithAccessToken(this.state.access_token,this.state.token_type)} */}
                    </View>
                )
            }
         }   
    
}

export default connect(mapStateToProps)(LoginScreen)
const styles = StyleSheet.create({
    
    container: {
        flex:1,
        //justifyContent:'center',

    },
    backgroundImage:{
        flex:1,
        alignSelf:'stretch',
        width:null,
        justifyContent:'center',
    },
    content:{
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    logo:{
        color:'white',
        fontSize:40,
        //fontStyle:'Italic',
        fontWeight:'bold',

    },
    inputContainer:{
        margin:20,
        marginBottom:0,
        paddingBottom:10,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        alignSelf:'stretch',
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'rgba(225,225,225,0.2)'
    },
    inputEmail:{
         //justifyContent:'center',
         borderRadius:8,
         alignItems:'center',
         fontSize:16,
         height:40,
         padding:10,
         marginBottom:10,
         backgroundColor:'white'
    },
    input:{
        //justifyContent:'center',
        borderRadius:8,
        alignItems:'center',
        fontSize:16,
        height:40,
        padding:10,
        //marginBottom:10,
        backgroundColor:'white'
    },
    buttonContainer:{
        alignItems:'center',
        //width:'70%',
        alignSelf:'stretch',
        marginTop:20,
        marginLeft:100,
        marginRight:100,
        padding:10,
        backgroundColor:'blue',
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'rgba(225,225,225,0.6)',
        borderRadius:8,
    },
    buttonText:{
        fontSize:20,
        textAlign:'center',
        //color:'blue',
        fontWeight:'bold'
    }
   
});
