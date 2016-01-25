import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';

let styleId = -1;

export default class Style {
  constructor(theme, styles) {
    this._theme = theme;

    if (_.isPlainObject(styles)) {
      let stylesObject = styles;
      styles = ()=>[stylesObject];
    }
    if (_.isArrayLike(styles)) {
      let stylesArray = styles;
      styles = ()=>stylesArray;
    }
    invariant(_.isFunction(styles), 'Styles must be plain object, array-like or function that return plain object or array-like');
    var s = styles(theme);

    if (_.isPlainObject(s)) {
      s = [s];
    }

    this._styles = s;
    this._id = ++styleId;
  }

  style(element, props, isMain) {
    if (!element.props.element && !isMain) {
      return;
    }
    var elementName = isMain ? "main" : element.props.element;

    let result = {};
    let styles = this._styles;
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      if (!this.validateProps(style, props)) {
        continue;
      }
      Object.assign(result, style[elementName])
    }
    return result;
  }

  className(element, props, isMain) {
    if (!element.props.element && !isMain) {
      return '';
    }
    let elementName = isMain ? "main" : element.props.element;
    let result = [];
    let local = this._locals[elementName];
    if (local) {
      for (let i = 0; i < local.length; i++) {
        if (!this.validateProps(local[i], props)) {
          continue;
        }
        result.push(local[i].className);
      }
    }
    return _.trim(result.join(' '));
  }

  use() {
    let locals = {};
    let styles = this._styles;
    let css = [];
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      for (let name in style) {
        if (name.startsWith("$")) {
          continue;
        }
        if (!locals[name]) {
          locals[name] = [];
        }
        let local = {
          className: this.buildClassName(i, name)
        };
        if (style.$props) {
          local.$props = style.$props;
        }
        locals[name].push(local);
      }
    }
    this._locals = locals;
    this._css = css.join();
    return this;
  }

  unuse() {
    return this;
  }

  buildClassName(id, name) {
    return ['c', this._id, id, name].join('_');
  }

  validateProps(style, props) {
    if (style.$props) {
      if (!style.$props(props)) {
        return false;
      }
    }
    return true;
  }
}
