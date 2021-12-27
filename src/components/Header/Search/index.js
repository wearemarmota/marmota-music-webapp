import { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMountedState, useDebounce } from "react-use";

import { setSearchTerm } from "../../../redux/actions/search";

import "./index.scss";

const Search = () => {
  const didMount = useMountedState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchTerm } = useSelector((state) => state.search);

  useDebounce(
    () => {
      if (!didMount) return;
      if (searchTerm.length > 0) {
        history.push(`/search/${encodeURIComponent(searchTerm)}`);
      } else if (history.location.pathname.startsWith("/search")) {
        history.push(`/`);
      }
    },
    500,
    [searchTerm, didMount]
  );

  useEffect(() => {
    const unlisten = history.listen((location) => {
      console.log(location.pathname);
      if (searchTerm === "") return;
      if (!location.pathname.startsWith("/search")) dispatch(setSearchTerm(""));
    });
    // stop the listener when component unmounts
    return unlisten;
  }, [history, searchTerm, dispatch]);

  const onChangeTerm = useCallback(
    (e) => dispatch(setSearchTerm(e.target.value)),
    [dispatch]
  );

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={searchTerm}
        onChange={onChangeTerm}
        placeholder="Busca por autor, álbum, canción..."
      />
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        />
      </svg>
    </form>
  );
};

export default Search;
