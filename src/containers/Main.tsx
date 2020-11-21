import React, { useState, useEffect, useContext } from "react";
import styled, { withTheme } from "styled-components";
import { Flex, Box } from "rebass";
import { History, LocationState } from "history";

import Header from "../components/header";
import Card from "../components/card";
import TextInput from "../components/textInput";
import Loader from "../components/loader";
import Topbar from "../components/topbar";
import { QueryContext } from "../routes";
import LoginIndicator from "../components/loginIndicator";
import {
  searchArtist,
  getSimilarArtists,
  searchLastQuery,
} from "../api/apUtils";
import { debounce, DebounceHook } from "../utils/general";
import { getAccessToken } from "../accessToken";

const TopContainer = styled(Box)`
  text-align: center;
  position: relative;
`;

const TitleContainer = styled(Box)`
  text-align: center;
`;

interface AppProps {
  getSimilarArtists: (id: string) => object;
  getArtist: (name: string) => object;
  loading: boolean;
  artists?: object[];
  type: string | undefined;
  history: History<LocationState>;
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
  const accessToken = getAccessToken();
  const [searchString, setSearchString] = useState("");
  const [artistName, setArtistName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const lastQ = useContext(QueryContext);
  useEffect(() => {
    const debounceRef = debounce(handleScroll, 200);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (lastQ.lastQuery !== "") {
      const fetchData = async () => {
        const searchResult = await searchLastQuery(lastQ.lastQuery);
        setSearchResult(searchResult);
      };
      fetchData();
    }
    window.addEventListener("scroll", debounceRef, true);
    return () => {
      window.removeEventListener("scroll", debounceRef, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastQ.lastQuery]);

  const debounceSearch = DebounceHook(searchString, 500);
  useEffect(() => {
    if (debounceSearch) {
      getArtistByName(debounceSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  const getArtistByName = async (name: string) => {
    setArtistName(name);
    setLoading(true);
    const searchResult = await searchArtist(name);
    const state = setStatusMessage(searchResult.items, name, "initial");
    setStatus(state);
    setSearchResult(searchResult.items);
    setLoading(false);
    lastQ.setQuery(`https://api.spotify.com/v1/search?q=${name}&type=artist`);
  };

  const findSimilarArtists = async (artist: ArtistProps) => {
    const n = artist.name || "";
    setLoading(true);
    setArtistName(n);
    const searchResult = await getSimilarArtists(artist.id || "");
    const state = setStatusMessage(searchResult, n, "similar");
    setStatus(state);
    setSearchResult(searchResult);
    setLoading(false);
    lastQ.setQuery(
      `https://api.spotify.com/v1/artists/${artist.id}/related-artists`
    );
  };

  const setStatusMessage = (results: object[], name: string, type: string) => {
    switch (type) {
      case "initial":
        if (results.length === 0)
          return `found 0 artists or bands with name "${name}`;
        if (results.length > 0)
          return `Found one or multiple bands with name "${name}". Select one.`;
        return "";

      case "similar":
        if (results.length === 0)
          return `No similar bands or artists to "${name}"`;
        if (results.length > 0)
          return `Displaying similar artists & bands to "${name}"`;
        return "";
      default:
        return "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      getArtistByName(searchString);
    }
  };

  const handleScroll = () =>
    window.scrollY > 200 && !scrolled ? setScrolled(true) : setScrolled(false);

  return (
    <>
      <Box className="App">
        <Topbar scrolled={scrolled}>
          <TopContainer width={"100%"}>
            <TextInput
              onKeyDown={handleKeyDown}
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder={"Search for artist or band.."}
            />
          </TopContainer>
        </Topbar>

        {!loading && artistName && (
          <TitleContainer mt={"15em"} width={"100%"}>
            <>
              <Header title={status} type={"h1"} />
            </>
          </TitleContainer>
        )}

        <Flex
          width={"100%"}
          justifyContent={"center"}
          mt={"15%"}
          mb={"3%"}
          flexWrap={"wrap"}
        >
          {loading && <Loader />}
          {!loading &&
            searchResult.length > 0 &&
            searchResult.map((artist: ArtistProps, index: number) => {
              let imageObj = artist.images!.filter(
                (img: ImageProps) => img.width === 640
              );

              if (!imageObj[0]) return null;

              return (
                <Card
                  key={artist.id}
                  title={artist.name}
                  img={imageObj[0].url}
                  imgAction={() => props.history.push(`/artist/${artist.id}`)}
                  tags={artist.genres}
                  fillrate={artist.popularity}
                  menuItems={[
                    {
                      label: "Similar music",
                      action: () => {
                        setArtistName(artist.name || "");
                        findSimilarArtists(artist);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      },
                    },
                  ]}
                />
              );
            })}
        </Flex>
      </Box>
    </>
  );
};

export default withTheme(App as any);
