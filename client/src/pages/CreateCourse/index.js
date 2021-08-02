import { useState, useEffect, Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import categoryService from '../../services/category.service';
import listToTree from '../../utils/listToTree';
import languageService from '../../services/language.service';
import authService from '../../services/auth.service';
import courseService from '../../services/course.service';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import lectureService from '../../services/lecture.service';
import sectionService from '../../services/section.service';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import mediaService from '../../services/media.service';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ProductCardH from '../../components/ProductCardH/ProductCardH.jsx';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import Chip from '@material-ui/core/Chip';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';
import useGetParameter from '../../utils/useGetParameter';

import { ROUTES } from '../../config/config';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fab, Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import ImagePanel from './ImagePanel';
import DescriptionPanel from './DescriptionPanel';
import CreateLecturePanel from './CreateLecturePanel';
import BasicInfoPanel from './BasicInfoPanel';
import PricingAndPublicPanel from './PricingAndPublicPanel';
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 40,
        width: '100%',
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);



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
    const [isPending, setIsPending] = useState(false);

    const handleChange = (key) => (event) => {
        let dic = { ...info };
        dic[key] = event.target.value;
        setInfo(dic);
    }

    const handleLoadCategory = () => {
        setIsPending(true)
        categoryService.getAll().then(response => {
            const categoriesArray = response.data.message.listAllResponse;
            if (categoriesArray !== undefined) { setCategoriesTree(categoriesArray); }
            setIsPending(false)
        }).catch(error => {
            setIsPending(false);
        });
    }
    const handleLoadLang = () => {
        setIsPending(true)
        languageService.getAll().then(response => {
            const languagesArray = response.data.message.listAllResponse;
            if (languagesArray !== undefined) { setLanguagesTree(languagesArray); }
            setIsPending(false)
        }).catch(error => {
            setIsPending(false);
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

                        {isPending ? <Skeleton variant='h6'></Skeleton>
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
                        {languagesTree?.map(lang => (
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
        courseService.postOne({
            Title: info.Title,
            Sub_Description: info.Sub_Description,
            Category_Id: info.Category_Id,
            Language_Id: info.Language_Id,
        }).then(response => {
            console.log('Create', response);
            return history.push(`${ROUTES.instructor}${ROUTES.editCourse}/${response.newCourse.Id}`)
        }).catch(error => {
            console.log(error);
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
        </div >
    )
}

const EditCourse = () => {
    const { id } = useParams();
    const [value, setValue] = useState('0');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState();
    const [course, setCourse] = useState({});
    const [refresh, setRefresh] = useState(false);

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
            <TabContext value={value} >
                <TabList
                    orientation="vertical"
                    variant="fullWidth"
                    onChange={handleChange}
                    className={classes.tabs}

                    aria-label="simple tabs example">
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
        </Container >
    )
}

const Dashboard = ({ url }) => {
    const classes = useStyles();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsPending(true);
        setTimeout(() => { console.log('test'); }, 3000);

        courseService.getCoursesOfInstructor()
            .then(response => {
                console.log(response);
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
                <Grid container alignItems="center" style={{ justifyContent: 'space-between' }}>
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
                        to={`${url}${ROUTES.createCourse}`}
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
                        : courses?.map((course, index) =>
                            <Fragment key={index}>
                                <ListItem key={index}>
                                    <ProductCardH course={course} linkTo={`${url}${ROUTES.editCourse}/${course.Id}`} />
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
                    <Dashboard url={url} />
                </Route>
                <Route path={`${path}${ROUTES.createCourse}`}>
                    <CreateCourse url={url} />
                </Route>
                <Route path={`${path}${ROUTES.editCourse}/:id`}>
                    <EditCourse url={url} />
                </Route>
            </Switch>
        </div>
    )
}

export default Instructor;