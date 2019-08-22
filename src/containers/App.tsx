import React from 'react';
import Header from '../components/header';
import Card from '../components/card';
import { loadSimilarArtists } from '../store/effects';
import {connect } from 'react-redux';


interface AppProps {
  getSimilarArtists: (name: string) => object
}


function App(props: AppProps) {
  return (
    <div className="App">
      <Header type="h1" title="test" />
      <Card onClick={() => props.getSimilarArtists('cher')} text="test" title="test2" img="https://lastfm-img2.akamaized.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png" />
    </div>
  );
}

function mapStateToProps(state = []){
  console.log('state', state);
}


export default connect(mapStateToProps, {getSimilarArtists: loadSimilarArtists})(App);
