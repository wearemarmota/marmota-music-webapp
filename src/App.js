import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import { PlayerProvider } from "./contexts/player";

import Header from "./components/Header";
// import Player from "./components/Player";
import DesktopPlayer from "./components/DesktopPlayer";
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
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <PlayerProvider>
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
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/home"
              component={Home}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/artists"
              component={Artists}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/artist/:artistId"
              component={Artist}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/artist/:artistId/edit"
              component={ArtistEdit}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/albums"
              component={Albums}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/album/:albumId"
              component={AlbumDetail}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/album/:albumId/edit"
              component={AlbumEdit}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/upload"
              component={Upload}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/search/:term?"
              component={SearchResults}
            />
            <ProtectedRoute
              onlyAuthorized
              exact
              path="/favorites"
              component={Favorites}
            />
            <ProtectedRoute
              onlyUnauthorized
              exact
              path="/login"
              component={Login}
            />
            <ProtectedRoute
              onlyUnauthorized
              exact
              path="/register"
              component={Register}
            />
            <Route component={NotFound} status={404} />
          </Switch>
        </main>
        <DesktopPlayer />
        <Queue />
        {/* <Player /> */}
      </PlayerProvider>
    </Router>
  );
}

export default App;
