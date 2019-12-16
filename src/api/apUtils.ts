import axios from "axios";
import dayjs from "dayjs";



export const searchArtistById = async (id: string) => {
  const res = await getData(`https://api.spotify.com/v1/artists/${id}`);
  if (res) return res.data;
};

export const getSimilarArtists = async (id: string) => {
  const res = await getData(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  if (res) return res.data.artists;
};

export const searchArtist = async (name: string) => {
    const res = await getData(`https://api.spotify.com/v1/search?q=${name}&type=artist`);
    if (res) return res.data.artists;
}


export const getArtistAlbums = async (id: string) => {
  const res = await getData(`https://api.spotify.com/v1/artists/${id}/albums`);
  if (res) return res.data;
}


const getData = async  (reqStr: string) =>  {
    const access_token = await checkTokenValidity();
    if(access_token){
      const config = {
        headers: { Authorization: "Bearer " + access_token }
      };
      const res = await axios.get(reqStr,
        config
      );
      return Promise.resolve(res);
    }
 }


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
        token = t.access_token;
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
