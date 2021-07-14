import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        width: 260,
        minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        //boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
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
        WebkitBoxOrient: 'vertical'
    },
    headerText: {
        fontWeight: 'bold',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative',
    },
    price: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        borderRadius: 4,//'10px',
        padding: '10px',
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        fontWeight: 'bold'
    },
    rating: {
        margin: '12px',
        color: 'rgb(247, 187, 86)',
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