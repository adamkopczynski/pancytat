import React from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Image,
    View,
    TouchableWithoutFeedback,
    Animated,
    TextInput,
    Dimensions,
    Keyboard,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage} from 'react-native'

import * as Animatable from 'react-native-animatable';
import {Container, Button, Text, Icon} from 'native-base';
import * as color from '../../constants/colors';
import * as firebase from 'firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class Login extends React.Component{
  static navigationOptions = {
    header: null
  };

  constructor(){
    super();

    this.state= {
      email: '',
      password: ''
    }
  }

  componentWillMount(){

    this.loginHeight = new Animated.Value(150);

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
    this.keyboardWillShow)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
    this.keyboardWillShow)

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHide)

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
    this.keyboardWillHide)

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);

  }

  keyboardWillShow = (ev) => {

    Animated.parallel([

      Animated.timing(this.keyboardHeight, {
        toValue: ev.endCoordinates.height + 10,
        duration: ev.duration + 100
      }),

      Animated.timing(this.forwardArrowOpacity, {
        toValue: 1,
        duration: ev.duration
      }),

      Animated.timing(this.borderBottomWidth, {
        toValue: 1,
        duration: ev.duration
      })

    ]).start()

  }

  keyboardWillHide = (ev) => {

    Animated.parallel([

      Animated.timing(this.keyboardHeight, {
        toValue: 10,
        duration: 100
      }),

      Animated.timing(this.forwardArrowOpacity, {
        toValue: 0,
        duration: 100
      }),

      Animated.timing(this.borderBottomWidth, {
        toValue: 1,
        duration: 100
      })

    ]).start()

  }

  increaseHeightOfLogin = () => {

    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500
    }).start(() => {
      this.refs.textInputRef.focus()
    })

  }

  decreaseHeightOfLogin = () => {

    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start()

  }

  login(){

    Keyboard.dismiss();
    try{
      const {email, password} = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if(user) {
          this.props.navigation.navigate('App')
        }
        else{
          alert('Nie udało sie zalogować! Spróbuj ponownie lub użyj innej metody.')
        }
      })
      .catch((err) => alert(err.toString()))

    }
    catch(error){
      console.log(error.toString())
      alert('Nie udało sie zalogować! Spróbuj ponownie lub użyj innej metody.')
    }
  }

  render(){

    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]
    })

    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100]
    })

    const arrowBackOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    const passwordOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    const passwordHeight = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 50]
    })

    return(
      <Container style={styles.container}>

        <Animated.View
              style={{
                position: 'absolute',
                height: 60, width: 60,
                top: 60, left: 25,
                zIndex: 100,
                opacity: arrowBackOpacity
              }}>

              <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}>
                  <Icon name='md-arrow-back' style={{color: '#222'}} />
              </TouchableOpacity>

        </Animated.View>

        <Animated.View
              style={{
                position: 'absolute',
                top: 60, right: 25,
                zIndex: 100,
                opacity: arrowBackOpacity
              }}>

              <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={{color: 'black', fontSize: 20}}> Zarejestruj się..</Text>
              </TouchableOpacity>

        </Animated.View>

        <Animated.View
              style={{
                position: 'absolute',
                height: 60, width: 60,
                bottom: this.keyboardHeight,
                right: 10,
                zIndex: 100,
                opacity: this.forwardArrowOpacity,
                backgroundColor: color.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30
              }}>

              <TouchableOpacity
                        onPress={() => this.login()}>
                  <Icon name='md-log-in' style={{color: 'white'}} />
              </TouchableOpacity>

        </Animated.View>

        <ImageBackground
            source={require('../../images/login-bg.png')}
            style={{flex: 1, }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Animatable.View
                      animation='zoomIn'
                      iterationCount={1}
                      style={{
                          backgroundColor: 'white',
                          borderRadius: 3,
                          padding: 10,
                          borderStyle: 'solid',
                          borderWidth: 1,
                          borderColor: '#222'
                        }}>
                  <Image source={require('../../images/pancytat.png')} style={styles.logo}/>
                </Animatable.View>

            </View>
            <Animatable.View
              animation='slideInUp'
              iterationCount={1}>

              <Animated.View
                style={{
                  height: this.loginHeight,
                  backgroundColor: 'white'
                }}>

                <Animated.View
                    style={{
                      opacity: headerTextOpacity,
                      alignItems: 'flex-start',
                      paddingHorizontal: 25,
                      marginTop
                    }}>

                    <Text
                        style={{fontSize: 24}}>
                      Poznaj moc inspiracji
                    </Text>
                </Animated.View>
                <TouchableOpacity
                      onPress={() => this.increaseHeightOfLogin()}>
                  <View
                    style={{
                      marginTop: 15,
                      paddingHorizontal: 25,
                      flexDirection: 'row'
                    }}>

                    <Icon name='ios-person' style={{fontSize: 28, color: color.primary}} />

                    <Animated.View
                        pointerEvents='none'
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          borderColor: color.primary,
                          borderStyle: 'solid',
                          borderBottomWidth: this.borderBottomWidthListener}}>

                      <TextInput
                          ref='textInputRef'
                          style={{flex:1, fontSize: 20, marginLeft: 20}}
                          underlineColorAndroid='transparent'
                          onChangeText={email => this.setState({email})}
                          placeholderTextColor='#999c9f'
                          placeholder='Email..' />
                    </Animated.View>

                  </View>
                </TouchableOpacity>

                <Animated.View
                  style={{
                    opacity: passwordOpacity,
                    marginTop: 10,
                    paddingHorizontal: 25,
                    flexDirection: 'row'
                  }}>

                  <Icon name='ios-lock' style={{fontSize: 28, color: color.primary}} />

                  <Animated.View
                      style={{
                        flex: 1,
                        flexDirection: 'row'}}>

                    <TextInput
                        ref='passInputRef'
                        style={{flex:1, fontSize: 20, marginLeft: 20}}
                        underlineColorAndroid='transparent'
                        secureTextEntry
                        onChangeText={password => this.setState({password})}
                        placeholderTextColor='#999c9f'
                        placeholder='Hasło..' />
                  </Animated.View>

                </Animated.View>

              </Animated.View>
              <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('SocialLogin')}>
                <View
                  style={{
                    height: 70,
                    backgroundColor: 'white',
                    paddingHorizontal: 25,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderTopColor: color.primary,
                    borderTopWidth: 1,
                    borderStyle: 'solid'
                  }}>
                  <Text
                    style={{
                      color: color.primary,
                      fontWeight: 'bold'
                    }}>
                    Lub zaloguj się używając facebook'a
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animatable.View>
        </ImageBackground>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  logo:{
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
})

export default Login
