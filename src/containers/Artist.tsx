import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { searchArtistById, getArtistAlbums } from "../api/apUtils";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Loader from "../components/loader";
import ImageCard from "../components/imageCard";
import Button from "../components/button";
import Player from "../components/player";
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
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
}

const ButtonContainer = styled.div`
  margin-top: 5em;
`;

const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;s
`;

const ArtistIcon = styled.img`
  width: 100px;
  height: 100px;
  padding-right: 2em;
`;

const TopContainer = styled.div`
  text-align: center;
  margin: auto;
  padding-top: 1em;
  width: 100%;
`;

const AlbumsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  margin-top: 5%;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

const Artist = (props: ArtistProps) => {
  console.log("props", props);
  const [artist, setArtist] = useState({ name: "", images: [{ url: "" }] });
  const [albums, setAlbums] = useState({ items: [] });
  const [selectedAlbumSrc, setSelectedAlbumSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);
      const artist = await searchArtistById(props.id);
      setArtist(artist);
      const albums = await getArtistAlbums(props.id);
      setAlbums(albums);
      setLoading(false);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const ToggleMusicPlayer = (id: string) => {
    setSelectedAlbumSrc(`https://open.spotify.com/embed/album/${id}`);
    
    setPlayerVisible(true);
  }

  return (
    <>
      <TopContainer>
        <ArtistContainer>
          <ArtistIcon
            src={
              loading ? TemplateImage : artist.images[2] && artist.images[2].url
            }
          />
          <Header
            title={loading ? "...." : artist.name}
            type={"h1"}
            color={"#CAE5FF"}
          />
        </ArtistContainer>
        <Topbar />
      </TopContainer>
      <ButtonContainer>
        <Button onClick={props.goBack}>Return</Button>
      </ButtonContainer>
      {playerVisible && <PlayerContainer>
        <Player src={selectedAlbumSrc} />
       </PlayerContainer> 
        }
      <AlbumsContainer>
        {loading && <Loader />}
        {albums.items.length > 0 &&
          albums.items.map((album: AlbumProps) => (
            <ImageCard key={album.id} img={album.images[1].url} onClick={() => ToggleMusicPlayer(album.id)} />
          ))}
      </AlbumsContainer>
    </>
  );
};

export default Artist;
