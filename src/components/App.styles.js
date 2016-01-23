export default [
  {
    text: {
      color: "blue",
      fontSize: 30,
    }
  },
  (t)=>({
    "text:is-open": {color: t.get("brandColorDefault", "yellow")},
    "text:is-open-false": {color: "green"}
  }),
  {
    "text:is-open": {
      "backgroundColor": "blue"
    },
    "text:not-open": {
      "backgroundColor": "red"
    }
  }
];
