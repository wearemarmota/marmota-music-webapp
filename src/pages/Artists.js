import { useState, useEffect } from "react";

import ArtistsService from "../shared/artists-service";

import ArtistsList from "../components/ArtistsList";

const Artists = props => {

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ArtistsService.list({ limit: 999, sortBy: 'name', orderBy: 'asc' })
      .then(artists => setArtists(artists))
      .finally(() => setLoading(false))
  }, []);

  return(
    <div className="container">
      <h2>Artistas</h2>
      {loading && <p>Cargando...</p>}
      {artists.length > 0 && <ArtistsList artists={artists} /> }
      {!loading && artists.length <= 0 && <p>No se han encontrado artistas</p> }
    </div>
  )
}

export default Artists;
