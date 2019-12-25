import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Flex, Box, Image } from "rebass";

import { searchArtistById, getArtistAlbums } from "../api/apUtils";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Loader from "../components/loader";
import ImageCard from "../components/imageCard";
import Button from "../components/button";
import Player from "../components/player";
import GroupedButtons from "../components/groupedButtons";
import TemplateImage from "../test.png";

interface ArtistProps {
  id: string;
  goBack: () => void;
}

interface AlbumProps {
  album_group: string;
  album_type: string;
  artists: object[];
  available_markets: [];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: ImageInterface[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: string;
  type: string;
  uri: string;
}

interface ImageInterface {
  url: string;
}

const TopContainer = styled(Box)`
  text-align: center;
`;

const Artist = (props: ArtistProps) => {
  const [artist, setArtist] = useState({ name: "", images: [{ url: "" }] });
  const [albumsInfo, setAlbumsInfo] = useState({ total: 0 });
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumSrc, setSelectedAlbumSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sortType, setSortType] =useState("album");

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);
      const artist = await searchArtistById(props.id);
      setArtist(artist);
      const albums = await getArtistAlbums(props.id);
      setAlbumsInfo(albums);
      setAlbums(albums.items);
      setLoading(false);
    };
    fetchData();

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () =>
    window.scrollY > 200 && !scrolled ? setScrolled(true) : setScrolled(false);

  const loadMoreAlbums = async () => {
    const rAlbums = await getArtistAlbums(props.id, albums.length);
    let newAlbumArr = albums.concat(rAlbums.items);
    setAlbums(newAlbumArr);
  };

  const ToggleMusicPlayer = (id: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedAlbumSrc(`https://open.spotify.com/embed/album/${id}`);
    setPlayerVisible(true);
  };

  console.log(albums);
  return (
    <>
      <Topbar scrolled={scrolled}>
        <TopContainer pt={"1em"} width={"100%"} m={"auto"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image
              width={100}
              height={100}
              src={
                loading
                  ? TemplateImage
                  : artist.images[2] && artist.images[2].url
              }
            />
            <Header
              title={loading ? "...." : artist.name}
              type={"h1"}
              color={"#CAE5FF"}
              style={{marginLeft: '1em'}}
            />
          </Flex>
          <Box>
      </Box>
        <Button style={{position: 'absolute', left: 0, top: 0, margin: '1em'}} onClick={props.goBack}>Return</Button>
        </TopContainer>
      </Topbar>

      {playerVisible && (
        <Flex alignItems={"center"} justifyContent={"center"} mt={"4.5em"}>
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
        {albums.length > 0 && (
          <Flex width={"100%"} pb={"2em"} mt={'15em'} justifyContent={"center"}>
            <GroupedButtons
              propertyKey="album_type"
              data={albums}
              selected={sortType}
              actions={[
                { keyValue: "album", onClick: () => setSortType('album') },
                { keyValue: "single", onClick: () => setSortType('single') },
                { keyValue: "compilation", onClick: () => setSortType('compilation') },
              ]}
            />
          </Flex>
        )}
        {albums.length > 0 &&
          albums.filter((a: AlbumProps) => a.album_type === sortType).map((album: AlbumProps) => (
            <ImageCard
              key={album.id}
              img={album.images[1].url}
              onClick={() => ToggleMusicPlayer(album.id)}
            />
          ))}
      </Flex>
      {albums.length < albumsInfo.total && (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          mt={"2em"}
          mb={"4.5em"}
        >
          <Button onClick={loadMoreAlbums}>Load more</Button>
        </Flex>
      )}
    </>
  );
};

export default Artist;
