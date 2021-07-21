import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        //maxHeight: 260,
        //maxWidth: 260,
        paddingTop: 20,
        paddingBottom: 20,
        boxShadow: 'none',
        //width: 260,
        //minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        //boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        display: 'flex',
        maxWidth: 'unset',
        width: '100%',
        flexDirection: 'row',
        // flexGrow: 1,
        [theme.breakpoints.down('xs')]: {

        },
        margin: '10px',
    },
    limit: {
        overflow: 'hidden',
        WebkitLineClamp: 2,
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        //minHeight: '4em',
    },
    headerText: {
        fontWeight: 'bold',
    },
    media: {
        minWidth: 160,
        minHeight: '100%',
        position: 'relative',

        /*[theme.breakpoints.down('xs')]: {
            minWidth: 151,
            minHeight: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },*/
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    price: {
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        borderRadius: 4,//'10px',
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
        opacity: '0.8',
        fontWeight: 'bold'
    },
    rating: {
        color: theme.palette.primary.secondary,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))