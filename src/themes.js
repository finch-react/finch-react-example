import Theme from './lib/Theme';

Theme.register({
  brandColorDefault: "red",
  brandColorAccent: "blue"
});

Theme.register({
  brandColorAccent: "green",
  dom2: {
    "headerColor": $=>$("brandColorAccent", "black")
  }
});

Theme.override("dark", {
  brandColorAccent: "blue"
});




