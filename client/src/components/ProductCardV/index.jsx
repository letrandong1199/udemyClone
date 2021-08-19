import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Grid,
    Hidden,
    Divider,
    Button,
    CircularProgress,
    Box
} from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';

import { Rating } from '@material-ui/lab';

import React from 'react'
import clsx from 'clsx';
import { useStyles } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../config/config';
import { useSelector } from 'react-redux';

const divide2number = (num1, num2) => {
    if (num2 === 0 || num1 === 0) {
        return 0;
    }
    return num1 / num2 * 100;
};

const Progression = ({ value, style }) => {
    const classes = useStyles({ value });

    return (
        <dic style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 0
        }}>
            <div className={classes.rootCircular}>
                <CircularProgress
                    variant="static"
                    className={classes.bottomCircular}
                    size={100}
                    thickness={10}
                    value={100}

                />
                <CircularProgress
                    variant="static"
                    disableShrink
                    className={classes.topCircular}
                    classes={{
                        circle: classes.circleCircular,
                    }}
                    value={value}
                    size={100}
                    thickness={10}
                />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position='absolute'
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.boxCircular}
                >{value === 100
                    ? <DoneOutlineRoundedIcon color='actions' />
                    : <Typography
                        color='inherit'
                        variant='h6'
                        component='div'
                        style={{ fontWeight: 'bold' }}
                    >
                        {`${Math.round(
                            value,
                        )}`}
                    </Typography>
                    }
                </Box >
            </div>
        </dic >
    )
}

const ProductCardV = ({
    course,
    loading,
    linkTo,
    showProgress,
    hidePrice,
    isEnrolled,
    isWishlist,
    handleAdd,
    handleRemove }) => {
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
                    {showProgress && <Progression className={classes.price}
                        value={divide2number(course?.Num_Completed, course?.Num_All_Media)}
                    />
                    }
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
                            <ExpandMoreRoundedIcon />
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
                        <ExpandMoreRoundedIcon />
                    </IconButton>

                </CardActions>
            </Hidden>

        </Card >
    )
};



export default ProductCardV;