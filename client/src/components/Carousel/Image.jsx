import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';


const Image = ({ item }) => {
    const classes = useStyles();
    return (<Grid item xs={12} sm={7} className={classes.cardImage} style={{ background: `url('${item.thumb}') no-repeat center center`, backgroundSize: 'cover' }}>
        <Card>

        </Card>
    </Grid>)
};

export default Image;