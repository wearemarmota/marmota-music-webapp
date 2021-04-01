import ArtistItem from "../ArtistItem";

import "./index.scss";

const ArtistsList = ({ artists = [] }) => {
  return (
    <div className="row">
      {artists.map(artist => (
        <div className="col-4 col-md-3 col-lg-2 col-xl-2" key={artist.id}>
          <ArtistItem artist={artist} />
        </div>
      ))}
    </div>
  );
}

export default ArtistsList;
