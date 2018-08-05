import React from 'react'
import {
  Animated,
  View
}from 'react-native';

import {Item, Icon, Input, Button, Text} from 'native-base';

import * as Animatable from 'react-native-animatable'
import * as firebase from 'firebase';
import * as color from '../../constants/colors'


class SignUp extends React.Component{

  constructor(){
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  signupUser = () => {
    const {email, password} = this.state
    try{
      if(password.length < 6){
        alert('Twoje hasło powinno zawierać min. 6 znaków')
      }
      if(password.length === 6){
        alert('Musisz podać adres email.')
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert('Utworzono konto.')
          setTimeout(() => this.props.navigation.goBack(), 1000)
        })
        .catch((err) => alert(err.toString()))
      }
    }
    catch(error){
      alert('Nie udało się zarejestrować!')
    }
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Animatable.View
              animation='fadeIn'
              style={{padding: 15}}>
            <Item rounded style={{marginBottom: 10}}>
              <Icon active name='ios-mail' style={{color: color.primary}}/>
              <Input
                ref='emailInput'
                placeholder='Email'
                onChangeText={text => this.setState({email: text})}/>
            </Item>
            <Item rounded style={{marginBottom: 10}}>
              <Icon active name='ios-lock' style={{color: color.primary}}/>
              <Input
                placeholder='Hasło'
                secureTextEntry
                onChangeText={text => this.setState({password: text})}/>
            </Item>
        </Animatable.View>
        <Animatable.View
            style={{
              flex: 1,
              padding: 10
            }}>
          <Button
              block
              onPress={this.signupUser}>
            <Text>
              Zarejestruj
            </Text>
          </Button>
        </Animatable.View>
      </View>
    )
  }
}

export default SignUp
