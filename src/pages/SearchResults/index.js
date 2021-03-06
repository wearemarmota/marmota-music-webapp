import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import SearchService from "../../shared/search-service";
import ArtistsList from "../../components/ArtistsList";
import AlbumsList from "../../components/AlbumsList";

const SearchResults = props => {

  const { term } = useParams();
  const history = useHistory();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const search = () => {
    if(!term || !isBase64(term)){
      history.push("/");
      return;
    }
    SearchService.search(atob(term)).then(results => {
      setArtists(results.artists || []);
      setAlbums(results.albums || []);
      // ToDo: Include results.songs when we have a valid SongsList component
    }).catch(error => cleanResults());
  }

  const cleanResults = () => {
    setArtists([]);
    setAlbums([]);
    setSongs([]);
  }

  useEffect(search, [term, history])

  const hasResults = artists.length > 0 || albums.length > 0 || songs.length > 0;

  if(!term || !isBase64(term)){
    return null;
  }
  
  return(
    <div className="container">
      { hasResults && <Results artists={artists} albums={albums} songs={songs} /> }
      { !hasResults && <NoResults term={term} /> }
    </div>
  );
}

const Results = ({ artists, albums, songs }) => {
  // ToDo: Include songs list when we have a valid SongsList component
  return(
    <>
      { artists.length > 0 &&
        <>
          <h2>Artistas</h2>
          <ArtistsList artists={artists} />
        </>
      }
      { albums.length > 0 &&
        <>
          <h2>Álbums</h2>
          <AlbumsList albums={albums} />
        </>
      }
    </>
  )
}

const NoResults = ({ term }) => {
  return (
    <>
      <h2>Sin resultados para "{atob(term)}"</h2>
      <div align="center">
      <iframe title="Sad gif" src="https://giphy.com/embed/Qvm2704d1Dqus" width="200" height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/steve-carell-Qvm2704d1Dqus">via GIPHY</a></p>
      </div>
    </>
  );
}

const isBase64 = str => {
  if (str ==='' || str.trim() ===''){ return false; }
  try {
      return btoa(atob(str)) == str;
  } catch (err) {
      return false;
  }
}

export default SearchResults;