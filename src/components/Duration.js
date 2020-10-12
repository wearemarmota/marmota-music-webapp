import React from "react";

export default function Duration(props){
  return <>{new Date(props.seconds * 1000)
    .toISOString()
    .substr(14, 5)}</>;
}