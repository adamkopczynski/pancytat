import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
  Icon,
  Button,
  View,
  Text
}from 'native-base';

import * as color from '../../constants/colors'

const CardFooter = ({likes, isLiked}) => {
  return(
    <View style={styles.container}>
      <View style={styles.actions}>
        <Icon name={`ios-heart${isLiked ? '' : '-outline'}`} style={[{color: isLiked ? color.red : 'grey'}, styles.icon]}/>
        <Icon name='ios-chatbubbles' style={[{color: 'grey'}, styles.icon]}/>
        <Icon name='ios-share-alt' style={[{color: 'grey'}, styles.icon]}/>
      </View>
      <View style={styles.likes}>
        <Text style={styles.text}>{likes} {likes > 1 ? 'likes' : 'like'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  },
  likes: {
    width: null,
    position: 'absolute',
    right: 10
  },
  icon: {
    marginRight: 10
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10
  }
})

CardFooter.propTypes = {
  likes: PropTypes.number.isRequired
}

export default CardFooter;
