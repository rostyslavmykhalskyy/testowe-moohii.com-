import {
  GET_AUTO_COMPLETE,
  GET_SONGS,
  GET_INFINITY_SONGS,
  SET_SONG_VIEW,
  SET_APPLOADING
} from "./actions";

const songs = (
  state = {
    songsList: [],
    autocompleteList: [],
    songView: {},
    appLoading: false
  },
  action
) => {
  switch (action.type) {
    case GET_SONGS:
      return (state = {
        ...state,
        songsList: action.songs,
        appLoading: false
      });
    case GET_INFINITY_SONGS:
      const uniqueSongs = action.songs.filter(
        (song) =>
          !state.songsList.find(
            (savedSong) => savedSong.trackId === song.trackId
          )
      );
      return (state = {
        ...state,
        songsList: [...state.songsList, ...uniqueSongs],
        appLoading: false
      });
    case GET_AUTO_COMPLETE:
      return (state = {
        ...state,
        autocompleteList: action.autocomplete
      });
    case SET_SONG_VIEW:
      return (state = {
        ...state,
        songView: action.song,
        appLoading: false,
        autocompleteList: []
      });
    case SET_APPLOADING:
      return (state = {
        ...state,
        appLoading: !state.appLoading
      });

    default:
      return state;
  }
};

export default songs;
