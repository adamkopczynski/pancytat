import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Content, Text} from 'native-base';

import CommentInput from './CommentInput';
import Comment from './Comment'
import Title from '../common/Title'

import * as firebase from 'firebase';

import {fetchComments, commentsFetched} from '../../actions/comments';

const mapStateToProps = ({user, comments}) => ({
  username: user.name,
  photoUrl: user.photoUrl,
  comments: comments.list
})

const mapDispatchToProps = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  commentsFetched: comments => dispatch(commentsFetched(comments))
})

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

class CommentsContainer extends React.Component{
  static navigationOptions = {
    headerTitle: <Title text='Komentarze' />,
  };

  componentWillMount(){
    const id = this.props.navigation.getParam('id', 'NO-ID');
    const {commentsFetched, fetchComments} = this.props;

    fetchComments()

    firebase.database().ref(`comments/${id}`).on('value', (snapshot) => {
      commentsFetched(snapshot.val() !== null ? snapshotToArray(snapshot) : [])
    })
  }

  addComment(comment){
    const id = this.props.navigation.getParam('id', 'NO-ID');
    const {username, photoUrl} = this.props;

    if(comment.length > 0 && comment.length < 200){
      firebase.database().ref(`comments/${id}`).push({
        username: username,
        userPhoto: photoUrl,
        content: comment,
        timestamp: new Date().valueOf()
      })
    }
    else{
      alert('Komentarz musi zawierać min. 1 i max 200 znaków.')
    }
  }

  render(){
    return(
      <Container>
        <Content padder>
          {this.props.comments.map( comment => <Comment
                                                    key={comment.key}
                                                    username={comment.username}
                                                    comment={comment.content}
                                                    photoUrl={comment.userPhoto} />)}
        </Content>
        <CommentInput onCommentAdd={this.addComment.bind(this)}/>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
