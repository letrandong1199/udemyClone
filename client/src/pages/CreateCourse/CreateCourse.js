import { Fragment, useState, } from 'react';
import {
    Typography,
    Button,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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
    Alert,
} from '@material-ui/lab';
import {
    useHistory,
} from 'react-router-dom';
import { useStyles } from './styles';

import categoryService from '../../services/category.service';
import languageService from '../../services/language.service';
import courseService from '../../services/course.service';
import { ROUTES } from '../../config/config';
import validateCourse from './validateCourse';
import ReTextField from '../../components/ReTextField/ReTextField.jsx'
import useForm from '../../utils/useForm';

const CreateCourse = () => {
    const history = useHistory();
    const initValues = {
        title: '',
        subDescription: '',
        categoryId: '',
        languageId: '',
    };

    const [categoriesTree, setCategoriesTree] = useState([]);
    const [languagesTree, setLanguagesTree] = useState([]);
    const [isPending, setIsPending] = useState([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleSave = () => {
        handleSetIsPending('save', false)();
        courseService.postOne({
            Title: info.title,
            Sub_Description: info.subDescription,
            Category_Id: info.categoryId,
            Language_Id: info.languageId,
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

    const {
        handleChange,
        values: info,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateCourse, handleSave);

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

    const getInput = (step) => {
        switch (step) {
            case 0:
                return <ReTextField
                    name='title'
                    label='Title'
                    value={info.title}
                    error={errors.title}
                    onChange={handleChange('title')}
                />
            case 1:
                return <ReTextField
                    name="subDescription"
                    label="Brief description"
                    multiline
                    rows={4}
                    value={info.subDescription}
                    error={errors.subDescription}
                    onChange={handleChange('subDescription')}
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
                        value={info.categoryId}
                        onChange={handleChange('categoryId')}
                        label='Category'
                        onOpen={handleLoadCategory}
                        error={errors.categoryId ? true : false}
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
                        value={info?.languageId}
                        onChange={handleChange('languageId')}
                        label="Language"
                        onOpen={handleLoadLang}
                        error={errors.languageId ? true : false}
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
        if (errors)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                                type='submit'
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
            </form>
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
};

export default CreateCourse;