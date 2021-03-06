import { useState, useEffect, useRef, useCallback } from "react";
import jsmediatags from "jsmediatags";

import FormGroup from "../../../atoms/FormGroup";
import InputText from "../../../atoms/InputText";

import SongsService from "../../../shared/songs-service";

const SongItem = props => {

  const { albumId, file, shouldUpload, onProgress } = props;
  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(0);
  const prevLoaded = usePrevious(loaded);
  const [uploading, setUploading] = useState(false);
  const [total, setTotal] = useState(0);

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
    if(shouldUpload === true && uploading === false){
      setUploading(true);
      SongsService.create(title, albumId, file, (progressEvent) => {
        const { loaded, total } = progressEvent;
        if(total === 0){
          setTotal(total);
        }
        setLoaded(loaded);
        // // console.log("progressEvent", {loaded, total, fileSize: file.size});
        // const _prevLoaded = prevLoaded || 0;
        // const oldPercentage = _prevLoaded*100/total;
        // const currentPercentage = loaded*100/total;
        // const addPercentage = currentPercentage-oldPercentage;
        // // console.log({_prevLoaded, loaded, oldPercentage, currentPercentage, addPercentage});
        // onProgress(addPercentage);

      }).then((response) => {
        setUploading(false);
      });
    }
  }, [shouldUpload, loaded]);

  useEffect(() => {

    let _prevLoaded = prevLoaded || 0;
    let oldPercentage = _prevLoaded*100/total;
    let currentPercentage = loaded*100/total;
    let addPercentage = currentPercentage-oldPercentage;

    if(isNaN(oldPercentage)) oldPercentage = 0;
    if(isNaN(currentPercentage)) currentPercentage = 0;
    if(isNaN(addPercentage)) addPercentage = 0;

    onProgress(addPercentage);
  }, [loaded, total])

  return (
    <FormGroup>
      <InputText
        label={file.path}
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={shouldUpload}
      />
      <progress max={file.size} value={loaded} />
    </FormGroup>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default SongItem;