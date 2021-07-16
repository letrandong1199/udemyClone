/* eslint-disable no-undef */
import Navbar from '../../components/Navbar/Navbar.jsx';
//import Carousel from '../../components/Carousel/Carousel.jsx';
import HomeSection from '../../components/HomeSection/HomeSection.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import React from 'react';
import { courses } from '../../utils/dataSample';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded';
import { useStyles } from './styles';
import useFetch from '../../utils/useFetch';
import { lazy, Suspense } from 'react';
const Carousel = lazy(() => import('../../components/Carousel/Carousel.jsx'))

const courses1 = courses();
const courses2 = courses();


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


function Home(props) {
    const { data: courses_, isPending: isPending1, error: error1 } = useFetch('http://localhost:8000/courses');
    const { data: categories, isPending, error } = useFetch('http://localhost:8000/categories');

    return (
        <div>
            <Navbar handleToggleDark={props.handleToggle} />
            <Suspense fallback={<div>Loading...</div>}>
                {isPending1 && <div>Loading...</div>}
                {error1 && <div>{error1}</div>}
                {courses_ && <Carousel courses={courses_} />}
                <HomeIntroBanner />
                <HomeSection title="Most viewed courses" courses={courses1} color="vibrant" />
                <HomeSection title="Most recent courses" courses={courses2} />
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {categories && <HomeSection categories={categories} title="Top categories" color="vibrant" />}
                <Footer />
            </Suspense>
        </div >
    )
}

export default Home;