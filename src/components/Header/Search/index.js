import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchService from "../../../shared/search-service";

import "./index.scss";

const Search = props => {

  const inputRef = useRef();

  const [term, setTerm] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [anyResult, setAnyResult] = useState(false);
  const search = e => {
    e.preventDefault();
    setSearching(true);
    setResults(null);
    setAnyResult(false);
    SearchService.search(term).then(results => {
      setResults(results);
      setAnyResult(
        (results.artists && results.artists.length > 0) ||
        (results.albums && results.albums.length > 0) ||
        (results.songs && results.songs.length > 0)
      );
    }).finally(() => {
      setSearching(false);
      inputRef.current.focus();
    });
  }

  const clearSearch = () => {
    setResults(null);
    setAnyResult(false);
    setTerm("");
  }

  return(
    <>
      <form className="search-form" onSubmit={search}>
        <input
          ref={inputRef}
          type="text"
          disabled={searching}
          value={term}
          onChange={ e => setTerm(e.target.value) }
          placeholder="Busca por autor, álbum, canción..."
        />
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
      </form>
      { anyResult &&
        <div class="search-results">
          <ul className="results">
            { results.artists && results.artists.length > 0 &&
              <>
                <ResultHeader>Artistas:</ResultHeader>
                { results.artists.map((result, index) => {
                  return <ResultArtist key={index} result={result} clearSearch={clearSearch} />;
                })}
              </>
            }
            { results.albums && results.albums.length > 0 &&
              <>
                <ResultHeader>Álbums:</ResultHeader>
                { results.albums.map((result, index) => {
                  return <ResultAlbum key={index} result={result} clearSearch={clearSearch} />;
                })}
              </>
            }
            { results.songs && results.songs.length > 0 &&
              <>
                <ResultHeader>Canciones:</ResultHeader>
                { results.songs.map((result, index) => {
                  return <ResultSong key={index} result={result} />;
                })}
              </>
            }
          </ul>
        </div>
      }
    </>
  )
}

const ResultHeader = ({ children }) => {
  return(
    <li className="result-header"><strong>{ children }</strong></li>
  );
}

const ResultArtist = ({ result, clearSearch }) => {
  return(
    <li className="result"><Link to={`/artist/${result.id}`} onClick={clearSearch}>{ result.name }</Link></li>
  );
}

const ResultAlbum = ({ result, clearSearch }) => {
  return(
    <li className="result"><Link to={`/album/${result.id}`} onClick={clearSearch}>{ result.title }</Link></li>
  );
}

const ResultSong = ({ result }) => {
  return(
    <li className="result">{ result.title }</li>
  );
}


export default Search;