import React from 'react';
import {WebView} from 'react-native';

const WebViewContainer = ({navigation}) => {
  const uri = navigation.getParam('uri');
  return(
    <WebView
      source={{uri}}/>
  )
}

export default WebViewContainer
