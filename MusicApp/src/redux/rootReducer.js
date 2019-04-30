import { combineReducers } from 'redux'

import { loginReducer,getTokenReducer,CheckGetTokenSuccess } from '../containers/auth/login/reducers/login.reducer'
import {getAbumReducer,getAbumFeaturedReducer,getGenresReducer} from '../containers/screen/home/reducers/home.reducer'
import {getPlaylistOfGenres,getPlayMusicOfGenres} from '../containers/screen/genres/reducer/genres.reducer'
import {getArtistReducer,getTrackArtistReducer} from '../containers/screen/artists/reducers/artists.reducer'

export default rootReducer = combineReducers({
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
    // logoutUser:logoutUser,
    // logoutToken:logoutToken
})