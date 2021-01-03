import { useState } from "react";
import jsmediatags from "jsmediatags";

import SongsService from "../../../shared/songs-service";

import Dropzone from "./Dropzone";
import FormGroup from "../../../atoms/FormGroup";
import InputText from "../../../atoms/InputText";
import Button from "../../../atoms/Button";

const Upload = props => {

  const { albumId, onUpload } = props;
  const [titles, setTitles] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const metatags = (file) => new Promise((resolve, reject) => {
    new jsmediatags.Reader(file).read({
      onSuccess: (tag) => {
        resolve(tag.tags);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });

  const onDrop = files => {

    // Read the file names and use as temporal titles:
    var titles = files.map(function (file, index, array) {
      return file.path; 
    });

    // Save titles and files in the state:
    setFiles(files);
    setTitles(titles);

    // Read all the metatags to read the real title, and override it.
    Promise.all(files.map((file) => metatags(file))).then((tags) => {
      const realTitles = tags.map((tag, index) => {
        return tag.title || titles[index];
      });
      setTitles(realTitles);
    }).catch((error) => {
      console.error(error);
    });
  }

  // Handler for updating one title
  const updateTitle = (e, index) => {
    let oldTitles = [...titles]; // Copy.
    oldTitles[index] = e.target.value;
    setTitles(oldTitles);
    e.preventDefault();
  }

  const clear = e => {
    if(e) e.preventDefault();
    setTitles([]);
    setFiles([]);
  }

  const submit = e => {
    e.preventDefault();
    setIsUploading(true);
    Promise.all(files.map((file, index) => {
      const title = titles[index];
      return SongsService.create(title, albumId, file);
    })).then((response) => {
      console.log(response);
      setIsUploading(false);
      clear();
      onUpload();
    });
  }

  return (
    <>
      { files.length === 0 &&
        <Dropzone onDrop={onDrop} />
      }
      { files.length > 0 &&
        <form onSubmit={submit}>
          {
            files.map((file, index) => {
              return <FormGroup key={index}>
                <InputText
                  label={file.path}
                  value={titles[index]}
                  onChange={(e) => updateTitle(e, index)}
                  disabled={isUploading}
                />
              </FormGroup>
            })
          }
          <Button primary type="submit" disabled={isUploading}>Subir</Button>{" "}
          <Button type="button" onClick={clear} disabled={isUploading}>Cancelar</Button>
        </form>
      }
    </>
  );
}

export default Upload;