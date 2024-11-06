import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import "./App.scss";
import { Button } from "@mui/material";

const api = createApi({
  accessKey: "r-Cir8lI-ewNJ9R2E-WArbdxtZgKTy2sMwoxQF-s3Iw"
});

const Body = () => {
  const [data, setPhotosResponse] = useState(null);
  const [randPhoto, setRandPhoto] = useState(null);
  const [randomize, setRandomize] = useState(true);

  useEffect(() => {
    if(randomize) {
      api.search
      .getPhotos({ query: "ocean", orientation: "landscape" })
      .then(result => {
        let random = Math.floor(Math.random() * result.response.results.length);
        
        setPhotosResponse(result);
        setRandPhoto(result.response.results[random]);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
    }

      setRandomize(false);
  }, [randomize]);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="wallpaper-background">
        <img className="img" src={randPhoto.urls.regular} />
        <Button variant="contained" onClick={() => {
          setRandomize(true);
        }}>
          New Wallpaper
        </Button>
      </div>
    );
  }
};

const App = () => {
  return (
    <main className="root">
      <Body />
    </main>
  );
};

export default App;