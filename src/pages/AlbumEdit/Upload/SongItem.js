import { useState, useEffect } from "react";
import jsmediatags from "jsmediatags";

import FormGroup from "../../../atoms/FormGroup";
import InputText from "../../../atoms/InputText";

import SongsService from "../../../shared/songs-service";

const SongItem = props => {

  const { albumId, file, shouldUpload, onProgress } = props;
  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    new jsmediatags.Reader(file).read({
      onSuccess: (tag) => {
        setTitle(tag.tags.title || file.path);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, [file]);

  useEffect(() => {
    if(shouldUpload === true){
      setUploading(true);
      SongsService.create(title, albumId, file, (progressEvent) => {
        const { loaded, total } = progressEvent;
        setLoaded(loaded);
      }).then((response) => {
        onProgress(file.size);
        setUploading(false);
      });
    }
  }, [shouldUpload]);

  return (
    <FormGroup>
      <InputText
        label={file.path}
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={shouldUpload}
      />
      <progress max={file.size} value={loaded} style={{
          backgroundColor: "#f3f3f3",
          border: "0",
          height: "1px",
          borderRadius: "9px",
      }} />
    </FormGroup>
  );
}

export default SongItem;