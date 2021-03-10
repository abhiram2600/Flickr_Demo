import React,{useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  ScrollView,
  Dimensions 
} from 'react-native';
import {  observer } from 'mobx-react';
import IndividualImage from './IndividualImage';

interface photo{
  server_id: string;
  id: string;
  secret:string;
}

const windowHeight:number = Dimensions.get('window').height;

const Flickr :React.FC<any>= ({rootStore}) =>{
  const apicall = () =>{
    rootStore.save(text);
  }
  const restore = () =>{
    changeText("")
    rootStore.reset();
  }
  const numpics = rootStore.tot;
  const [text,changeText] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flickr app demo</Text>
      <TextInput 
        autoCapitalize={"none"} 
        onChangeText={(value)=>changeText(value)} 
        value={text} 
        style={styles.tinput}
      />
      <View style={styles.button}>
      <Button title="submit" onPress={()=>apicall()}/>
      <Button title="Reset" onPress={()=>restore()}></Button>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {
        rootStore.photos.map(({id,server_id,secret}:photo)=> {
          return(
            <IndividualImage key={id} server_id={server_id} id={id} secret={secret}/>
          )
        })
      }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title : {
    fontSize:20,
    fontWeight:'bold', 
    marginBottom:15
  },
  tinput : { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1 
  },
  container : {
    marginTop:50
  },
  content : {
    justifyContent:'center',
    alignItems:'center'
  },
  button : {
    flexDirection: 'row', 
    justifyContent: 'center'
  }
})

export default observer(Flickr);
