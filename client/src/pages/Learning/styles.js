import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
        minHeight: 300,
    },
    wrapperEditor: {
        //backgroundColor: theme.palette.background.default,
        margin: 10,
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    marginContainer: {
        margin: 40,
        width: 'auto',
    },
    tabsRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        '& > *': {
            textAlign: 'left',
            '& span': {
                alignItems: 'flex-start',
            }
        }
    },
}));