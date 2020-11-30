import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import { Flex, Box } from "rebass";
import { History, LocationState } from "history";
import Header from "../components/header";
import Card from "../components/card";
import TextInput from "../components/textInput";
import Loader from "../components/loader";
import Topbar from "../components/topbar";
import { debounce, DebounceHook } from "../utils/general";
import {
  Artist,
  useArtistListByNameLazyQuery,
  useSimilarArtistsLazyQuery,
} from "../generated/graphql";
import { useLocation } from "react-router";

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
  image?: string;
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
  const [searchResult, setSearchResult] = useState([] as Artist[]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resultType, setResultType] = useState("");
  const location = useLocation();
  const [getArtistData, artistsByNameData] = useArtistListByNameLazyQuery();
  const [
    getSimilarArtists,
    similarArtistResponse,
  ] = useSimilarArtistsLazyQuery();

  useEffect(() => {
    const debounceRef = debounce(handleScroll, 200);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", debounceRef, true);
    return () => {
      window.removeEventListener("scroll", debounceRef, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceSearch = DebounceHook(searchString, 500);
  useEffect(() => {
    if (debounceSearch) {
      getArtistByName(debounceSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  useEffect(() => {
    const getUrlParameter = (name: string) => {
      const results = location.search.split("=");
      return results === undefined
        ? ""
        : decodeURIComponent(results[1]?.replace(/\+/g, " "));
    };

    const qparam = getUrlParameter("name");
    setArtistName(qparam);
    props.history.replace(`${window.location.pathname}?name=${qparam}`);
    getArtistData({ variables: { filter: { name: qparam } } });
  }, [props.history, location.search, getArtistData]);

  useEffect(() => {
    const { data, loading } = artistsByNameData;
    setLoading(loading);
    const d = data?.artistListByName.artists as Artist[];
    setSearchResult(d);
    setResultType("initial");
  }, [artistsByNameData]);

  useEffect(() => {
    const state =
      searchResult?.length > 0
        ? setStatusMessage(searchResult, artistName, resultType)
        : null;
    if (state) setStatus(state);
  }, [artistName, searchResult, resultType]);

  useEffect(() => {
    const { data, loading } = similarArtistResponse;
    setLoading(loading);
    const d = data?.similarArtists as Artist[];
    setSearchResult(d);
    setResultType("similar");
  }, [similarArtistResponse]);

  const getArtistByName = async (name: string) => {
    setArtistName(name);
    props.history.replace(`${window.location.pathname}?name=${name}`);
    getArtistData({ variables: { filter: { name } } });
  };

  const findSimilarArtists = async (artist: Artist) => {
    setArtistName(artist.name);
    getSimilarArtists({ variables: { artistId: artist.id } });
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
            searchResult?.length > 0 &&
            searchResult.map((artist: Artist) => {
              if (!artist.image) return null;
              return (
                <Card
                  key={artist.id}
                  title={artist.name}
                  img={artist.image as string}
                  imgAction={() => props.history.push(`/artist/${artist.id}`)}
                  tags={artist.genres}
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
