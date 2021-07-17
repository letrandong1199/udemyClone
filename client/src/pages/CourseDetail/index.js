import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/Footer/Footer.jsx';
import Link from '@material-ui/core/Link';
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
//const course = courses()[0];

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

function DetailCourse() {
    const { id } = useParams();
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const handleClick = (link) => (event) => {
        event.preventDefault();
        console.log(link);
    }

    const [course, setCourse] = React.useState(empty_course);
    const { data: courses, isPending, error: errorFetch } = useFetch(`${config.HOST}:${config.PORT}/${config.COURSE_CONTROLLER}/${id}`);

    React.useEffect(() => {
        if (courses) {
            console.log(courses);
            setCourse(courses);
            setValue(courses.rating)
        }

    }, [courses])

    const { data, loading, error } = usePalette(course.thumb);

    const categories = (courses) => courses[0].categories_tree.map((category, index) => {
        return <Link key={index} index={index} onClick={handleClick(category)}>{category}</Link>
    });
    //background = 'linear-gradient(45deg, rgb(245, 247, 248) 30%,' + data.lightVibrant + '50')'
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <Card style={{ height: 500, background: 'radial-gradient(circle at 0%, rgb(245, 247, 248) 60%, ' + data.lightMuted + ' 80%)' /*'rgb(245, 247, 248)'*/, padding: 30 }}>
                <Grid container style={{ marginTop: 20, justifyContent: 'space-around' }} direction="column">
                    <Grid item >
                        <Breadcrumbs separator='>' style={{ fontWeight: 'lighter' }} aria-label="breadcrumb">
                            {categories}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container style={{ marginTop: 20, alignItems: 'flex-start' }} spacing={2}>
                        <Grid item container xs={6} direction="column">
                            <Typography variant="h4" style={{ fontWeight: 'bold', color: 'rgb(55, 51, 51)'/*data.darkVibrant*/ }}>
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
                                    value={value}
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
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1">Offered By</Typography>
                            <img alt="offered" style={{ width: '100%', filter: 'contrast(200%)' }} src='/assets/logo-fit.png' />
                        </Grid>
                        {/* COMMENTs
                        <Grid item container xs={3} style={{ overflow: 'auto', alignSelf: 'flex-start', position: 'sticky', top: 0 }}>

                            <Card style={{ padding: 10, overflow: 'auto', position: 'sticky', top: 0, alignSelf: 'flex-start' }}>
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
                                    */}
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                        <Links to="/">
                            <Button variant="contained" color="primary" >Enroll for {course.price ? course.price + '$' : 'free'}</Button>
                        </Links>
                    </Grid>
                </Grid>



            </Card >

            <ButtonGroup size="large" variant="contained" aria-label="large button group" className={classes.buttonGroup}>
                <Button disableElevation>About</Button>
                <Button disableElevation>Content</Button>
                <Button disableElevation>Instructor</Button>
                <Button disableElevation>Review</Button>
                <Button disableElevation>FAQ</Button>
            </ButtonGroup>
            <Grid container>
                <Grid item xs={8}>
                    <Card style={{ padding: 30, borderRadius: 0 }}>
                        <Grid container style={{ marginBottom: 20 }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold', color: 'rgb(55, 58, 60)' }}>
                                <span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>About this course</span>
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item xs={8}>
                                {temp}
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>
                    </Card>
                    <Card style={{ padding: 30, borderRadius: 0 }}>
                        <Grid container style={{ marginBottom: 20 }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                <span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item xs={8}>
                                <Card>
                                    <Accordion style={{ backgroundColor: '#F7F7F7' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}>General settings</Typography>
                                            <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                                maximus est, id dignissim quam.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion style={{ backgroundColor: '#F7F7F7' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography className={classes.heading}>Users</Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                You are currently not an owner
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                                diam eros in elit. Pellentesque convallis laoreet laoreet.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3bh-content"
                                            id="panel3bh-header"
                                        >
                                            <Typography className={classes.heading}>Advanced settings</Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                Filtering has been entirely disabled for whole web server
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                                vitae egestas augue. Duis vel est augue.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography className={classes.heading}>Personal data</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                                vitae egestas augue. Duis vel est augue.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>

                    </Card>
                </Grid>
                <Grid item xs={4} style={{ overflow: 'auto', position: 'sticky', top: 50, alignSelf: 'flex-start' }}>

                    <Card style={{ padding: 30, backgroundColor: 'rgb(251, 251, 248)', margin: 20 }} elevation={3}>
                        <CardMedia>
                            <img className={classes.thumbnail} alt='thumb' src={course.thumb}></img>
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
                </Grid>
            </Grid>

            <Container style={{ height: 500 }}>
                <p>gff</p>
            </Container>

            <Footer />
        </div >
    )
}
export default DetailCourse;