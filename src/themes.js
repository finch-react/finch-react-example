import {Themes} from 'finch-react';

Themes.register({
  brandColorDefault: "red",
  brandColorAccent: "blue"
});

Themes.register({
  brandColorAccent: "green",
  dom2: {
    "headerColor": (t)=>t.get("brandColorAccent", "black")
  }
});

Themes.override("dark", {
  brandColorDefault: (t)=>t.dom2.headerColor
});
