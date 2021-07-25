import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        '& button': {
            //color: '#FFF',
            borderTopLeftRadius: '60%',
            borderBottomLeftRadius: '60%',
            padding: 12,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: 'rgb(146, 227, 169)',
            position: 'absolute',
            bottom: '5%',
            left: '45%',
        }
    }
}))
