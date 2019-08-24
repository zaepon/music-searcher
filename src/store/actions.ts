import { LoadArtistsRequest, LoadArtistsSuccess, LoadArtistsError, similarArtists, SearchArtistSuccess } from './types';

export const loadArtistsRequest = (): LoadArtistsRequest => ({
  type: 'loadArtistsRequest'
});

export const loadArtistsSuccess = (artists: similarArtists[]): LoadArtistsSuccess => ({
  type: 'loadArtistsSuccess',
  artists
});

export const searchArtistSuccess = (searchResult: {items: []}): SearchArtistSuccess => ({
  type: 'searchArtistSuccess',
  searchResult
});

export const loadArtistsError = (): LoadArtistsError => ({
  type: 'loadArtistsError',
})