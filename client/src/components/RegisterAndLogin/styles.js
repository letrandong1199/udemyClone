
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh',
        display: 'flex',
        textAlign: 'center',
        //flexDirection: 'column',
        //position: 'absolute',
        //top: '50%',
        //left: '50%',
        //transform: 'translate(-50 %, -50 %)'
    },
    loginSection: {
        //margin: '50px',
        //maxWidth: '1000px',
        //top: '500px',
        //left: '500px',
        //marginLeft: '200px',
        //marginRight: '200px',
        // padding: 20,
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 700,
        minHeight: 500,
    },
    input: {
        //position: 'relative',
        //width: '555px',
        height: '60px',
        fontSize: '40px',
        borderRadius: '20px !important',
        //margin: '20px',
        //marginLeft: theme.spacing(2),
        //marginRight: theme.spacing(2),
        //width: '25ch',
    },
    button: {

        //width: '100%',
        height: '50px',
        margin: 10,
    },
    Tab: {
        '& .MuiTabs-indicator': {
            color: '#000',
            backgroundColor: '#000',
            width: '100%',
            margin: 10,
            //position: 'relative'
        }
    }
}));