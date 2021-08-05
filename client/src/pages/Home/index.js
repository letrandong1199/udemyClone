/* eslint-disable no-undef */
//import Carousel from '../../components/Carousel/Carousel.jsx';
import HomeSection from '../../components/HomeSection/HomeSection.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded';
import { useStyles } from './styles';
import { lazy, Suspense, useState, Fragment, useEffect } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import courseService from '../../services/course.service.js';
import categoryService from '../../services/category.service';
const Carousel = lazy(() => import('../../components/Carousel/Carousel.jsx'))



const HomeIntroBanner = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}>
                <MenuBookRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Courses</Typography>
                <Typography className={classes.body}>Variant video courses</Typography>
            </Grid>
            <Grid item xs={4}>
                <PeopleOutlineRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Instructor</Typography>
                <Typography className={classes.body}>Most content from top instructor </Typography>
            </Grid>
            <Grid item xs={4}>
                <AllInclusiveRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Flexible</Typography>
                <Typography className={classes.body}>Learn on anything device</Typography>
            </Grid>
        </Grid>
    )
}

const WeeklyHotCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        courseService.getMostEnrollmentCourses().then(response => {
            setCourses(response.listAllResponse);
            setIsPending(false);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);
        })
    }, [])


    return (
        <Fragment>
            {isPending && <div><LinearProgress /></div>}
            {error && <div>{error}</div>}
            {courses && <Carousel courses={courses} />}
        </Fragment>
    )
}

const MostViewedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        courseService.getMostViewedCourses().then(response => {
            setCourses(response.listAllResponse);
            setIsPending(false);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);
        })
    }, [])


    return (
        <Fragment>
            {isPending && <div><LinearProgress /></div>}
            {error && <div>{error}</div>}
            {courses && <HomeSection title="Most viewed courses" courses={courses} color="vibrant" />}
        </Fragment>
    )
}

const MostRecentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        courseService.getMostRecentCourses().then(response => {
            setCourses(response.listAllResponse);
            setIsPending(false);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);
        })
    }, [])


    return (
        <Fragment>
            {isPending && <div><LinearProgress /></div>}
            {error && <div>{error}</div>}
            {courses && <HomeSection title="Most recent courses" courses={courses} />}
        </Fragment>
    )
}

const HotCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        categoryService.getMostEnrollmentCategories().then(response => {
            setCategories(response.listAllResponse);
            setIsPending(false);
        }).catch(error => {
            setError(error.message);
            setIsPending(false);
        })
    }, [])


    return (
        <Fragment>
            {isPending && <div><LinearProgress /></div>}
            {error && <div>{error}</div>}
            {categories && <HomeSection title="Hot categories" categories={categories} />}
        </Fragment>
    )
}


function Home() {
    // Get course

    return (
        <div>
            <Suspense fallback={<div><LinearProgress />.</div>}>
                <WeeklyHotCourses />
                <HomeIntroBanner />
                <MostViewedCourses />
                <MostRecentCourses />
                <HotCategories />
                <Footer />
            </Suspense>
        </div >
    )
}

export default Home;