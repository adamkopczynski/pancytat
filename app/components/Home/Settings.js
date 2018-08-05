import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, AsyncStorage} from 'react-native'
import {Button,
    Text, Icon,
    List,
    ListItem,
    View,
    Body,
    Left,
    Separator} from 'native-base'

import Title from '../common/Title'
import * as Animatable from 'react-native-animatable'
import * as color from '../../constants/colors'

const ColorIcon = ({name, color = 'gray'}) => {
  return(
    <View style={[styles.iconBg, {backgroundColor: color}]}>
      <Icon name={name} style={styles.icon}/>
    </View>
  )
}

class Settings extends React.Component {
  static navigationOptions = {
    headerTitle: <Title text='Ustawienia' />,
  };

  constructor(props){
      super(props);
      this.state = {}
  }

  logout(){
    this.props.navigation.navigate('Auth')
    AsyncStorage.removeItem('user')
  }

  render() {

    return (
      <View style={styles.container}>
        <List>
            <ListItem
                onPress={() => this.props.navigation.navigate('WebView', {uri: 'https://pancytat.pl/'})}
                icon
                style={styles.item}>
              <Left>
                <ColorIcon name='md-appstore' color='#fdcb6e'/>
              </Left>
              <Body>
                <Text>Sklep</Text>
              </Body>
            </ListItem>
            <ListItem
                onPress={() => this.props.navigation.navigate('WebView', {uri: 'https://pancytat.pl/regulamin/'})}
                icon
                style={styles.item}>
              <Left>
                <ColorIcon name='ios-help-circle-outline' color='#3498db'/>
              </Left>
              <Body>
                <Text>Regulamin</Text>
              </Body>
            </ListItem>
            <ListItem
                onPress={() => this.props.navigation.navigate('WebView', {uri: 'https://pancytat.pl/regulamin/'})}
                icon
                style={styles.item}>
              <Left>
                <ColorIcon name='ios-hand' color='#2980b9'/>
              </Left>
              <Body>
                <Text>Polityka prywatności</Text>
              </Body>
            </ListItem>
        </List>
        <Button
            onPress={() => this.logout()}
            danger
            iconLeft
            block
            style={styles.button}>
          <Icon name='exit' style={{color: 'white'}}/>
          <Text>Wyloguj</Text>
        </Button>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    margin: 10
  },
  iconBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 40,
    height: 40
  },
  icon: {
    color: '#fff'
  },
  item: {
    height: 55
  }
});



export default Settings
