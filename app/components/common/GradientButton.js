import React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo';

const GradientButton = ({children, colors, onPress}) => {
  return(
    <TouchableWithoutFeedback
      onPress={() => onPress()}>

      <LinearGradient
        style={styles.content}
        colors={colors}>

          <View>
            {children}
          </View>

      </LinearGradient>

    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  content: {
    height: 50,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPress: PropTypes.func
}


export default GradientButton
