import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';

import Title from '../common/Title'
import QuoteCard from '../QuoteCard/QuoteCard'
import AdCard from '../common/AdCard'
import * as firebase from 'firebase';

import {fetchTop, topFetched} from '../../actions/top'

const mapStateToProps = ({top, user}) => ({
  quotes: top.quotes,
  uid: user.uid
})

const mapDispatchToProps = dispatch => ({
    fetchTop: () => dispatch(fetchTop()),
    topFetched: quotes => dispatch(topFetched(quotes))
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

class TopContainer extends React.Component{
  static navigationOptions = {
    headerTitle: <Title text='Top 10' />,
  };

  componentWillMount(){
    const {topFetched, fetchTop, uid} = this.props;

    fetchTop();

    firebase.database().ref(`quotes/all`).orderByChild(`heartCounter`).limitToLast(10).on('value', function(snapshot){
      topFetched(snapshot.val() !== null ? snapshotToArray(snapshot, uid) : []);
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
    const firstPart = this.props.quotes.slice(0, 2);
    const secondPart = this.props.quotes.slice(2);
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

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer);
