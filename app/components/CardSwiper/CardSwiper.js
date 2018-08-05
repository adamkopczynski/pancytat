import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  PanResponder,
  Dimensions
} from 'react-native';
import GradientButton from '../common/GradientButton';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';

import CardFooter from '../common/CardFooter';
import DailySign from './DailySign';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class CardSwiper extends React.Component{

  constructor(props){
    super(props);

    this.position = new Animated.ValueXY();
    this.cardsNumber = props.images.length;
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0 , SCREEN_WIDTH/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0 , SCREEN_WIDTH/2],
      outputRange: [1, 0 , 1],
      extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0 , SCREEN_WIDTH/2],
      outputRange: [1, 0.5, 1],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
    }
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove:  (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease:  (evt, gestureState) => {

        if(gestureState.dx > 120){
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH+100, y: SCREEN_HEIGHT}
          }).start(() => {

            this.setState( prevState => ({currentIndex: prevState.currentIndex+1}))
            this.position.setValue({x: 0, y: 0})
          })
        }
        else if(gestureState.dx < -120){
          Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: SCREEN_HEIGHT}
          }).start(() => {

            this.setState( prevState => ({currentIndex: prevState.currentIndex+1}))

            this.position.setValue({x: 0, y: 0})
          })
        }
        else{
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }


      },
    })
  }

  renderImages = () => {
    const images = this.props.images;
    if(this.state.currentIndex > 4){
        this.props.removeQuotes()
    }

    return(
      images.map((img, i) => {
        if(i < this.state.currentIndex){
          return null;
        }
        else if(i === this.state.currentIndex){
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={i}
              style={[this.rotateAndTranslate,
                styles.card,
                {
                zIndex: 1000
              }]}>
              {i===0 && <DailySign />}
              <Image source={{uri: img.photoUrl}} style={styles.image}/>
              <CardFooter
                  post={img}
                  navigation={this.props.navigation}/>
          </Animated.View>
          )
        }
        else{
          return(
            <Animated.View
              key={i}
              style={[
                styles.card,
                {opacity: this.nextCardOpacity},
                {transform: [{scale: this.nextCardScale}]},
              {
                zIndex: 1000-i
              }]}>
              <Image source={{uri: img.photoUrl}} style={styles.image}/>
              <CardFooter
                navigation={this.props.navigation}
                post={img}/>
            </Animated.View>
          )
        }
      })
    )
  }

  render(){
    return(
      <Animatable.View
            animation='zoomInUp'
            iterationCount={1}
            style={styles.container}>
        {this.renderImages()}
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white'
  },
  image: {
    width: SCREEN_WIDTH-10,
    height: SCREEN_WIDTH-10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
 }
})

export default CardSwiper
