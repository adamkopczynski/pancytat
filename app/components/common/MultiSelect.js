import React from 'react';
import PropTypes from 'prop-types';
import {Item, View, Button, Icon, Text, Picker} from 'native-base'
import * as Animatable from 'react-native-animatable';

const SelectedItem = ({item, onPress,delay}) => {
  return(
    <Animatable.View
        animation='zoomIn'
        iterationCount={1}
        delay={delay}
        style={{
          margin: 5,
          paddingLeft: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
          width: null,
          backgroundColor: 'white',
          borderRadius: 20,
          borderColor: '#CCC',
          borderStyle:'solid',
          borderWidth: 1}}>
      <Text>{item}</Text>
        <Button
          transparent
          onPress={onPress}
          icon
          danger>
          <Icon name='ios-close' />
      </Button>
    </Animatable.View>
  )
}

class MultiSelect extends React.Component{


    getSelectedItems = (items) => {
    const {onSelectedItemRemove} = this.props;
    return(
      <View style={{flexDirection: 'row', flex:1, flexWrap: 'wrap'}}>
        {
          items.map((item, i) =>
            <SelectedItem
              key={i}
              delay={i*100}
              onPress={() => onSelectedItemRemove(item)}
              item={item}/>
          )
        }
      </View>
    )
  }

  render(){
    const{
        items,
        selectedItems,
        onSelectedItemsChange,
        selected} = this.props;
    return(
      <View>
        <Picker
              mode="dropdown"
              iosHeader="Wybierz kategorie"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              selectedValue={selected}
              onValueChange={onSelectedItemsChange}
            >
              {items.map((item,i) =>
                <Picker.Item key={i} label={item} value={item} />
              )}
            </Picker>
        <View style={{flex:1}}>
          {this.getSelectedItems(selectedItems)}
        </View>
      </View>
    )
  }
}

export default MultiSelect
