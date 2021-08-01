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
import { useLocation, useHistory } from 'react-router-dom';
import { Card } from '@material-ui/core';
import useGetParameter from '../../utils/useGetParameter';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
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

const LectureCard = ({
    lecture,
    index,
    handleSave,
    handleEdit,
    handleCancel,
    handleChange,
    handleDelete,
    editable,
    editLecture }) => {
    const [selectedFile, setSelectedFile] = useState(undefined);
    const handleUpload = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(event.target.files[0]);

    }

    const [progress, setProgress] = useState(0);
    const [isPending, setIsPending] = useState([]);

    const handleSetIsPending = (index) => () => {
        let array = [...isPending];
        array.push(index);
        setIsPending(array);
    }

    const handleClosePending = (index) => () => {
        let array = [...isPending];
        let index = isPending.indexOf(index)
        if (index !== -1) {
            array.splice(index);
            setIsPending(array);
        }
    }

    useEffect(() => {
        console.log('Progrs', progress);
    }, [progress])
    const handleUploadVideo = (index) => () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)

        reader.onloadend = () => {
            console.log("done");
            handleSetIsPending(index);
            mediaService.postOne({ Lecture_Id: lecture.Id, Video_URL: reader.result },
                (event) => setProgress(Math.round((100 * event.loaded) / event.total)))
                .then((response => {
                    console.log('Index', isPending);
                    console.log(response);
                    console.log("Done ok");
                    handleClosePending(index);
                })).catch(error => {
                    console.log(error);
                })
        }
    }
    const handleSelectFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    useEffect(() => {
        console.log('Selected file', selectedFile);
    }, [selectedFile, setSelectedFile])

    console.log('In Lecture', editable);
    return (
        <Card
            style={{
                margin: 10,
                marginTop: 30,
                minHeight: 50,
                minWidth: 500,
                position: 'relative'
            }}

        >
            <TextField
                id={`lecture-name-${index}`}
                value={editable.includes(`lecture-name-${index}`)
                    ? editLecture?.Title
                    : lecture?.Title}
                placeholder='Name'
                color='primary'
                inputProps={
                    { readOnly: !editable.includes(`lecture-name-${index}`) }
                }

                InputProps={{ disableUnderline: !editable.includes(`lecture-name-${index}`) }}
                onChange={handleChange(index)}
                style={{ margin: 20 }}
            />

            <Grid
                alignItems='center'
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                }}>
                {editable.includes(`lecture-name-${index}`)
                    ? <Fragment>
                        <Button onClick={handleSave(index)}>
                            Save
                        </Button>
                        <Button onClick={handleCancel(index)}>
                            Cancel
                        </Button>
                    </Fragment>
                    : <Fragment>
                        <IconButton
                            onClick={handleEdit(index)}
                        >
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleDelete(index)}
                        >
                            <HighlightOffIcon />
                        </IconButton>
                    </Fragment>
                }
            </Grid>
            <Grid container style={{ margin: 10 }}>
                <form>
                    <input
                        accept="video/*"
                        id={`upload-video-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleSelectFile}
                    >
                    </input>
                    <TextField
                        color='primary'
                        variant='outlined'
                        accept="video/*"
                        id={`upload-video-${index}`}
                        inputProps={{ readOnly: true }}
                        value={isPending.includes(index) ? '' : selectedFile ? selectedFile.name : ''}

                        InputProps={{
                            style: {
                                background: `linear-gradient(90deg, #2E86DE ${progress}%, rgba(255, 255, 255, 0) ${progress}%)`,
                            },

                            endAdornment: selectedFile && selectedFile !== undefined
                                ? !isPending.includes(index) && <IconButton
                                    component='span'
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => { console.log('Hello hello'); setSelectedFile('') }}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                                : !isPending.includes(index) && <label for={`upload-video-${index}`}>
                                    <IconButton
                                        component='span'
                                        variant='contained'
                                        color='primary'
                                    >
                                        <AddRoundedIcon />
                                    </IconButton>
                                </label>
                        }}
                    >

                    </TextField>

                    <Button
                        onClick={handleUploadVideo(index)}
                        component='span'
                        variant='contained'
                        color='primary'
                        size='small'
                        style={{ marginLeft: 10 }}
                    >
                        Upload
                    </Button>

                </form>

            </Grid>
        </Card >
    )
}

