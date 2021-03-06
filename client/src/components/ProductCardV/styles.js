import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        maxWidth: 260,
        width: 260,
        //minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        //boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            maxWidth: 'unset',
            width: 'auto',
            flexDirection: 'row',
            flexGrow: 1,
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
            minHeight: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
    },
    action: {
        padding: 0,
    },
    content: {
    },
    price: {
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        borderRadius: 4,//'10px',
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        opacity: '0.8',
        fontWeight: 'bold'
    },
    tag: {
        position: 'absolute',
        top: '16px',
        left: '16px',
        borderRadius: 4,//'10px',
        padding: '5px',
        backgroundColor: theme.palette.secondary.main,
        color: '#000',
        //opacity: '0.8',
        fontWeight: 'bold',
        fontSize: 8,
        textTransform: 'uppercase',
    },
    rating: {
        color: theme.palette.text.primary,
        left: '-2px',
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
    rootCircular: {
        position: 'relative',
    },
    bottomCircular: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },

    topCircular: (props) => {
        if (props.value < 100) {
            return {
                color: theme.palette.secondary.main,
                position: 'absolute',
                left: 0,
            }
        }

        return {
            color: theme.palette.success.main,
            position: 'absolute',
            left: 0,
        }
    },
    circleCircular: {
        strokeLinecap: 'round',
    },
    boxCircular: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        color: 'rgba(0, 0, 0, 0.5)'
    },
}))