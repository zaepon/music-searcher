import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { searchArtistById, getArtistAlbums } from "../api/apUtils";
import Topbar from "../components/topbar";
import Header from "../components/header";
import Loader from "../components/loader";
import ImageCard from "../components/imageCard";
import Button from "../components/button"

interface ArtistProps {
  id: string;
  goBack: () => void;
}

const ButtonContainer = styled.div`
  margin-top: 5em;
`

const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  console.log('props', props)
  const [artist, setArtist] = useState({ name: "", images: [{ url: "" }] });
  const [albums, setAlbums] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  console.log("ar", artist);
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
  console.log(artist.images[2] && artist.images[2].url);

  return (
    <>
      <TopContainer>
        {!loading && (
          <ArtistContainer>
            <ArtistIcon src={artist.images[2] && artist.images[2].url} />
            <Header title={artist.name} type={"h1"} color={"#CAE5FF"} />
          </ArtistContainer>
        )}
        <Topbar />
      </TopContainer>
      <ButtonContainer>
        <Button onClick={props.goBack}>Return</Button>
      </ButtonContainer>
      <AlbumsContainer>
        {loading && <Loader />}
        {albums.items.length > 0 &&
          albums.items.map((album: any) => (
            <ImageCard img={album.images[1].url} />
          ))}
      </AlbumsContainer>
    </>
  );
};

export default Artist;
