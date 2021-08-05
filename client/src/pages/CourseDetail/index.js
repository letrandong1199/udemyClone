import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useState, useEffect, useRef, Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import Avatar from '@material-ui/core/Avatar';

import MyCarousel from '../../components/MyCarousel/MyCarousel.jsx';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';

import courseService from '../../services/course.service.js';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Collapse } from '@material-ui/core';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import enrolledCourseService from '../../services/enrolledCourse.service';
import wishlistService from '../../services/wishlist.service.js';
import Backdrop from '@material-ui/core/Backdrop';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ENROLLED, ADD_WISHLIST } from '../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';

import Banner from './Banner';
import Description from './Description';
import PageNavigation from './PageNavigation';
import InstructorSection from './InstructorSection';
import Content from './Content';
import RecommendSection from './RecommendSection';

const Feedback = ({ feedback, loading }) => {
    const classes = useStyles();
    return (
        <Grid container style={{ marginTop: 32 }} direction="row">
            <Grid item>
                {loading
                    ? <Skeleton><Avatar /></Skeleton>
                    : <Avatar
                        style={{ height: 50, width: 50 }}
                        size="large">
                        {feedback?.User_Name[0]}
                    </Avatar>
                }
            </Grid>
            <Grid item xs={8} container direction="column"
                style={{ marginLeft: 10 }} >
                {loading ? <Skeleton width='100px' height='20px' />
                    : <Rating
                        name="hover-feedback"
                        className={classes.rating}
                        value={feedback?.Rating}
                        precision={0.5}
                        size="small"
                        readOnly={true}
                        style={{ left: '-2px' }}
                    />
                }
                <Typography variant="body2">
                    {`by ${feedback?.User_Name}`}
                </Typography>
            </Grid>
            <div style={{ width: '100%', marginTop: 10 }}>
                <Typography variant="body2">
                    {feedback?.Content}
                </Typography>
            </div>
        </Grid>
    )
}

const ReviewSection = ({ course, loading }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid container item sm={4} xs={12} >
                <Grid item container direction="row">
                    <Typography
                        variant='h2'
                        style={{ fontSize: 54, fontWeight: 'bold' }}>
                        {loading
                            ? <Skeleton width='50px' />
                            : course?.Rating !== null ? course?.Rating?.toFixed(1) : '0.0'}
                    </Typography>
                    <Grid
                        item
                        container
                        alignItems='center'
                    >
                        {loading ? <Skeleton width="120px" height='30px' />
                            : <Rating
                                name="hover-feedback"
                                className={classes.rating}
                                value={course?.Rating?.toFixed(1)}
                                precision={0.5}
                                size="medium"
                                readOnly={true}
                                style={{ left: '-2px' }}
                            />
                        }
                        <Typography variant="subtitle2" style={{ lineHeight: 1 }}>
                            {loading ? <Skeleton /> : `(${Number(course?.Number_Of_Rating).toLocaleString()})`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <List>
                        {[5, 4, 3, 2, 1].map((item, index) => {
                            const res = course?.Feedbacks.filter(({
                                Rating
                            }) => Rating > item - 0.5 && Rating <= item + 0.5);

                            const per = (res?.length / course?.Number_Of_Rating * 100)?.toFixed(0);

                            return <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    style={{ minWidth: 50 }}
                                    variant='subtitle2'>{item} star{item !== 1 && 's'}
                                </Typography>
                                <div style={{
                                    height: 13,
                                    minWidth: 200,
                                    background: `linear-gradient(90deg,Orange ${per}%, #FFF ${per}%)`
                                }}
                                />
                            </div>
                        })}
                    </List>
                </Grid>
            </Grid >
            <Grid container item sm={8} style={{ marginTop: 16 }}>
                <Typography variant="h6" style={{ width: '100%' }}>Top feedbacks from enrollments</Typography>
                <List style={{ width: '100%' }}>
                    {!loading && course?.Feedbacks.map((feedback, index) => {
                        return <li><Feedback feedback={feedback} loading={loading} /></li>
                    })}
                    {!loading && course?.Feedbacks?.length === 0 &&
                        <Typography>This course has no feedbacks yet.</Typography>
                    }
                    {loading && <CircularProgress />}
                </List>
            </Grid>
        </Grid >
    )
}


function DetailCourse() {
    // Get id by url params
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        setTimeout(() => { console.log('test'); }, 5000);
        courseService.getById(id)
            .then(response => {
                console.log('Get', response.data.message.resultResponse);
                setCourse(response.data.message.resultResponse);
                setIsPending(false);
            }).catch(error => {
                setError(error);
                setIsPending(false);
            })
    }, [id])

    /*
        useEffect(() => {
            const scrollOptions = {
                left: 0,
                top: 190,
                behavior: 'auto',
            }
            window.scrollTo(scrollOptions);
        }, [])
    */

    const classes = useStyles();

    return (
        <div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Banner course={course} isPending={isPending} />
            }
            <PageNavigation course={course} isPending={isPending} />
            <div id="description-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Description course={course} isPending={isPending} />
            }

            <div id="instructor-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <InstructorSection course={course} isPending={isPending} />
            }
            <div id="recommend-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <RecommendSection course={course} isPending={isPending} />
            }
            < div id="content-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Content course={course} isPending={isPending} />
            }


            <Container className={`${classes.padding}`}>
                <Typography variant="h5" className={classes.title}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                    Review
                </Typography>
                <ReviewSection course={course} loading={isPending} />
            </Container>
            <Footer style={{ marginTop: 20 }} />
        </div >
    )
}
export default DetailCourse;