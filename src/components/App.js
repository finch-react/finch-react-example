import React, {
  Component,
  View,
  Text
} from 'react-native';
import StyledComponent from './StyledComponent';
import styles from './App.styles'

export default class App extends StyledComponent {
  static defaultProps = {
    styles: styles
  };

  render() {
    return (
      <View>
        <Text ref="text">Welcome to React Native in Web!</Text>
        {this.props.children}
      </View>
    )
  }
}
