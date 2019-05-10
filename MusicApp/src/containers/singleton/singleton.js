import Sound from 'react-native-sound'


export default class Singleton {
    static myInstance = null;
    /**
     *@returns {Singleton}
     */
    static getInstance(preview_url,loaded) {
        //if (Singleton.myInstance == null) {
            // if(Singleton.myInstance!=null){
            //     Singleton.myInstance=null
            // }
            Singleton.myInstance = new Sound(preview_url, '', (error) => {
                if (error){
                    console.log('failed to load the sound', error);
                }else{
                    loaded()
                    console.log('load completed')
                }
            });
        //}
      return this.myInstance;
    }
    static getSound(){
        if(Singleton.myInstance!=null){
            return this.myInstance
        }else{
            console.log('error get Sound')
            return null;
        }
    }
    static next(preview_url,loaded){
        Singleton.myInstance=new Sound(preview_url, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            }else{
                loaded()
                console.log('load next completed')
            }
        });
        return this.myInstance;
    }
    
    static nextSound(preview_url,loaded){
        console.log('next')
        Singleton.myInstance=new Sound(preview_url, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            }else{
                loaded()
                console.log('load next completed')
            }
        });
        return this.myInstance;
    }
}