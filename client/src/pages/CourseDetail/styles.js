import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    titleBar: {
        backgroundColor: theme.palette.background.vibrant,
        color: theme.palette.text.primary,
    },
    show: {
        display: 'block',
    },
    hide: {
        display: 'none'
    },
    title: {
        flexBasis: '100%',
        fontWeight: 500,
        paddingTop: 40,
        paddingBottom: 40,
    },
    /* rgb(245, 247, 248)*/
    outerBanner: (props) => {
        if (props.isPending || props.error) {
            return {
                minHeight: 660,
                paddingTop: 250,
                paddingBottom: 20,
            }
        }
        return {
            background: `center / cover no-repeat url(${props.thumbnail})`,
            //backgroundSize: 'cover !important',
            minHeight: 660,
            paddingTop: 250,
            paddingBottom: 20,
        }
    },
    banner: (props) => {
        if (props.isPending || props.loading || props.error) {
            return { padding: 30 }
        }
        const color = theme.palette.type === 'dark' ? props.data?.darkMuted : props.data?.lightMuted;
        const backgroundColor = 'radial-gradient(circle at 0%, ' + theme.palette.background.vibrant + ' 60%, ' + color + ' 80%)';
        return {
            //minHeight: 500,
            background: backgroundColor, /*'rgb(245, 247, 248)'*/
            padding: 30,
        }
    },
    bannerTitle: {
        fontWeight: 'bold',
        color: theme.palette.text.primary, //'rgb(55, 51, 51)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
    },
    card: {
        //padding: 10,
        maxWidth: 250,
        //border: '1px solid ',
        // borderColor: theme.palette.background.acrylic,
        backgroundColor: theme.palette.background.vibrant,//'rgb(251, 251, 248)',
        margin: 20,
        overflow: 'auto',
        position: 'sticky',
        top: 80,
    },
    cardThumbnail: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        //boxShadow: '0 0 10px 10px white inset',
        //borderRadius: 10
    },
    padding: {
        paddingLeft: 80,
        paddingRight: 80,
        paddingBottom: 80,
    },
    vibrant: {
        backgroundColor: theme.palette.background.vibrant,
    },
    cardContent: {
        width: '100%',
        '& > *': {

        }
    },
    heading: {
        fontSize: 13,
        textAlign: 'center',
        flexBasis: '20%',
        textTransform: 'uppercase',
        flexShrink: 0,
        '& span': {
            fontSize: 54,
        }
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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
    buttonGroup: {
        width: '100%',
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
        paddingLeft: 10,
        zIndex: theme.zIndex.appBar,
        top: 64,
        position: 'sticky',
        overflow: 'auto',

        '& > *': {
            color: theme.palette.text.primary,
            overflow: 'auto',
            minHeight: 50,
            backgroundColor: theme.palette.background.default,
            textTransform: 'none',
            fontSize: 16,
            border: 'none !important',
            borderRadius: 0,
            '&:hover': {
                backgroundColor: 'unset',
                color: 'rgb(0, 86, 210)',
            },
            '& active': {
                backgroundColor: 'unset',
                color: 'rgb(0, 86, 210)',
            }
        },
    },
    listRoot: {
        width: '100%',
        //maxWidth: ,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));