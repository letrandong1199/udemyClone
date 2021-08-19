import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.snackbar + 1,
        color: '#fff',
    },
    bigTitle: {
        padding: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.vibrant,
    },
    section: {
        margin: 10,
        width: 'auto',
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    thumbnail: {
        padding: 10,
        border: `8px double`,
        borderColor: theme.palette.background.acrylic,
        minWidth: 480,
        borderRadius: theme.shape.borderRadius,
        minHeight: 300,
        backgroundSize: 'contain !important',
        position: 'relative',

        '& > *': {
            width: 'calc(100% - 20px)',
            height: 'calc(100% - 20px)',
            background: 'rgb(71,71,71, 0.5)',
            position: 'absolute',
        }
    },
    title: {
        padding: 16,
        fontWeight: 'bold',
    },
    caption: {
        marginLeft: 20,
    },
    toolbarEditor: {
        backgroundColor: `${theme.palette.background.default} !important`,
        border: "1px solid #C0C0C0 !important",
        borderRadius: `${theme.shape.borderRadius}px !important`,
        '& > *': {
            backgroundColor: `${theme.palette.background.default} !important`,
            color: `${theme.palette.text.primary} !important`,
        }
    },
    editorEditor: {
        border: "1px solid #C0C0C0",
        borderRadius: theme.shape.borderRadius,
        minHeight: 200,
    },
    wrapperEditor: {
        //backgroundColor: theme.palette.background.default,
        margin: 10,
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    marginContainer: {
        margin: 20,
        width: 'auto',
        '& button': {
            marginLeft: 14
        }
    },
    tabsRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        minWidth: 190,
        borderRight: `1px solid ${theme.palette.divider}`,
        '& > *': {
            textAlign: 'left',
            '& span': {
                alignItems: 'flex-start',
            }
        }
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    sectionCard: {
        minHeight: 50,
        minWidth: 700,
        margin: 20,
        background: theme.palette.background.acrylic,
        position: 'relative'
    }
}));