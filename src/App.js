import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer, Flip } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Player from "./components/Player";
import Queue from "./components/Queue";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import ArtistEdit from "./pages/ArtistEdit";
import Artists from "./pages/Artists";
import AlbumDetail from "./pages/AlbumDetail";
import AlbumEdit from "./pages/AlbumEdit";
import Albums from "./pages/Albums";
import Upload from "./pages/Upload";
import SearchResults from "./pages/SearchResults";
import APISettings from "./pages/APISettings";
import NotFound from "./pages/NotFound";
import { QueueProvider } from "./context/Queue";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <QueueProvider>
      <Router>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Flip}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <main>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/artists" component={Artists} />
            <ProtectedRoute exact path="/artist/:artistId" component={Artist} />
            <ProtectedRoute exact path="/artist/:artistId/edit" component={ArtistEdit} />
            <ProtectedRoute exact path="/albums" component={Albums} />
            <ProtectedRoute exact path="/album/:albumId" component={AlbumDetail} />
            <ProtectedRoute exact path="/album/:albumId/edit" component={AlbumEdit} />
            <ProtectedRoute exact path="/upload" component={Upload} />
            <ProtectedRoute exact path="/search/:term?" component={SearchResults} />
            <Route exact path="/api-settings" component={APISettings} />
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
