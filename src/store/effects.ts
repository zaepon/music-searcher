import { ThunkAction } from "redux-thunk";
import { ApplicationAction, ApplicationState } from "./types";
import {
  loadArtistsRequest,
  loadArtistsSuccess,
  loadArtistsError,
  searchArtistSuccess
} from "./actions";
import axios from "axios";
import dayjs from "dayjs";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const loadSimilarArtists = (id: string): Effect => async (
  dispatch,
  getState
) => {
  dispatch(loadArtistsRequest());

  let access_token = await checkTokenValidity();

  const config = {
    headers: { Authorization: "Bearer " + access_token }
  };
  const res = await axios.get(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    config
  );

  if (res.data.error) dispatch(loadArtistsError());

  dispatch(loadArtistsSuccess(res.data.artists));
};

export const searchArtist = (name: string): Effect => async (
  dispatch,
  getstate
) => {
  dispatch(loadArtistsRequest());

  let access_token = await checkTokenValidity();

  const config = {
    headers: { Authorization: "Bearer " + access_token }
  };
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${name}&type=artist`,
    config
  );
  if (res.data.error) dispatch(loadArtistsError());
  dispatch(searchArtistSuccess(res.data.artists));
};

export const checkTokenValidity = async () => {
  let token;
  if (localStorage.spotifyAccessToken) {
    let tokenObj = JSON.parse(
      localStorage.getItem("spotifyAccessToken") || "{}"
    );

    if (tokenObj) {
      //check if token is expired (each token is valid for 1 hour).
      if (dayjs(tokenObj.timestamp).diff(dayjs()) <= 60) {
        token = retrieveToken();
        let localStorageObj = {
          token: token,
          timestamp: dayjs().toISOString()
        };
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

export const retrieveToken = async () => {
  let res = await axios.get(`${process.env.REACT_APP_TOKEN_API_URL}`);
  return res.data;
};
