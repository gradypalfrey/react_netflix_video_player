import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Icon } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import IconButton from '@material-ui/core/IconButton';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SpeedIcon from '@material-ui/icons/Speed';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import Popover from '@material-ui/core/Popover';

import { useState } from 'react';
import { Button as Button1} from 'reactstrap';
import { Popover as Popover1 } from 'reactstrap';
import { PopoverHeader as PopoverHeader1} from 'reactstrap';
import { PopoverBody as PopoverBody1 } from 'reactstrap';


const useStyles = makeStyles({
  playerWrapper:{
    width: "100%",
    position: "relative",
  },

  controlsWrapper:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    //background:"rgba(0,0,0,0.6)",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    zIndex:1,
  },

  controlIcons:{
    color: "lightgrey",
    //width: "15px",
    "&:hover":{
      transform: "scale(1.1)",
      color: "white",
    },
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const RedSlider = withStyles({
  root: {
    color: 'red',
  },
  
})(Slider);

function App() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'speed-popover' : undefined;


  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h10">Netflix Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="sm">
        <div className={classes.playerWrapper}>
          <ReactPlayer
            width={"100%"}
            height="100%"
            url="https://filesamples.com/samples/video/mp4/sample_1920x1080.mp4"
            playing={true}
            muted={false}
          />

          {/* Back Button*/}

          <div className={classes.controlsWrapper}>
            <Grid container direction="row" alignItems="center" justify="space-between" style={{padding:16}}>
              <Grid item>
                <Button style={{color: "white"}} startIcon={<ArrowBack/>}>
                </Button>
              </Grid>
            </Grid>

            {/* Bottom Controls*/}


            <Grid container direction="row" alignItems="center" justify="center">

              <IconButton className={classes.controlIcons} aria-label="reqind">
                <PlayArrowIcon fontSize="inherit" />
              </IconButton>

            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center" style={{padding: 16}}>
              <Grid item xs={12}>
                <RedSlider min={0} max={100} defaultValue={20} ValueLabelComponent={ValueLabelComponent} />
              </Grid>

              <Grid item>
                <Grid container alignItems="center" direction="row">
                  <IconButton className={classes.controlIcons}>
                    <PlayArrowIcon />
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <Replay10Icon/>
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <Forward10Icon />
                  </IconButton>

                  <IconButton onClick={handlePopover} className={classes.controlIcons}>
                    <VolumeUpIcon />
                  </IconButton>
                  <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <Slider orientation ="vertical" style={{height: "100px"}} width={100} min={0} max={100}/>
                </Popover>

                  {/*
                  <IconButton className={classes.controlIcons}>
                    <HelpOutlineIcon />
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <SkipNextIcon />
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <DynamicFeedIcon />
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <SubtitlesIcon />
                  </IconButton>

                  <IconButton className={classes.controlIcons}>
                    <SpeedIcon />
                  </IconButton>
                  */}
                  
                </Grid>
              </Grid>
              
              <Grid item>
                <IconButton className={classes.controlIcons}>
                  <HelpOutlineIcon />
                </IconButton>

                <IconButton className={classes.controlIcons}>
                  <SkipNextIcon />
                </IconButton>

                <IconButton className={classes.controlIcons}>
                  <DynamicFeedIcon />
                </IconButton>

                <IconButton className={classes.controlIcons}>
                  <SubtitlesIcon />
                </IconButton>

                <IconButton id="Popover1" type="button" className={classes.controlIcons}>
                  <SpeedIcon />
                </IconButton>
            
                <IconButton className={classes.controlIcons}>
                  <FullscreenIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
