import React, {
  Component
} from 'react-native';
import decorateInstance from '../lib/decorateInstance';

export default class StyledComponent extends Component {
  static contextTypes = {
    theme: React.PropTypes.object
  };

  constructor(...args) {
    super(...args);
    decorateInstance(this);
  }
};
