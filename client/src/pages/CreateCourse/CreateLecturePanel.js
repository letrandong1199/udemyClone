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
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
        let ix = isPending.indexOf(index)
        if (ix !== -1) {
            array.splice(ix);
            setIsPending(array);
        }
    }


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