import React from 'react';
import {Container, Content,Text, Button} from 'native-base';

import CategoryItem from './CategoryItem'
import Title from '../common/Title'

const categories = [
  {
    label: 'Sukces',
    icon: require('../../images/trophy.png'),
    colors: ['#182848', '#4b6cb7']
  },
  {
    label: 'Marzenia',
    icon: require('../../images/006-brain.png'),
    colors: ['#00d2ff', '#3a7bd5']
  },
  {
    label: 'Ryzyko',
    icon: require('../../images/004-charts.png'),
    colors: ['#00d2ff', '#3a7bd5']
  },
  {
    label: 'Cele',
    icon: require('../../images/003-goal.png'),
    colors: ['#182848', '#4b6cb7']
  },
  {
    label: 'Wytrwałość',
    icon: require('../../images/002-coins.png'),
    colors: ['#00d2ff', '#3a7bd5']
  },
  {
    label: 'Motywacja',
    icon: require('../../images/001-meeting.png'),
    colors: ['#182848', '#4b6cb7']
  }
]

class Categories extends React.Component{
  static navigationOptions = {
    headerTitle: <Title text='Kategorie' />,
  };

  render(){
    return(
      <Container>
        <Content padder>
          {
            categories.sort((a,b) => {
              var labelA = a.label.toLowerCase();
              var labelB = b.label.toLowerCase();
              if (labelA < labelB) {
                return -1;
              }
              if (labelA > labelB) {
                return 1;
              }

              // categories are equal
              return 0;
            })
            .map(
              (item, i)=>
              <CategoryItem
                  key={i}
                  delay={i*200}
                  category={item.label}
                  bgColor={item.colors}
                  icon={item.icon}
                  navigation={this.props.navigation}/>
            )
          }

        </Content>
      </Container>
    )
  }
}

export default Categories;
