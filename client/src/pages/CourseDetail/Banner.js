import {
    Fragment
} from 'react';
import {
    Grid,
    Container,
    Typography,
    Breadcrumbs,
    Card,
    Divider,
    Button,

} from '@material-ui/core';

import {
    Rating,
    Skeleton,
} from '@material-ui/lab';

import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { useStyles } from './styles';
import { usePalette } from 'react-palette'
import { Link } from 'react-router-dom';

import { ROUTES } from '../../config/config';

const Banner = ({ course, isPending, handleEnroll, handleAddWishlist }) => {
    const { data, loading, error: error2 } = usePalette(course?.Thumbnail_Small);
    const classes = useStyles({
        error: error2,
        data, thumbnail: course?.Thumbnail_Large,
        isPending,
        loading
    });


    const categories = (categories_tree) => categories_tree?.map((category, index) => {
        return <Link
            key={index}
            index={index}
            to={`${ROUTES.course}?category=${category.Id}`}
        >
            {category.Name}
        </Link>
    });



    return (
        <Container className={classes.outerBanner}>
            <Card className={classes.banner}>
                <Grid
                    container
                    style={{
                        marginTop: 20,
                        justifyContent: 'space-around'
                    }}
                    direction="column">
                    <Breadcrumbs
                        separator='>'
                        style={{ fontWeight: 'lighter' }}
                        aria-label="breadcrumb"
                    >
                        {course?.Categories_Tree &&
                            categories(course?.Categories_Tree)
                        }
                    </Breadcrumbs>
                    <Grid
                        item
                        container
                        alignItems='flex-start'
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                        }}>
                        <Grid item container xs={7} direction="column">
                            <Typography variant='h4' className={classes.bannerTitle}>
                                {isPending ? <Skeleton /> : course?.Title}
                            </Typography>
                            <Typography variant='subtitle1'>
                                {isPending ? <Skeleton /> : course?.Sub_Description}
                            </Typography>
                            {isPending
                                ? <Skeleton width='100px' />
                                : <Grid item container direction="row" alignItems="center">
                                    <Typography
                                        variant="subtitle1"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {course?.rating?.toFixed(1)}
                                    </Typography>
                                    <Rating
                                        name="rating-banner"
                                        readOnly
                                        className={classes.rating}
                                        value={course?.Rating || 0}
                                        precision={0.5}
                                        size="small"
                                        style={{ color: 'rgb(247, 187, 86)' }}
                                    />
                                    <Typography
                                        variant="body2">
                                        ({course?.Number_Of_Rating})
                                    </Typography>
                                </Grid>
                            }
                            {isPending
                                ? <Skeleton width='100px' />
                                : <Typography variant="body2">
                                    <span style={{ fontWeight: 'bold' }}>{course?.Number_Of_Enrolled || 0}</span>
                                    &nbsp;already enrolled
                                </Typography>}
                            {isPending
                                ? <Skeleton width='100px' />
                                : <Typography variant="body2">
                                    <span style={{ fontWeight: 'bold' }}>Instructor(s): </span>
                                    &nbsp;{course?.Author?.Name}
                                </Typography>}
                            {isPending
                                ? <Skeleton width='100px' />
                                : <Typography variant="body2">
                                    <span style={{ fontWeight: 'bold' }}>Languages: </span>
                                    &nbsp;{course?.Language_Name}
                                </Typography>}
                        </Grid>

                        <Grid item xs={3}>
                            {isPending
                                ? <Skeleton variant="rect" width={200} height={50} />
                                :
                                <Fragment>
                                    <Typography variant="subtitle1">Offered By</Typography>
                                    <img
                                        alt="offered"
                                        style={{ width: '100%', filter: 'contrast(200%)' }}
                                        src='/assets/logo-fit.png'
                                    />
                                </Fragment>
                            }
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item style={{ marginTop: 20 }}>
                        {isPending
                            ? <Skeleton><Button /></Skeleton>
                            : <Fragment>
                                <Button
                                    color="primary"
                                    size="large"
                                    variant="outlined"
                                    style={{ marginRight: 20, textTransform: 'none' }}
                                    startIcon={<AddCircleOutlineRoundedIcon />}
                                    onClick={handleEnroll}
                                >
                                    Enroll for {course?.price ? course?.price + '$' : 'free'}
                                </Button>
                                <Button
                                    color="primary"
                                    size="large"
                                    variant="outlined"
                                    startIcon={<FavoriteBorderRoundedIcon />}
                                    style={{ marginRight: 20, textTransform: 'none' }}
                                    onClick={handleAddWishlist}
                                >
                                    Wishlist
                                </Button>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </Card >
        </Container>


    )
};

export default Banner;