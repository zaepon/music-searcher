import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../components/header";
import Card from "../components/card";
import TextInput from "../components/textInput";
import Button from "../components/button";
import Loader from "../components/loader";
import { loadSimilarArtists } from "../store/effects";
import { array } from "prop-types";

const TopContainer = styled.div`
  text-align: center;
  margin-top: 10%;
`;

const ArtistsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  margin-top: 10%;
  flex-wrap: wrap;
`;

interface AppProps {
  getSimilarArtists: (name: string) => object;
  loading: boolean;
  artists?: object[];
}

interface ArtistProps {
  name?: string;
  images?: ImageProps[];
  genres?: string[];
  popularity?: number;
}

interface ImageProps {
  height: number;
  url: string;
  width: number;
}


const App = (props: AppProps) => {
  console.log('props', props);
  const [searchString, setSearchString] = useState("");
  if(props.artists !== undefined )console.log("props", props.artists);
  return (
    <div className="App">
      <TopContainer>
        <TextInput
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
        <Button onClick={() => props.getSimilarArtists(searchString)}>
          Search
        </Button>
      </TopContainer>
      <ArtistsContainer>
        {props.loading && <Loader />}
        {!props.loading && props.artists && props.artists.map((artist: ArtistProps) => {
          console.log('artist', artist.name, artist, artist.images![0].width);
          let imageObj = artist.images!.filter((img: ImageProps) => img.width === 640)
          console.log('img', imageObj[0]);
          return (
            <Card title={artist.name} img={imageObj[0].url} text={artist.genres!.join()} fillrate={artist.popularity}/>
          )
        })}
      </ArtistsContainer>
    </div>
  );
};

interface State {
  artists: object[];
  loading: {
    similarArtists: boolean;
  };
}

const mapStateToProps = (state: State) => {
  if (state) {
    console.log('state', state)
    let l = state.loading.similarArtists;
    return {
      loading: state.loading.similarArtists,
      artists: state.artists
    };
  } else {
    return { loading: false };
  }
};

export default connect(
  mapStateToProps,
  { getSimilarArtists: loadSimilarArtists }
)(App);
