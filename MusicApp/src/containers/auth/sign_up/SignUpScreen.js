import React, {Component} from 'react';
import { StyleSheet, View,StatusBar, Text ,ImageBackground,TextInput,TouchableOpacity} from 'react-native'
//import { connect } from 'react-redux'
//import {loginRequest} from './actions/login.actions'

// const mapStateToProps = (state) => ({
//     data: state.loginReducer.data,
// })

// const mapDispatchToProps = (dispatch) => ({
//     loginRequest: (email, password) => dispatch(loginRequest(email,password)),
//     cleanForgotReducer: () => dispatch(cleanForgotReducer()),
// })

class SignUpScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header:null,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
  render() {
    return (
        <View style={styles.container}>
                <StatusBar hidden/>
                <ImageBackground source={require('../../../assets/images/img_bgd.png')} 
                blurRadius={5}
                style={styles.backgroundImage}
                >
                    <View style={styles.content}>
                        <Text style={styles.logo}>SIGN UP</Text>
                        <View style={styles.inputContainer}>
                        
                            <TextInput underlineColorAndroid='transparent' style={styles.inputEmail}
                                    placeholder="UserName"
                            >
                            </TextInput>
                            <TextInput underlineColorAndroid='transparent' style={styles.inputEmail}
                                    placeholder="Email"
                            >
                            </TextInput>
                            <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
                                    placeholder="Password"
                                    // style={{position:'absolute'}}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
export default SignUpScreen
//export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
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
