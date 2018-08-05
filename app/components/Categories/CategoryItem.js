import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import {TouchableWithoutFeedback, StyleSheet, Image} from 'react-native';
import {Text, View} from 'native-base';
import * as Animatable from 'react-native-animatable';

const CategoryItem = ({navigation, category, icon, bgColor, delay}) => {
  return(
    <Animatable.View
          animation='slideInLeft'
          iterationCount={1}
          delay={delay}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Category', {cat: category})}>
        <LinearGradient
          colors={bgColor}
          style={styles.item}>
          <View>
            <Text style={styles.text}>{category}</Text>
          </View>
          <Image source={icon} style={{width: 64, height: 64}}/>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  item:{
    padding: 15,
    flex: 1,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 10
  },
  text:{
    fontFamily: 'Tale',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default CategoryItem;
