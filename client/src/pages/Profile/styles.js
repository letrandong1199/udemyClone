import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    bigTitle: {
        padding: 50,
        textAlign: 'center',
        backgroundColor: theme.palette.background.vibrant,
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 20,
        marginLeft: 40,
        '& button': {
            display: 'none',
            position: 'absolute',
            color: theme.palette.text.primary,
        },
        '&:hover': {
            //filter: 'opacity(20%)',
            '& button': {
                display: 'block',
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.background.default,
                backgroundOpacity: '50%',
            },
        },
    },

}))

export default useStyles;