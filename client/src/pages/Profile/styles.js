import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexGrow: 1,
        //marginTop: 64,
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
            //color: theme.palette.text.primary,
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
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        zIndex: theme.zIndex.appBar - 1,
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}))

export default useStyles;