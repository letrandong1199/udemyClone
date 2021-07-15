import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    bigTitle: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: (props) =>
            props.color === 'vibrant'
                ? theme.palette.background.vibrant
                : theme.palette.background.default,

        color: theme.palette.text.primary,
        padding: '45px',
    },

    homeSection: {
        position: 'relative',
        backgroundColor: (props) =>
            props.color === 'vibrant'
                ? theme.palette.background.vibrant
                : theme.palette.background.default,
        padding: '10px',
        justifyContent: 'center',
    },
}));