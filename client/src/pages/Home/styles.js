import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
        padding: '35px',
        justifyContent: 'space-between',
        textAlign: 'center',
        //paddingLeft: '90px',
    },
    button: {
        fontStyle: 'italic',
        fontSize: '12px',
    },
    body: {
        fontStyle: 'italic',
        fontSize: '15px',
    },
}));