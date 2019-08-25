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
  margin-bottom: 3em;
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
  const [artistName, setArtistName] = useState("");

  return (
    <div className="App">
      <TopContainer>
        <TextInput
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
        <Button
          style={{ marginLeft: "1em" }}
          disabled={searchString.length < 1}
          onClick={() => {
            setArtistName(searchString);
            props.getArtist(searchString);
          }}
        >
          Search
        </Button>
      </TopContainer>
      {props.artists && (
        <TitleContainer>
          {props.type === "searchArtistSuccess" &&
            props.artists.length === 0 && (
              <Header
                title={`found 0 artists or bands with name "${artistName}"`}
                type={"h1"}
                color={"#CAE5FF"}
              />
            )}
          {props.artists.length > 0 && (
            <Header
              title={
                props.type === "searchArtistSuccess"
                  ? `Found multiple bands with name "${artistName}". Select one.`
                  : `Displaying Similar Artists/Bands to "${artistName}".`
              }
              type={"h1"}
              color={"#CAE5FF"}
            />
          )}
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
            return (
              <Card
                key={artist.id}
                title={artist.name}
                img={imageObj[0] ? imageObj[0].url : TemplateImage}
                text={artist.genres!.join()}
                fillrate={artist.popularity}
                menuItems={[
                  {
                    label: "View on Spotify",
                    action: () =>
                      window.open(artist.external_urls!.spotify, "_newtab")
                  },
                  {
                    label: "Search similar artists",
                    action: () => {
                      setArtistName(artist.name || "");
                      setSearchString(artist.name || "");
                      props.getSimilarArtists(artist.id || "");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
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

interface OwnProps {
  artist: object;
}

const mapStateToProps = (state: State) => {
  if (state) {
    if (state.artists) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

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
