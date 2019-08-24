import produce from 'immer';
import { ApplicationState, ApplicationAction } from "./types";

export const initialState: ApplicationState = {
  loading: {
    similarArtists: false
  },
  artists: [],
  type: 'searchArtistSuccess',
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
        draft.type = 'loadSimilarArtists'
      });
    
    case 'searchArtistSuccess':
      return produce(state, draft => {
        draft.loading.similarArtists = false;
        draft.artists = action.searchResult.items;
        draft.type = 'searchArtistSuccess'
      })

    case 'loadArtistsError':
      return produce(state, draft => {
        draft.loading.similarArtists = false;
      })
  }
}

export default reducer;