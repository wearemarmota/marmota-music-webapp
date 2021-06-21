import { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import ArtistsService from "../shared/artists-service";
import AlbumsService from "../shared/albums-service";

import AlbumsList from "../components/AlbumsList";
import AlbumsListPhantom from "../components/AlbumsList/Phantom";
import ArtistsList from "../components/ArtistsList";

import { setHomeLast } from "../redux/actions/lists";

const Home = ({ homeLast, setHomeLast }) => {

  const [artists, setArtists] = useState([]);
  const [lastAlbums, setLastAlbums] = useState(homeLast);
  const [randomAlbums, setRandomAlbums] = useState([]);
  const [loadingRandomAlbums, setLoadingRandomAlbums] = useState(false);
  const [loadingLastAlbums, setLoadingLastAlbums] = useState(false);
  const [loadingArtists, setLoadingArtists] = useState(false);

  useEffect(() => {
    setLoadingArtists(true);
    setLoadingLastAlbums(true);
    setLoadingRandomAlbums(true);

    ArtistsService.list()
      .then(artists => setArtists(artists))
      .finally(() => setLoadingArtists(false));

    AlbumsService.list({ limit: 6, sortBy: 'created_at', orderBy: 'desc' })
      .then(albums => { setLastAlbums(albums); setHomeLast(albums); })
      .finally(() => setLoadingLastAlbums(false));

    AlbumsService.list({ limit: 12, shuffle: 1 })
      .then(albums => setRandomAlbums(albums))
      .finally(() => setLoadingRandomAlbums(false));

  }, []);

  return(
    <>
      <img
        src="img/main-img.webp"
        style={{ marginTop: "-80px", width: "100%", height: "auto" }}
        alt=""
        width="1440px"
        height="569px"
      />

      <div className="container" style={{ marginTop: "-20vw" }}>

        {/* Some albums */}

        <h2>Últimos álbums</h2>
        {
          lastAlbums.length > 0 ? 
          <AlbumsList albums={lastAlbums.slice(0, 6)} preloadedFadeIn={false} /> :
          loadingLastAlbums ?
          <AlbumsListPhantom amount={6} /> :
          <p>No se han encontrado álbums</p>
        }

        {/* Some artists */}

        <h2>Artistas destacados</h2>
        { loadingArtists && <p>Cargando...</p> }
        { artists.length > 0 && <ArtistsList artists={artists.slice(0, 6)} /> }
        { !loadingArtists && artists.length <= 0 && <p>No se han encontrado artistas</p> }

        {/* Random albums */}

        <h2>Álbums aleatorios</h2>
        { loadingRandomAlbums && <p>Cargando...</p> }
        { randomAlbums.length > 0 && <AlbumsList albums={randomAlbums.slice(0, 12)} /> }
        { !loadingRandomAlbums && randomAlbums.length <= 0 && <p>No se han encontrado álbums</p> }

      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { lists } = state;
  return { homeLast: lists.homeLast };
}

const mapDispatchToProps = {
  setHomeLast,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);