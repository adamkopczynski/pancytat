import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { StyleSheet, Image, AsyncStorage, ImageBackground } from 'react-native'
import {Container, Content, Text} from 'native-base'
import * as Animatable from 'react-native-animatable'
import * as color from '../constants/colors'

import {userLoggedIn} from '../actions/auth'

const mapDispatchToProps = dispatch => ({
  userLoggedIn: user => dispatch(userLoggedIn(user))
})

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  }

  async componentDidMount(){
      const user = await AsyncStorage.getItem('user');
      if(user){
        this.props.userLoggedIn(JSON.parse(user));
        console.log(JSON.parse(user))
        setTimeout(() => this.props.navigation.navigate('App'), 2500)
      }
      else{
        setTimeout(() => this.props.navigation.navigate('Auth'), 2500)
      }
  }

  render() {

    return (
      <Container style={styles.container}>
          <ImageBackground
              source={require('../images/login-bg.png')}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

              <Animatable.View
                  animation='flipInX'
                  iterationCount={1}
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#222'
                  }}>
                <Image style={{width: 200, height: 200}} source={require('../images/pancytat.png')}/>
              </Animatable.View>


              <Animatable.Text
                  style={styles.loading}
                  duration={1500}
                  animation="bounce"
                  iterationCount="infinite"
              >
                  Loading...
              </Animatable.Text>
          </ImageBackground>
      </Container>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading:{
    position: 'absolute',
    bottom: 60,
    color: '#333',
    fontSize: 25
  }
});



export default connect(() => ({}), mapDispatchToProps)(Splash)
