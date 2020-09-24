import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Player from "./components/Player";
import Queue from "./components/Queue";
import Home from "./pages/Home";
import ArtistAlbums from "./pages/ArtistAlbums";
import Album from "./pages/Album";
import Albums from "./pages/Albums";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import { QueueProvider } from "./context/Queue";

function App() {
  return (
    <QueueProvider>
      <Router>
        <Header />
        <main>
          <Switch>
            <Redirect exact from="/" to="/artists" />
            <Route exact path="/artists" component={Home} />
            <Route exact path="/artist/:artistId" component={ArtistAlbums} />
            <Route exact path="/albums" component={Albums} />
            <Route exact path="/album/:albumId" component={Album} />
            <Route exact path="/upload" component={Upload} />
            <Route component={NotFound} status={404} />
          </Switch>
        </main>
        <Player />
        <Queue />
      </Router>
    </QueueProvider>
  );
}

export default App;
