import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ToastAndroid, Animated, CameraRoll} from 'react-native';
import {
  Icon,
  Button,
  View,
  Text
}from 'native-base';
import IconButton from './IconButton'
import * as color from '../../constants/colors'
import * as firebase from 'firebase';

const GRAY_HEART_COLOR = 'gray';
const HEART_COLOR = color.red;

const showToast = (text) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    25
  );
}

class CardFooter extends React.Component{

  constructor(props) {
    super(props);

    this.heartAnimation = new Animated.Value(0);
    this.downloadAnimation = new Animated.Value(0);
    this.isLiked = props.post.isLiked;
  }

  _commentPost = () => {
    const {post, navigation} = this.props;
    navigation.navigate('Comments', {id: post.key})
  }

  _likePost = () => {
    const {post} = this.props;
    const uid = firebase.auth().currentUser.uid;
    const {heartCounter, key} = post;

    Animated.timing(this.heartAnimation, {
      toValue: 18,
      duration: 1000
    }).start(() => {
      this.heartAnimation.setValue(0)
    });

    if(this.isLiked){
      const newCount = heartCounter - 1;
      this.isLiked = false;

      firebase.database().ref(`quotes/all/${key}`).update({heartCounter: newCount})
      firebase.database().ref(`quotes/all/${key}/likes/${uid}`).remove()
      showToast('Usunięto polubienie')
    }
    else{
      const newCount = heartCounter + 1;
      post.isLiked = true;
      this.isLiked = true;

      firebase.database().ref(`quotes/all/${key}`).update({heartCounter: newCount})
      firebase.database().ref(`quotes/all/${key}/likes/${uid}`).set(true)
      showToast('Dodano do ulubionych')
    }
  }

  _imageDownload = async () => {
    const {post} = this.props;
    const {photoUrl, key} = post;

    Animated.timing(this.downloadAnimation, {
      toValue: 18,
      duration: 1000
    }).start(() => {
      this.heartAnimation.setValue(0);
      this.forceUpdate();
    });

    Expo.FileSystem.downloadAsync(
      photoUrl,
      Expo.FileSystem.documentDirectory + `pancytat${key}.jpg`
    )
      .then(async ({ uri }) => {
        let permission = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

        if (permission.status === 'granted') {
           await CameraRoll.saveToCameraRoll(uri, "photo")
           .then(() => showToast("Zapisano zdjęcie!"))
        }
      })
      .catch(() => showToast("Nie udało się zapisać!"));

  }

  render(){
    const {heartCounter} = this.props.post;
    const likes = heartCounter;
    const isLiked = this.isLiked;

    let heart_scale = this.heartAnimation.interpolate({
      inputRange: [0, .01, 6, 10, 12, 18],
      outputRange: [1, 0, .1, 1, 1.2, 1]
    });

    let download_translate = this.downloadAnimation.interpolate({
      inputRange: [0, 3, 10, 12, 18],
      outputRange: [0, 3, 10, 3, 0]
    });


    return(
      <View style={styles.container}>
        <View style={styles.actions}>
          <IconButton
              onPress={this._likePost}
              style={[
                {transform: [
                  {scale: heart_scale}
                ]}
              ]}
              name={`ios-heart${isLiked ? '' : '-outline'}`}
              color={ isLiked ? HEART_COLOR : GRAY_HEART_COLOR}/>
          <IconButton
              onPress={this._commentPost}
              name='ios-chatbubbles-outline'/>
          <IconButton
              onPress={this._imageDownload}
              style={[
                {transform: [
                  {translateY: download_translate}
                ]}
              ]}
              name='ios-download-outline' />
        </View>
        <View style={styles.likes}>
          <Text style={styles.text}>{likes} {likes > 1 ? 'likes' : 'like'}</Text>
        </View>
      </View>
    )
  }
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

export default CardFooter;
