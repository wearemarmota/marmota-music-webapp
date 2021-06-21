import { useState, useEffect, useRef } from "react";

const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);

  const ref = useRef()

  const onLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      if(!loaded){
        setPreloaded(true);
      }
    }
  })

  return [ref, preloaded, loaded, onLoad];
}

export default useImageLoaded;