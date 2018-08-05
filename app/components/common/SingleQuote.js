import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { StyleSheet, TextInput, TouchableOpacity, Image, Keyboard,Dimensions } from 'react-native';
import {Button, Icon, Badge, Text, H3, Container, Content, Spinner, View, Item} from 'native-base';
import * as color from '../../constants/colors';
import * as firebase from 'firebase';

import CardFooter from './CardFooter'

import {singleQuoteFetched, fetchSingleQuote} from '../../actions/quotes'

const SCREEN_WIDTH = Dimensions.get('window').width;

const mapStateToProps = ({user, quotes}) => ({
  uid: user.uid,
  fetching: quotes.fetching,
  post: quotes.singleQuote,
  quoteId: quotes.quoteId
})

const mapDispatchToProps = dispatch => ({
  singleQuoteFetched: quote => dispatch(singleQuoteFetched(quote)),
  fetchSingleQuote: () => dispatch(fetchSingleQuote())
})

function extendsWithUserLike(snapshot, uid){
  let post = snapshot.val();

  const likes = Object.keys(post.likes ? post.likes : {});

  console.log(likes, uid)

  if(likes.includes(uid)){
    post.isLiked = true
  }
  else{
    post.isLiked = false
  }

  post.key = snapshot.key;

  return post
}

class NotesList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Cytat',
    }
  };

  componentWillMount(){
    const {singleQuoteFetched, fetchSingleQuote, uid} = this.props
    const quoteId = this.props.navigation.getParam('id');

    Keyboard.dismiss();

    fetchSingleQuote()

    firebase.database().ref(`quotes/all/${quoteId}`).on('value', function(snapshot){
      singleQuoteFetched(snapshot.val() !==null ? extendsWithUserLike(snapshot, uid) : {});
    })
  }


  render() {
    const post = this.props.post;
      return (
        <Container style={{backgroundColor: 'white'}}>
          {
            this.props.fetching ?

            <Spinner color={color.red} />:

            this.props.post &&
            <Content>
              <Image style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}} source={{uri: post.photoUrl}} />
              <CardFooter navigation={this.props.navigation} post={this.props.post}/>
              <View style={{flex: 1}} padder>
                <Badge info><Text>{post.tags}</Text></Badge>
              </View>
            </Content>
          }
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title:{
    fontSize: 18
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(NotesList)
