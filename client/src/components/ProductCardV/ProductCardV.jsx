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
import Divider from '@material-ui/core/Divider';
import Fragment from 'react';

function ProductCardV(props) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} elevation={3}>
            <Link to={`/detail/${props.course.id}`}>
                <CardMedia
                    className={classes.media}
                    image={props.course.thumb}
                    title={props.course.title}
                >
                    {<Typography className={classes.price}>
                        {props.course.promote && <span style={{ textDecoration: 'line-through', color: 'darkred', marginRight: 5 }}>${props.course.price}</span>}
                        ${props.course.promote ? props.course.promote : props.course.price}
                    </Typography>}
                    {props.course.tag && <Typography className={classes.tag}>
                        {props.course.tag}
                    </Typography>}
                </CardMedia>
            </Link>
            <CardContent className={classes.content}>
                <Link to={`/detail/${props.course.id}`}>
                    <Typography variant="body2" style={{ fontSize: 10, textTransform: 'uppercase' }}>{props.course.categories_tree[props.course.categories_tree.length - 1]}</Typography>
                </Link>
                <Grid container className={classes.header}>
                    <Typography variant="subtitle1" className={classes.headerText}>{props.course.title}</Typography>
                </Grid>
                <Typography variant="body2" color="textSecondary">{`by ${props.course.author}`}</Typography>
                <Grid container direction="row">
                    <Rating
                        name={`hover-feedback-${props.name}-${props.id}`}
                        readOnly={true}
                        className={classes.rating}
                        value={props.course.rating}
                        size="small"
                    />
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{props.course.num_rating}</Typography>
                </Grid>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.course.description}
                    </Typography>
                </Collapse>
                <Hidden smUp>
                    <CardActions disableSpacing className={classes.action}>
                        <IconButton size="small" aria-label="add to favorites">
                            <FavoriteBorderRoundedIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            size="small"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Hidden>

            </CardContent >
            <Hidden xsDown>

                <Divider />
                <CardActions disableSpacing className={classes.action}>
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