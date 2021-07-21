import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
        maxWidth: 345,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)'
    },
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
    list: {
        display: 'flex',
        //gridTemplateColumns: 'repeat(auto-fit, minmax(260px, max-content))',
        /* overflow-x: auto; */
        /* grid-gap: 50px; */
        justifyContent: 'space-between',
        /* padding: initial; */
        maxWidth: '100%',
        overflow: 'auto',
        scrollSnapType: 'x mandatory',
        MsOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',  /* Firefox */
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
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
}));