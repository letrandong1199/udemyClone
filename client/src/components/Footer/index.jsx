import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { useStyles } from './styles';

function Footer() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">Greetings</Typography>
                    <Typography className={classes.body}>Welcome to my website hehe</Typography>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">About</Typography>
                    <Typography className={classes.body}>This is a part of my final project in university</Typography>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">Contact</Typography>
                    <Button color="inherit" className={classes.button}><CallIcon /><span style={{ textTransform: 'none', marginLeft: '5px' }}>+84 3277681</span></Button>
                    <Button color="inherit" className={classes.button}><EmailIcon /><span style={{ textTransform: 'none', marginLeft: '5px' }}>zzf7ktx@gmail.com</span></Button>
                </Grid>
            </Grid>
        </Grid>
    )
};
export default Footer;