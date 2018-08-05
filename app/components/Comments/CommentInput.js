import React from 'react'
import PropTypes from 'prop-types'

import {Animated, Keyboard, Dimensions} from 'react-native'
import {View, Item, Input, Button, Icon} from 'native-base'

const SCREEN_WIDTH = Dimensions.get('window').width

class CommentInput extends React.Component {

  constructor(){
    super();

    this.marginBottom = new Animated.Value(0);

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
    this.keyboardWillShow)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
    this.keyboardWillShow)

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHide)

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
    this.keyboardWillHide)

    this.state = {comment: ''}
  }

  keyboardWillShow = (ev) => {
    Animated.timing(this.marginBottom, {
      toValue: ev.endCoordinates.height,
      duration: 100
    }).start()
  }

  keyboardWillHide = (ev) => {
    Animated.timing(this.marginBottom, {
      toValue: 0,
      duration: 100
    }).start()
  }

  render(){
    return(
      <Animated.View style={[{backgroundColor: 'white', padding: 5, width: SCREEN_WIDTH, position: 'absolute'},
         {bottom: this.marginBottom}]}>
        <Item rounded>
          <Input placeholder='Comment..' onChangeText={comment => this.setState({comment})}/>
          <Button
              transparent
              icon
              style={{alignSelf: 'center'}}
              onPress={() => this.props.onCommentAdd(this.state.comment)}>
            <Icon name='ios-paper-plane' />
          </Button>
        </Item>
      </Animated.View>
    )
  }
}

export default CommentInput
