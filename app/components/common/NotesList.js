import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { StyleSheet, TextInput, View, ListView } from 'react-native'
import { Button, Icon, List, ListItem, Text, Right, Left, Body } from 'native-base'

import * as color from '../../constants/colors'
import * as firebase from 'firebase'

import {notesFetched} from '../../actions/notes'

const mapStateToProps = ({notes, user}) => ({
  notes: notes.list,
  uid: user.uid
})

const mapDispatchToProps = dispatch => ({
  notesFetched: notes => dispatch(notesFetched(notes))
})

class NotesList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Notatki',
    }
  }

  constructor(props){
    super(props)
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
  }

  getNotes(){
    const {uid, notesFetched} = this.props

    firebase.database().ref(`notes/${uid}`).on('value', function(snapshot){
      notesFetched(snapshot.val() !== null ? snapshot.val() : [])
    })
  }



  componentDidMount(){
    this.getNotes()
  }

  render() {

    return (
      <View style={styles.container}>
          <List>
            {this.props.notes.length > 0 ? this.props.notes.map((note, i) =>
              <ListItem key={i} icon>
                <Left>
                  <Icon name={`ios-pricetag${note.important ? '' : '-outline'}`}
                        style={{color: note.important ? color.primary : '#222222'}}/>
                </Left>
                <Body>
                  <Text>{note.content}</Text>
                </Body>
                <Right>
                  <Icon name='ios-arrow-forward' />
                </Right>
              </ListItem>
            ):
            (<Text>Nie posiadasz jeszcze notatek.</Text>)
          }
          </List>
        <Button
          iconLeft
          transparent
          large
          primary
          onPress={() => this.props.navigation.navigate('NotesEditor')}
          style={styles.addBtn}>
            <Icon name='md-add-circle' style={{fontSize: 50, color: color.primary}}/>
        </Button>
      </View>
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
