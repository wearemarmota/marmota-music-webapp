import { useEffect, useState } from "react";

import Dropzone from "./Dropzone";
import Button from "../../../atoms/Button";
import SongItem from "./SongItemClass";

const Upload = (props) => {
  const { albumId, onUpload } = props;
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [overallTotal, setOverallTotal] = useState(0);
  const [overallLoaded, setOverallLoaded] = useState(0);

  const onDrop = (files) => {
    clear();
    setFiles(files);
    setOverallTotal(files.length);
  };

  const clear = (e) => {
    if (e) e.preventDefault();
    setFiles([]);
    setOverallLoaded(0);
    setOverallTotal(0);
  };

  const submit = (e) => {
    e.preventDefault();
    setUploading(true);
  };

  useEffect(() => {
    console.log({ overallLoaded, overallTotal });
    if (overallLoaded === overallTotal) {
      setUploading(false);
      onUpload();
      clear();
      console.log("overallLoaded = overallTotal");
    }
  }, [overallLoaded, overallTotal, onUpload]);

  const onSongUploadProgress = (loaded) => {
    console.log("onSongUploadProgress", loaded);
    setOverallLoaded((overallLoaded) => {
      return overallLoaded + loaded;
    });
  };

  return (
    <>
      {files.length === 0 && <Dropzone onDrop={onDrop} />}
      {files.length > 0 && (
        <form onSubmit={submit}>
          <p>
            Overall progress:{" "}
            <progress max={overallTotal} value={overallLoaded} />
          </p>
          {files.map((file, index) => (
            <SongItem
              key={index}
              albumId={albumId}
              file={file}
              shouldUpload={uploading}
              onProgress={onSongUploadProgress}
            />
          ))}
          <Button primary type="submit" disabled={uploading}>
            Subir
          </Button>{" "}
          <Button type="button" onClick={clear} disabled={uploading}>
            Cancelar
          </Button>
        </form>
      )}
    </>
  );
};

export default Upload;
