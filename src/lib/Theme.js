import invariant from 'fbjs/lib/invariant';
import _ from 'lodash';

const DEFAULT_NAME = 'default';

let id = 0;
let themes = {};
let templates = {};

const flatMap = (array, callback) =>
  Array.prototype.concat.apply([], array.map(callback));

const prepareTemplate = (template)=> {
  return [template];
};


export default class Theme {
  static get(name = DEFAULT_NAME) {
    let theme = themes[name];
    if (!theme) {
      return Theme.build(name);
    }
    return theme;
  }

  static build(name = DEFAULT_NAME) {
    let themeFunction = function (name, def) {
      if (!name) {
        return _.cloneDeep(this);
      }
      try {
        return eval("this." + name)
      } catch (e) {
        return def;
      }
    };
    let theme = {};
    let template = templates[name];
    if (!template) {
      return theme;
    }
    if (name != DEFAULT_NAME) {
      template = [...templates['default'], ...template];
    }
    for (let i = 0; i < template.length; i++) {
      Array.prototype.concat.apply([], [template[i](themeFunction.bind(theme))]).forEach(rule=>Object.assign(theme, rule));
    }

    //TODO event

    return themes[name] = themeFunction.bind(theme);
  }


  static rebuild(name = DEFAULT_NAME) {
    if (name == DEFAULT_NAME) {
      //TODO rebuild all!
    }
    let theme = themes[name];
    if (theme) {
      if (theme._timeout) {
        clearTimeout(theme._timeout);
      }
      theme._timeout = setTimeout(()=> {
        delete theme._timeout;
        Theme.build(name);
      }, 0);
    }
  }

  static register(props) {
    return Theme.override(DEFAULT_NAME, props);
  }

  static override(name, props) {
    var plainObject = _.isPlainObject(props);
    invariant((plainObject || _.isFunction(props)),
      'Theme props must be plain object or function');
    (templates[name] || (templates[name] = [])).push(plainObject ? ()=> props : props);
    Theme.rebuild(name);
    return this;
  }
};

Theme.register(theme=>[{
  brandColorDefault: "red",
  brandColorAccent: "blue"
}]);

Theme.register(theme=>[{
  brandColorAccent: "green",
  dom2: {
    "headerColor": theme("brandColorAccent", "black")
  }
}]);

Theme.override("dark", theme=>[{
  brandColorDefault: theme("dom2.headerColor")
}]);

console.log(Theme.get("dark")());
