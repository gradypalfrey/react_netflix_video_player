import React, { useState, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ReactPlayer from 'react-player';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import screenfull from 'screenfull';

import Controls from "./Controls.js";
import { FormatAlignCenter } from '@material-ui/icons';


const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },

  controlIcons: {
    color: "lightgrey",
    //width: "15px",
    "&:hover": {
      transform: "scale(1.1)",
      color: "white",
    },
  },
});

const format = (sec) => {
  if(isNaN(sec)) {
    return `00:00`;
  }
  const date = new Date(sec * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2,"0");

  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

let count = 0;


function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playBackRate: 1,
    played: 0,
    seeking: false,
  });

  const { playing, muted, played, seeking, volume } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleProgress = (changeState) => {

    if (count > 2) {
        controlsRef.current.style.visibility = "hidden";
        count = 0;
    }

    if (controlsRef.current.style.visibility == 'visible') {
        count = count + 1;
    }

    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleOnSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleOnSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({...state, seeking: false, volume: parseFloat(newValue / 100)});
  };

  const handleVolumeChange= (e, newValue) => {
    setState({...state, volume: parseFloat(newValue / 100), muted: newValue === 0 ? true : false});
  };

  const handleMute = () => {
    setState({...state, muted: !state.muted });
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  


  return (
    <div style={{width:"88%", paddingLeft: "6%"}}>
      <Container maxWidth="xl" disableGutters={true}>
        <div ref={playerContainerRef} className={classes.playerWrapper} onMouseMove={handleMouseMove}>
          <ReactPlayer
            width={"100%"}
            height="100%"
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
            playing={playing}
            volume={volume}
            muted={muted}
            ref={playerRef}
            onProgress={handleProgress}
          />
          <Controls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleOnSeekMouseDown}
            onSeekMouseUp={handleOnSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
