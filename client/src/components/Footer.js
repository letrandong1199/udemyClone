import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

function Footer() {
    return (
        <Grid container style={{ backgroundColor: 'rgb(55, 51, 51)', color: 'white', padding: '25px' }}>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">Greetings</Typography>
                    <p style={{ fontStyle: 'italic', fontSize: '15px' }}>Welcome to my website hehe</p>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">About</Typography>
                    <p style={{ fontStyle: 'italic', fontSize: '15px' }}>This is a part of my final project in university</p>
                </Grid>
            </Grid>
            <Grid item xs>
                <Grid item xs={6}>
                    <Typography variant="h6" color="inherit">Contact</Typography>
                    <Button color="inherit" style={{ fontStyle: 'italic', fontSize: '12px' }}><CallIcon /><span style={{ textTransform: 'none', marginLeft: '5px' }}>+84 3277681</span></Button>
                    <Button color="inherit" style={{ fontStyle: 'italic', fontSize: '12px' }}><EmailIcon /><span style={{ textTransform: 'none', marginLeft: '5px' }}>zzf7ktx@gmail.com</span></Button>
                </Grid>
            </Grid>
        </Grid>
    )
};
export default Footer;