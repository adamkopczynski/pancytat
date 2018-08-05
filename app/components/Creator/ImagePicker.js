import React from 'react';
import {
  View,
  Image
} from 'react-native';
import {Button, Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';

const ImagePicker = ({pickImage, selectedImage}) => {
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animatable.View
          animation='flipInY'
          iterationCount={1}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5
          }}>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={selectedImage !== null ? { uri: selectedImage } : require('../../images/pancytat.png')}
        />
        <Button
              icon
              rounded
              style={{position: 'absolute', right: 10, bottom: 10}}
              onPress={pickImage}>
           <Icon name='ios-add' style={{color: 'white'}}/>
        </Button>
      </Animatable.View>
    </View>
  )
}

export default ImagePicker
