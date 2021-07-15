import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        width: 260,
        //minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        //boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            width: 'auto',
            flexDirection: 'row',
        },
        margin: '10px',
        '&:hover': {
            border: '1px solid ' + theme.palette.primary.main,
        }
    },
    header: {
        overflow: 'hidden',
        WebkitLineClamp: 2,
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        minHeight: '4em',
    },
    headerText: {
        fontWeight: 'bold',
    },
    media: {

        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            minWidth: 151,
        },
        [theme.breakpoints.up('sm')]: {
            height: 0,
            paddingTop: '100%', // 16:9
        },
    },
    content: {
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