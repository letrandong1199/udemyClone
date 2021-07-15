/* eslint-disable no-undef */
import Navbar from '../../components/Navbar/Navbar.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
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
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const courses1 = courses();
const courses2 = courses();
const courses3 = courses();

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
const categories = [
    {
        title: 'Web development',
        thumb: 'assets/web-development.jpg'
    },
    {
        title: 'Mobile development',
        thumb: 'assets/mobile-development.jpg'
    },
];

function Home(props) {
    return (
        <div>
            <Navbar handleToggleDark={props.handleToggle} />
            <Carousel courses={courses3} />
            <HomeIntroBanner />
            <HomeSection title="Most viewed courses" courses={courses1} color="vibrant" />
            <HomeSection title="Most recent courses" courses={courses2} />
            <HomeSection categories={categories} title="Top categories" color="vibrant" />
            <Footer />
        </div >
    )
}

export default Home;