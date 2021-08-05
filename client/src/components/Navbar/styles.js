import { fade, makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    '@global': {
        ':root': {
            '--text-color': theme.palette.text.primary,
            '--background-color': theme.palette.background.default,
        },
    },
    root: {
        background: 'var(--background-color)',
        minHeight: '64px',
    },
    appBar: {
        flexGrow: 1,
        backgroundColor: 'var(--background-color)',
        position: 'fixed',
    },
    categoriesButton: {
        textTransform: 'none',
        position: 'relative',
        fontWeight: 400,
        fontSize: 15,
        color: 'var(--text-color)',
    },
    registerButton: {
        textTransform: 'none',
    },
    searchBar: {
        position: 'relative',

        borderRadius: 20,
        border: '1px solid',
        borderColor: 'rgb(141, 141, 141)',
        backgroundColor: fade('rgb(193, 193, 193)', 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        maxWidth: 350,
        //marginRight: 'auto',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            //marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            // marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: 'var(--text-color)',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        borderRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: '100%',
        right: 0,
        top: 0,
        position: 'absolute',
        //pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-color)',
        //backgroundColor: theme.palette.primary.main,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1.2, 1, 1.2, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        //width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
        },
    },
    logoButton: {
        maxWidth: '100px',
        height: '30px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '10px',
            marginBottom: '10px',
        },
        [theme.breakpoints.down('xs')]: {
            margin: 'auto',
            paddingLeft: '16px',
            paddingRight: '16px',
        }
    },
    logo: {
        width: '100%',
        height: '100%',
        padding: '0',
        margin: '0'
    },
    profileButton: {
        color: 'var(--text-color)',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
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
    textExpandOpen: {
        color: theme.palette.primary.main,
    }
}));