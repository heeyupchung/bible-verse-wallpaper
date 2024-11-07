import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Button, FormControl, TextField } from "@mui/material";

export default function Wallpaper() {
  const [data, setPhotosResponse] = useState(null);
  const [randPhoto, setRandPhoto] = useState(null);
  const [randomize, setRandomize] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const api = createApi({
    accessKey: "r-Cir8lI-ewNJ9R2E-WArbdxtZgKTy2sMwoxQF-s3Iw"
  });


  useEffect(() => {
    if(randomize) {
      api.search
      .getPhotos({ query: !searchQuery ? "ocean" : searchQuery, orientation: "landscape" })
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
    const backgroundClasses = {
      "backgroundImage": `url(${randPhoto.urls.regular})`, 
      // "backgroundRepeat": "no-repeat", 
      // "backgroundSize": "cover", 
      "backgroundPosition": "center", 
      "backgroundAttachment": "fixed", 
      "height": "100vh"
    }

    return (
      <form onSubmit={e => { e.preventDefault(); setRandomize(true);}} className="wallpaper-background"
        style={backgroundClasses}>
        {/* <img className="img" src={randPhoto.urls.regular} /> */}
        <div className="actions">
          <TextField size="small" label="Search" variant="filled" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
          <Button variant="contained" type="submit" >
            New Wallpaper
          </Button>
        </div>
      </form>
    );
  }
}