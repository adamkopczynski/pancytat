import React from 'react';
import {View, Text} from 'native-base';

const Title = ({text}) => {
  return(
    <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
        <Text style={{fontFamily: 'Tale', fontSize: 20, color: '#222'}}>{text}</Text>
     </View>
  )
}

export default Title