const SectionCard = ({
    section,
    indexSection,
    handleSave,
    handleEdit,
    handleCancel,
    handleChange,
    handleDelete,
    editable,
    editSection }) => {
    const [lectures, setLectures] = useState([]);
    const [newLecture, setNewLecture] = useState(null);
    const [editLecture, setEditLecture] = useState({ Title: '' });
    const [editableLecture, setEditableLecture] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        lectureService.getById(section.Id).then(response => {
            console.log('Res', response);
            setLectures(response.listAllResponse);
        }).catch(error => {
            console.log('err', error);
        })
    }, [])

    const handleAddLecture = () => {
        const newLecture = {
            Title: ''
        }

        setNewLecture(newLecture)

        setEditableLecture(`lecture-name-edit`);
    }
    const handleChangeLecture = (index) => (event) => {
        const changed = { ...editLecture, Title: event.target.value }
        if (index === 'edit') {
            setNewLecture(changed);
        } else {
            setEditLecture(changed);
        }
    }
    const handleEditLecture = (index) => () => {
        setEditLecture(lectures[index]);
        setEditableLecture(`lecture-name-${index}`);
    }
    const handleDeleteLecture = (index) => () => {
        lectureService.deleteOne(lectures[index].Id)
            .then((response) => {
                setIsPending(false);
                let array = [...lectures];
                array.splice(index, 1);
                setLectures(array);
                setSnackContent('Deleted');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
            }).catch(error => {
                console.log('err', error);
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
            })
    }
    const handleCancelLecture = (index) => () => {
        setEditableLecture([]);
        setNewLecture(null);
        setEditLecture(null);
    }

    const handleSaveLecture = (index) => () => {
        setIsPending(true)
        console.log('save lecture', index);
        if (newLecture) {
            lectureService.postOne({ Title: newLecture.Title, Section_Id: section.Id }).then((response) => {
                console.log('Res', response);
                setIsPending(false);
                let array = [...lectures];
                array.push(response.New_Lecture);
                console.log('Array Lec', array);
                setLectures(array);
                setSnackContent('Added');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
                return handleCancelLecture(index)();
            }).catch(error => {
                console.log('err', error);
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
            })

        } else if (editLecture) {
            lectureService.updateOne(editLecture.Id, { Title: editLecture.Title, Section_Id: section.Id }).then((response) => {
                console.log('Res', response);
                setIsPending(false);
                let array = [...lectures];
                array[index] = editLecture;
                setLectures(array);
                setSnackContent('Updated');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
                return handleCancelLecture(index)();
            }).catch(error => {
                console.log('err', error);
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
            })
        }
    }
    const classes = useStyles();
    return (<Card
        key={indexSection}
        style={{
            minHeight: 50,
            minWidth: 700,
            margin: 20,
            background: 'rgb(241,241,241)',
            position: 'relative'
        }}
    >
        <TextField
            id={`section-name-${indexSection}`}
            value={editable.includes(`section-name-${indexSection}`)
                ? editSection.Name
                : section.Name}
            placeholder='Name'
            color='primary'
            inputProps={
                {
                    readOnly: !editable.includes(`section-name-${indexSection}`),
                }
            }
            InputProps={{ disableUnderline: !editable.includes(`section-name-${indexSection}`) }}
            onChange={handleChange(indexSection)}
            style={{ margin: 20 }}
        />
        {lectures.map((lecture, index) => {
            return <LectureCard
                lecture={lecture}
                index={index}
                editable={editableLecture}
                editLecture={editLecture}
                handleChange={handleChangeLecture}
                handleEdit={handleEditLecture}
                handleCancel={handleCancelLecture}
                handleSave={handleSaveLecture}
                handleDelete={handleDeleteLecture}

            />
        })}
        {newLecture &&
            <Card
                key='new'
                style={{
                    minHeight: 50,
                    minWidth: 500,
                    margin: 20,

                    position: 'relative'
                }}
            >
                <TextField
                    id={`lecture-name-edit`}
                    value={newLecture.Title}
                    variant='outlined'
                    placeholder='Title'
                    color='primary'
                    inputProps={
                        { readOnly: !editableLecture.includes(`lecture-name-edit`) }
                    }
                    InputProps={{ disableUnderline: !editableLecture.includes(`section-name-edit`) }}
                    onChange={handleChangeLecture('edit')}
                    style={{ margin: 10 }}
                />
                <Grid
                    alignItems='center'
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}>
                    {editableLecture.includes(`lecture-name-edit`)
                        ? <Fragment>
                            <Button onClick={handleSaveLecture('edit')}>
                                Save
                            </Button>
                            <Button onClick={handleCancelLecture('edit')}>
                                Cancel
                            </Button>
                        </Fragment>
                        : <Fragment>
                            <IconButton
                                onClick={handleEditLecture('edit')}
                            >
                                <EditRoundedIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleDeleteLecture('edit')}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Fragment>
                    }
                </Grid>


            </Card>
        }
        <Grid
            alignItems='center'
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
            }}>
            {editable.includes(`section-name-${indexSection}`)
                ? <Fragment>
                    <Button onClick={handleSave(indexSection)}>
                        Save
                    </Button>
                    <Button onClick={handleCancel(indexSection)}>
                        Cancel
                    </Button>
                </Fragment>
                : <Fragment>
                    <IconButton
                        onClick={handleEdit(indexSection)}
                    >
                        <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleDelete(indexSection)}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </Fragment>
            }
        </Grid>
        <Grid container style={{ justifyContent: 'flex-end', paddingRight: 2 }}>
            <Button onClick={handleAddLecture}
                startIcon={<AddRoundedIcon />}
            >
                Add lecture
            </Button>
        </Grid>

        <Backdrop open={isPending} className={classes.backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
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
    </Card>
    )
}

