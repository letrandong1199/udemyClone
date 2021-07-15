import Container from '@material-ui/core/Container';
import Navbar from '../components/Navbar/Navbar.jsx';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer/Footer.jsx';
import Link from '@material-ui/core/Link';
import { Breadcrumbs } from '@material-ui/core';
import { Typography } from '@material-ui/core';
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
import { courses } from '../utils/dataSample';
import { CssBaseline } from '@material-ui/core';
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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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


const course = courses()[0];

const temp = <div>
    <p>
        <span style={{ fontSize: 18 }}>Quill Rich Text Editor</span>
    </p>
    <p>
        <br />
    </p>
    <p>Quill is a free, &nbsp;
        <a key='1' href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
        <a key='2' href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
        <a key='3' href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
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
            <a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li>
        <li key='6'>
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
        return <Link key={index} index={index} onClick={handleClick(link)}>{link}</Link>
    });
    //background = 'linear-gradient(45deg, rgb(245, 247, 248) 30%,' + data.lightVibrant + '50')'
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>

            <Navbar />
            <Card style={{ height: 500, background: 'radial-gradient(circle at 0%, rgb(245, 247, 248) 60%, ' + data.lightMuted + ' 80%)' /*'rgb(245, 247, 248)'*/, padding: 30 }}>

                <Grid container style={{ marginTop: 20, justifyContent: 'space-around' }} direction="column">
                    <Grid item >
                        <Breadcrumbs separator='>' style={{ fontWeight: 'lighter' }} aria-label="breadcrumb">
                            {catgs}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container style={{ marginTop: 20, alignItems: 'flex-start' }} spacing={2}>
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
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1">Offered By</Typography>
                            <img alt="offered" style={{ width: '100%', filter: 'contrast(200%)' }} src='assets/logo-fit.png' />
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
                        <Button variant="contained" color="primary" >Enroll for {course.price ? course.price + '$' : 'free'}</Button>
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