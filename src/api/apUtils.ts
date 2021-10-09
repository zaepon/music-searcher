import axios from "axios";
import dayjs from "dayjs";

export const searchArtistById = async (id: string) => {
  const res = await getData(`https://api.spotify.com/v1/artists/${id}`);
  return res?.data;
};

export const getSimilarArtists = async (id: string) => {
  const res = await getData(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
  );
  return res?.data.artists;
};

export const searchArtist = async (name: string) => {
  const res = await getData(
    `https://api.spotify.com/v1/search?q=${name}&type=artist`,
  );
  return res?.data.artists;
};

export const searchLastQuery = async (url: string) => {
  const res = await getData(url);
  if (res) {
    if (Array.isArray(res.data.artists)) return res.data.artists;
    else {
      return res.data.artists.items;
    }
  }
};

export const getArtistAlbums = async (id: string, offset?: number) => {
  let url = `https://api.spotify.com/v1/artists/${id}/albums?limit=50`;

  if (offset) url += `&offset=${offset}`;

  const res = await getData(url);
  return res?.data;
};

const getData = async (reqStr: string) => {
  const access_token = await checkTokenValidity();
  if (access_token) {
    const config = {
      headers: { Authorization: access_token },
    };
    const res = await axios.get(reqStr, config);
    return Promise.resolve(res);
  }
};

const checkTokenValidity = async () => {
  let token;
  if (localStorage.spotifyAccessToken) {
    let tokenObj = JSON.parse(
      localStorage.getItem("spotifyAccessToken") || "{}",
    );
    if (tokenObj) {
      //check if token is expired (each token is valid for 1 hour).
      if (dayjs(tokenObj.timestamp).isBefore(dayjs())) {
        const t = await retrieveToken();
        let localStorageObj = {
          token: t.access_token,
          timestamp: dayjs()
            .second(t.expires_in - 500)
            .toISOString(),
        };
        localStorage.removeItem("spotifyAccessToken");
        localStorage.setItem(
          "spotifyAccessToken",
          JSON.stringify(localStorageObj),
        );
        token = t.access_token;
      } else {
        token = tokenObj.token;
      }
    }
  } else {
    const t = await retrieveToken();

    let localStorageObj = {
      token: t.access_token,
      timestamp: dayjs()
        .second(t.expires_in - 500)
        .toISOString(),
    };
    localStorage.setItem("spotifyAccessToken", JSON.stringify(localStorageObj));
    token = t.access_token;
  }
  return token;
};

const retrieveToken = async () => {
  const res = await axios.get(`${process.env.REACT_APP_TOKEN_API_URL}`);
  return res.data;
};
