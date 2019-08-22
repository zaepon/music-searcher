import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../components/header";
import Card from "../components/card";
import TextInput from "../components/textInput";
import Button from "../components/button";
import Loader from "../components/loader";

import { loadSimilarArtists } from "../store/effects";

const TopContainer = styled.div`
  text-align: center;
  margin-top: 10%;
`;

const ArtistsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  margin-top: 5%;
  flex-wrap: wrap;
`;

const TitleContainer = styled.div`
  margin-top: 10%;
  text-align: center;
  width: 100%;
`

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
  const [searchString, setSearchString] = useState("");
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
      {props.artists && (
          <TitleContainer>
            <Header title={"Similar Artists/Bands"} type={"h1"} />
          </TitleContainer>
        )}
      <ArtistsContainer>
        {props.loading && <Loader />} 
        {!props.loading &&
          props.artists &&
          props.artists.map((artist: ArtistProps) => {
            let imageObj = artist.images!.filter(
              (img: ImageProps) => img.width === 640
            );
            return (
              <Card
                title={artist.name}
                img={imageObj[0].url}
                text={artist.genres!.join()}
                fillrate={artist.popularity}
              />
            );
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
