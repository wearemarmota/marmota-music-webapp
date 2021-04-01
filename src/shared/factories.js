export const createSongsListItem = ({ song, artist, album }) => ({
  id: song.id,
  uuid: song.uuid,
  title: song.title,
  duration: song.duration,
  position: song.position,
  isFavorited: song.isFavorited,
  source: song.fileUri,
  album: {
    id: album.id,
    title: album.title,
    covers: {
      original: album.covers.original,
      100: album.covers[100],
      500: album.covers[500],
    },
    artist: {
      id: artist.id,
      name: artist.name,
    },  
  }
});