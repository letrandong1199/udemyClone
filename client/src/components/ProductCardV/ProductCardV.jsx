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
import { Link, useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { ROUTES } from '../../config/config';
import Button from '@material-ui/core/Button';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
function ProductCardV(props) {
    const classes = useStyles();
    const history = useHistory();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLearn = (id) => () => {
        history.push(`${ROUTES.course}${ROUTES.learn}/${id}`)
    }

    return (
        <Card className={classes.root} elevation={3}>
            <Link to={`${ROUTES.courseDetail}/${props.course.Id}`}>
                <CardMedia
                    className={classes.media}
                    image={props.course.Thumbnail_Medium}
                    title={props.course.Title}
                >
                    {props.hidePrice && <Typography className={classes.price}>
                        {props.course.Promote_Rate !== 0 && <span style={{ textDecoration: 'line-through', color: 'darkred', marginRight: 5 }}>${props.course.Price}</span>}
                        {props.course.Promote_Rate !== 0
                            ? (props.course.promote * props.course.Price)?.toFixed(2)
                            : props.course.Price !== 0
                                ? props.course.Price
                                : 'Free'}
                    </Typography>}
                    {props.course.Tag && <Typography className={classes.tag}>
                        {props.course.Tag}
                    </Typography>}
                </CardMedia>
            </Link>
            <CardContent className={classes.content}>
                <Typography
                    variant="body2"
                    style={{ fontSize: 10, textTransform: 'uppercase' }}
                >
                    {props.course.Category.Name}
                </Typography>
                <Grid container className={classes.header}>
                    <Typography variant="subtitle1" className={classes.headerText}>{props.course.Title}</Typography>
                </Grid>
                <Typography variant="body2" color="textSecondary">{`by ${props.course.Author.Name}`}</Typography>
                <Grid container direction="row">
                    <Rating
                        name={`hover-feedback-${props.course.Id}`}
                        readOnly={true}
                        className={classes.rating}
                        value={props.course.Rating}
                        size="small"
                    />
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{props.course?.num_rating}</Typography>
                </Grid>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.course.Sub_Description}
                    </Typography>
                </Collapse>
                <Hidden smUp>
                    <CardActions disableSpacing className={classes.action}>
                        {props.isEnrolled
                            ? props.isWishlist
                                ? <IconButton aria-label="remove to favorites" onClick={props.handleRemove}>
                                    <HighlightOffRoundedIcon />
                                </IconButton>
                                : <Button onClick={props.handleLearn}>Learn</Button>
                            : <IconButton aria-label="add to favorites" onClick={props.handleAdd}>
                                <FavoriteBorderRoundedIcon />
                            </IconButton>
                        }
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

                    {props.isWishlist && props.isWishlist !== undefined
                        ? <IconButton aria-label="remove to favorites" onClick={props.handleRemove}>
                            <HighlightOffRoundedIcon />
                        </IconButton>
                        : props.isEnrolled && props.isEnrolled !== undefined
                            ? < Button onClick={handleLearn(props.course.Id)}>Learn</Button>
                            : <IconButton aria-label="add to favorites" onClick={props.handleAdd}>
                                <FavoriteBorderRoundedIcon />
                            </IconButton>
                    }
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