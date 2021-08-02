import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        padding: '10px',
        justifyContent: 'center',
        minHeight: '200px',
    },

    list: {
        display: 'flex',
        justifyContent: 'space-between',

        maxWidth: '100%',
        overflow: 'auto',
        scrollSnapType: 'x mandatory',
        MsOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',  /* Firefox */
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },


    previousButton: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.acrylic,
        top: '50%',
        left: '-8px',
        position: 'absolute'
    },
    nextButton: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.acrylic,
        top: '50%',
        right: '-8px',
        position: 'absolute'
    }
}));