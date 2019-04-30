import { Alert } from 'react-native'

export default errorHandler = (err) => {
    return (dispatch) => {
        const res = err.response
        if (err.message == 'Network Error') {
            Alert.alert('Error', 'Please check your internet connection and try again later.')
        } else if (res.status == 500) {
            Alert.alert('Error', 'Internal server error. Please try again later.')
        } else if (err == 'ECONNABORTED') {
            Alert.alert(lang.error.error, "The request time out.")
        } 
        // else if (err.message !== undefined) {
        //     Alert.alert(lang.error.error, err.message)
        // } else if (err.description !== undefined) {
        //     Alert.alert(lang.error.error, err.description)
        // } else if (typeof err === 'string' || err instanceof String) {
        //     Alert.alert(lang.error.error, err)
        // }
    }
}