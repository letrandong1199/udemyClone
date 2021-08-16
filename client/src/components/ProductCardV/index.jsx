import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect } from 'react'
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
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { useSelector } from 'react-redux';

function ProductCardV({ course,
    loading,
    linkTo,
    hidePrice,
    isEnrolled,
    isWishlist,
    handleAdd,
    handleRemove }) {
    const classes = useStyles();
    const history = useHistory();

    const [expanded, setExpanded] = React.useState(false);

    isWishlist = useSelector((state) => state.wishlist.map(e => { return e?.Id; }).indexOf(course?.Id) !== -1) || isWishlist;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLearn = (id) => () => {
        history.push(`${ROUTES.course}${ROUTES.learn}/${id}`)
    }

    return (
        <Card className={classes.root} elevation={3}>
            <Link to={`${ROUTES.courseDetail}/${course.Id}`}>
                <CardMedia
                    className={classes.media}
                    image={course.Thumbnail_Medium}
                    title={course.Title}
                >
                    {!hidePrice
                        && <Typography className={classes.price}>
                            {course.Promote_Rate !== 0
                                && <span style={{
                                    fontSize: 14,
                                    textDecoration: 'line-through',
                                    color: 'darkred',
                                    marginRight: 5
                                }}>${course.Price}</span>}
                            {course.Promote_Rate !== 0
                                ? '$' + (parseFloat(course.Promote_Rate) * parseFloat(course.Price)).toFixed(2)
                                : course.Price !== 0
                                    ? '$' + course.Price
                                    : 'Free'}
                        </Typography>}
                    {course.Tag && <Typography className={classes.tag}>
                        {course.Tag}
                    </Typography>}
                </CardMedia>
            </Link>
            <CardContent className={classes.content}>
                <Typography
                    variant="body2"
                    style={{ fontSize: 10, textTransform: 'uppercase' }}
                >
                    {course.Category.Name}
                </Typography>
                <Grid container className={classes.header}>
                    <Typography variant="subtitle1" className={classes.headerText}>{course.Title}</Typography>
                </Grid>
                <Typography variant="body2" color="textSecondary">{`by ${course.Author.Name}`}</Typography>
                <Grid container direction="row">
                    <Rating
                        name={`hover-feedback-${course.Id}`}
                        readOnly={true}
                        className={classes.rating}
                        value={course.Rating}
                        size="small"
                    />
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{course?.num_rating}</Typography>
                </Grid>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {course.Sub_Description}
                    </Typography>
                </Collapse>
                <Hidden smUp>
                    <CardActions disableSpacing className={classes.action}>
                        {isEnrolled
                            ? isWishlist
                                ? <IconButton aria-label="remove to favorites" onClick={handleRemove}>
                                    <FavoriteRoundedIcon />
                                </IconButton>
                                : <Button onClick={handleLearn}>Learn</Button>
                            : <IconButton aria-label="add to favorites" onClick={handleAdd}>
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

                    {isEnrolled && isEnrolled !== undefined
                        ? < Button onClick={handleLearn(course.Id)}>Learn</Button>
                        : isWishlist && isWishlist !== undefined
                            ? <IconButton aria-label="remove to favorites" onClick={handleRemove}>
                                <FavoriteRoundedIcon />
                            </IconButton>
                            : <IconButton aria-label="add to favorites" onClick={handleAdd}>
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