import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ArtistsService from "../shared/artists-service";
import AlbumsService from "../shared/albums-service";

import AlbumsList from "../components/AlbumsList";
import AlbumsListPhantom from "../components/AlbumsList/Phantom";
import ArtistsList from "../components/ArtistsList";
import ArtistsListPhantom from "../components/ArtistsList/Phantom";

import { setHomeLast } from "../redux/actions/lists";

const Home = () => {
  const dispatch = useDispatch();
  const { homeLast } = useSelector((state) => state.lists);

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

    ArtistsService.list({ limit: 6, shuffle: 1 })
      .then((artists) => setArtists(artists))
      .finally(() => setLoadingArtists(false));

    AlbumsService.list({ limit: 6, sortBy: "created_at", orderBy: "desc" })
      .then((albums) => {
        setLastAlbums(albums);
        dispatch(setHomeLast(albums));
      })
      .finally(() => setLoadingLastAlbums(false));

    AlbumsService.list({ limit: 12, shuffle: 1 })
      .then((albums) => setRandomAlbums(albums))
      .finally(() => setLoadingRandomAlbums(false));
  }, [dispatch]);

  return (
    <>
      <img
        src="img/main-img.webp"
        style={{ marginTop: "-80px", width: "100%", height: "auto" }}
        alt=""
        width="1440px"
        height="569px"
      />

      <div className="container" style={{ marginTop: "-20vw" }}>
        <h2>Últimas incorporaciones</h2>

        {lastAlbums.length > 0 ? (
          <AlbumsList albums={lastAlbums} preloadedFadeIn={false} />
        ) : loadingLastAlbums ? (
          <AlbumsListPhantom amount={6} />
        ) : (
          <p>No se han encontrado álbums</p>
        )}

        <h2>Algunos artistas</h2>
        {loadingArtists && <ArtistsListPhantom amount={6} />}
        {artists.length > 0 && <ArtistsList artists={artists} />}
        {!loadingArtists && artists.length <= 0 && (
          <p>No se han encontrado artistas</p>
        )}

        <h2>Vamos a tener suerte</h2>
        {loadingRandomAlbums && <AlbumsListPhantom amount={12} />}
        {randomAlbums.length > 0 && <AlbumsList albums={randomAlbums} />}
        {!loadingRandomAlbums && randomAlbums.length <= 0 && (
          <p>No se han encontrado álbums</p>
        )}
      </div>
    </>
  );
};

export default Home;
