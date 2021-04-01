import { Link } from "react-router-dom";

export default function EmptyAlbum(props){
  return <>
    <h2>Uis...</h2>
    <p>
      Parece que este disco no tiene canciones.{" "}
      <Link to="/upload">Súbelas</Link>
    </p>
  </>;
}