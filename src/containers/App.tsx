import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../components/header";
import Card from "../components/card";
import TextInput from "../components/textInput";
import Button from "../components/button";
import Loader from "../components/loader";
import TemplateImage from "../test.png";

import { loadSimilarArtists, searchArtist } from "../store/effects";

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
`;

interface AppProps {
  getSimilarArtists: (id: string) => object;
  getArtist: (name: string) => object;
  loading: boolean;
  artists?: object[];
  type: string | undefined;
}

interface ArtistProps {
  name?: string;
  images?: ImageProps[];
  genres?: string[];
  popularity?: number;
  external_urls?: ExternalUrls;
  id?: string;
}

interface ExternalUrls {
  spotify: string;
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
        <Button onClick={() => props.getArtist(searchString)}>Search</Button>
      </TopContainer>
      {props.artists && (
        <TitleContainer>
          <Header
            title={
              props.type === "searchArtistSuccess"
                ? "Found multiple bands with the same name. Select one."
                : "Similar Artists/Bands"
            }
            type={"h1"}
            color={"#564787"}
          />
        </TitleContainer>
      )}
      <ArtistsContainer>
        {props.loading && <Loader />}
        {!props.loading &&
          props.artists &&
          props.artists.map((artist: ArtistProps, index: number) => {
            let imageObj = artist.images!.filter(
              (img: ImageProps) => img.width === 640
            );
            console.log("arts", artist);
            return (
              <Card
                key={index}
                title={artist.name}
                img={imageObj[0] ? imageObj[0].url : TemplateImage}
                text={artist.genres!.join()}
                fillrate={artist.popularity}
                menuItems={[
                  {
                    label: "View on Spotify",
                    action: () => console.log(artist.external_urls!.spotify)
                  },
                  {
                    label: "Search similar artists",
                    action: () => props.getSimilarArtists(artist.id || "")
                  }
                ]}
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
  type: string;
}

const mapStateToProps = (state: State) => {
  if (state) {
    console.log("state", state);
    let l = state.loading.similarArtists;
    return {
      loading: state.loading.similarArtists,
      artists: state.artists,
      type: state.type
    };
  } else {
    return { loading: false };
  }
};

export default connect(
  mapStateToProps,
  { getSimilarArtists: loadSimilarArtists, getArtist: searchArtist }
)(App);
