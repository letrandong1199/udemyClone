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
} from '@material-ui/core';

import { Skeleton, Alert } from '@material-ui/lab';

import { useStyles } from './styles';
import categoryService from '../../services/category.service';
import languageService from '../../services/language.service';
import courseService from '../../services/course.service';

const BasicInfoPanel = ({ id, course, loading }) => {
    const classes = useStyles();
    const [info, setInfo] = useState({});

    useEffect(() => {
        setInfo({
            Title: course.Title,
            Sub_Description: course.Sub_Description,
            Category: course.Category,
            Language: course.Language,
        })
    }, [course])
    const [categoriesTree, setCategoriesTree] = useState([]);
    const [isPendingCategory, setIsPendingCategory] = useState(false);
    const [languagesTree, setLanguagesTree] = useState([]);
    const [isPendingLang, setIsPendingLang] = useState(false);

    const handleLoadCategory = () => {
        setIsPendingCategory(true)
        categoryService.getAll().then(response => {
            const categoriesArray = response.data.message.listAllResponse;
            if (categoriesArray !== undefined) { setCategoriesTree(categoriesArray); }
            setIsPendingCategory(false)
        }).catch(error => {
            setIsPendingCategory(false);
        });
    }
    const handleLoadLang = () => {
        setIsPendingCategory(true)
        console.log("Ngu");
        languageService.getAll().then(response => {
            const languagesArray = response.data.message.listAllResponse;

            if (languagesArray !== undefined) { setLanguagesTree(languagesArray); }
            setIsPendingCategory(false)
        }).catch(error => {
            setIsPendingCategory(false);
        });
    }
    const handleSave = async () => {
        courseService.updateOne(id, {
            Title: info.Title,
            Sub_Description: info.Sub_Description,
            Category_Id: info.Category.Id,
            Language_Id: info.Language.Id,
            Is_Completed: course.Is_Completed,
        }).then(response => {
            console.log('Create', response);
        }).catch(error => {
            console.log(error);
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
                            onChange={handleChange('Sub-Description')}
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
                                {isPendingCategory ? <Skeleton variant='h6'></Skeleton>
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
                                {languagesTree?.map(lang => (
                                    lang.Id !== info?.Language?.Id && <MenuItem key={lang.Id} value={lang}>
                                        {lang.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                </Grid>
            </Container>

            <Container className={classes.marginContainer}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Container>

        </div >
    )
}
export default BasicInfoPanel;