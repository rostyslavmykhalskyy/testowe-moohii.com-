import axios from "axios";
export const GET_SONGS = "GET_SONGS";
export const GET_INFINITY_SONGS = "GET_INFINITY_SONGS";
export const GET_AUTO_COMPLETE = "GET_AUTO_COMPLETE";
export const SET_SONG_VIEW = "SET_SONG_VIEW";
export const SET_APPLOADING = "SET_APPLOADING";

const apiGet = async (songName, limit, offset) => {
  return await axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" +
        songName +
        "&media=music&entity=musicTrack&attribute=songTerm" +
        "&limit=" +
        limit +
        "&offset=" +
        offset
    )
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

export const getSongs = (songName, limit = 20, offset = 0) => {
  localStorage.setItem("lastSearch", songName);
  return async function (dispatch) {
    dispatch({
      type: GET_AUTO_COMPLETE,
      autocomplete: []
    });
    dispatch({
      type: SET_APPLOADING
    });
    await apiGet(songName, limit, offset).then((res) => {
      dispatch({
        type: GET_SONGS,
        songs: res.data.results
      });
    });
  };
};
export const getInfinitySongs = (songName, limit, offset) => {
  return async function (dispatch) {
    dispatch({
      type: SET_APPLOADING
    });
    await apiGet(songName, limit, offset)
      .then((res) => {
        if (res.data.resultCount) {
          dispatch({
            type: GET_INFINITY_SONGS,
            songs: res.data.results
          });
        } else {
          dispatch({
            type: SET_APPLOADING
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
export const autoComplete = (songName, limit = 5, offset = 0) => {
  return async function (dispatch) {
    await apiGet(songName, limit, offset)
      .then((res) => {
        dispatch({
          type: GET_AUTO_COMPLETE,
          autocomplete: res.data.results
        });
        return true;
      })
      .catch((e) => {
        dispatch({
          type: SET_APPLOADING
        });
        console.log(e);
      });
  };
};
export const getSingleSong = (songName) => {
  return async function (dispatch) {
    dispatch({
      type: SET_APPLOADING
    });
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=" +
          songName
      )
      .then((res) => {
        dispatch(setSongView(res.data.results[0]));
      })
      .catch((e) => {
        dispatch({
          type: SET_APPLOADING
        });
        console.log(e);
      });
  };
};

export const setSongView = (song) => {
  return function (dispatch) {
    dispatch({
      type: SET_SONG_VIEW,
      song
    });
  };
};
