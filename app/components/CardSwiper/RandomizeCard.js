import React from 'react';
import {View, Button, Text} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {
  PublisherBanner
} from 'expo';

const RandomizeCard = ({randQuotes}) => {
  return(
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Animatable.View
            animation='zoomIn'
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              width: 300,
              height: 250,
              marginBottom: 10
            }}>
          <View style={{
              borderRadius: 10,
              backgroundColor: '#ffda19',
              paddingHorizontal: 20,
              zIndex: 100,
              paddingVertical: 3,
              position: 'absolute',
              left: 10,
              top: 10
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Ad
            </Text>
          </View>
          <PublisherBanner
            bannerSize="mediumRectangle"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            testDeviceID="ANDROID" />
        </Animatable.View>
        <Animatable.View
            animation='slideInUp'>
         <Button
             success
             onPress={() => randQuotes()}>
           <Text style={{color: 'white', fontSize: 30}}>Losuj</Text>
         </Button>
       </Animatable.View>
    </View>
  )
}

export default RandomizeCard
