import React, { Component } from "react";
import jsmediatags from "jsmediatags";
import cloneDeep from "lodash/cloneDeep";
import Dropzone from "react-dropzone";
import SongsService from "../../../shared/songs-service";

import "./index.scss";

class CreateSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songFiles: [],
      songTitles: [],
      uploading: false,
    };
  }

  onChangeTitle = (e, index) => {
    const value = e.target.value;
    let titles = cloneDeep(this.state.songTitles);
    titles[index] = value;
    this.setState({
      songTitles: titles,
    });
  };

  onChangeFiles = (e) => {
    const files = e.target.files;
    this.readTags(files)
      .then((tags) => {
        const titles = tags.map((tag) => tag.title || "Unknown");
        this.setState({
          songFiles: files,
          songTitles: titles,
        });
      })
      .catch((error) => {
        alert(error.info);
      });
  };

  onDrop = (files) => {
    this.readTags(files)
      .then((tags) => {
        const titles = tags.map((tag) => tag.title || "Unknown");
        this.setState({
          songFiles: files,
          songTitles: titles,
        });
      })
      .catch((error) => {
        alert(error.info);
      });
  };

  readTag = (file) => {
    return new Promise((resolve, reject) => {
      new jsmediatags.Reader(file).read({
        onSuccess: (tag) => {
          resolve(tag.tags);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  readTags = (files) => {
    let promises = Object.values(files).map((file) => {
      return this.readTag(file);
    });
    return Promise.all(promises);
  };

  uploadOne = (index) => {
    const title = this.state.songTitles[index];
    const albumId = this.props.album.id;
    const file = this.state.songFiles[index];
    return SongsService.create(title, albumId, file);
  };

  uploadAll = () => {
    this.setState({
      uploading: true,
    });

    let promises = Object.keys(this.state.songFiles).map((key, index) => {
      return this.uploadOne(index);
    });

    Promise.all(promises).then((response) => {
      console.log(response);
      this.setState({
        uploading: false,
        songFiles: [],
        songTitles: [],
      });
      this.props.next();
    });
  };

  isUploadDisabled = () => {
    if (this.state.uploading) {
      return true;
    }

    if (this.state.songFiles.length === 0) {
      return true;
    }

    return false;
  };

  render() {
    const { artist, album } = this.props;
    return (
      <aside className="create-songs">
        <h3>
          Agregar canciones a {album.title} de {artist.name}
        </h3>
        <p>
          <small>
            ...o,{" "}
            <button className="link" onClick={this.props.prev}>
              cambiar álbum
            </button>
            .
          </small>
        </p>
        {/*
         * // ToDo: Do the styles right:
         * https://react-dropzone.js.org/#section-styling-dropzone
         */}
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className="songs-dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Arrastra y suelta las canciones aquí, o haz click para
                seleccionarlas
              </p>
            </div>
          )}
        </Dropzone>
        <table>
          <tbody>
            {Object.values(this.state.songFiles).map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>
                    <input
                      type="text"
                      value={this.state.songTitles[index]}
                      onChange={(e) => this.onChangeTitle(e, index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.props.currentStep === 3 && <p>Las canciones</p>}
        <button onClick={this.uploadAll} disabled={this.isUploadDisabled()}>
          Subir canciones
        </button>
      </aside>
    );
  }

  static defaultProps = {
    artist: null,
    album: null,
    prev: () => {},
    next: () => {},
  };
}

export default CreateSongs;
