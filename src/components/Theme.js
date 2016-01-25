import React, {
  Component,
} from 'react-native';

export default class Theme extends Component {
  static childContextTypes = {
    theme: React.PropTypes.object
  };

  render() {
    return this.props.children;
  }

  getChildContext() {
    return {...this.context, theme: this.props.name};
  }
}
