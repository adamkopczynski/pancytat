import React from 'react';
import {View, Icon, Input} from 'native-base';
import {StyleSheet} from 'react-native';

const SearchBar = (props) => {
  const {searchHandler} = props;
  return(
    <View style={styles.searchbar}>
      <Icon name='ios-search' />
      <Input onChangeText={searchHandler} style={styles.input} placeholder='Search...'/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1
  }
})

export default SearchBar
