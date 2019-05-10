import React, {Component} from 'react';
import { StyleSheet, View,StatusBar, Text, TouchableOpacity,Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import {connect} from 'react-redux'
const {height, width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    dataUser:state.loginReducer.data
})
class SplashScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        header:null,
    }
  } 

  render() {
    if(this.props.dataUser){
        return this.props.navigation.navigate('Home')
    }else
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <FastImage
          style={styles.img}
          source={require('../../assets/images/img_bgd.png')}
        >
          {/* <View style={styles.frame}> */}
          <View style={styles.border_title}>
            <Text style={styles.title}>YOUR MUSIC.</Text>
          </View>

          <View style={styles.border_subtitle} >
            <Text style={styles.subtitle}>Turned to you.</Text>
          </View>

          {/* </View> */}

          <View style={styles.frame}>
            <TouchableOpacity
                style={styles.btn_sign_up}
                onPress={() => { this.props.navigation.navigate('MusicDetail') }}
            >
              <Text style={styles.txt_sign_up} >
                Sign up
                          </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn_login}
              onPress={() => { this.props.navigation.navigate('Login') }}
            >
              <Text style={styles.txt_login} >
                Login
                          </Text>
            </TouchableOpacity>



          </View>

        </FastImage>
      </View>
    )
  }
}
export default connect(mapStateToProps)(SplashScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    height:'100%'
  },
  btn_sign_up: {
    width: '45%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: '2%',
    marginRight: '4%',


  },
  txt_sign_up: {
    color: '#3B55E6',
    fontSize: 20,
  },
  btn_login: {
    width: '45%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    // marginLeft:'2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

    // marginTop: '10%',
  },
  txt_login: {
    color: '#FFFFFF',
    fontSize: 20
  },
  img: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  title: {
    fontFamily: 'Gotham-Bold',
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 40,
    paddingLeft: 10,

  },
  border_title: {
    justifyContent: 'center',
    backgroundColor: '#3B55E6',
    borderColor: '#979797',
    paddingTop: 20,
    marginLeft: 10,
    marginTop: 500,
    width: '80%',
    height: '10%',
    opacity: 1,


  },
  subtitle: {
    fontFamily: 'Gotham-Light',
    color: '#FFFFFF',
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,

  },
  border_subtitle: {
    backgroundColor: '#3B55E6',
    borderColor: '#979797',
    marginLeft: 10,
    // marginTop: '130%',
    width: '60%',
    height: '6%',
    opacity: 0.6,

  },
  frame: {
    flexDirection: 'row',
    flex: 1,
    marginTop: '10%',
    margin: '2.2%',
  }

});
