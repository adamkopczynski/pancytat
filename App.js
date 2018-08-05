import React from 'react';
import {Provider} from 'react-redux'
import { StyleSheet, Text, View, NetInfo, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { FacebookAds } from 'expo';


import * as firebase from 'firebase'
import * as color from './app/constants/colors'
import store from './app/store'

/* import screens containers */
import Splash from './app/components/Splash'
import WebView from './app/components/WebView'
import HomeScreen from './app/components/Home/Home'
import FavoritesScreen from './app/components/Favorites/FavoritesContainer'
import CreatorScreen from './app/components/Creator/Creator'
import SingleQuoteScreen from './app/components/common/SingleQuote'
import LoginScreen from './app/components/SignIn/SignIn'
import SignUp from './app/components/SignUp'
import SettingsScreen from './app/components/Home/Settings'
import SocialLogin from './app/components/SignIn/SocialLogin'
import CommentsScreen from './app/components/Comments/CommentsContainer'
import CategoriesScreen from './app/components/Categories/CategoriesContainer'
import TopScreen from './app/components/Top/TopContainer'
import Category from './app/components/Categories/Category'
import Search from './app/components/Search/SearchContainer'

/* config firebase */
var config = {
    apiKey: "AIzaSyBxMQbwFKIKXVM4fNgIWUEkbRvKdOeyh2I",
    authDomain: "cytat-750f8.firebaseapp.com",
    databaseURL: "https://cytat-750f8.firebaseio.com",
    projectId: "cytat-750f8",
    storageBucket: "cytat-750f8.appspot.com",
    messagingSenderId: "647569924674"
  };

firebase.initializeApp(config);


Expo.Font.loadAsync({
  Ubuntu: require('./app/fonts/Ubuntu.ttf'),
  Roboto_medium: require('./app/fonts/Roboto_medium.ttf'),
  Tale: require('./app/fonts/Tale.ttf')
});

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);


const AuthStack = StackNavigator({ Login: LoginScreen, SocialLogin, SignUp, WebView });
const AppTab = TabNavigator({
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Creator: CreatorScreen,
    Favorites: FavoritesScreen,
    Top: TopScreen },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Categories') {
          iconName = `ios-list`;
        }
        else if (routeName === 'Favorites') {
          iconName = `ios-heart${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Top') {
          iconName = `ios-trending-up`;
        }
        else if (routeName === 'Creator') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }


        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: color.red,
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false
  });

const AppStack = StackNavigator({
  App: AppTab,
  Settings: SettingsScreen,
  SingleQuote: SingleQuoteScreen,
  Comments: CommentsScreen,
  Category,
  Search,
  WebView
},{
  navigationOptions: {
      headerTintColor: '#222',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Tale'
    }
  }
})

const AppContainer = SwitchNavigator(
  {
    Splash: Splash,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  }
);

const showConnectionError = () =>
ToastAndroid.showWithGravityAndOffset(
  'Brak połączenia z internetem! Sprawdź je i spróbuj ponownie.',
  ToastAndroid.LONG,
  ToastAndroid.BOTTOM,
  25,
  25
);

class AppWithRedux extends React.Component {
  componentWillMount(){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type === 'none'){
        showConnectionError()
      }
    })

    NetInfo.addEventListener(
      'connectionChange',
      (connectionInfo) => {
        if(connectionInfo.type === 'none'){
          showConnectionError()
        }
      }
    );
  }

  componentWillUnmount(){
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default AppWithRedux
