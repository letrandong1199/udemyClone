import { Popover } from "@material-ui/core";
import ReactPlayer from 'react-player';
import { useStyles } from './styles';

const PlayerPopper = ({ open, url, played, handleOnProgress, onClose }) => {
    const classes = useStyles();
    return (
        <Popover
            id='player'
            open={open}
            anchorReference="none"
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            className={classes.popoverRegisterAndLogin}>
            <ReactPlayer
                onProgress={handleOnProgress}
                controls
                progressInterval={10000}
                url={`${url}#t=${played}`}
                width={'100%'}
            />
        </Popover>
    )
};

export default PlayerPopper;