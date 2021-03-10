import React from 'react';
import {View,Image,StyleSheet} from 'react-native';

interface photo{
    server_id: string;
    id: string;
    secret:string;
}

const IndividualImage : React.FC<photo> = ({server_id,id,secret}) =>{
    return(
        <Image 
        style={styles.img}
        source={{
            uri: `https://live.staticflickr.com/${server_id}/${id}_${secret}.jpg`
        }}/>
    )
}

const styles = StyleSheet.create({
    img:{
        height: 300,
        width:300,
        marginVertical:10
    }
})
export default IndividualImage;