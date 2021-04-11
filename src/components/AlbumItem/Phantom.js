import Cover from "./Cover";

const Phantom = props => {

  const { showTitle, showArtist } = props;

  return <article className="album phantom">
    <div className="cover">
      <Cover.Phantom />
    </div>
    { showTitle && (
      <h1 className="title">
        █████████
      </h1>
    )}
    { showArtist && (
      <div className="artist">
        ▆▆▆▆
      </div>
    )}
  </article>
}

Phantom.defaultProps = {
  showTitle: true,
  showArtist: true,
}

export default Phantom;