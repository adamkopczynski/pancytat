import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Text, Content, View} from 'native-base';

import AdCard from '../common/AdCard';
import QuoteCard from '../QuoteCard/QuoteCard'
import Title from '../common/Title'
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

class FavoritesContainer extends React.Component{
  static navigationOptions = {
    headerTitle: <Title text='Ulubione' />,
  };

  componentWillMount(){
    const {favoritesFetched, fetchFavorites, uid} = this.props

    fetchFavorites();

    firebase.database().ref(`quotes/all`).orderByChild(`likes/${uid}`).equalTo(true).on('value', function(snapshot){
      favoritesFetched(snapshot.val() !== null ? snapshotToArray(snapshot, uid) : []);
    })
  }

  renderQuotes(items){
    return(
      <View>
        {items.map(quote => <QuoteCard
                              post={quote}
                              navigation={this.props.navigation}
                              key={quote.key}
                              id={quote.key}
                              uid={this.props.uid}/>)}
      </View>
    )
  }

  render(){
    const x = Math.floor(this.props.quotes.length/3);
    const firstPart = this.props.quotes.slice(0, x);
    const secondPart = this.props.quotes.slice(x);
    return(
      <Container>
        <Content>
          {this.renderQuotes(firstPart)}
          <AdCard />
          {this.renderQuotes(secondPart)}
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
