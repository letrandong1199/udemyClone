import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';

function ProductCardV(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(3);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} elevation={3}>
            <CardMedia
                className={classes.media}
                image={props.course.thumb}
                title={props.course.title}
                children={<Typography className={classes.price}>{props.course.price}$</Typography>}
            />
            <CardContent>
                <Grid container className={classes.header}>
                    <Typography variant="subtitle1" className={classes.headerText}>{props.course.title}</Typography>
                </Grid>
                <Typography variant="body2">{props.course.author}</Typography>
                <Grid container direction="row" alignItems="center">
                    <Typography variant="subtitle1">{value.toFixed(1)}</Typography>
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
                        size="small"
                    />
                    <Typography variant="body2">({props.course.num_rating})</Typography>
                </Grid>
            </CardContent >


            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.course.description}
                    </Typography>
                </CardContent>
            </Collapse>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        </Card >
    )
};

export default ProductCardV;