import Row from "./row";

import "./index.scss";

const List = ({ album, songs, playSong, appendSongToQueue, currentSong }) => {
  return (
    <table className="songs-list">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Título</th>
          <th className="d-none d-md-table-cell">Artista</th>
          <th className="d-none d-md-table-cell">Duración</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { songs.map((song, index) => {
          return <Row
            key={song.id}
            song={song}
            index={index}
            album={album}
            playSong={playSong}
            appendSongToQueue={appendSongToQueue}
            currentSong={currentSong}
          />;
        }) }
      </tbody>
    </table>
  );
}

export default List;