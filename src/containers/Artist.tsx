import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Flex, Box, Image } from "rebass";

import { debounce } from "../utils/general";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Loader from "../components/loader";
import ImageCard from "../components/imageCard";
import Button from "../components/button";
import Player from "../components/player";
import TemplateImage from "../test.png";
import {
  Album,
  SpotifyPagination,
  useArtistAlbumsQuery,
  useArtistByIdQuery,
} from "../generated/graphql";

interface ArtistProps {
  id: string;
  goBack: () => void;
}

const TopContainer = styled(Box)`
  text-align: center;
`;

const Artist = (props: ArtistProps) => {
  const [selectedAlbumSrc, setSelectedAlbumSrc] = useState("");
  const [playerVisible, setPlayerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [albums, setAlbums] = useState([] as Album[]);
  const [pageInfo, setPageInfo] = useState({} as SpotifyPagination);

  const albumsData = useArtistAlbumsQuery({
    variables: { artistId: props.id, offset: 0 },
    fetchPolicy: "network-only",
  });
  const artistData = useArtistByIdQuery({ variables: { id: props.id } });

  const loading = artistData.loading || albumsData.loading;
  const artist = artistData.data?.artistById;
  const albumsResponse = albumsData.data?.artistAlbums;

  useEffect(() => {
    const debounceRef = debounce(handleScroll, 200);
    window.addEventListener("scroll", debounceRef, true);
    return () => {
      window.removeEventListener("scroll", debounceRef, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pageI = albumsData.data?.artistAlbums.pages as SpotifyPagination;
    const albumsArr = albumsData.data?.artistAlbums.albums as Album[];
    setAlbums(albumsArr?.length ? [...albumsArr] : []);
    setPageInfo(pageI);
  }, [albumsData]);

  const handleScroll = () =>
    window.scrollY > 200 && !scrolled ? setScrolled(true) : setScrolled(false);

  const loadMoreAlbums = async () => {
    const d = await albumsData.fetchMore({
      variables: { artistId: props.id, offset: albumsResponse?.pages.limit },
    });
    const pageI = albumsData.data?.artistAlbums.pages as SpotifyPagination;
    setAlbums([...albums, ...(d.data.artistAlbums.albums as Album[])]);
    setPageInfo(pageI);
  };

  const ToggleMusicPlayer = (id: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedAlbumSrc(`https://open.spotify.com/embed/album/${id}`);
    setPlayerVisible(true);
  };

  return (
    <>
      <Topbar scrolled={scrolled}>
        <TopContainer pt={"1em"} width={"100%"} m={"auto"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image
              width={100}
              height={100}
              src={loading ? TemplateImage : (artist?.image as string)}
            />
            <Header
              title={loading ? "...." : artist?.name}
              type={"h1"}
              color={"#CAE5FF"}
              style={{ marginLeft: "1em" }}
            />
          </Flex>
          <Box></Box>
          <Button
            style={{ position: "absolute", left: 0, top: 0, margin: "1em" }}
            onClick={props.goBack}
          >
            Return
          </Button>
        </TopContainer>
      </Topbar>
      {playerVisible && (
        <Flex alignItems={"center"} justifyContent={"center"} mt={"15em"}>
          <Player src={selectedAlbumSrc} />
        </Flex>
      )}
      <Flex
        width={"100%"}
        justifyContent={"center"}
        mt={"5%"}
        flexWrap={"wrap"}
        mb={"3em"}
      >
        {loading && <Loader />}
        {albums && albums.length > 0 && (
          <Flex
            width={"100%"}
            pb={"2em"}
            mt={"15em"}
            justifyContent={"center"}
          ></Flex>
        )}
        {albums &&
          albums.length > 0 &&
          albums.map((album) => (
            <ImageCard
              key={album.id}
              img={album.image as string}
              onClick={() => ToggleMusicPlayer(album.id)}
            />
          ))}
      </Flex>
      {albums && albums.length < pageInfo?.total && (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          mt={"2em"}
          mb={"4.5em"}
        >
          <Button onClick={() => loadMoreAlbums()}>Load more</Button>
        </Flex>
      )}
    </>
  );
};

export default Artist;
