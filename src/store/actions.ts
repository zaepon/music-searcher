import { LoadArtistsRequest, LoadArtistsSuccess, LoadArtistsError, similarArtists } from './types';

export const loadArtistsRequest = (): LoadArtistsRequest => ({
  type: 'loadArtistsRequest'
});

export const loadArtistsSuccess = (artists: similarArtists[]): LoadArtistsSuccess => ({
  type: 'loadArtistsSuccess',
  artists
});

export const loadArtistsError = (): LoadArtistsError => ({
  type: 'loadArtistsError',
})