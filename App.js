import { React } from "./react.js";
import { DogsImagesList } from "./DogsImagesList.js";
import { Button } from "./Button.js";

const App = () => {
  const [count, setCount] = React.useState(1);
  const dateRef = React.useRef(Date.now());

  const onclick = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 2);

    dateRef.current = Date.now();
  }

  React.useEffect(() => {
    console.log('count has changed');
    console.log('dateRef: ', dateRef.current);
  }, [count]);

  return {
    type: 'div',
    children: [{
      type: Button,
      props: { onclick, count }
    }, {
      type: DogsImagesList,
      props: { count }
    }],
    props: {
      className: 'app'
    }
  };
};

React.render(App, document.body);