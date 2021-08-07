import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    bigTitle: {
        padding: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.vibrant,
    },
    thumbnail: {
        padding: 10,
        border: `8px double`,
        borderColor: theme.palette.background.acrylic,
        minWidth: 480,
        borderRadius: theme.shape.borderRadius,
        minHeight: 300,
        backgroundSize: 'contain !important',
    },

    listRoot: {
        overflow: 'auto',
        maxHeight: '324px',
        backgroundColor: theme.palette.background.acrylic,
    },
    boxTitle: {
        display: 'flex',
        padding: '0 16px 0 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.divider,
    },
    reviewDialog: {
        minWidth: 900,
        padding: 20,
    },
    ratingRoot: {
        display: 'flex',
    },
}));