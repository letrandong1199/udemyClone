import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    bigTitle: {
        position: 'relative',
        //marginBottom: '10px',
        //width: '100%',
        textAlign: 'center',
        backgroundColor: /*'rgb(55, 51, 51)',*/ 'rgb(235, 243, 255)',
        //color: '',
        color: 'rgb(60, 60, 59)',
        padding: '45px',
        //fontWeight: 'bold',
        //fontSize: '24px',
        //borderBottom: '3px solid rgb(60, 60, 59)',
        //lineHeight: '1.1em',
        // marginBottom: '10px',
        /*
        overflow: 'hidden',
        '&::before': {
            backgroundColor: 'rgb(60, 60, 59)',
            content: '""',
            display: 'inline-block',
            border: '1px solid rgb(60, 60, 59)',
            height: '1px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%',
            right: '0.5em',
            marginLeft: '-50%',
        },
        '&::after': {
            backgroundColor: 'rgb(60, 60, 59)',
            content: '""',
            display: 'inline-block',
            border: '1px solid rgb(60, 60, 59)',
            height: '1px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%',
            left: '0.5em',
            marginRight: '-50%',
        },*/
    },

    homeSection: {
        position: 'relative',
        backgroundColor: 'rgb(245, 245, 245)', //'rgb(240, 238, 230)',
        padding: '10px',
        //width: 'calc(100% + 12px)',
        justifyContent: 'space-between',
        //marginTop: '10px',
        //marginBottom: '10px'

    },
}));