import Container from '@material-ui/core/Container';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import Link from '@material-ui/core/Link';
import { Breadcrumbs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Card from '@material-ui/core/Card';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { usePalette } from 'react-palette'
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 4,// '10px',
        maxWidth: 285,
        minWidth: 260,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)',
        margin: '10px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
    },
    price: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        borderRadius: 4,//'10px',
        padding: '10px',
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        fontWeight: 'bold'
    },
    rating: {
        margin: '12px',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    thumbnail: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: '0 0 10px 10px grey',
        borderRadius: 10

    },
    buttonGroup: {
        top: 0,
        position: 'sticky',
        overflow: 'auto',
        '& .MuiButtonGroup-groupedContained': {
            overflow: 'auto',
            minHeight: 50,
            backgroundColor: 'transparent',
            textTransform: 'none',
            fontSize: 16,
            border: 0,
            borderRadius: 4,
            '&:hover': {
                color: 'rgb(0, 86, 210)',
            }
        },
    }
}));


const course = {
    title: 'Python for Everybody Specialization',
    thumb: 'assets/3.jpg',
    author: 'Author 2',
    description: 'Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.',
    price: 19,
    rating: 3,
    num_rating: 100,
    num_enrolled: 100,
    language: ['Eng', 'Vi', 'Jp'],
    categories_tree: ['Computer Science', 'Software Development'],
};

function DetailCourse() {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const { data, loading, error } = usePalette(course.thumb);
    const handleClick = (link) => (event) => {
        event.preventDefault();
        console.log(link);
    }
    //background = 'linear-gradient(45deg, rgb(245, 247, 248) 30%,' + data.lightVibrant + '50')'

    return (
        <div>

            <Navbar />
            <Card fullWidth style={{ height: 500, background: 'radial-gradient(circle at 0%, rgb(245, 247, 248) 60%, ' + data.lightMuted + ' 80%)' /*'rgb(245, 247, 248)'*/, padding: 20 }}>
                <Grid container style={{ marginTop: 20 }}>
                    <Grid item >
                        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">

                            <Link color="inherit" href="/" onClick={handleClick}>
                                Material-UI
                            </Link>
                            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                                Core
                            </Link>
                            <Typography color="textPrimary">Breadcrumb</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} spacing={2}>

                        <Grid item container xs={6} direction="column">
                            <Typography variant="h4" style={{ fontWeight: 'bold', color: data.darkVibrant }}>
                                {course.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {course.description}
                            </Typography>
                            <Grid item container direction="row" alignItems="center">
                                <Typography variant="subtitle1" style={{ /*color: "rgb(247, 187, 86)" */fontWeight: 'bold' }}>{value.toFixed(1)}</Typography>
                                <Rating
                                    name="hover-feedback"
                                    className={classes.rating}
                                    value={course.rating}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
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

                        </Grid>
                        <Grid item xs={3}>
                            <img className={classes.thumbnail} alt='thumb' src={course.thumb}></img>
                        </Grid>
                    </Grid>
                </Grid>

            </Card >

            <ButtonGroup size="large" variant="contained" fullWidth aria-label="large button group" className={classes.buttonGroup}>
                <Button>Description</Button>
                <Button>Content</Button>
                <Button>Instructor</Button>
                <Button>Review</Button>
                <Button>FAQ</Button>
            </ButtonGroup>
            <Container style={{ height: 500 }}>

            </Container>

            <Footer />
        </div >
    )
}
export default DetailCourse;