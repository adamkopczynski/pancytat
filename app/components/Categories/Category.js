import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Text, Content, View} from 'native-base';

import QuoteCard from '../QuoteCard/QuoteCard'
import * as firebase from 'firebase';

import {fetchFavorites, favoritesFetched} from '../../actions/favorites'

const mapStateToProps = ({favorites, user}) => ({
  quotes: favorites.quotes,
  uid: user.uid
})

const mapDispatchToProps = dispatch => ({
    fetchFavorites: () => dispatch(fetchFavorites()),
    favoritesFetched: quotes => dispatch(favoritesFetched(quotes))
})

function snapshotToArray(snapshot, uid) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        const likes = Object.keys(item.likes ? item.likes : {});
        if(likes.includes(uid)){
          item.isLiked = true
        }
        else{
          item.isLiked = false
        }

        returnArr.push(item);
    });

    return returnArr.reverse(); //sort post by date desc
};

class Category extends React.Component{
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{fontFamily: 'Tale', fontSize: 20}}>{params.cat}</Text>
                   </View>,
    }
  }

  componentWillMount(){
    const {favoritesFetched, fetchFavorites, uid} = this.props
    const cat = this.props.navigation.getParam('cat');

    fetchFavorites();

    firebase.database().ref(`quotes/all`).orderByChild(`categories/${cat.toLowerCase()}`).equalTo(true).on('value', function(snapshot){
      favoritesFetched(snapshot.val() !== null ? snapshotToArray(snapshot, uid) : []);
    })
  }


  render(){
    return(
      <Container>
        <Content>
          {this.props.quotes.map(quote => <QuoteCard
                                              post={quote}
                                              navigation={this.props.navigation}
                                              key={quote.key}
                                              uid={this.props.uid}/>)}
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
