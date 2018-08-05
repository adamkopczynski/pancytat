import React from 'react';
import PropTypes from 'prop-types';

import {TouchableWithoutFeedback, Animated} from 'react-native'
import {Icon} from 'native-base'

const IconButton = ({name, color = 'grey', onPress, style = []}) => {
  return(
    <TouchableWithoutFeedback
        onPress={() => onPress()}>
      <Animated.View style={[{marginRight: 10}, ...style]}>
        <Icon name={name} style={{color}}/>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func
}

export default IconButton
