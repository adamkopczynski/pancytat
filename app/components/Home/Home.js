import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AdMobRewarded} from 'expo';

import { StyleSheet, Image, TouchableWithoutFeedback} from 'react-native'
import { Container,Text, View,Spinner,  Header, Left, Button, Icon} from 'native-base'
import CardSwiper from '../CardSwiper';
import Title from '../common/Title'
import * as color from '../../constants/colors'
import * as firebase from 'firebase'
import {snapshotToArray} from '../../firebase/firebaseFunctions'
import RandomizeCard from '../CardSwiper/RandomizeCard'

import {quotesFetched, fetchQuotes, removeQuotes} from '../../actions/quotes'

const mapStateToProps = ({quotes, user}) => ({
  quotes: quotes.list,
  uid: user.uid
})

const mapDispatchToProps = dispatch => ({
  quotesFetched: quotes => dispatch(quotesFetched(quotes)),
  fetchQuotes: () => dispatch(fetchQuotes()),
  removeQuotes: index => dispatch(removeQuotes(index))

})

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {

    return {
      headerTitle: <Title text='Pan Cytat' />,
      headerLeft: <Button iconLeft
                          transparent
                          dark
                          onPress={() => navigation.navigate('Search')}
                          style={{alignSelf: 'center'}}>
                      <Icon name='ios-search'
                            style={{marginLeft: 20}}  />
                  </Button>,
      headerRight: <Button transparent
                           iconLeft
                           dark
                           onPress={() => navigation.navigate('Settings')}
                           style={{alignSelf: 'center'}}>
                      <Icon name='ios-settings'
                            style={{marginRight: 20}}/>
                    </Button>

    }
  };

  constructor(){
    super();

    this.lastPress = 0;

    console.ignoredYellowBox = [
    'Setting a timer'
    ];

  }

  componentWillMount(){
    this.fetchQuotes()

  }

  fetchQuotes = () => {
    const {quotesFetched, fetchQuotes, uid} = this.props

    fetchQuotes();

    firebase.database().ref(`quotes/all`).limitToLast(5).on('value', function(snapshot){
      quotesFetched(snapshot.val() !== null ? snapshotToArray(snapshot, uid) : []);
    })
  }

  randQuotes = () => {

    this.fetchQuotes()
  }

  onDoublePress = (quote) => {
    const time = new Date().getTime();
  	const delta = time - this.lastPress;

  	const DOUBLE_PRESS_DELAY = 400;
  	if (delta < DOUBLE_PRESS_DELAY) {
      this.props.setQuoteId(quote.key)
  		this.props.navigation.navigate('SingleQuote')
  	}

  	this.lastPress = time;
};

  render() {
    return (
      <Container>
         {
           this.props.fetching ?

           <Spinner color={color.red}/> :

             this.props.quotes.length > 0 ?
             <CardSwiper
               removeQuotes={this.props.removeQuotes}
               randQuotes={this.randQuotes}
               navigation={this.props.navigation}
               images={this.props.quotes}
             /> :
             <RandomizeCard randQuotes={this.randQuotes}/>
         }
     </Container>
  );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)
