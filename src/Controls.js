import React, {forwardRef} from 'react';
import { duration, makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Icon, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import IconButton from '@material-ui/core/IconButton';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SpeedIcon from '@material-ui/icons/Speed';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles({

    controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    },

    controlIcons: {
        color: "lightgrey",
        "&:hover": {
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

export default forwardRef(({onPlayPause,
                            playing,
                            onRewind,
                            onFastForward,
                            onToggleFullScreen,
                            played,
                            onSeek,
                            onSeekMouseDown,
                            onSeekMouseUp,
                            elapsedTime,
                            totalDuration, 
                            onMute,
                            muted,
                            onVolumeSeekDown,
                            volume,
                            onVolumeChange,
                            playbackRate,
                            onPlaybackRateChange,
                            onUnmute}, ref) => {

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
        <div className={classes.controlsWrapper} ref={ref}>
            <Grid container direction="row" justify="space-between" alignItems="center" style={{ padding: 16 }}>
                <Grid item>
                    <Button style={{ color: "white" }} startIcon={<ArrowBack />}>
                        <Typography>Back to Browse</Typography>
                    </Button>
                </Grid>
            </Grid>

            {/* Bottom Controls*/}


            <Grid container direction="row" alignItems="center" justify="center">

            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center" style={{ padding: 16 }}>
                <Grid item lg={11}>
                    <RedSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        ValueLabelComponent={(props) => <ValueLabelComponent {...props} value={elapsedTime}/>}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        />
                </Grid>

                <Grid item>
                    <Button variant="text" style={{color: "white"}}>
                        <Typography>{elapsedTime}</Typography>
                    </Button>
                </Grid>

                <Grid item>
                    <Grid container alignItems="center" direction="row">
                        <IconButton onClick={onPlayPause} className={classes.controlIcons}>
                            {playing ? (
                                <PauseIcon />
                            ) : (
                                <PlayArrowIcon />
                            )}
                        </IconButton>

                        <IconButton onClick={onRewind} className={classes.controlIcons}>
                            <Replay10Icon />
                        </IconButton>

                        <IconButton onClick={onFastForward} className={classes.controlIcons}>
                            <Forward10Icon />
                        </IconButton>

                        <IconButton onClick={handlePopover} className={classes.controlIcons}>
                            { muted ? (
                                <VolumeOffIcon onClick={onUnmute} />
                            ) : (
                                <VolumeUpIcon />
                            )}
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
                            <Slider
                                color="red"
                                orientation="vertical"
                                style={{height: "120px", width: "8px", backgroundColor: "darkgrey", color:"red" }}

                                min={0}
                                max={100}
                                value={volume * 100}
                                onChange={onVolumeChange}
                                onChangeCommitted={onVolumeSeekDown}
                                />
                        </Popover>

                        <Button variant="text" style={{color: "white"}}>
                            <Typography>National Geographic S1 E1</Typography>
                        </Button>
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

                    <IconButton onClick={onPlaybackRateChange} className={classes.controlIcons}>
                        <SpeedIcon />
                    </IconButton>

                    <IconButton onClick={onToggleFullScreen} className={classes.controlIcons}>
                        <FullscreenIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
});