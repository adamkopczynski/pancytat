import React from 'react'
import {View, Button, TextInput, StyleSheet, TouchableHighlight, Image} from 'react-native'
import * as color from '../../constants/colors'

import * as firebase from 'firebase'

class LoginWithEmail extends React.Component{
  static navigationOptions = {
    title: 'Login with email',
    headerStyle: {
      backgroundColor: color.red,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  signupUser(email, password){
    try{
      if(password.length < 6){
        alert('Twoje hasło powinno zawierać min. 6 znaków')
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
      }
    }
    catch(error){
      console.log(error.toString())
    }
  }

  login(email, password){
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if(user) {
          console.log(user)
          this.props.navigation.navigate('App')
        }
        else{
          alert('Nie udało sie zalogować! Spróbuj ponownie lub użyj innej metody.')
        }
      })

    }
    catch(error){
      console.log(error.toString())
      alert('Nie udało sie zalogować! Spróbuj ponownie lub użyj innej metody.')
    }
  }

  render(){
    const {email, password} = this.state
    return(
      <View style={styles.container}>
        <Image source={require('../../images/pancytat.png')} style={styles.logo}/>

        <TextInput
          placeholder='email'
          underlineColorAndroid={color.red}
          autoCapitalize='none'
          onChangeText={email => this.setState({email})}
          style={styles.input}
        />

        <TextInput
          placeholder='password'
          underlineColorAndroid={color.red}
          style={styles.input}
          autoCapitalize='none'
          onChangeText={password => this.setState({password})}
          secureTextEntry
        />

        <TouchableHighlight style={styles.btn}>
          <Button
              title='Login'
              onPress={() => this.login(email, password)}
              color={color.red}/>
        </TouchableHighlight>

        <TouchableHighlight style={styles.btn}>
          <Button
              title='Signup'
              onPress={() => this.signupUser(email, password)}
              color={color.red}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    padding: 10
  },
  logo:{
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 50
  },
  btn:{
    marginBottom: 15,
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 20
  },
  input:{
    marginBottom: 5,
    padding:10
  }
})

export default LoginWithEmail
