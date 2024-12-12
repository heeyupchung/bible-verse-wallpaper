import React, { useEffect, useState, useReducer } from "react";
import { createApi } from "unsplash-js";
import { Button, FormControl, TextField } from "@mui/material";
import Header from "./Header";

function reducer(state, action) {
  switch (action.payload) {
    case 'data': {
      return { ...state, data: action.payload.data };
    }
    case 'randPhoto': {
      return { ...state, randPhoto: action.payload.randPhoto };
    }
    case 'randomize': {
      return { ...state, randomize: action.payload.randomize };
    }
    case 'searchImage': {
      return { ...state, searchImage: action.payload.searchImage };
    }
    case 'searchVerse': {
      return { ...state, searchVerse: action.payload.searchVerse };
    }
    case 'verse': {
      return { ...state, verse: action.payload.verse };
    }
    case 'hideActions': {
      return { ...state, hideActions: action.payload.hideActions };
    }
    case 'tint': {
      return { ...state, tint: action.payload.tint };
    }
    default:
      return state;
  }
}

export default function Wallpaper() {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    randomPhoto: null,
    randomize: true,
    searchImage: "",
    searchVerse: "",
    verse: "",
    hideActions: false,
    tint: false,

  })

  const wallpaperApi = createApi({
    accessKey: "r-Cir8lI-ewNJ9R2E-WArbdxtZgKTy2sMwoxQF-s3Iw"
  });

  const bibleApi = "db031e72abb6001342708fa4188ed3de4fd05005";

  useEffect(() => {
    if(state.randomize) {
      wallpaperApi.search
      .getPhotos({ query: !state.searchImage ? "ocean" : state.searchImage, orientation: "landscape" })
      .then(result => {
        let random = Math.floor(Math.random() * result.response.results.length);
        
        dispatch({ type: "randPhoto", payload: { randPhoto: result.response.results[random] }});
      })
      .catch(() => {
        console.log("something went wrong!");
      });

      fetch(`https://api.esv.org/v3/passage/text/?q=${state.searchVerse ? state.searchVerse : "Matthew 11:28-30"}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${bibleApi}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Assuming the API returns JSON
        })
        .then(data => {
          dispatch({ type: "verse", payload: { verse: data }}); // Handle the response data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

      dispatch({ type: "randomize", payload: { randomize: false }});
  }, [state.randomize]);


  if (state.data === null) {
    return <div>Loading...</div>;
  } else if (state.data.errors) {
    return (
      <div>
        <div>{state.data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    const backgroundClasses = {
      "backgroundImage": `${state.tint ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), "  : ""} url(${state.randPhoto.urls.regular})`, 
      "backgroundRepeat": "no-repeat", 
      "backgroundSize": "cover", 
      "backgroundPosition": "center", 
      "backgroundAttachment": "fixed", 
      "height": "100vh"
    }

    return (
      <form onSubmit={e => { e.preventDefault(); dispatch({ type: "randomize", payload: { randomize: true }}); }} className="wallpaper-background" style={backgroundClasses}>
        <Header state={state} dispatch={dispatch} />
        <div className="bible-verse">
          <div className="verse-content">{state.verse ? state.verse.passages[0] : ""}</div>
          <div className="verse-reference">{state.verse ? (state.verse.canonical) + " ESV" : ""}</div>
        </div>
        {state.hideActions ? null : 
          <div className="actions">
            <TextField size="small" label="Search Image" variant="filled" value={state.searchImage} onChange={e => dispatch({ type: "searchImage", payload: { searchImage: e.target.value }})}/>
            <TextField size="small" label="Search Verse" variant="filled" value={state.searchVerse} onChange={e => dispatch({ type: "searchVerse", payload: { searchVerse: e.target.value }})}/>
            <Button variant="contained" type="submit" >
              Search
            </Button>
          </div>
        }
      </form>
    );
  }
}