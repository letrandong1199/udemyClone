import { useState, useEffect, Fragment } from 'react';
import {
    Card,
    Button,
    IconButton,
    Typography,
    Grid,
    Container,
    CircularProgress,
    Backdrop,
    TextField,
    Snackbar,
    ListItem,
    FormGroup,
    Switch,
    FormControlLabel,
    List,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { useStyles } from './styles';

import sectionService from '../../services/section.service';
import lectureService from '../../services/lecture.service';
import mediaService from '../../services/media.service';

const LectureCard = ({
    lecture,
    index,
    indexSection,
    handleSave,
    handleEdit,
    handleCancel,
    handleChange,
    handleDelete,
    editable,
    editLecture,
    course,
    setCourse }) => {
    const [selectedFile, setSelectedFile] = useState(undefined);

    const [progress, setProgress] = useState(0);
    const [isPending, setIsPending] = useState([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };


    const handleSetIsPending = (index, loaded) => () => {
        let array = [...isPending];
        // 
        //console.log('pend', array);
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


    const handleUploadVideo = (index) => () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)

        reader.onloadend = () => {
            handleSetIsPending(index, false)();
            mediaService.postOne({ Lecture_Id: lecture.Id, Video_URL: reader.result },
                (event) => setProgress(Math.round((100 * event.loaded) / event.total)))
                .then((response => {
                    let dic = { ...course };
                    dic.Content[indexSection].Lectures[index].Media.push(response.newMedia);
                    setCourse(dic);
                    setSnackContent('Video is uploaded successfully.');
                    setSnackType('success');
                    setOpenSnack(true);
                    setAddVideo(false);
                    handleSetIsPending(index, true)();
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
    }

    const [addVideo, setAddVideo] = useState(false);

    const handleChangePreview = (indexMedia) => (event) => {
        handleSetIsPending(`media-${index}-${indexMedia}`, false)();

        const changed = event.target.checked;
        mediaService.updateOne(lecture.Media[index].Id, {
            Is_Preview: changed,
            Lecture_Id: lecture.Id,
        }).then(response => {
            let dic = { ...course };
            dic.Content[indexSection].Lectures[index].Media[indexMedia].Is_Preview = changed;
            setCourse(dic);
            setSnackContent('Has changed to preview');
            setSnackType('success');
            setOpenSnack(true);
            handleSetIsPending(`media-${index}-${indexMedia}`, true)();
            console.log(response);
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            handleSetIsPending(`media-${index}-${indexMedia}`, true)();
            console.log(error);
        })
    }

    const handleRemoveMedia = (indexMedia) => (event) => {
        handleSetIsPending(`media-${index}-${indexMedia}`, false)();
        mediaService.deleteOne(lecture.Media[indexMedia].Id).then(response => {
            let dic = { ...course };
            dic.Content[indexSection].Lectures[index].Media.splice(indexMedia, 1);
            setCourse(dic);
            setSnackContent('Deleted');
            setSnackType('success');
            setOpenSnack(true);
            handleSetIsPending(`media-${index}-${indexMedia}`, true)();
            console.log(response);
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            handleSetIsPending(`media-${index}-${indexMedia}`, true)();
            console.log(error);
        })
    }
    console.log('In Lecture', editable);
    console.log(lecture);
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
                id={`lecture-name-${indexSection}-${index}`}
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
                {lecture.Media && lecture.Media.length > 0
                    ? lecture.Media.map((media, indexMedia) => {
                        return <ListItem>
                            <VideoLibraryIcon size='large' />
                            {!isPending.includes(`media-${index}-${indexMedia}`) &&
                                <Fragment>
                                    <Button href={media?.Video_URL}>View</Button>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={Boolean(media?.Is_Preview)}
                                                    onChange={handleChangePreview(indexMedia)}
                                                    name="checkedB"
                                                    color="primary"
                                                    disabled={isPending.includes(`media-${index}-${indexMedia}`)}
                                                />
                                            }
                                            label={media?.Is_Preview ? `Preview` : `No Preview`}
                                        />
                                    </FormGroup>
                                    <Button onClick={handleRemoveMedia(indexMedia)}>Delete</Button>
                                </Fragment>
                            }
                            {isPending.includes(`media-${index}-${indexMedia}`) &&
                                <CircularProgress color="primary" size='15px' />}
                        </ListItem>
                    })

                    : !addVideo
                        ? <Button
                            color='primary'
                            variant='outlined'
                            startIcon={<AddRoundedIcon />}
                            onClick={() => { setAddVideo(true) }}
                        >
                            Add media
                        </Button>
                        : progress < 100
                            ? <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    accept="video/*"
                                    id={`upload-video-${index}`}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleSelectFile}
                                    onClick={(event) => {
                                        event.target.value = null;
                                    }}
                                >
                                </input>
                                <TextField
                                    color='primary'
                                    size='small'
                                    variant='outlined'
                                    accept="video/*"
                                    id={`upload-video-${index}`}
                                    inputProps={{ readOnly: true }}
                                    value={isPending.includes(index)
                                        ? `${progress}%`
                                        : selectedFile
                                            ? selectedFile.name
                                            : ''
                                    }
                                    InputProps={{
                                        style: {
                                            background: `linear-gradient(90deg, #2E86DE ${progress}%, rgba(255, 255, 255, 0) ${progress}%)`,
                                        },

                                        endAdornment: selectedFile && selectedFile !== undefined
                                            ? !isPending.includes(index) &&
                                            <label htmlFor={`upload-video-${index}`}>
                                                <IconButton
                                                    component='span'
                                                    variant='contained'
                                                    color='secondary'
                                                    onClick={(event) => {
                                                        event.target.value = null;
                                                        setSelectedFile('')
                                                    }}
                                                >
                                                    <HighlightOffIcon />
                                                </IconButton>
                                            </label>

                                            : !isPending.includes(index) && <label htmlFor={`upload-video-${index}`}>
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
                                {progress === 0 &&
                                    <Fragment>
                                        <Button
                                            onClick={handleUploadVideo(index)}
                                            component='span'
                                            variant='contained'
                                            color='primary'
                                            size='medium'
                                            disabled={selectedFile === undefined || selectedFile === ''}
                                            style={{ marginLeft: 10 }}
                                        >
                                            Upload
                                        </Button>
                                        <Button
                                            onClick={() => { setAddVideo(false) }}
                                            component='span'
                                            variant='contained'
                                            color='secondary'
                                            size='medium'
                                            style={{ marginLeft: 10 }}
                                        >
                                            Cancel
                                        </Button>
                                    </Fragment>}
                            </form>
                            : <Typography style={{ margin: 10 }}>
                                <b>File name:&nbsp;</b>
                                {selectedFile.name}
                                <br />
                                <b>Status:&nbsp;</b>
                                {isPending.includes(index) ? <em>Processing</em> : 'Done'}
                            </Typography>

                }

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
    editSection,
    course,
    setCourse, }) => {
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
        setLectures(section.Lectures || [])
    }, [section])

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

                let dic = { ...course };
                dic.Content[indexSection].Lectures = array;
                setCourse(dic);

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
                let array = [...lectures, response.New_Lecture];
                setLectures(array);
                let dic = { ...course };
                dic.Content[indexSection]['Lectures'] = array;
                setCourse(dic);
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

                let dic = { ...course };
                dic.Content[indexSection].Lectures = array;
                setCourse(dic);
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
        {lectures?.map((lecture, index) => {
            return <LectureCard
                key={index}
                lecture={lecture}
                index={index}
                indexSection={indexSection}
                editable={editableLecture}
                editLecture={editLecture}
                handleChange={handleChangeLecture}
                handleEdit={handleEditLecture}
                handleCancel={handleCancelLecture}
                handleSave={handleSaveLecture}
                handleDelete={handleDeleteLecture}
                course={course}
                setCourse={setCourse}
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
            <CircularProgress color="primary" />
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

const CreateLecturePanel = ({ id, course, loading, setCourse }) => {
    const [sections, setSections] = useState([]);
    const [newSection, setNewSection] = useState(null);
    const [editSection, setEditSection] = useState({ Name: '' });
    const [editable, setEditable] = useState([]);
    const [isPending, setIsPending] = useState(loading || false);

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
        setSections(course.Content);
    }, [course])

    const handleAddSection = () => {
        const newSection = {
            Name: ''
        }
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
                let dic = { ...course };
                dic.Content = array;
                setCourse(dic);
                setSnackContent('Deleted');
                setSnackType('success');
                setOpenSnack(true);
                setIsPending(false);
                return response;
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
            sectionService.postOne({ Name: newSection.Name, Course_Id: course.Id }).then((response) => {
                console.log('Res', response);

                let array = [...sections];
                array.push(response.New_Section);
                setSections(array);
                let dic = { ...course };
                dic.Content = array;
                setCourse(dic);
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

            sectionService.updateOne(editSection.Id, { Name: editSection.Name, Course_Id: course.Id }).then((response) => {
                console.log('Res', response);
                let array = [...sections];
                array[index] = editSection;
                setSections(array);
                let dic = { ...course };
                dic.Content[index] = editSection;
                setCourse(dic);
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
        <Container className={classes.marginContainer}>
            <Typography variant="h5" className={classes.title}>
                Lectures
            </Typography>
            <Typography variant="body1" className={classes.caption}>
                {"Lectures of this course."}
            </Typography>
            {sections?.map((section, index) => {
                return <SectionCard
                    key={index}
                    section={section}
                    indexSection={index}
                    editable={editable}
                    editSection={editSection}
                    handleChange={handleChange}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    setCourse={setCourse}
                    course={course}
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
        </Container>
    )
}

export default CreateLecturePanel;