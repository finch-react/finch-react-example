export default $=>[
  {
    text: {
      color: "red"
    },
  },
  {
    $props: props => props.open,
    text: {
      color: "green"
    }
  }
];
