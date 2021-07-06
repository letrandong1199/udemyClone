import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
        maxWidth: 275,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        margin: '10px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
    },
    price: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        fontWeight: 'bold'
    },
    rating: {
        margin: '12px',
    }
}));


function ProductCardV(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    return (
        <Card className={classes.root}>
            <CardHeader
                title={props.course.title}
                subheader={props.course.author}
            />
            <CardMedia
                className={classes.media}
                image={props.course.thumb}
                title={props.course.title}
                children={<Typography className={classes.price}>{props.course.price}$</Typography>}
            />
            <Rating
                name="hover-feedback"
                className={classes.rating}
                value={props.course.rating}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.course.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>

        </Card >
    )
}
export default ProductCardV