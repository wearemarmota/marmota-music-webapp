import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import SearchService from "../../shared/search-service";
import { createSongsListItem } from "../../shared/factories";

import ArtistsList from "../../components/ArtistsList";
import AlbumsList from "../../components/AlbumsList";
import SongsList from "../../components/SongsList";

const SearchResults = props => {

  const { term } = useParams();
  const history = useHistory();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = () => {
    if(!term){
      history.push("/");
      return;
    }
    setLoading(true);
    SearchService.search(decodeURIComponent(term))
      .then(results => setResults(results))
      .catch(error => cleanResults())
      .finally(() => setLoading(false));
  }

  const setResults = results => {
    setArtists(results.artists || []);
    setAlbums(results.albums || []);
    setSongs(results.songs.map(song => createSongsListItem({
      song: song,
      album: song.album,
      artist: song.album.artist,
    })) || []);
  }

  const cleanResults = () => {
    setArtists([]);
    setAlbums([]);
    setSongs([]);
  }

  useEffect(search, [term, history])

  const hasResults = (artists && artists.length > 0) || 
    (albums && albums.length > 0) ||
    (songs && songs.length > 0);

  if(!term){
    return null;
  }
  
  if(loading){
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }
  
  return(
    <div className="container">
      { hasResults && <Results artists={artists} albums={albums} songs={songs} /> }
      { !hasResults && <NoResults term={term} /> }
    </div>
  );
}

const Loading = () => {
  return (
    <h2>Buscando...</h2>
  );
}

const Results = ({ artists, albums, songs }) => {
  return(
    <>
      { songs.length > 0 &&
        <>
          <h2>Canciones</h2>
          <SongsList songs={songs} showCovers={true} queueAll={false} />
        </>
      }
      { albums.length > 0 &&
        <>
          <h2>Álbums</h2>
          <AlbumsList albums={albums} />
        </>
      }
      { artists.length > 0 &&
        <>
          <h2>Artistas</h2>
          <ArtistsList artists={artists} />
        </>
      }
    </>
  )
}

const NoResults = ({ term }) => {
  return (
    <>
      <h2>Sin resultados para "{decodeURIComponent(term)}"</h2>
      <div align="center">
      <iframe title="Sad gif" src="https://giphy.com/embed/Qvm2704d1Dqus" width="200" height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/steve-carell-Qvm2704d1Dqus">via GIPHY</a></p>
      </div>
    </>
  );
}

export default SearchResults;