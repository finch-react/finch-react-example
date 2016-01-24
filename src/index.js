import React, {
  Component,
  AppRegistry,
  Platform
} from 'react-native';
import App from './components/App';
import './themes';
import './lib/Theme';

AppRegistry.registerComponent('ReactNativeWebExample', () => App);

if (Platform.OS == 'web') {
  var app = document.createElement('div');
  document.body.appendChild(app);

  AppRegistry.runApplication('ReactNativeWebExample', {
    rootTag: app
  })
}
