import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    Tab: {
        '& .MuiTabs-indicator': {
            color: '#000',
            backgroundColor: '#000',
            width: '100%',
            margin: 10,
            //position: 'relative'
        }
    },
    bigTitle: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        textAlign: 'center',
    },

    section: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        textAlign: 'center',
        padding: 20,
    },

    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
    highlightSection: {
        backgroundColor: theme.palette.background.vibrant,
        paddingTop: 20,
        paddingBottom: 20,
    },
    filterContainer: {
        justifyContent: 'center',
        //margin: 20,
        width: 'auto',
        '& > *': {
            margin: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            '& button': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    },
    chipsContainer: {
        minHeight: 40,
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    selectStyles: {
        '&.react-select-container': {
            '&.react-select__menu': {
                backgroundColor: '#000',
                '&.react-select__menu-list': {
                    backgroundColor: '#000',
                }
            }
        },
        '&.react-select__menu': {
            backgroundColor: '#000',
        }
    }
}));