import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSong } from "../store/actions";

const Song = () => {
  let params = useParams();
  let dispatch = useDispatch();
  const song = useSelector((state) => state.songView);

  useEffect(() => {
    if (Object.keys(song).length === 0) {
      dispatch(getSingleSong(params.songId));
    }
  }, []);
  
  return (
    <div className="songView">
      <div className="songView__picture">
        <img src={song.artworkUrl100} alt="" />
      </div>
      <div className="songView__title">
        <h2>{song.trackName}</h2>
        <h3>{song.artistName}</h3>
        {song.previewUrl && <audio src={song.previewUrl} controls></audio>}
      </div>
      <div className="songView__details">
        {song.trackPrice && <p>Price: {song.trackPrice} USD</p>}
        {song.country && <p>Country: {song.country}</p>}
        {song.primaryGenreName && <p>Genre: {song.primaryGenreName}</p>}
        {song.collectionName && <p>Collection: {song.collectionName}</p>}
        {song.releaseDate && (
          <p>
            Release date: {new Date(song.releaseDate).getFullYear().toString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Song;
