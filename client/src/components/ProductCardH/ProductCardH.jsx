import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

function ProductCardV(props) {
    const classes = useStyles();

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
            <CardContent className={classes.content}>
                <Grid container className={classes.limit}>
                    <Typography variant="subtitle1" className={classes.headerText}>
                        {props.course.title}
                    </Typography>
                </Grid>
                <Grid container className={classes.limit}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.course.description}
                    </Typography>
                </Grid>
                <Typography variant="body2">{props.course.author}</Typography>
                <Grid container direction="row" alignItems="center">
                    <Typography variant="subtitle1">{props.course.rating.toFixed(1)}</Typography>
                    <Rating
                        name={`hover-feedback-${props.name}-${props.id}`}
                        readOnly={true}
                        className={classes.rating}
                        value={props.course.rating}
                        size="small"
                    />
                    <Typography variant="body2">({props.course.num_rating})</Typography>
                </Grid>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.course.description}
                    </Typography>
                </Collapse>
            </CardContent >
            <Hidden xsDown>
                <CardActions disableSpacing style={{ marginLeft: 'auto', flexDirection: 'column' }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteBorderRoundedIcon />
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
            </Hidden>

        </Card >
    )
};

export default ProductCardV;