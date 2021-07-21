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

    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, max-content))',
        /* overflow-x: auto; */
        /* grid-gap: 50px; */
        justifyContent: 'space-between',
        /* padding: initial; */
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
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