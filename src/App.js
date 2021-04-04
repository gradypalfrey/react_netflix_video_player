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
    return `0:00`;
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
let rate = 1.0;


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

  const { playing, muted, played, seeking, volume, playbackRate } = state;

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

  const handleUnmute = () => {
    setState({...state, muted: false});
  }

  const handlePlaybackRate = () => {
    if (playbackRate >= 2.0) {
      rate = 0.5;
    } else {
      rate += 0.5;
    }
    //console.log(playbackRate);
    setState({...state, playbackRate: rate});
  }



  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  


  return (
    <div style={{width:"100%", position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "center"}}>
      <Container maxWidth="xl" disableGutters={true}>
        <div ref={playerContainerRef} className={classes.playerWrapper} onMouseMove={handleMouseMove}>
          <ReactPlayer
            width={"100%"}
            height="100%"
            url="https://r7---sn-cxaaj5o5q5-tt1r.googlevideo.com/videoplayback?expire=1617587132&ei=WxdqYIrOOs3zigT61ZCgBg&ip=76.64.71.157&id=o-AE8wJ8O26G_1wstFU40C_QXb1t2m0Mf9LLzomYF3z53E&itag=22&source=youtube&requiressl=yes&mh=Vp&mm=31%2C26&mn=sn-cxaaj5o5q5-tt1r%2Csn-vgqskned&ms=au%2Conr&mv=m&mvi=7&pl=24&initcwndbps=1528750&vprv=1&mime=video%2Fmp4&ns=G6Wmq-sc_ksaZnTjWCyy_kEF&cnr=14&ratebypass=yes&dur=221.425&lmt=1536528880703122&mt=1617565254&fvip=4&fexp=24001373%2C24007246&c=WEB&n=BaNWFNnfIH7DvNP3B&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOeE6HR6lMXYPzFkICHchT8Jsc-ikviG-KjxmyUkyUKOAiB9YlPZ0mPxvq3mjWwwMRZ9MImb4yJiJJnmj9IgDwgcPQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAKRyCj9oEKi96n9YdyGNWPAhfTpYaoKiXV2A6s3fHbnWAiBeHnYpObaq9UpJ3vFFEGUo-luqY5SmZPRvRRaGf3r4dg%3D%3D"
            playing={playing}
            volume={volume}
            muted={muted}
            ref={playerRef}
            onProgress={handleProgress}
            playbackRate={playbackRate}
          />
          <Controls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleOnSeekMouseDown}
            onSeekMouseUp={handleOnSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onUnmute={handleUnmute}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
