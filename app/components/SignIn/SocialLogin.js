import React from 'react';
import {connect} from 'react-redux'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Image
}from 'react-native';

import {Container, Button, Text, Icon} from 'native-base'

import * as color from '../../constants/colors'
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase'

import {loginUser, userLoggedIn, authError} from '../../actions/auth'

const mapStateToProps = ({user}) => ({
  loading: user.loading
})

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginUser()),
  userLoggedIn: user => dispatch(userLoggedIn(user)),
  authError: error => dispatch(authError(error))
})

class SocialLogin extends React.Component{

  static navigationOptions = {
    header: null
  };

  async logIn() {
    this.props.login();

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1692829707464251', {
        permissions: ['public_profile'],
      });
    if (type == 'success') {

        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        firebase.auth().signInWithCredential(credential)
        .then(user => {
          if(user.uid){
            AsyncStorage.setItem('user', JSON.stringify(user))
            this.props.userLoggedIn(user)
            this.props.navigation.navigate('App')
          }
        })
        .catch((error) => {
          alert('Nie udało sie zalogować! Spróbuj ponownie lub użyj innej metody.')
          this.props.authError(error)
        })

    }
  }

  render(){
    return(
      <Container style={{flex: 1}}>
        <Animatable.View
              animation='zoomIn'
              iterationCount={1}
              style={{
                position: 'absolute',
                height: 60, width: 60,
                top: 60, left: 25,
                zIndex: 100,
                opacity: 1
              }}>

              <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                  <Icon name='md-arrow-back' style={{color: '#222'}} />
              </TouchableOpacity>

        </Animatable.View>
        <ImageBackground
            source={require('../../images/login-bg.png')}
            style={{flex: 1, }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Animatable.View
                      animation='flipInY'
                      iterationCount={1}
                      style={{backgroundColor: 'white',
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
                iterationCount={1}
                style={styles.container}
                >
                {
                  this.props.loading ?

                  <Animatable.View
                        animation='rotate'
                        iterationCount='infinite'>
                    <Icon name='ios-sync' style={{color: color.primary, fontSize: 30}}/>
                  </Animatable.View>:

                  <Button
                      onPress={() => this.logIn()}
                      icon
                      block>
                    <Icon name='logo-facebook' />
                    <Text>Login</Text>
                  </Button>

                }
            </Animatable.View>
        </ImageBackground>
      </Container>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderStyle: 'solid',
    borderColor: 'rgba(42, 42, 42, 0.73)',
    borderTopWidth: 1,
  },
  logo:{
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin)
