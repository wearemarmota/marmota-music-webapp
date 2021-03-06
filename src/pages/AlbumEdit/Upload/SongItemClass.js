// import { useState, useEffect, useRef, useCallback } from "react";
import { Component } from "react";
import jsmediatags from "jsmediatags";

import FormGroup from "../../../atoms/FormGroup";
import InputText from "../../../atoms/InputText";

import SongsService from "../../../shared/songs-service";

class SongItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "",
      loaded: 0,
      total: 0,
      uploading: false,
    }
  }

  componentDidMount(){
    new jsmediatags.Reader(this.props.file).read({
      onSuccess: (tag) => {
        this.setState({ title: tag.tags.title || this.props.file.path});
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.shouldUpload && this.props.shouldUpload && !this.state.uploading){
      this.startUpload();
    }
  }

  startUpload = () => {
    
    const { title } = this.state;
    const { albumId, file } = this.props;
    
    this.setState({ uploading: true });

    SongsService.create(title, albumId, file, (progressEvent) => {
      const { loaded, total } = progressEvent;
      this.setState({ loaded: loaded, total: total });
    }).then((response) => {
      this.setState({ uploading: false });
      this.props.onProgress(1);
    });

  }

  render(){
    return(
      <FormGroup>
        <InputText
          label={this.props.file.path}
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})}
          disabled={this.props.shouldUpload}
        />
        <progress max={this.props.file.size} value={this.state.loaded} />
      </FormGroup>
    );
  }

}
// const SongItem = props => {

//   const { albumId, file, shouldUpload, onProgress } = props;
//   const [title, setTitle] = useState("");
//   const [loaded, setLoaded] = useState(0);
//   const prevLoaded = usePrevious(loaded);
//   const [uploading, setUploading] = useState(false);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     new jsmediatags.Reader(file).read({
//       onSuccess: (tag) => {
//         setTitle(tag.tags.title || file.path);
//       },
//       onError: (error) => {
//         console.error(error);
//       },
//     });
//   }, [file]);

//   useEffect(() => {
//     if(shouldUpload === true && uploading === false){
//       setUploading(true);
//       SongsService.create(title, albumId, file, (progressEvent) => {
//         const { loaded, total } = progressEvent;
//         if(total === 0){
//           setTotal(total);
//         }
//         setLoaded(loaded);
//         // // console.log("progressEvent", {loaded, total, fileSize: file.size});
//         // const _prevLoaded = prevLoaded || 0;
//         // const oldPercentage = _prevLoaded*100/total;
//         // const currentPercentage = loaded*100/total;
//         // const addPercentage = currentPercentage-oldPercentage;
//         // // console.log({_prevLoaded, loaded, oldPercentage, currentPercentage, addPercentage});
//         // onProgress(addPercentage);

//       }).then((response) => {
//         setUploading(false);
//       });
//     }
//   }, [shouldUpload, loaded]);

//   useEffect(() => {

//     let _prevLoaded = prevLoaded || 0;
//     let oldPercentage = _prevLoaded*100/total;
//     let currentPercentage = loaded*100/total;
//     let addPercentage = currentPercentage-oldPercentage;

//     if(isNaN(oldPercentage)) oldPercentage = 0;
//     if(isNaN(currentPercentage)) currentPercentage = 0;
//     if(isNaN(addPercentage)) addPercentage = 0;

//     console.log({
//       _prevLoaded,
//       loaded,
//       total,
//       oldPercentage,
//       currentPercentage,
//       addPercentage,
//     });

//     onProgress(addPercentage);
//     // const _prevLoaded = prevLoaded || 0;
//     // // if(prevLoaded){
//     //   // console.log(loaded - _prevLoaded, {loaded, _prevLoaded})
//     //   onProgress(loaded - _prevLoaded);
//     // // }
//   }, [loaded, total])

//   return (
//     <FormGroup>
//       <InputText
//         label={file.path}
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         disabled={shouldUpload}
//       />
//       <progress max={file.size} value={loaded} />
//     </FormGroup>
//   );
// }

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }


export default SongItem;