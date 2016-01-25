import React, {
  Component,
  View,
  Text
} from 'react-native';
import StyledComponent from './StyledComponent';
import styles from './App.styles'

export default class App extends StyledComponent {
  static defaultProps = {
    open: true
  };

  styles = styles;

  state = {
    a: 1
  };

  render() {
    return (
      <View>
        <Text>Welcome to React Native in Web!</Text>
        <Text element="text" events="onClick, onPress">{this.state.a}Welcome to React Native in
          Web1!</Text>
      </View>
    );
  }

  text_onClick() {
    this.setState(s=> ({
      a: s.a + 1
    }))
  }

  text_onPress() {
    this.text_onClick();
  }
}
