import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        maxWidth: 285,
        minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        margin: '10px'
    },
    /* rgb(245, 247, 248)*/
    banner: (props) => {
        const color = theme.palette.type === 'dark' ? props.data.darkMuted : props.data.lightMuted;
        const backgroundColor = 'radial-gradient(circle at 0%, ' + theme.palette.background.vibrant + ' 60%, ' + color + ' 80%)';
        return {
            height: 500,
            background: backgroundColor, /*'rgb(245, 247, 248)'*/
            padding: 30,
        }
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.text.primary, //'rgb(55, 51, 51)', /*data.darkVibrant*/ 
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
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
    thumbnail: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: '0 0 10px 10px white inset',
        borderRadius: 10

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    buttonGroup: {
        width: '100%',
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
        paddingLeft: 10,
        zIndex: 1600,
        top: 0,
        position: 'sticky',
        overflow: 'auto',
        '& button': {
            color: theme.palette.text.primary,

            overflow: 'auto',
            minHeight: 50,
            backgroundColor: theme.palette.background.default,
            textTransform: 'none',
            fontSize: 16,
            border: 0,
            borderRadius: 0,
            '&:hover': {
                backgroundColor: theme.palette.background.vibrant,
                color: 'rgb(0, 86, 210)',
            }
        },
    }
}));