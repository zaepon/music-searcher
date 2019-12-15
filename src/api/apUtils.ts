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

  if (access_token) {
    const config = {
      headers: { Authorization: "Bearer " + access_token }
    };
    console.log("config", config);
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/related-artists`,
      config
    );
    if (res.data.artists) return res.data.artists;
  }
};

export const searchArtist = async (name: string) => {
  const access_token = await checkTokenValidity();
  console.log("got accesss token", access_token);
  if (access_token) {
    const config = {
      headers: { Authorization: "Bearer " + access_token }
    };
    console.log("config", config);
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${name}&type=artist`,
      config
    );
    if (res.data.artists) return res.data.artists;
  }
};

const checkTokenValidity = async () => {
  let token;
  if (localStorage.spotifyAccessToken) {
    let tokenObj = JSON.parse(
      localStorage.getItem("spotifyAccessToken") || "{}"
    );
    if (tokenObj) {
      //check if token is expired (each token is valid for 1 hour).
      if (dayjs(tokenObj.timestamp).isBefore(dayjs())) {
        const t = await retrieveToken();
        let localStorageObj = {
          token: t.access_token,
          timestamp: dayjs()
            .second(t.expires_in - 500)
            .toISOString()
        };
        localStorage.removeItem("spotifyAccessToken");
        localStorage.setItem(
          "spotifyAccessToken",
          JSON.stringify(localStorageObj)
        );
      } else {
        console.log(tokenObj.token);
        token = tokenObj.token;
      }
    }
  } else {
    const t = await retrieveToken();

    let localStorageObj = {
      token: t.access_token,
      timestamp: dayjs()
        .second(t.expires_in - 500)
        .toISOString()
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