const CreateLecture = ({ id }) => {
    id = 31;
    const [sections, setSections] = useState([]);
    const [newSection, setNewSection] = useState(null);
    const [editSection, setEditSection] = useState({ Name: '' });
    const [editable, setEditable] = useState([]);
    const [isPending, setIsPending] = useState(false);


    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        setIsPending(true);
        sectionService.getById(id).then(response => {
            console.log(response);
            setIsPending(false);
            setSections(response.listAllResponse);
        }).catch(error => {
            console.log('err', error);
            setIsPending(false);
        })
    }, [id])

    const handleAddSection = () => {
        const newSection = {
            Name: ''
        }
        //let array = [...sections, newSection];
        //setSections(array)
        setNewSection(newSection)

        setEditable(`section-name-edit`);
    }
    const handleChange = (index) => (event) => {
        const changed = { ...editSection, Name: event.target.value }
        if (index === 'edit') {
            setNewSection(changed);
        } else {
            setEditSection(changed);
        }
    }
    const handleEdit = (index) => () => {
        setEditSection(sections[index]);
        //setSections let array = [...editable, ]
        setEditable(`section-name-${index}`);
    }
    const handleDelete = (index) => () => {
        setIsPending(true);
        setTimeout(() => { console.log('timeup'); }, 5000);
        sectionService.deleteOne(sections[index].Id)
            .then((response) => {
                let array = [...sections];
                array.splice(index, 1);
                setSections(array);
                setSnackContent('Deleted');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
            }).catch(error => {
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
                console.log('err', error);
            })
    }
    const handleCancel = (index) => () => {
        let array = [...editable];
        const indexEdit = editable.indexOf(`section-name-${index}`);
        if (indexEdit !== -1) {
            array.splice(indexEdit, 1)
            setEditable(array);
        }
        setNewSection(null);
        setEditSection(null);
    }

    const handleSave = (index) => () => {
        setIsPending(true)
        console.log('save');
        if (newSection) {
            setTimeout(() => { console.log('test') }, 5000);
            sectionService.postOne({ Name: newSection.Name, Course_Id: id }).then((response) => {
                console.log('Res', response);

                let array = [...sections];
                array.push(response.New_Section);
                setSections(array);
                setSnackContent('Added');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
                return handleCancel(index)();
            }).catch(error => {
                console.log('err', error);
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
            })

        } else if (editSection) {
            setTimeout(() => { console.log('test') }, 5000);

            sectionService.updateOne(editSection.Id, { Name: editSection.Name, Course_Id: id }).then((response) => {
                console.log('Res', response);
                let array = [...sections];
                array[index] = editSection;
                setSections(array);
                setSnackContent('Updated');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
                return handleCancel(index)();
            }).catch(error => {
                console.log('err', error);
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsPending(false)
            })

        }
    }
    const classes = useStyles();
    return (
        <Container>
            {sections.map((section, index) => {
                return <SectionCard
                    section={section}
                    indexSection={index}
                    editable={editable}
                    editSection={editSection}
                    handleChange={handleChange}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                />
            })}
            {newSection &&
                <Card
                    key='new'
                    style={{
                        minHeight: 50,
                        minWidth: 500,
                        margin: 20,
                        background: 'rgb(241,241,241)',
                        position: 'relative'
                    }}
                >
                    <TextField
                        id={`section-name-edit`}
                        value={newSection.Name}
                        variant='outlined'
                        placeholder='Name'
                        color='primary'
                        inputProps={
                            {
                                readOnly: !editable.includes(`section-name-edit`),
                                disableUnderline: true
                            }
                        }
                        InputProps={{ disableUnderline: !editable.includes(`section-name-edit`) }}
                        onChange={handleChange('edit')}
                        style={{ margin: 10 }}
                    />
                    <Grid
                        alignItems='center'
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}>
                        {editable.includes(`section-name-edit`)
                            ? <Fragment>
                                <Button onClick={handleSave('edit')}>
                                    Save
                                </Button>
                                <Button onClick={handleCancel('edit')}>
                                    Cancel
                                </Button>
                            </Fragment>
                            : <Fragment>
                                <IconButton
                                    onClick={handleEdit('edit')}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleDelete('edit')}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                            </Fragment>
                        }
                    </Grid>


                </Card>
            }
            <Button onClick={handleAddSection} startIcon={<AddRoundedIcon />}>Add section</Button>
            <Backdrop open={isPending} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
        </Container >
    )
}

