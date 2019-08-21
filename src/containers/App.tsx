import React from 'react';
import Header from '../components/header';
import Card from '../components/card';

function App() {
  return (
    <div className="App">
      <Header type="h1" title="test" />
      <Card onClick={() => console.log('test')} text="test" title="test2" img="https://lastfm-img2.akamaized.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png" />
    </div>
  );
}

export default App;
