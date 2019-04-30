import axios from 'axios'
import _ from 'lodash'
import { Buffer } from 'buffer';

const ClIENT_ID = 'c106055a73514c3d96172527734bc5bd'; // Your client id
const CLIENT_SECRET = '122609d12887460ca60cbd6ddcd0b8c3'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Or Your redirect uri

export const APIController = axios.create({
    baseURL: 'http://prelive.mygoatjob.com/api/v1', // PRELIVE
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// export const APIControllerWithToken = (token) => {
//     return axios.create({
//         // baseURL: 'http://live.mygoatjob.com/api/v1' , LIVE
//         baseURL: 'http://prelive.mygoatjob.com/api/v1', // PRELIVE
//         // baseURL: 'http://mygoatjob.acc-svrs.com/api/v1', // DEV
//         timeout: 10000,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//         }
//     })
// }

export const APIControllerWithFormDataAndToken = (token) => {
    return axios.create({
        // baseURL: 'http://live.mygoatjob.com/api/v1' , LIVE
        baseURL: 'http://prelive.mygoatjob.com/api/v1', // PRELIVE
        // baseURL: 'http://mygoatjob.acc-svrs.com/api/v1', // DEV
        timeout: 20000,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        },
        // onUploadProgress: (progressEvent) => {
        //     const percent = _.round((progressEvent.loaded / progressEvent.total), 2)
        //     store.dispatch(uploadProgress(percent))
        // } 
    })
}


export const APIControllerWithToken = (access_token,token_type) => {
    return axios.create({
        baseURL: 'https://api.spotify.com/v1/me', 
        timeout: 10000,
        headers: {
            'Authorization': token_type+' '+ access_token,
        }
    })
}

export const APIControllerGetToken=(params)=>{
    return axios.create({
        method: 'POST',
        baseURL: 'https://accounts.spotify.com/api/token', 
        timeout: 10000,
        headers: {
            'Authorization': 'Basic ' + (new Buffer(ClIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:params
    })
}


export const APIAlbum = (token)=>{
    return axios.create({
            baseURL: 'https://api.spotify.com/v1/albums?ids=6KT8x5oqZJl9CcnM66hddo,70rcreeZEOa1WDijdP7zDV,2Pz8VAMiGc9UW1rrbBRDuO,4yenfBKQAR4ofEgNPk5Ocn,0sAEP9eReqL9m7G8sica8e,6OSLjWXJHlMRfQwM0HkOhQ&market=us', 
            timeout: 10000,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    })
}

export const APIAlbumFeatured = (token)=>{
    return axios.create({
            baseURL: 'https://api.spotify.com/v1/albums/1bcvtuHyO79DNAOOhHEkEm?market=ES', 
            timeout: 10000,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    })
}
export const APIListGenres = (token)=>{
    return axios.create({
            baseURL: 'https://api.spotify.com/v1/browse/categories?country=VN&limit=20&offset=5', 
            timeout: 10000,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    })
}
export const APIPlaylistOfGenres = (token,category_id)=>{
    return axios.create({
            baseURL: 'https://api.spotify.com/v1/browse/categories/'+category_id+'/playlists', 
            timeout: 10000,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
    })
}

export const APIgetMusicOfGenres=(token,playlist_id)=>{
    return axios.create({
        baseURL:'https://api.spotify.com/v1/playlists/'+playlist_id+'?market=VN',
        timeout:10000,
        headers:{
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    })

}
export const APIgetArtist = (token) => {
    return axios.create({
        baseURL: 'https://api.spotify.com/v1/artists?ids=41MozSoPIsD1dJM0CLPjZF,7vk5e3vY1uw9plTHJAMwjN,3Tehj7YghQc7zH0I1faGc6,7gOdHgIoIKoe4i9Tta6qdD,0hEurMDQu99nJRq8pTxO14,66CXWjxzNUsdJxJ2JdwvnR,6qqNVTkY8uBg9cP3Jd7DAH,1Xylc3o4UrD53lo9CvFvVg,4npEfmQ6YuiwW1GpUmaq3F,5FWPIKz9czXWaiNtw45KQs,1HBjj22wzbscIZ9sEb5dyf',
        timeout: 10000,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })

}
export const APIgetTrackArtist = (token, track_id) => {
    return axios.create({
        baseURL: 'https://api.spotify.com/v1/artists/' + track_id + '/top-tracks?country=ES',
        timeout: 10000,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })

}