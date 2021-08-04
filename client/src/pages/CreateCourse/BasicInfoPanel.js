import { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    FormControl,
    Typography,
    Grid,
    Select,
    InputLabel,
    MenuItem,
    Snackbar,
    CircularProgress,
} from '@material-ui/core';

import { Skeleton, Alert } from '@material-ui/lab';

import { useStyles } from './styles';
import categoryService from '../../services/category.service';
import languageService from '../../services/language.service';
import courseService from '../../services/course.service';

const BasicInfoPanel = ({ id, course, loading, setCourse }) => {
    const classes = useStyles();
    const [info, setInfo] = useState({});
    const [categoriesTree, setCategoriesTree] = useState([]);
    const [isPending, setIsPending] = useState([]);
    const [languagesTree, setLanguagesTree] = useState([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        setInfo({
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Category: course.Category,
            Language: course.Language,
        })
    }, [course])

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

    // Handle load categories
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

    // Handle save info
    const handleSave = async () => {
        handleSetIsPending('save', false)();
        courseService.updateOne(id, {
            Title: info.Title,
            Sub_Description: info.Sub_Description,
            Category_Id: info.Category.Id,
            Language_Id: info.Language.Id,
            Is_Completed: course.Is_Completed,
        }).then(response => {
            let dic = { ...course, ...info };
            setCourse(dic);
            setSnackContent('Updated');
            setSnackType('success');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
            return response;
        }).catch(error => {
            console.log(error);
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            handleSetIsPending('save', true)();
        })
    }

    const handleChange = (key) => (event) => {
        let dic = { ...info };
        dic[key] = event.target.value;
        setInfo(dic);
    }

    return (
        <div>
            <Container className={classes.marginContainer}>
                <Typography variant="h5" className={classes.title}>
                    Basic information
                </Typography>
                <Typography variant="body1" className={classes.caption}>
                    {"Basic information will show in course card and detail course."}
                </Typography>
                <Grid container direction="column" className={classes.section}>
                    {loading
                        ? <Skeleton><TextField value='' /></Skeleton>
                        : <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={info?.Title || ''}
                            onChange={handleChange('Title')}
                        />
                    }
                    {loading
                        ? <Skeleton><TextField value='' /></Skeleton>
                        : <TextField
                            id="sub-description"
                            label="Short description"
                            multiline
                            variant="outlined"
                            value={info?.Sub_Description || ''}
                            onChange={handleChange('Sub_Description')}
                        />
                    }
                    {loading
                        ? <Skeleton><Select value='' /></Skeleton>
                        : <FormControl className={classes.formControl} variant='outlined'>
                            <InputLabel id="catg-label" >Category</InputLabel>
                            <Select
                                labelId='catg-select-label'
                                id='catg-select'
                                value={info?.Category || ''}
                                onChange={handleChange('Category')}
                                label='Category'
                                onOpen={handleLoadCategory}
                            >
                                <MenuItem key={info?.Category?.Id} value={info?.Category}>
                                    <em>{info?.Category?.Name}</em>
                                </MenuItem>
                                {isPending.includes('category') ?
                                    <Skeleton width='100%' height='50px'><MenuItem key={'ske'} /></Skeleton>
                                    : categoriesTree?.map(category => (
                                        category.Id !== info?.Category?.Id && <MenuItem key={category.Id} value={category}>
                                            {category.Name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    }
                    {loading
                        ? <Skeleton><Select value='' /></Skeleton>
                        : <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel id="lang-label" >Language</InputLabel>
                            <Select
                                labelId="lang-select-label"
                                id="lang-select"
                                value={info?.Language || ''}
                                onChange={handleChange()}
                                label="Language"
                                onOpen={handleLoadLang}
                            >
                                <MenuItem key={info?.Language?.Id} value={info?.Language}>
                                    <em>{info?.Language?.Name}</em>
                                </MenuItem>
                                {isPending.includes('lang')
                                    ? <Skeleton width='100%' height='50px'><MenuItem key={'ske'} /></Skeleton>
                                    : languagesTree?.map(lang => (
                                        lang.Id !== info?.Language?.Id && <MenuItem key={lang.Id} value={lang}>
                                            {lang.Name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    }
                </Grid>
            </Container>

            <Container
                className={classes.marginContainer}
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleSave}
                    disabled={isPending.includes('save')}
                >
                    Save
                </Button>
                {isPending.includes('save') && <CircularProgress color='primary' size='20px' style={{ marginLeft: 10 }} />}
            </Container>
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
        </div >
    )
}
export default BasicInfoPanel;