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

function ProductCardH({ course, loading, linkTo, hidePrice }) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            className={classes.root}
            elevation={3}

        >
            <CardMedia
                className={classes.media}
                image={course?.Thumbnail_Small || '/assets/image.svg'}
                title={course?.Title}
                component={Link}
                to={linkTo}
                children={!hidePrice && <Typography className={classes.price}>
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
                </Typography>
                }
            />
            <CardContent
                className={classes.content}
                component={Link}
                to={linkTo}>
                <Grid container className={classes.limit}>
                    <Typography variant="subtitle1" className={classes.headerText}>
                        {course?.Title}
                    </Typography>
                </Grid>
                <Grid container className={classes.limit}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {course?.Category?.Name}
                    </Typography>
                </Grid>
                <Typography variant="body2">{course?.Author?.Name}</Typography>
                <Grid container direction="row" alignItems="center">
                    <Typography variant="subtitle1">{course?.Rating?.toFixed(1)}</Typography>
                    <Rating
                        name={`hover-feedback-${course?.Id}`}
                        readOnly={true}
                        className={classes.rating}
                        value={course?.Rating}
                        size="small"
                    />
                    {<Typography variant="body2">({course?.Number_Of_Rating})</Typography>}
                </Grid>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {course?.Sub_Description}
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

export default ProductCardH;