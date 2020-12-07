import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { autoComplete, getInfinitySongs, getSongs } from "../store/actions";

const SearchField = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  let appLoading = useSelector((state) => state.appLoading);
  const [loading, setLoading] = useState(false);
  const [buttonToTop, setButtonToTop] = useState(false);
  const [offset, setOffset] = useState(20);
  const [timeDelay, setTimeDelay] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const autocompleteList = useSelector((state) => state.autocompleteList);

  const findSongs = () => {
    setOffset(20);
    setCurrentSearch(searchText);
    if (timeDelay) {
      clearTimeout(timeDelay);
    }
    dispatch(getSongs(searchText));
    history.go(-1);
  };

  const findFromAutocomplete = (trackName) => {
    setOffset(20);
    setCurrentSearch(trackName);
    dispatch(getSongs(trackName));
    history.go(-1);
  };

  function autoCompleteSongs(text) {
    setLoading(true);
    setSearchText(text);
    if (timeDelay) {
      clearTimeout(timeDelay);
    }
    setTimeDelay(
      setTimeout(() => {
        dispatch(autoComplete(text)).then(setLoading(false));
      }, 700)
    );
  }
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setSearchText(lastSearch);
      setCurrentSearch(lastSearch);
      dispatch(getSongs(lastSearch));
    }
  }, []);

  window.onscroll = () => {
    if (window.scrollY > 500) {
      setButtonToTop(true);
    } else {
      setButtonToTop(false);
    }
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight &&
      !appLoading &&
      currentSearch.length &&
      location.pathname === "/"
    ) {
      setOffset(offset + 20);
      dispatch(getInfinitySongs(currentSearch, 20, offset));
    }
  };

  return (
    <>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          autoCompleteSongs(e.target.value);
        }}
        placeholder="Write a song name"
      />
      <div className="autocomplete">
        {!loading &&
          autocompleteList.map((autocomplete) => {
            return (
              <div
                className="autocomplete-card"
                key={autocomplete.trackId}
                onClick={() => {
                  findFromAutocomplete(autocomplete.trackName);
                }}
              >
                <div className="autocomplete-card__title">
                  <h3>{autocomplete.trackName}</h3>
                  <h4>{autocomplete.artistName}</h4>
                </div>
                <div className="autocomplete-card__picture">
                  <img src={autocomplete.artworkUrl30} alt="" />
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => {
          findSongs();
        }}
        disabled={searchText.length ? false : true}
      >
        Search
      </button>
      {buttonToTop && (
        <button
          className="toTop"
          onClick={() => {
            scrollToTop();
          }}
        >
          &#10514;
        </button>
      )}
    </>
  );
};

export default SearchField;
