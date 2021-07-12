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
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
        boxShadow: '0 0 10px 10px white inset',
        borderRadius: 10

    },
    buttonGroup: {
        width: '100%',
        borderRadius: 0,
        backgroundColor: 'white',
        paddingLeft: 10,
        zIndex: 1600,
        top: 0,
        position: 'sticky',
        overflow: 'auto',
        '& .MuiButtonGroup-groupedContained': {

            overflow: 'auto',
            minHeight: 50,
            backgroundColor: 'white',

            textTransform: 'none',
            fontSize: 16,
            border: 0,
            borderRadius: 0,
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

const temp = <div>
    <p>
        <span style={{ fontSize: 18 }}>Quill Rich Text Editor</span>
    </p>
    <p>
        <br />
    </p>
    <p>Quill is a free,
        <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
        <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
        <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
    <p>
        <br />
    </p>
    <ul>
        <li>Fast and lightweight</li>
        <li>Semantic markup</li>
        <li>Standardized HTML between browsers</li>
        <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
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
        <li>
            <a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li>
        <li>
            <a href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li>
    </ul>
</div>

function DetailCourse() {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const { data, loading, error } = usePalette(course.thumb);
    const handleClick = (link) => (event) => {
        event.preventDefault();
        console.log(link);
    }
    const catgs = course.categories_tree.map((catg, index) => {
        const link = catg;
        return <Link onClick={handleClick(link)}>{link}</Link>
    });
    //background = 'linear-gradient(45deg, rgb(245, 247, 248) 30%,' + data.lightVibrant + '50')'

    return (
        <div>

            <Navbar />
            <Card fullWidth style={{ height: 500, background: 'radial-gradient(circle at 0%, rgb(245, 247, 248) 60%, ' + data.lightMuted + ' 80%)' /*'rgb(245, 247, 248)'*/, padding: 30 }}>
                <Grid container style={{ marginTop: 20 }}>
                    <Grid item >
                        <Breadcrumbs separator='>' style={{ fontWeight: 'lighter' }} aria-label="breadcrumb">
                            {catgs}
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
                        <Grid item xs={3} style={{ overflow: 'auto' }}>

                            <Card style={{ padding: 10, overflow: 'auto' }}>
                                <CardMedia>
                                    <img className={classes.thumbnail} alt='thumb' src={course.thumb}></img>
                                </CardMedia>
                                <CardContent>
                                    <Grid container direction="column" style={{ overflow: 'auto', position: 'sticky' }}>
                                        <Typography variant="subtitle2">
                                            What's include:
                                        </Typography>
                                        {[1, 2, 3, 4].map((name, index) => <Typography style={{ marginTop: 10 }}
                                            variant="body2">Feature {name}</Typography>)
                                        }
                                    </Grid>
                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary">Enroll for {course.price ? course.price + '$' : 'free'}</Button>
                </Grid>

            </Card >

            <ButtonGroup size="large" variant="contained" aria-label="large button group" className={classes.buttonGroup}>
                <Button disableElevation>About</Button>
                <Button disableElevation>Content</Button>
                <Button disableElevation>Instructor</Button>
                <Button disableElevation>Review</Button>
                <Button disableElevation>FAQ</Button>
            </ButtonGroup>
            <Card style={{ padding: 30, borderRadius: 0 }}>
                <Grid container style={{ marginBottom: 20 }}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: 'rgb(55, 58, 60)' }}>
                        About this course
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>
                            {temp}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </Card>
            <Card style={{ padding: 30, borderRadius: 0 }}>
                <Grid container style={{ margin: 40, marginLeft: 0 }}>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                        Course content
                    </Typography>
                </Grid>
            </Card>
            <Container style={{ height: 500 }}>

            </Container>

            <Footer />
        </div >
    )
}
export default DetailCourse;