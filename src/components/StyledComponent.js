import React, {
  Component
} from 'react-native';
import Styles from '../lib/Styles';
import Theme from '../lib/Theme';
import decorateInstance from '../lib/decorateInstance';

export default class StyledComponent extends Component {
  constructor(...args) {
    super(...args);
    decorateInstance(this);
    //if(this.props.styles) {
    //  let render = this.render;
    //  this.render = () => {
    //    return Styles.linkRefs(this._styles, render.call(this), this.props, this.context, this.context.theme, true);
    //  };
    //}
  }

  componentWillMount() {
    //if(this.props.styles) {
    //  this._styles = Styles.create(this.props.styles).use(this.context.theme);
    //}
  }

  componentWillUnmount() {
    //this._styles.unuse(this.context.theme);
  }
};

StyledComponent.contextTypes = {
  theme: React.PropTypes.object
};
