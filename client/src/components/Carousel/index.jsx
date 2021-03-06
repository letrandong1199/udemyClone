import Slider from 'react-animated-slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/config';


//{/*style={{ background: `url('${item.image}') no-repeat center center` }}*/}
function Carousel(props) {
    const content = props.courses;
    const classes = useStyles();
    const buttonText = () => (Math.random() * 10).toFixed(0) % 2 === 0 ? 'Explore' : 'Join now';
    return (
        <Slider classNames={classes} autoplay={20000}>
            {content.map((item, index) => (
                <div
                    key={index}
                    className={classes.slide}

                >
                    <Grid container style={{ height: '100%' }}>

                        <Grid item xs={12} sm={5} className={classes.card}>

                            <Grid container direction="column" className={classes.inner}>
                                <Grid item className={classes.limitLine}>
                                    <Typography style={{ textAlign: 'left' }} variant="h4">{item.Title}</Typography>
                                </Grid>

                                <Typography style={{ textAlign: 'left' }} variant="body1">{item.Sub_Description}</Typography>
                                <Link to={`${ROUTES.courseDetail}/${item.Id}`} style={{ textDecoration: 'none' }}><Button variant="outlined" color="primary">{buttonText()}</Button></Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={7} className={classes.cardImage} style={{ background: `url('${item.Thumbnail_Large}') no-repeat center center`, backgroundSize: 'cover' }}>
                            <Card>

                            </Card>
                        </Grid>
                    </Grid>
                </div>
            ))
            }
        </Slider >
    )
}

export default Carousel;
