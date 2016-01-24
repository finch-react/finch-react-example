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

  constructor(...args) {
    super(...args);
    this.state = {a:1};
  }

  render() {
    return (
      <View>
        <Text ref="text" onClick={()=>this.setState((s)=>({a:s.a+1}))}>Welcome to React Native in Web1</Text>
      </View>
    )
  }
}
