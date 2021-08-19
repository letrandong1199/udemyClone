import {
    useState,
    useEffect,
    Fragment
} from 'react'

import {
    ListItem,
    Divider,
    Typography,
    Button,
    Grid,
    Container,
    List,
    Tab,

} from '@material-ui/core';

import {
    Skeleton,
    TabPanel,
    TabList,
    TabContext,
} from '@material-ui/lab';
import {
    Link,
    Switch,
    Route,
    useRouteMatch,
    useParams,
} from 'react-router-dom';

import { useStyles } from './styles';


import courseService from '../../services/course.service';

import ProductCardH from '../../components/ProductCardH';


import { ROUTES } from '../../config/config';

import { } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import ImagePanel from './ImagePanel';
import DescriptionPanel from './DescriptionPanel';
import CreateLecturePanel from './CreateLecturePanel';
import BasicInfoPanel from './BasicInfoPanel';
import PricingAndPublicPanel from './PricingAndPublicPanel';
import CreateCourse from './CreateCourse';



const EditCourse = () => {
    const { id } = useParams();
    const [value, setValue] = useState('0');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState();
    const [course, setCourse] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setIsPending(true);
        courseService.getOneCourseOfInstructor(id).then(response => {
            setCourse(response.resultResponse);
            setIsPending(false);
        }).catch(error => {
            console.log(error);
            setError(error.message);
            setIsPending(false);
        })
    }, [id])
    const classes = useStyles();
    return (
        <Container className={classes.tabsRoot}>
            {error ? <Typography variant='h5'>error</Typography>
                : <TabContext value={value} >
                    <TabList
                        orientation="vertical"
                        variant="fullWidth"
                        onChange={handleChange}
                        className={classes.tabs}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="edit-course">
                        <Tab label="Course info" value='0' />
                        <Tab label="Lectures" value='1' />
                        <Tab label="Description" value='2' />
                        <Tab label="Image" value='3' />
                        <Tab label="Pricing and Public" value='4' />
                    </TabList>
                    <TabPanel value='0'><BasicInfoPanel id={id} course={course} loading={isPending} setCourse={setCourse} /></TabPanel>
                    <TabPanel value='1'><CreateLecturePanel id={id} course={course} loading={isPending} setCourse={setCourse} /></TabPanel>
                    <TabPanel value='2'><DescriptionPanel id={id} course={course} loading={isPending} setCourse={setCourse} /></TabPanel>
                    <TabPanel value='3'><ImagePanel id={id} course={course} loading={isPending} setCourse={setCourse} /></TabPanel>
                    <TabPanel value='4'><PricingAndPublicPanel id={id} course={course} loading={isPending} setCourse={setCourse} /></TabPanel>
                </TabContext>
            }
        </Container >
    )
}

const Dashboard = ({ url, path }) => {
    const classes = useStyles();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsPending(true);

        courseService.getCoursesOfInstructor()
            .then(response => {
                const listCourses = response.listAllResponse;
                if (listCourses?.length === 0) {
                    throw Error('No courses');
                }
                setCourses(listCourses);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setError(error.message);
                setIsPending(false);
            })
    }, [])



    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>Instructor dashboard</Typography>
            <Container className={classes.section}>
                <Grid
                    container
                    alignItems="center"
                    zeroMinWidth
                    style={{ justifyContent: 'space-between', padding: '0 30px 0 30px' }}>
                    <Typography
                        variant="h4"
                        className={classes.title}
                    >
                        All course
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        component={Link}
                        to={`${path}${ROUTES.createCourse}`}
                    >
                        New course
                    </Button>
                </Grid>

                <Grid container className={classes.filterContainer}>

                </Grid>
                <Grid container className={classes.chipsContainer}>

                </Grid>

                <List style={{ padding: 20 }}>
                    {isPending
                        ? <Skeleton height='100px' width='auto'><ListItem /></Skeleton>
                        : error
                            ? <Typography variant='h5'>{error}</Typography>
                            : courses?.map((course, index) =>
                                <Fragment key={index}>
                                    <ListItem key={index}>
                                        <ProductCardH
                                            hidePrice
                                            course={course}
                                            linkTo={`${path}${ROUTES.editCourse}/${course.Id}`} />
                                        <Typography variant="h6">
                                            {course.Is_Completed
                                                ? 'COMPLETE' : "DRAFT"}
                                        </Typography>
                                    </ListItem>
                                    <Divider variant="middle" />
                                </Fragment>)
                    }
                </List>
            </Container >
        </div >
    )
}


function Instructor() {
    const { path, url } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${path}`} exact>
                    <Dashboard url={url} path={path} />
                </Route>
                <Route path={`${path}${ROUTES.createCourse}`}>
                    <CreateCourse url={url} path={path} />
                </Route>
                <Route path={`${path}${ROUTES.editCourse}/:id`}>
                    <EditCourse url={url} path={path} />
                </Route>
            </Switch>
        </div>
    )
}

export default Instructor;