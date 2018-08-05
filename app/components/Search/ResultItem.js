import React from 'react';
import {View, Text} from 'native-base';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';

const ResultItem = (props) => {
  const {post, navigation} = props;
  return(
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('SingleQuote', {id: post.key})}>
      <Animatable.View
          animation='zoomIn'
          style={styles.item}>
          <Image source={{uri: post.photoUrl}} style={styles.image}/>
          <View
              style={styles.description}>
            <Text>{post.text}</Text>
          </View>
      </Animatable.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: 100,
    height: 100
  },
  description: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})

export default ResultItem
