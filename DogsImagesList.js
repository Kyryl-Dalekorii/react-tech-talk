import { React } from "./react.js";
import { useDogsImagesQuery } from "./useDogsImagesQuery.js";

const getImages = (srcs) => {
  return srcs.map((src) => {
    return {
      type: 'img',
      props: { src }
    }
  });
};

export const DogsImagesList = ({ count }) => {
  const [ internalCount, setInternalCount ] = React.useState(count);
  const { dogsImages } = useDogsImagesQuery(count);

  React.useEffect(() => {
    setInternalCount(count);
  }, [ count ]);

  return {
    type: 'div',
    children: [ ...getImages(dogsImages), {
      type: 'div',
      children: `internal count: ${internalCount}`
    } ],
    props: {
      className: 'images-container'
    }
  };
};