export default class Style {
  constructor(theme, styles) {
    this._theme = theme;
    this._styles = styles;


//    delete this._result.$props;
  }

  style(element, props, isMain) {
    console.log(element);
    if (!element.props.element && !isMain) {
      return;
    }
    var elementName = isMain ? "main" : element.props.element;

    let result = {};
    let themedStyles = this._styles(this._theme);
    for (let i = 0; i < themedStyles.length; i++) {
      let style = themedStyles[i];
      if (style.$props) {
        if (!style.$props(props)) {
          continue;
        }
      }
      Object.assign(result, style[elementName])
    }
    return result;
  }

  use() {
    return this;
  }

  unuse() {
    return this;
  }

}
