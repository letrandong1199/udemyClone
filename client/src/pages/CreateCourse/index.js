import {
    useState,
    useEffect,
    Fragment
} from 'react'

import {
    ListItem,
    Divider,
    Typography,
    TextField,
    Button,
    Grid,
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    Tab,
    Step,
    StepLabel,
    StepConnector,
    Stepper,
    Backdrop,
    Snackbar,
    CircularProgress,
} from '@material-ui/core';

import {
    Skeleton,
    TabPanel,
    TabList,
    TabContext,
    Alert,
} from '@material-ui/lab';
import {
    Link,
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useParams,
} from 'react-router-dom';

import { useStyles } from './styles';


import courseService from '../../services/course.service';
import categoryService from '../../services/category.service';
import languageService from '../../services/language.service';
import ProductCardH from '../../components/ProductCardH/ProductCardH.jsx';


import { ROUTES } from '../../config/config';

import { } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import ImagePanel from './ImagePanel';
import DescriptionPanel from './DescriptionPanel';
import CreateLecturePanel from './CreateLecturePanel';
import BasicInfoPanel from './BasicInfoPanel';
import PricingAndPublicPanel from './PricingAndPublicPanel';

const CreateCourse = () => {
    const history = useHistory();
    const [info, setInfo] = useState({
        Title: '',
        Sub_Description: '',
        Category_Id: null,
        Language_Id: null,
    });
    const [categoriesTree, setCategoriesTree] = useState([]);
    const [languagesTree, setLanguagesTree] = useState([]);
    const [isPending, setIsPending] = useState([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        setOpenSnack(false);
    };

    const handleSetIsPending = (index, loaded) => () => {
        let array = [...isPending];

        if (loaded) {
            let ix = isPending.indexOf(index)
            if (ix !== -1) {
                array.splice(ix, 1);
            }
        } else {
            array.push(index);
        }
        setIsPending(array);
    }

    const handleChange = (key) => (event) => {
        let dic = { ...info };
        dic[key] = event.target.value;
        setInfo(dic);
    }

    const handleLoadCategory = () => {
        handleSetIsPending('category', false)();
        categoryService.getAll().then(response => {
            const categoriesArray = response.listAllResponse;
            if (categoriesArray !== undefined) {
                setCategoriesTree(categoriesArray);
            }
            handleSetIsPending('category', true)();
        }).catch(error => {
            handleSetIsPending('category', true)();
            console.log(error);
        });
    }

    // Handle load languages
    const handleLoadLang = () => {
        handleSetIsPending('lang', false)();
        languageService.getAll().then(response => {
            const languagesArray = response.listAllResponse;
            if (languagesArray !== undefined) {
                setLanguagesTree(languagesArray);
            }
            handleSetIsPending('lang', true)();
        }).catch(error => {
            console.log(error);
            handleSetIsPending('lang', true)();
        });
    }

    const getSteps = () => {
        return ['Start with a title',
            'Write brief description',
            'Choose category',
            'Choose language'];
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return 'What are your course title?';
            case 1:
                return 'Brief description';
            case 2:
                return 'Which category your course should?';
            case 3:
                return 'What is language your course in?'
            default:
                return 'Unknown step';
        }
    }
    const validateBasicInfo = (info) => {
        if (info.Title && info.Title === '') {
            return false;
        }
        if (info.Sub_Description && info.Sub_Description === '') {
            return false;
        }
        if (info.Category_Id && info.Category_Id === '') {
            return false;
        }
        if (info.Language_Id && info.Language_Id === '') {
            return false;
        }
    }
    const getInput = (step) => {
        switch (step) {
            case 0:
                return <TextField
                    id="title"
                    label="Title"
                    required
                    error={validateBasicInfo}
                    helperText={validateBasicInfo && 'Please fill this field'}
                    variant="outlined"
                    value={info?.Title || ''}
                    fullWidth
                    onChange={handleChange('Title')}
                />
            case 1:
                return <TextField
                    id="sub_description"
                    label="Brief description"
                    required
                    error={info?.Sub_Description === '' ? true : false}
                    helperText={info?.Sub_Description}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={info?.Sub_Description || ''}
                    onChange={handleChange('Sub_Description')}
                />
            case 2:
                return <FormControl
                    className={classes.formControl}
                    variant='outlined'
                    fullWidth
                >
                    <InputLabel id="catg-label" >Category</InputLabel>
                    <Select
                        labelId='catg-select-label'
                        id='catg-select'
                        value={info?.Category_Id || ''}
                        onChange={handleChange('Category_Id')}
                        label='Category'
                        onOpen={handleLoadCategory}
                    >

                        {isPending.includes('category')
                            ? <Skeleton width='100%' height='50px'><MenuItem key={'ske'} /></Skeleton>
                            : categoriesTree?.map(category => (
                                <MenuItem key={category.Id} value={category.Id}>
                                    {category.Name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            case 3:
                return <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    fullWidth
                >
                    <InputLabel id="lang-label" >Language</InputLabel>
                    <Select
                        labelId="lang-select-label"
                        id="lang-select"
                        value={info?.Language_Id || ''}
                        onChange={handleChange('Language_Id')}
                        label="Language"
                        onOpen={handleLoadLang}
                    >
                        {isPending.includes('lang')
                            ? <Skeleton width='100%' height='50px'><MenuItem key={'ske'} /></Skeleton>
                            : languagesTree?.map(lang => (
                                <MenuItem key={lang.Id} value={lang.Id}>
                                    {lang.Name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            default:
                return
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleSave = () => {
        handleSetIsPending('save', false)();
        courseService.postOne({
            Title: info.Title,
            Sub_Description: info.Sub_Description,
            Category_Id: info.Category_Id,
            Language_Id: info.Language_Id,
        }).then(response => {
            setSnackContent('Added');
            setSnackType('success');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
            console.log(response);
            return history.push(`${ROUTES.instructor}${ROUTES.editCourse}/${response.newCourse.Id}`)
        }).catch(error => {
            console.log(error);
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
        })
    }
    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>
                Create course
            </Typography>
            <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid
                container
                style={{ justifyContent: 'center', padding: '0 100px 0 100px' }}>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button
                            onClick={handleReset}
                            className={classes.backButton}
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant='contained'
                            color='primary'
                        >
                            Save
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        {getInput(activeStep)}
                        <div style={{ marginTop: 10 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </Fragment>
                )}
            </Grid>
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
            <Backdrop open={isPending.includes('save')} className={classes.backdrop} >
                <CircularProgress color='primary' />
            </Backdrop>
        </div >
    )
}

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