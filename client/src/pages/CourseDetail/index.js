import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { usePalette } from 'react-palette'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { empty_course } from '../../utils/dataSample';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch.js';
import config from '../../config/config';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { Link as Links } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import Avatar from '@material-ui/core/Avatar';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import MyCarousel from '../../components/MyCarousel/MyCarousel.jsx';
import { courses } from '../../utils/dataSample';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';

const list_courses = courses();

const temp = <div>
    <p>
        <span style={{ fontSize: 18 }}>Quill Rich Text Editor</span>
    </p>
    <p>
        <br />
    </p>
    <p>Quill is a free, &nbsp;
        <a rel="noreferrer" key='1' href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
        <a rel="noreferrer" key='2' href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
        <a rel="noreferrer" key='3' href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
    <p>
        <br />
    </p>
    <ul>
        <li key='1'>Fast and lightweight</li>
        <li key='2'>Semantic markup</li>
        <li key='3'>Standardized HTML between browsers</li>
        <li key='4'>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
    </ul>
    <p>
        <br />
    </p>
    <p>
        <span style={{ fontSize: 18 }}>Downloads</span>
    </p>
    <p>
        <br />
    </p>
    <ul>
        <li key='5'>
            <a rel="noreferrer" href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li>
        <li key='6'>
            <a rel="noreferrer" href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li>
    </ul>
</div>

const Banner = ({ course }) => {
    const { data, loading, error } = usePalette(course.thumb);
    const classes = useStyles({ data });

    const handleClick = (link) => (event) => {
        event.preventDefault();
        console.log(link);
    }



    const categories = (course) => course.categories_tree.map((category, index) => {
        return <Link key={index} index={index} onClick={handleClick(category)}>{category}</Link>
    });
    return (
        <Card className={classes.banner}>
            <Grid container style={{ marginTop: 20, justifyContent: 'space-around' }} direction="column">
                <Breadcrumbs separator='>' style={{ fontWeight: 'lighter' }} aria-label="breadcrumb">
                    {categories(course)}
                </Breadcrumbs>
                <Grid item container style={{ marginTop: 20, marginBottom: 20, alignItems: 'flex-start' }}>
                    <Grid item container xs={7} direction="column">
                        <Typography variant="h4" className={classes.bannerTitle}>
                            {course.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {course.description}
                        </Typography>
                        <Grid item container direction="row" alignItems="center">
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{course.rating.toFixed(1)}</Typography>
                            <Rating
                                name="hover-feedback"
                                className={classes.rating}
                                value={course.rating}
                                precision={0.5}

                                size="small"
                                style={{ color: 'rgb(247, 187, 86)' }}
                            />
                        </Grid>
                        <Typography variant="body2">
                            <span style={{ fontWeight: 'bold' }}>{course.num_enrolled}</span>
                            &nbsp;already enrolled
                        </Typography>
                        <Typography variant="body2">
                            <span style={{ fontWeight: 'bold' }}>Instructor(s): </span>
                            &nbsp;{course.author}
                        </Typography>
                        <Typography variant="body2">
                            <span style={{ fontWeight: 'bold' }}>Languages: </span>
                            &nbsp;{course.language.join(', ')}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Offered By</Typography>
                        <img alt="offered" style={{ width: '100%', filter: 'contrast(200%)' }} src='/assets/logo-fit.png' />
                    </Grid>
                </Grid>
                <Divider />
                <Grid item style={{ marginTop: 20 }}>
                    <Button color="primary" size="large" variant="outlined" style={{ marginRight: 20, textTransform: 'none' }} >Enroll for {course.price ? course.price + '$' : 'free'}</Button>
                    <Button color="primary" size="large" variant="outlined" startIcon={<FavoriteBorderRoundedIcon />} style={{ marginRight: 20, textTransform: 'none' }} >{'Wishlist'}</Button>
                </Grid>
            </Grid>



        </Card >
    )
}

const Description = ({ course }) => {
    const classes = useStyles();
    return (
        <Container className={classes.padding}>
            <Grid container style={{ justifyContent: 'space-between' }}>
                {/*<Grid item xs={8}>*/}
                <Typography variant="h5" className={classes.title}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>About this course</span>*/}
                    About this Course
                </Typography>
                <Typography component="div">{temp}</Typography>
                {/*</Grid>
                <Grid item xs={4}>
                    <Card className={classes.card} elevation={0}>
                        <CardMedia>
                            <img className={classes.cardThumbnail} alt='thumb' src={course.thumb}></img>
                        </CardMedia>
                        <CardContent>
                            <Grid container direction="column" style={{ overflow: 'auto', position: 'sticky' }}>
                                <Typography variant="subtitle2">
                                    What's include:
                                </Typography>
                                {[1, 2, 3, 4].map((name, index) => <Typography key={index} style={{ marginTop: 10 }}
                                    variant="body2">Feature {name}</Typography>)
                                }
                            </Grid>
                        </CardContent>

                    </Card>
                            </Grid>*/}
            </Grid>
        </Container>
    )
}

