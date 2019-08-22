import { ThunkAction } from 'redux-thunk';
import { ApplicationAction, ApplicationState } from './types';
import { loadArtistsRequest, loadArtistsSuccess, loadArtistsError } from './actions';
import axios from 'axios';


type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const loadSimilarArtists = (name: string): Effect => async (dispatch, getState) => {
  dispatch(loadArtistsRequest());
  const config = {
    headers: { Authorization: "bearer " + process.env.REACT_APP_OAUTH_TOKEN }
  };
  const res = await axios.get(`https://api.spotify.com/v1/artists/0rpKM0MniNkXM1SLSglYUZ/related-artists`, config);

  if(res.data.error) dispatch(loadArtistsError());

  dispatch(loadArtistsSuccess(res.data.artists));
}