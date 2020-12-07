import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSongView } from "../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const songs = useSelector((state) => state.songsList);

  const setViewSong = (song) => {
    dispatch(setSongView(song));
    history.push("/" + song.trackId);
  };

  return (
    <div className="songs">
      {songs.map((song) => {
        return (
          <div
            className="song-card"
            key={song.trackId}
            onClick={() => {
              setViewSong(song);
            }}
          >
            <div className="song-card__picture">
              <img src={song.artworkUrl100} alt="" />
            </div>
            <div className="song-card__title">
              <h3>{song.trackName}</h3>
              <h4>{song.artistName}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
