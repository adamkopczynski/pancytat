import React from 'react';
import {Animated, Text} from 'react-native';
import * as color from '../../constants/colors'

const Daily = () => {
  return(
    <Animated.View style={{
        transform: [{
          rotate: '-45deg'
        }],
        position: 'absolute',
        zIndex: 99999,
        top: 10,
        left: 10
      }}>
      <Text>Cytat</Text>
      <Text>Dnia</Text>
    </Animated.View>
  )
}

export default Daily
