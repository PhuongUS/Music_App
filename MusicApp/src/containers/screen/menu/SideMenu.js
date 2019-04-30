import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { loginRequest } from "../../auth/login/actions/login.actions";
import { logoutSuccess } from "../../auth/login/reducers/login.reducer";
const mapStateToProps = state => ({
  dataToken: state.getTokenReducer.data,
  userProfile: state.loginReducer.data
});

class SideMenu extends Component {
    componentDidMount() {
    }
    onPressLogout = () => {};
    onPress = () => {
    Alert.alert(
      "Notification",
      "Do you want to logout???",
      [
        {
            text: "Logout",
            onPress: () => {
                this.props.dispatch({type:'LOGOUT'})
                this.props.navigation.navigate("Splash");
            }
        },
        {
          text: "Cancel",
          onPress: () => this.props.navigation.navigate("Home"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    console.log(this.props.userProfile)
    const Profile=this.props.userProfile
    if(this.props.dataToken===null || this.props.userProfile===null){
        return(
            <View style={{flex: 1, padding: 20,backgroundColor:'white'}}>
            <ActivityIndicator/>
            </View>
      )
    }else
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.background}
          source={require("../../../assets/images/shutterstock.png")}
        >
          <View style={styles.frame_icon}>
            <Image
              style={styles.icon_inbox}
              source={require("../../../assets/images/ic_inbox.png")}
            />
            <Image
              style={styles.icon_setting}
              source={require("../../../assets/images/ic_settings.png")}
            />
          </View>
          <View style={styles.profile}>
                <TouchableOpacity onPress={this.onPress}>
                    {/* {Profile.images?<Image style={styles.avatar} source={require("../../../assets/images/avatar_profile.png")}
                    /> : <Image style={styles.avatar} source={{uri:Profile.data.images[0].url}}></Image>  } */}
                </TouchableOpacity>
                {/* <Text style={styles.name}>{Profile.data.display_name}</Text> */}
            </View>
          <TouchableOpacity
            style={styles.home}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          >
            <Image
              style={styles.icon_home}
              source={require("../../../assets/images/menu.png")}
            />
            <Text style={styles.txt_home}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.artist}
            onPress={() => {
              this.props.navigation.navigate("Artist");
            }}
          >
            <Image
              style={styles.icon_artist}
              source={require("../../../assets/images/ic_activity.png")}
            />
            <Text style={styles.txt_home}>Artist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.artist}>
            <Image
              style={styles.icon_home}
              source={require("../../../assets/images/ic_your_music.png")}
            />
            <Text style={styles.txt_home}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.artist}
            onPress={() => this.props.navigation.navigate("Genres")}
          >
            <Image
              style={styles.icon_home}
              source={require("../../../assets/images/ic_browse.png")}
            />
            <Text style={styles.txt_home}>Genres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.artist}>
            <Image
              style={styles.icon_home}
              source={require("../../../assets/images/ic_radio.png")}
            />
            <Text style={styles.txt_home}>Top Rated</Text>
          </TouchableOpacity>
        </FastImage>
      </View>
    );
  }
}

export default connect(mapStateToProps)(SideMenu);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FF6633"
    // alignItems: 'center',
    // justifyContent: 'center',
    // width:'100%',
    // height:'100%'
  },
  background: {
    width: "100%",
    height: "100%"
  },
  frame_icon: {
    flexDirection: "row",
    // flex:1,
    marginTop: 40
  },
  icon_inbox: {
    width: 35,
    height: 25,
    marginRight: 192,
    marginLeft: 20
    // alignItems: 'flex-start',
  },
  icon_setting: {
    // alignItems:'flex-end',
    width: 35,
    height: 25
  },
  profile: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  name: {
    fontFamily: "Gotham-Bold",
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 30
  },
  home: {
    // flex: 1,
    flexDirection: "row",
    marginTop: 60,
    marginBottom: 30
    // height:60
  },
  artist: {
    // flex: 1,
    flexDirection: "row",
    marginBottom: 30
  },

  icon_artist: {
    width: 25,
    height: 35,
    marginLeft: 30,
    marginRight: 30
  },
  icon_home: {
    width: 35,
    height: 25,
    marginLeft: 30,
    marginRight: 30
  },
  txt_home: {
    fontFamily: "Gotham-Light",
    color: "#FFFFFF",
    fontSize: 25
    // marginLeft: '10%'
  }
});
