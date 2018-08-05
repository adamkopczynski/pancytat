import React from 'react';

import {
   CameraRoll,
   Image,
   ToastAndroid,
   TouchableWithoutFeedback,
   TouchableOpacity,
   Dimensions,
   Animated,
   TextInput,
   ImageBackground
} from 'react-native';
import {Container, Text, Content, Button, Header, Item, Input, Label, Spinner, View, Icon} from 'native-base';
import { ImagePicker } from 'expo';

import MultiSelect from '../common/MultiSelect';
import ImagePickerComponent from './ImagePicker';

import * as firebase from 'firebase';
import * as color from '../../constants/colors';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Creator extends React.Component{

  static navigationOptions = {
    header: null
  }

  constructor(){
    super();

    this.formHeight = new Animated.Value(0);

    this.state = {
      image: null,
      sending: false,
      categories: {},
      tags: '',
      text: '',
      selectedItems: [],
      items: [
        'kategorie',
        'motywacja',
        'cele',
        'marzenia',
        'ryzyko',
        'sukces',
        'wytrwałość'
      ]
  }
}

  showToast = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  onSelectedItemsChange = newItem => {
    this.setState((prevState) => ({selectedItem: newItem, selectedItems: prevState.selectedItems.concat(newItem)}));
  }

  onSelectedItemRemove = newItem => {
    this.setState((prevState) => ({selectedItems: prevState.selectedItems.filter(item => item !== newItem)}));
  }

  createPost = async () => {
      const showToast = this.showToast
      const uri = this.state.image;
      const tags = this.state.tags;
      const text = this.state.text;
      const categories = this.state.selectedItems.reduce((obj, cat) => {
         obj[cat] = true;
         return obj
       }, {})

     this.setState({sending: true});

     if(tags === '' || text === ''){
        showToast("Tagi i text nie mogą być puste.")
      }
      else if(!categories){
        showToast("Wybierz kategorie!")
      }
      else if(uri === null){
        showToast("Wybierz zdjęcie!")
      }
      else{
        const response = await fetch(uri);
        const blob = await response.blob();

        const metadata = {
          contentType: 'image/jpeg',
        };

        let name = new Date().getTime() + "-media.jpg"
        const ref = firebase.storage().ref().child('quotes/all/' + name)
        const task = ref.put(blob, metadata);

        return new Promise((resolve, reject) => {
          task.on(
            'state_changed',
            (snapshot) => {
              //progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => reject(error), /* this is where you would put an error callback! */
            () => {
              var downloadURL = task.snapshot.downloadURL;
              console.log("_uploadAsByteArray ", task.snapshot.downloadURL)

              // save a reference to the image for listing purposes
              var ref = firebase.database().ref('quotes/all').push();

              const quote = {
                'photoUrl': downloadURL,
                author: {
                  displayName: firebase.auth().currentUser.displayName,
                  uid: firebase.auth().currentUser.uid
                },
                tags,
                text
              }

              ref.set({
                ...quote,
                'categories': {
                  ...categories
                },
                'heartCounter': 0,
                'authorUid': firebase.auth().currentUser && firebase.auth().currentUser.uid,
                'timestamp': new Date().getTime()
              })

              showToast("Post dodany!");
              this.setState({sending: false, tags: '', text: '', image: null, selectedItems: []});

            }
          );
        });
      }
      this.setState({sending: false});
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  increaseFormHeight = () => {
    Animated.timing(this.formHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500
    }).start()
  }

  decreaseFormHeight = () => {
    Animated.timing(this.formHeight, {
      toValue: 0,
      duration: 500
    }).start()
  }

  render(){
    const { selectedItems, items } = this.state;

    const arrowBackOpacity = this.formHeight.interpolate({
      inputRange: [0, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    const formPadding = this.formHeight.interpolate({
      inputRange: [0, SCREEN_HEIGHT],
      outputRange: [0, 120]
    })

    return(
      <Container>
          <ImageBackground
                style={{flex: 1}}
                source={require('../../images/login-bg.png')}>

              <Animatable.View
                    animation='zoomIn'
                    style={{
                      position: 'absolute',
                      top: 60, right: 25,
                      zIndex: 100
                    }}>

                    <Text
                      style={{
                        fontFamily: 'Tale',
                        color: '#222',
                        fontSize: 24
                      }}>
                      Kreator cytatów
                    </Text>

              </Animatable.View>

              <ImagePickerComponent
                   selectedImage={this.state.image}
                   pickImage={this.pickImage}/>

               <Animatable.View
                    animation='slideInUp'
                    iterationCount={1}>

                    <Animated.View
                        style={{
                          height: this.formHeight,
                           backgroundColor: 'white',
                           paddingTop: formPadding
                         }}>
                        <Animated.View
                              style={{
                                position: 'absolute',
                                height: 60, width: 60,
                                top: 60, left: 25,
                                zIndex: 100,
                                opacity: arrowBackOpacity
                              }}>

                              <TouchableOpacity
                                        onPress={() => this.decreaseFormHeight()}>
                                  <Icon name='md-arrow-back' style={{color: 'black'}} />
                              </TouchableOpacity>

                        </Animated.View>

                        <View>
                          <View style={{margin: 10}}>
                            <Item rounded>
                              <Input
                                onChangeText={text => this.setState({tags: text})}
                                placeholder='Tagi.. (oddziel spacją)'/>
                            </Item>
                          </View>
                          <View style={{margin: 10}}>
                            <Item rounded>
                              <Input
                                onChangeText={text => this.setState({text: text})}
                                placeholder='Wersja tekstowa cytatu'/>
                            </Item>
                          </View>

                          <MultiSelect
                            items={this.state.items}
                            selected={this.selectedItem}
                            onSelectedItemRemove={this.onSelectedItemRemove}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.selectedItems}/>

                        </View>

                        <Animated.View
                            style={{
                              paddingHorizontal: 10,
                              position: 'absolute',
                              bottom: 60,
                              alignItems: 'center',
                              width: SCREEN_WIDTH,
                              height: 60
                            }}>
                          {
                            this.state.sending ?
                            (<Spinner color={color.primary} />) :
                            (<Button
                                onPress={this.createPost}
                                icon
                                block>
                              <Icon name='ios-add' />
                              <Text>
                                Dodaj
                              </Text>
                            </Button>)
                          }
                        </Animated.View>

                   </Animated.View>

                   <View
                       style={{
                         height: 100,
                         flexDirection: 'row',
                         justifyContent: 'center',
                         alignItems: 'center',
                         backgroundColor: 'white',
                         padding: 20
                       }}>
                       <Button
                         block
                         onPress={() => this.increaseFormHeight()}>
                           <Text>
                             Dodaj post
                           </Text>
                       </Button>
                   </View>
               </Animatable.View>
          </ImageBackground>
      </Container>
    )
  }
}

export default Creator
