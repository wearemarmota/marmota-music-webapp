import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "lodash/debounce";

import ArtistsService from "../../shared/artists-service";
import Logger from "../../shared/logger";

import InputText from "../../atoms/InputText";
import FormGroup from "../../atoms/FormGroup";
import ArtistImage from "../../components/ArtistItem/Image";

import "./index.scss";

const logger = new Logger("ArtistEdit");

const ArtistEdit = props => {

  const artistId = props.match.params.artistId;

  const [name, setName] = useState("");
  const [artist, setArtist] = useState(null);
  const refInputAvatar = useRef(null);

  const loadArtist = () => {
    logger.log("loadArtist");
    ArtistsService.get(artistId).then((artist) => {
      logger.log(artist);
      setArtist(artist);
      setName(artist.name);
    });
  }

  const handleChangeAvatar = e => {
    logger.log("handleChangeAvatar");
    const file = e.target.files[0] || null;
    if (!file) {
      logger.warn("Invalid file");
      return;
    }

    ArtistsService.updateAvatar(artist.id, file).then((result) => {
      logger.log("updateAvatar then", result);
      loadArtist();
    }).catch((error) => {
      logger.error(error);
    })

    e.preventDefault();
  }

  const handleChangeName = e => {
    logger.log("handleChangeName");
    setName(e.target.value);
  }

  const updateName = () => {
    logger.log("updateAlbumTitle");
    ArtistsService.update(artistId, name).then((result) => {
      logger.log(result);
    });
  }

  // const updateNameDebounced = debounce(updateName, 1000);
  // const updateNameDebounced = useRef(() => debounce(updateName, 1000));
  const updateNameDebounced = useCallback(debounce(updateName, 1000), [name]);


  useEffect(() => {
    loadArtist();
  }, []);

  useEffect(() => {
    updateNameDebounced();
  }, [name])
  
  if(!artist) return null;

  return(
    <div className="container smaller">
      <h2>Editar artista</h2>
      <form>
        <div className="row">
          <div className="col-5 col-sm-4">
            <label name="avatar">
              <svg viewBox="0 0 24 24" className="upload-icon">
                <path fill="currentColor" d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,7L7,12H10V16H14V12H17L12,7Z" />
              </svg>
              <ArtistImage images={artist.images} name={artist.name} />
              <input
                ref={refInputAvatar}
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={handleChangeAvatar}
              />
            </label>
          </div>
          <div className="col-7 col-sm-8">
            <FormGroup>
              <InputText
                label="Nombre del artista"
                type="text"
                value={name}
                onChange={handleChangeName}
              />
            </FormGroup>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArtistEdit;