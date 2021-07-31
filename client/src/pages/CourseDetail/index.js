import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useState, useEffect, useRef, Fragment } from 'react';
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
import Divider from '@material-ui/core/Divider';
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
import draftToHtml from 'draftjs-to-html';
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

const Banner = ({ course, isPending }) => {

    const { data, loading, error: error2 } = usePalette(course?.Thumbnail_Small);
    const classes = useStyles({ data, thumbnail: course?.Thumbnail_Large, isPending, loading });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error1, setError1] = useState(null);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };


    const handleClick = (link) => (event) => {
        event.preventDefault();
    }

    const categories = (categories_tree) => categories_tree?.map((category, index) => {
        return <Link key={index} index={index} onClick={handleClick(category)}>{category}</Link>
    });

    const handleEnroll = () => {
        setIsProcessing(true);
        console.log(course);
        enrolledCourseService.postOne({ Course_Id: course.Id }).then(response => {
            if (response.data.message.Code !== ENROLLED.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            setSnackContent('Added');
            setSnackType('success');
            setOpenSnack(true);
            setIsProcessing(false)
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsProcessing(false)
            console.log(error);
        })
    }
    const handleAddWishlist = () => {
        setIsProcessing(true);
        console.log(course);
        wishlistService.postOne({ Course_Id: course.Id }).then(response => {
            if (response.data.message.Code !== ADD_WISHLIST.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            setSnackContent('Added');
            setSnackType('success');
            setOpenSnack(true);
            setIsProcessing(false)
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsProcessing(false)
            console.log(error);
        })
    }

    return (
        <Container className={classes.outerBanner}>
            <Card className={classes.banner}>
                <Grid container style={{ marginTop: 20, justifyContent: 'space-around' }} direction="column">
                    <Breadcrumbs separator='>' style={{ fontWeight: 'lighter' }} aria-label="breadcrumb">
                        {course?.categories_tree && categories(course?.categories_tree)}
                    </Breadcrumbs>
                    <Grid item container style={{ marginTop: 20, marginBottom: 20, alignItems: 'flex-start' }}>
                        <Grid item container xs={7} direction="column">
                            {isPending
                                ? <Skeleton variat='h4' />
                                : <Typography variant='h4' className={classes.bannerTitle}>
                                    {course?.Title}
                                </Typography>}
                            {isPending
                                ? <Skeleton variant='subtitle1' />
                                : <Typography variant='subtitle1'>
                                    {course?.Sub_Description}
                                </Typography>}
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
                                </Grid>}
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
            <Backdrop className={classes.backdrop} open={isProcessing}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackContent}
                </Alert>
            </Snackbar>
        </Container>


    )
}

const Description = ({ course, isPending }) => {
    const classes = useStyles();
    let description = '';
    try {
        description = draftToHtml(JSON.parse(course.Description))
    } catch (error) {
        console.log(error);
    }

    return (
        <Container className={classes.padding}>
            <Grid container style={{ justifyContent: 'space-between' }}>
                {/*<Grid item xs={8}>*/}
                <Typography variant='h5' className={classes.title}>
                    {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>About this course</span>*/}
                    About this Course
                </Typography>
                {isPending
                    ? <Skeleton variant='h6' />
                    : <Typography component="div" dangerouslySetInnerHTML={{
                        __html: description
                    }} >
                    </Typography>
                }
            </Grid>
        </Container >
    )
}

const PageNavigation = ({ course, isPending }) => {
    const classes = useStyles();
    const trigger = useScrollTrigger({ threshold: 640 });
    return (
        <Fragment>
            <AppBar className={trigger ? `${classes.titleBar} ${classes.show}` : `${classes.titleBar} ${classes.hide}`}>
                <Toolbar>
                    <Grid container alignItems="center" style={{ justifyContent: 'space-between' }}>
                        {isPending
                            ? <Skeleton variant='h6' />
                            :
                            <Fragment>
                                <Typography variant="h6">{course?.Title}</Typography>
                                <Grid>
                                    <Button color="primary" size="large" variant="outlined" style={{ marginRight: 20, textTransform: 'none' }} >Enroll for {course?.price ? course?.price + '$' : 'free'}</Button>
                                    <Button color="primary" size="large" variant="outlined" startIcon={<FavoriteBorderRoundedIcon />} style={{ marginRight: 20, textTransform: 'none' }} >{'Wishlist'}</Button>
                                </Grid>
                            </Fragment>
                        }

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
        </Fragment>
    )
}

const InstructorSection = ({ course, isPending }) => {
    const classes = useStyles();
    return (
        <Container className={`${classes.vibrant} ${classes.padding}`}>
            <Typography variant="h5" className={classes.title}>
                {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                Instructor
            </Typography>
            <Divider />
            {isPending
                ? <Skeleton width='100px' />
                : <Grid item container direction="row" alignItems="center">
                    <Typography variant="subtitle2">Rating: </Typography>
                    <Rating
                        name="hover-feedback"
                        className={classes.rating}
                        value={0}
                        precision={0.5}
                        size="small"
                        style={{ color: 'rgb(247, 187, 86)' }}
                    />
                    <Typography variant="subtitle2">100</Typography>
                </Grid>
            }
            <Grid container style={{ marginTop: 32 }} direction="row">
                <Grid item>
                    {isPending
                        ? <Skeleton><Avatar /></Skeleton>
                        : <Avatar
                            style={{ height: 128, width: 128 }}
                            src={course.Author.Thumbnail} size="large">
                            AV
                        </Avatar>
                    }
                </Grid>

                <Grid item xs={4} container direction="column" style={{ marginLeft: 32 }} >
                    {isPending
                        ? <Skeleton variant='h6' />
                        :
                        <Fragment>
                            <Typography variant="h6">{course.Author.Name}</Typography>
                            {/*<Typography variant="subtitle2">Ths.author</Typography>*/}
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
                        </Fragment>
                    }
                </Grid>
            </Grid>

        </Container>
    )
}

const Content = ({ course, isPending }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        return event;
    };

    const handleOpenList = (list) => (event, isExpanded) => {
        console.log('open, ', list, expandedList);
        if (expandedList.includes(list)) {
            console.log('Click w');
            let temp = expandedList;
            temp.pop(temp.indexOf(list))
            setExpanded(temp)
        } else {
            setExpandedList([list, ...expandedList])
        }


        return event;
    };

    return (
        <Container className={`${classes.vibrant} ${classes.padding}`}>
            <Typography variant="h5" className={classes.title} style={{ textAlign: 'center' }}>
                {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                Course content
            </Typography>
            <Grid container>
                <Card className={classes.cardContent}>
                    {!isPending && course && course?.Content.map((section, index) => (
                        <Accordion
                            Accordion
                            expanded={expanded === `panel-${index}`}
                            onChange={handleChange(`panel-${index}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                            >
                                <Typography className={classes.heading}>Chapter
                                    <br /><span>{index + 1}</span>
                                </Typography>
                                <Grid container direction="column">
                                    <Grid container alignItems="center">
                                        <AccessTimeIcon color="secondary" />
                                        <Typography variant="subtitle1">&nbsp;&nbsp;{`${section.Lectures.length} lectures`}</Typography>
                                    </Grid>
                                    <Typography variant="h4">{section.Name}</Typography>
                                    <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                                </Grid>

                            </AccordionSummary>
                            <AccordionDetails>
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    className={classes.listRoot}
                                >
                                    {section?.Lectures.map((lecture, index) => (
                                        <Fragment>
                                            <ListItem button onClick={handleOpenList(`item-${index}`)}>
                                                <ListItemIcon>
                                                    <PlayCircleFilledWhiteRoundedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={lecture.Title} />
                                                {expandedList.includes(`item-${index}`) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </ListItem>
                                            <Collapse in={expandedList.includes(`item-${index}`)} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem button className={classes.nested}>
                                                        <ListItemIcon>
                                                            <PlayCircleFilledWhiteRoundedIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Starred" />
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        </Fragment>
                                    ))
                                    }


                                </List>
                            </AccordionDetails>
                        </Accordion>))
                    }
                </Card>
            </Grid>
        </Container >
    )
}
const RecommendSection = ({ course, isPending }) => {
    const classes = useStyles();

    return (
        <Container style={{ padding: 20 }}>
            <Typography variant="h5" className={classes.title} style={{ textAlign: 'center' }}>
                People interested in this course also viewed
            </Typography>
            {isPending ? <Skeleton width='100%' height='100px'></Skeleton>
                : <MyCarousel courses={course.Similar_Courses} />}
        </Container >
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

    const bannerAnchor = useRef();

    useEffect(() => {
        const scrollOptions = {
            left: 0,
            top: 190,
            behavior: 'auto',
        }
        window.scrollTo(scrollOptions);
    }, [])


    const classes = useStyles();

    return (
        <div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Banner ref={bannerAnchor} course={course} isPending={isPending} />
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