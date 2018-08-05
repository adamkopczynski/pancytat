import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

class PostCard extends React.Component {
  render(){
    const {author, thumbnail, image, likes, comments, timestamp, category} = this.props;
    return(
      <Container>
        <Content>
          <Card style={{elevation: 3}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: thumbnail}} />
                <Body>
                  <Text>{author}</Text>
                  <Text note>{category}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent iconLeft danger>
                  <Icon active name="ios-heart" />
                </Button>
                <Text>{likes}</Text>
              </Left>
              <Body>
                <Content>
                  <Button transparent iconLeft >
                    <Icon active name="chatbubbles" />
                  </Button>
                  <Text>{comments}</Text>
                </Content>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default PostCard
