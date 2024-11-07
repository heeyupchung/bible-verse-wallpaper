import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Button, FormControl, TextField } from "@mui/material";
import { dummyVerses } from "./getVerses";

export default function Wallpaper() {
  const [data, setPhotosResponse] = useState(null);
  const [randPhoto, setRandPhoto] = useState(null);
  const [randomize, setRandomize] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [verse, setVerse] = useState("");
  const [hideActions, setHideActions] = useState(false);

  const api = createApi({
    accessKey: "r-Cir8lI-ewNJ9R2E-WArbdxtZgKTy2sMwoxQF-s3Iw"
  });


  useEffect(() => {
    if(randomize) {
      let random = Math.floor(Math.random() * dummyVerses.length);
      setVerse(dummyVerses[random]);

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
      "backgroundRepeat": "no-repeat", 
      "backgroundSize": "cover", 
      "backgroundPosition": "center", 
      "backgroundAttachment": "fixed", 
      "height": "100vh"
    }

    return (
      <form onSubmit={e => { e.preventDefault(); setRandomize(true);}} className="wallpaper-background" style={backgroundClasses}>
        <div className="header">
          <span className=""></span>
          <span className="header-actions">
            <span className="download"></span>
            <span className="change-orientation"></span>
            <span className="tint-background"></span>
            <span className="font-white-or-black"></span>
            {/* <span className="hide-all-actions">
              <Button variant="contained" onClick={() => setHideActions(!hideActions)}>{hideActions ? "Show" : "Hide"} Actions</Button>
            </span> */}
          </span>
        </div>
        <div className="bible-verse">
          <div className="verse-content">{verse.content}</div>
          <div className="verse-reference">{verse.reference}</div>
        </div>
        {hideActions ? null : 
          <div className="actions">
            <TextField size="small" label="Search" variant="filled" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            <Button variant="contained" type="submit" >
              Search
            </Button>
          </div>
        }
      </form>
    );
  }
}