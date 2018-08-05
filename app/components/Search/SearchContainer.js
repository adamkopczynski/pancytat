import React from 'react';
import {Container, Content, Item, Input, Text, View} from 'native-base';
import ResultItem from './ResultItem';
import SearchBar from './SearchBar';
import AdCard from '../common/AdCard'
import * as firebase from 'firebase';
import * as ff from '../../firebase/firebaseFunctions'; //ff - firebaseFunctions

class SearchContainer extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
       headerTitle: <SearchBar {...params}/>
    }
  }

  constructor(){
      super();
      this.state = {
        hits: []
      }
  }

  componentWillMount(){
    this.props.navigation.setParams({ searchHandler: this.onSearchTextChange.bind(this) });
  }

  onSearchTextChange = query => {
    firebase.database()
       .ref('quotes/all')
       .orderByChild('text')
       .startAt(`%${query}%`)
       .endAt(query+"\uf8ff")
       .once("value", (snapshot) => {
         this.setState({hits: ff.snapshotToArray(snapshot, firebase.auth().currentUser.uid)})
       })
  }

  render(){
    return(
      <Container>
        <Content padder style={{alignItems: 'center'}}>
          {this.state.hits.length > 0 ?

           this.state.hits.map((hit, i) =>
             <ResultItem post={hit} navigation={this.props.navigation} key={i} />
           ) :
             <View>
               <AdCard />
               <Text>Brak wyników wyszukiwania.</Text>
             </View>
          }
        </Content>
      </Container>
    )
  }
}

export default SearchContainer
