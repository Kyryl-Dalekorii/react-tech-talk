export const Button = ({ count, onclick }) => {
  return {
    type: 'button',
    props: { onclick },
    children: `Count is ${count}`
  }
};