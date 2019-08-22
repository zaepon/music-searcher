import produce from 'immer';
import { ApplicationState, ApplicationAction } from "./types";

export const initialState: ApplicationState = {
  loading: {
    similarArtists: false
  },
  artists: []
};


const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case 'loadArtistsRequest':
      return produce(state, draft => {
        draft.loading.similarArtists = true
      });
    
    case 'loadArtistsSuccess':
      return produce(state, draft => {
        draft.loading.similarArtists = false;
        draft.artists = action.artists;
      });

    case 'loadArtistsError':
      return produce(state, draft => {
        draft.loading.similarArtists = false;
      })
  }
}

export default reducer;