const CreateCourse = () => {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [subDescription, setSubDescription] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [promote, setPromote] = useState(0);
    const [language, setLanguage] = useState('');

    const [categoriesTree, setCategoriesTree] = useState([]);
    const [isPendingCategory, setIsPendingCategory] = useState(false);
    const [languagesTree, setLanguagesTree] = useState([]);
    const [isPendingLang, setIsPendingLang] = useState(false);



    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState("/assets/image.svg");

    useEffect(() => {
        if (!selectedFile) {
            setPreview("/assets/image.svg");
            return;
        }

        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
            setPreview(reader.result)
            console.log("done");
        }


    }, [selectedFile]);

    const uploadImage = (base64EncodedImage) => {
        return base64EncodedImage;
    }


    const handleUpload = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(event.target.files[0]);

    }


    const handleResetPreview = () => {
        setPreview("/assets/image.svg");
        setImage(null);
        setSelectedFile(undefined);
    }

    const handleLoadCategory = () => {
        setIsPendingCategory(true)
        console.log("Ngu");
        categoryService.getAll().then(response => {
            const categoriesArray = response.data.message.listAllResponse;
            const tree = listToTree(categoriesArray, { idCol: 'Id', parentCol: null });
            console.log(tree);
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
    const handleCreate = async () => {
        const author = authService.getCurrentUserId()
        console.log('author', author);
        console.log('price', price);
        console.log("hehe1");
        if (!preview) { return }
        console.log("hehe");
        const base64Image = await uploadImage(preview)
        setImage(base64Image);

        const newCourse = {
            Title: title,
            Sub_Description: subDescription,
            Description: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            Image: image,
            Price: Number(price),
            Category_Id: category,
            Author_Id: authService.getCurrentUserId(),
            Promote: Number(1),
            Language_Id: language,
        };
        console.log(newCourse);
        courseService.postOne(newCourse).then(response => {
            console.log('Create', response);
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>
                Create course
            </Typography>
            <Container className={classes.marginContainer}>
                <Typography variant="h5" className={classes.title}>
                    1. Thumbnail
                </Typography>
                <Typography variant="body1" className={classes.caption}>
                    {"This thumbnail will show in course card (small size) and detail course (large size). Recommend size: 750x422."}
                </Typography>
                <Grid container alignItems="center" className={classes.section}>
                    <div
                        className={classes.thumbnail}
                        style={{ background: `url('${preview}') no-repeat center center content-box` }} />
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{ display: 'none', }}
                        onChange={handleUpload}
                    />
                    {selectedFile === undefined && <label htmlFor="contained-button-file">
                        <IconButton size="medium" color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>}
                    {selectedFile !== undefined && <IconButton onClick={handleResetPreview} size="medium" color="secondary" aria-label="cancel picture" component="span">
                        <HighlightOffIcon />
                    </IconButton>}
                </Grid>
            </Container>
            <Container className={classes.marginContainer}>
                <Typography variant="h5" className={classes.title}>
                    2. Basic information
                </Typography>
                <Typography variant="body1" className={classes.caption}>
                    {"Basic information will show in course card and detail course."}
                </Typography>
                <Grid container direction="column" className={classes.section}>
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        id="sub-description"
                        label="Short description"
                        multiline
                        variant="outlined"
                        value={subDescription} onChange={(event) => setSubDescription(event.target.value)}
                    />
                    <TextField
                        id="price"
                        label="Price"
                        type='number'
                        variant="outlined"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <TextField
                        id="promote"
                        label="Promote"
                        type='number'
                        variant="outlined"
                        value={promote}
                        onChange={(event) => setPromote(event.target.value)}
                    />
                    <FormControl className={classes.formControl} variant='outlined'>
                        <InputLabel id="catg-label" >Category</InputLabel>
                        <Select
                            labelId='catg-select-label'
                            id='catg-select'
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            label='Category'
                            onOpen={handleLoadCategory}
                        >
                            {isPendingCategory ? <Skeleton variant='h6'></Skeleton>
                                : categoriesTree.map(category => (
                                    <MenuItem key={category.Id} value={category.Id}>
                                        {category.Name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="lang-label" >Language</InputLabel>
                        <Select
                            labelId="lang-select-label"
                            id="lang-select"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            label="Language"
                            onOpen={handleLoadLang}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {languagesTree.map(lang => (
                                <MenuItem key={lang.Id} value={lang.Id}>
                                    {lang.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Container>
            <Container className={classes.marginContainer}>
                <Typography variant="h5" className={classes.title}>
                    3. Description
                </Typography>
                <Typography variant="body1" className={classes.caption}>
                    {"This description will show in detail course page."}
                </Typography>
                <Editor
                    editorState={editorState}
                    toolbarClassName={classes.toolbarEditor}
                    wrapperClassName={classes.wrapperEditor}
                    editorClassName={classes.editorEditor}
                    onEditorStateChange={handleEditorStateChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    }}
                        //editorStyle={{ border: "1px solid #C0C0C0", borderRadius: 5 }}
                        /*style={{ border: "1px solid #C0C0C0" }}*/ />
            </Container>
            <Container className={classes.marginContainer}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCreate}
                >

                </Button>
            </Container>

        </div >
    )
}

const EditCourse = ({ id }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    return (
        <Container className={classes.tabsRoot}>
            <TabContext value={value} >
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    onChange={handleChange}
                    className={classes.tabs}

                    aria-label="simple tabs example">
                    <Tab label="Edit course " value="1" />
                    <Tab label="Lectures" value="2" />
                    <Tab label="Description" value="4" />
                    <Tab label="Image" value="5" />
                    <Tab label="Pricing and Public" value="6" />
                </Tabs>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2"><CreateLecture id={id} /></TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Container >
    )
}

const Dashboard = ({ url }) => {
    const classes = useStyles();
    const query = useGetParameter();
    const location = useLocation();
    const history = useHistory();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const limit = 5;


    const replaceParams = (key, value) => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete(key);
        searchParams.set(key, value);
        history.push({ pathname: location.pathname, search: searchParams.toString() });
    }


    const querySearch = query.toString();
    useEffect(() => {
        setIsPending(true);
        let queryString = query.toString();
        setTimeout(() => { console.log('test'); }, 3000);
        if (queryString && queryString !== '') {
            if (query.get('page')) {
                queryString = queryString + `&limit=${limit}`
            } else {
                queryString = queryString + `&limit=${limit}&page=${page}`
            }
            //const queryWithPaging = [...queryArray, { label: 'page', value: page }, { label: 'limit', value: limit }];
            courseService.getByQuery(queryString)
                .then(response => {
                    const listCourses = response.data.message.listAllResponse;
                    if (listCourses?.length === 0) {
                        throw Error('No courses');
                    }
                    setCount(response.data.message.Count)
                    setCourses(listCourses);
                    setIsPending(false);
                }).catch(error => {
                    console.log(error);
                    setError(error.message);
                    setIsPending(false);
                })
        }
    }, [page, querySearch])

    const options = [
        { label: 'Thing 1', value: 1 },
        { label: 'Thing 2', value: 2 },
    ];
    const [option, setOption] = useState([]);
    const handleChangeOption = (event) => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete('language');
        let search = searchParams.toString();
        event.forEach(item => {
            search += `&language=${item.value}`
        })
        history.push({ pathname: location.pathname, search: search });
    };
    const handleDelete = (event) => {

    }


    const handleChangePage = (event, value) => {
        setPage(value);
        replaceParams('page', value);
    }

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
                    <ReactMultiSelectCheckboxes
                        placeholderButtonLabel="Language"
                        options={options}
                        //value={selectedOption}
                        onChange={handleChangeOption}
                        hideSearch={true}
                        getDropdownButtonLabel={({ placeholderButtonLabel, value }) => placeholderButtonLabel}
                        className={classes.selectStyles}
                    />
                </Grid>
                <Grid container className={classes.chipsContainer}>
                    {option.map((opt, index) => {
                        return <Chip key={index} label={opt.label}
                            onDelete={handleDelete} />
                    })}
                </Grid>

                <List style={{ padding: 20 }}>
                    {isPending
                        ? <Skeleton height='100px' width='auto'><ListItem /></Skeleton>
                        : courses?.map((course, index) =>
                            <Fragment key={index}>
                                <ListItem key={index}>
                                    <ProductCardH course={course} />
                                </ListItem>
                                <Divider variant="middle" />
                            </Fragment>)
                    }
                </List>

                <Grid container alignItems="center" style={{ justifyContent: 'center', marginLeft: 20 }}>
                    {isPending
                        ? <Skeleton width='50%' height='50px' />
                        : <Pagination
                            page={page}
                            count={parseInt((parseInt(count) / limit).toFixed(0))}
                            color="primary"
                            onChange={handleChangePage}
                        />
                    }
                </Grid>

            </Container >
        </div >

    )
}
//<Link to={`${url}/create`}>Create course</Link>
//                   <Link to={`${url}/lecture`}>Create lecture</Link>
function Instructor() {
    const { path, url } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${path}`} exact>
                    <Dashboard url={url} />
                </Route>
                <Route path={`${path}${ROUTES.createCourse}`}>
                    <CreateCourse />
                </Route>
                <Route path={`${path}${ROUTES.editCourse}`}>
                    <EditCourse />
                </Route>
            </Switch>
        </div>
    )
}

export default Instructor;