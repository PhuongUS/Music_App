import { createStackNavigator ,createDrawerNavigator} from 'react-navigation'

import SplashScreen from './splash/SplashScreen'
import LoginScreen from './auth/login/LoginScreen';
import SignUpScreen from './auth/sign_up/SignUpScreen';
import HomeScreen from './screen/home/HomeScreen';
import SideMenu from './screen/menu/SideMenu'
import ArtistScreen from '../containers/screen/artists/ArtistScreen'
import HeaderHome from './screen/home/Header'
import ListMusicScreen from './screen/listMusic/ListMusicScreen';
import GenresScreen from './screen/genres/GenresScreen'
import MusicDetailScreen from './screen/musicDetail/MusicDetailScreen'
import ListPlayListGenres from './screen/genres/ListPlayListGenres'
//import MiniMusicScreen from './screen/musicDetail/MiniMusicScreen'
import MyMusicScreen from '../containers/screen/myMusic/MyMusicScreen'


const routeConfig = {
    Splash: SplashScreen,
    Login: LoginScreen,
    SignUp:SignUpScreen,
    Artist: ArtistScreen,
    ListMusic:ListMusicScreen,
    Genres:GenresScreen,
    MusicDetail: MusicDetailScreen,
    ListPlayListGenres:ListPlayListGenres,
    Home: HomeScreen,
    //MiniMusic: MiniMusicScreen
    MyMusic: MyMusicScreen

}

const stackConfig = {
    initialRouteName: 'Splash',
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
}

 const Stack= createStackNavigator(routeConfig, stackConfig)

 export default MainNavigator  = createDrawerNavigator({
    StackApp:Stack,
    //Home:HomeScreen,
    //HeaderHome:HeaderHome
},
{
    contentComponent:SideMenu,
drawerWidth: 300
},
)
