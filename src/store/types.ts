import { Action } from "redux";

export interface similarArtists {
  name: string;
  match: string;
  url: string;
}

export interface LoadingState {
  similarArtists: boolean;
}

export interface ApplicationState {
  loading: LoadingState;
  artists: similarArtists[];
}

export interface LoadArtistsRequest extends Action {
  type: "loadArtistsRequest";
}

export interface LoadArtistsSuccess extends Action {
  type: "loadArtistsSuccess";
  artists: similarArtists[];
}

export interface LoadArtistsError extends Action {
  type: "loadArtistsError";
}

export type ApplicationAction =
  | LoadArtistsRequest
  | LoadArtistsSuccess
  | LoadArtistsError;
