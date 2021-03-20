import { useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import startsWith from "lodash/startsWith";

import { setSearchTerm } from "../../../redux/actions/search";

import "./index.scss";

const Search = props => {

  const history = useHistory();
  const didMount = useRef(false); // Idea from: https://www.robinwieruch.de/react-useeffect-only-on-update
  const { term, setSearchTerm } = props;

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    redirect(term);
  }, [term])

  useEffect(() => {
    return history.listen((location) => { 
      if(term === "") return;
      if(!startsWith(location.pathname, "/search")){
        setSearchTerm("");
      }
    }) 
 },[history, term])

  const redirect = useCallback(debounce(term => {
    if(term.length > 0){
      history.push(`/search/${btoa(term)}`);
    }else if(startsWith(history.location.pathname, "/search")){
      // Redirect to home, but only if we're at search
      history.push(`/`);
    }
  }, 500), []);

  return(
    <form className="search-form" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        value={term}
        onChange={ e => setSearchTerm(e.target.value) }
        placeholder="Busca por autor, álbum, canción..."
      />
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </form>
  )
}

const mapStateToProps = state => {
  const { searchTerm: term } = state.search;
  const { auth } = state;
  return { term, auth };
}

const mapDispatchToProps = {
  setSearchTerm,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Search);