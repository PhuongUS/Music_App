import { combineReducers } from 'redux'

import { loginReducer,getTokenReducer,CheckGetTokenSuccess,} from '../containers/auth/login/reducers/login.reducer'
import {getAbumReducer,getAbumFeaturedReducer,getGenresReducer} from '../containers/screen/home/reducers/home.reducer'
import {getPlaylistOfGenres,getPlayMusicOfGenres} from '../containers/screen/genres/reducer/genres.reducer'
import {getArtistReducer,getTrackArtistReducer} from '../containers/screen/artists/reducers/artists.reducer'
import{hidenShowMini,sendDataMusic,sendIndexMusic,nowPlayingReducer} from '../containers/screen/listMusic/reducer/listMusic.reducer'
import storage from 'redux-persist/lib/storage'
import {addFavoriteReducer} from '../containers/screen/myMusic/reducers/myMusic.reducer'
const appReducer = combineReducers({
    loginReducer: loginReducer,
    getTokenReducer:getTokenReducer,
    getAbumReducer:getAbumReducer,
    getAbumFeaturedReducer:getAbumFeaturedReducer,
    getGenresReducer:getGenresReducer,
    getPlaylistOfGenres:getPlaylistOfGenres,
    checkTokenSuccess:CheckGetTokenSuccess,
    getPlayMusicOfGenres:getPlayMusicOfGenres,
    getArtistReducer: getArtistReducer,
    getTrackArtistReducer: getTrackArtistReducer,
    hidenShowMini:hidenShowMini,
    sendDataMusic:sendDataMusic,
    //logoutUser:logoutUser,
    //logoutToken:logoutToken,
    sendIndexMusic:sendIndexMusic,
    nowPlayingReducer:nowPlayingReducer,
    addFavoriteReducer: addFavoriteReducer
})
export default rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
      }
    
      return appReducer(state, action)
  }