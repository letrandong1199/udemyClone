import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.snackbar + 1,
        color: '#fff',
    },
    dialogAppBar: {
        minWidth: 500,
        marginBottom: 60,
        position: 'static',
    },
    dialog: {
        minWidth: 500,
        minHeight: 500,
    },
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
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}))

export default useStyles;