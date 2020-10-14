import React from "react";
import { Link } from "react-router-dom";

export default function EmptyAlbum(props){
  return <React.Fragment>
    <h2>Uis...</h2>
    <p>
      Parece que este disco no tiene canciones.{" "}
      <Link to="/upload">Súbelas</Link>
    </p>
  </React.Fragment>;
}