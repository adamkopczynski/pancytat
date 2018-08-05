import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Thumbnail,View, Text, Icon, Button, Body} from 'native-base';

const Comment = ({photoUrl, comment, username}) => {
  return(
    <View style={styles.card}>
      <Thumbnail source={{uri: photoUrl}} style={styles.thumbnail}/>
      <View style={styles.content}>
        <Text style={styles.username}>
          {username}
        </Text>
        <Text>
          {comment}
        </Text>
      </View>
      <Button
          transparent
          dark
          icon >
          <Icon name='ios-more' />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  thumbnail:{
    marginRight: 10
  },
  content: {
    flex: 1
  },
  username:{
    fontWeight: "bold"
  }
})

export default Comment
