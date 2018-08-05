import React from 'react';
import {View, Text} from 'native-base';
import * as Animatable from 'react-native-animatable';
import * as color from '../../constants/colors';
import {
  PublisherBanner
} from 'expo';

class AdCard extends React.Component {
  render() {
    return (
      <Animatable.View
          animation='zoomIn'
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            width: 300,
            height: 250,
            marginBottom: 10,
            marginTop: 10,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: color.red,
            alignSelf: 'center'
          }}>
        <View style={{
            borderRadius: 10,
            backgroundColor: '#ffda19',
            paddingHorizontal: 8,
            zIndex: 100,
            paddingVertical: 3,
            position: 'absolute',
            left: 10,
            top: 10
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Reklama
          </Text>
        </View>
        <PublisherBanner
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="ANDROID" />
      </Animatable.View>
    );
  }
}

export default AdCard;
