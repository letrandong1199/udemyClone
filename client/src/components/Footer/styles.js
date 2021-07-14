import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(235, 243, 255)', /*'rgb(55, 51, 51)',*/
        color: 'rgb(60, 60, 59)',
        padding: '25px',
    },
    button: {
        fontStyle: 'italic',
        fontSize: '12px',
    },
    body: {
        fontStyle: 'italic',
        fontSize: '15px',
    },
}))