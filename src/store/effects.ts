import { ThunkAction } from 'redux-thunk';
import { ApplicationAction, ApplicationState } from './types';
import { loadArtistsRequest, loadArtistsSuccess, loadArtistsError } from './actions';
import axios from 'axios';


type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const loadSimilarArtists = (name: string): Effect => async (dispatch, getState) => {
  dispatch(loadArtistsRequest());
  console.log('name', name);
  const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${name}&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&format=json`);
  console.log(res);

  if(res.data.error) dispatch(loadArtistsError());

  dispatch(loadArtistsSuccess(res.data.similarartists.artist));
}