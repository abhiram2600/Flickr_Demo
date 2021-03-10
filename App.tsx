import React,{useState,useEffect} from 'react';
import Flickr from './components/Flickr'
import {Photos} from './models/Store';

const rootStore = Photos.create({
  photos: []
});

const App = () =>{
  return (
      <Flickr rootStore={rootStore}/>
  )
}

export default App;