function DetailCourse() {
    const { id } = useParams();
    const [course, setCourse] = React.useState(empty_course);
    const { data: courses, isPending, error: errorFetch } = useFetch(`${config.HOST}:${config.PORT}/${config.COURSE_CONTROLLER}/${id}`);

    React.useEffect(() => {
        if (courses) {
            console.log(courses);
            setCourse(courses);
        }

    }, [courses])

    const bannerAnchor = React.useRef();

    React.useEffect(() => {
        const scrollOptions = {
            left: 0,
            top: 190,
            behavior: 'auto',
        }
        window.scrollTo(scrollOptions);
    }, [])

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles({ thumbnail: course.thumb });
    const trigger = useScrollTrigger({ threshold: 640 });
    return (
        <div>
            <Container className={classes.outerBanner}>
                <Banner ref={bannerAnchor} course={course} />
            </Container>
            <AppBar className={trigger ? `${classes.titleBar} ${classes.show}` : `${classes.titleBar} ${classes.hide}`}>
                <Toolbar>
                    <Grid container alignItems="center" style={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6">{course.title}</Typography>
                        <Grid item alignItems="center">
                            <Button color="primary" size="large" variant="outlined" style={{ marginRight: 20, textTransform: 'none' }} >Enroll for {course.price ? course.price + '$' : 'free'}</Button>
                            <Button color="primary" size="large" variant="outlined" startIcon={<FavoriteBorderRoundedIcon />} style={{ marginRight: 20, textTransform: 'none' }} >{'Wishlist'}</Button>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <ButtonGroup disableFocusRipple disableRipple elevation={1} variant="contained" aria-label="large button group" className={classes.buttonGroup}>
                <Button disableElevation href="#description-section">About</Button>
                <Button disableElevation><a alt="instructor" href="#instructor-section" >Instructor</a></Button>
                <Button disableElevation><a alt="content" href="#content-section" >Content</a></Button>
                <Button disableElevation>Review</Button>
                <Button disableElevation>FAQ</Button>
            </ButtonGroup>
            <div id="description-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            <Description course={course} />
            <div id="instructor-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            <Container className={`${classes.vibrant} ${classes.padding}`}>
                <Typography variant="h5" className={classes.title}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                    Instructor
                </Typography>
                <Divider />
                <Grid item container direction="row" alignItems="center">
                    <Typography variant="subtitle2">Rating: </Typography>
                    <Rating
                        name="hover-feedback"
                        className={classes.rating}
                        value={course.rating}
                        precision={0.5}

                        size="small"
                        style={{ color: 'rgb(247, 187, 86)' }}
                    />
                    <Typography variant="subtitle2">100</Typography>
                </Grid>



                <Grid container style={{ marginTop: 32 }} direction="row">
                    <Grid item>
                        <Avatar style={{ height: 128, width: 128 }} src="/assets/1.jpg" size="large">HL</Avatar>
                    </Grid>

                    <Grid item xs={4} container direction="column" style={{ marginLeft: 32 }} >
                        <Typography variant="h6">{course.author}</Typography>
                        <Typography variant="subtitle2">Ths.author</Typography>
                        <Grid container alignItems="center">
                            <PeopleAltRoundedIcon />
                            <Typography variant="body2">
                                &nbsp;&nbsp;4500 learners
                            </Typography>
                        </Grid>
                        <Grid container alignItems="center">
                            <MenuBookRoundedIcon />
                            <Typography variant="body2">
                                &nbsp;&nbsp;45 courses
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
            <div id="recommend-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            <Container style={{ padding: 20 }}>
                <Typography variant="h5" className={classes.title} style={{ textAlign: 'center' }}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                    People interested in this course also viewed
                </Typography>
                <MyCarousel courses={list_courses} />
            </Container>
            <div id="content-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>

            <Container className={`${classes.vibrant} ${classes.padding}`}>
                <Typography variant="h5" className={classes.title} style={{ textAlign: 'center' }}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                    Course content
                </Typography>
                <Grid container>
                    <Card className={classes.cardContent}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >

                                <Typography className={classes.heading}>Chapter
                                    <br /><span>1</span>
                                </Typography>
                                <Grid container direction="column">
                                    <Grid container alignItems="center">
                                        <AccessTimeIcon color="secondary" />
                                        <Typography variant="subtitle1">&nbsp;&nbsp;2 hours duration</Typography>
                                    </Grid>
                                    <Typography variant="h4">Introduction</Typography>
                                    <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                                </Grid>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >

                                <Typography className={classes.heading}>Chapter
                                    <br /><span>2</span>
                                </Typography>
                                <Grid container direction="column">
                                    <Grid container alignItems="center">
                                        <AccessTimeIcon color="secondary" />
                                        <Typography variant="subtitle1">&nbsp;&nbsp;2 hours duration</Typography>
                                    </Grid>
                                    <Typography variant="h4">Basic</Typography>
                                    <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                                </Grid>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                </Grid>
            </Container>
            <Container className={`${classes.padding}`} style={{ height: 500 }}>
                <Typography variant="h5" className={classes.title}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                    Review
                </Typography>

            </Container>
            <Footer />
        </div >
    )
}
export default DetailCourse;