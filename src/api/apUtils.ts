import axios from "axios";
import dayjs from "dayjs";

export const searchArtistById = async (id: string) => {
  const access_token = await checkTokenValidity();
  const config = {
    headers: { Authorization: "Bearer " + access_token }
  };
  const res = await axios.get(
    `https://api.spotify.com/v1/artists/${id}`,
    config
  );
  if (res) return res.data;
};

export const getSimilarArtists = async (id: string) => {
  const access_token = await checkTokenValidity();

  const config = {
    headers: { Authorization: "Bearer " + access_token }
  };
  const res = await axios.get(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    config
  );

  return res.data.artists;
};

export const searchArtist = async (name: string) => {
  const access_token = await checkTokenValidity();
  console.log(access_token);
  const config = {
    headers: { Authorization: "Bearer " + access_token }
  };

  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${name}&type=artist`,
    config
  );

  return res.data.artists;
};

const checkTokenValidity = async () => {
  let token;
  if (localStorage.spotifyAccessToken) {
    let tokenObj = JSON.parse(
      localStorage.getItem("spotifyAccessToken") || "{}"
    );
    if (tokenObj) {
      //check if token is expired (each token is valid for 1 hour).
      if (dayjs(tokenObj.timestamp).diff(dayjs(dayjs())) <= 60) {
        token = await retrieveToken();
        let localStorageObj = {
          token: token,
          timestamp: dayjs().hour(3).toISOString()
        };
        localStorage.removeItem("spotifyAccessToken");
        localStorage.setItem(
          "spotifyAccessToken",
          JSON.stringify(localStorageObj)
        );
      } else {
        token = tokenObj.token;
      }
    }
  } else {
    token = await retrieveToken();
    let localStorageObj = {
      token: token,
      timestamp: dayjs().toISOString()
    };
    localStorage.setItem("spotifyAccessToken", JSON.stringify(localStorageObj));
  }
  return token;
};

const retrieveToken = async () => {
  const res = await axios.get(`${process.env.REACT_APP_TOKEN_API_URL}`);
  return res.data;
};
