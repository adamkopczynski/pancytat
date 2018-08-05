import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as color from '../../constants/colors'
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';

import {Image, Share, CameraRoll, ToastAndroid, Dimensions} from 'react-native'
import {Card, CardItem, Body, Left, Right, Icon, Thumbnail, Text, View, Button } from 'native-base';
import CardFooter from '../common/CardFooter'

const SCREEN_WIDTH = Dimensions.get('window').width;

class QuoteCard extends React.Component{

  render(){
    const {post, uid, navigation, id} = this.props;
    const {photoUrl} = post;
    return(
      <Animatable.View
          animation='zoomInLeft'
          iterationCount={1}>
        <Card>
          <CardItem cardBody>
            <Image ref={`img${id}`} style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}} source={{uri: photoUrl}} />
          </CardItem>
          <CardFooter
            navigation={navigation}
            post={post}/>
        </Card>
      </Animatable.View>
    )
  }
}

export default QuoteCard
