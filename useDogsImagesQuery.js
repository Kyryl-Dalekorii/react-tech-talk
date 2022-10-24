import { React } from "./react.js";

export const useDogsImagesQuery = (count) => {
  const [dogsImages, setDogsImages] = React.useState([]);

  React.useEffect(() => {

    fetch(`https://dog.ceo/api/breeds/image/random/${count}`)
      .then((data) => data.json())
      .then(dogsResponse => {
        setDogsImages(dogsResponse.message)
      })
  }, [count]);

  return { dogsImages };
};