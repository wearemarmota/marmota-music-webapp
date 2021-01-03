import { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = props => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'audio/mpeg',
    onDrop: props.onDrop || null,
  });


  const style = useMemo(() => ({
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "#2b375f",
    textAlign: "center",
    padding: "1rem",
    borderRadius: "5px",
    backgroundColor: "#151f43",
    color: "#707698",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    ...(isDragActive ? { borderColor: "green" } : {}),
    ...(isDragAccept ? { borderColor: "green" } : {}),
    ...(isDragReject ? { borderColor: "red" } : {}),
  }), [
    isDragActive,
    isDragAccept,
    isDragReject,
  ]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default Dropzone;