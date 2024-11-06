import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Button } from "@mui/material";

export default function Wallpaper() {
  const [data, setPhotosResponse] = useState(null);
  const [randPhoto, setRandPhoto] = useState(null);
  const [randomize, setRandomize] = useState(true);

  const api = createApi({
    accessKey: "r-Cir8lI-ewNJ9R2E-WArbdxtZgKTy2sMwoxQF-s3Iw"
  });

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
}