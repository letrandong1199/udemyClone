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
import toDataUrl from '../../utils/toDataUrl';
import languageService from '../../services/language.service';
import authService from '../../services/auth.service';
import courseService from '../../services/course.service';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Card, CardContent, InputBase, } from '@material-ui/core';
import lectureService from '../../services/lecture.service';
import sectionService from '../../services/section.service';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import mediaService from '../../services/media.service';

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
    const handleUploadVideo = (index) => () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
            console.log("done");
            mediaService.postOne({ Lecture_Id: lecture.Id, Video_URL: reader.result })
        }
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
                onChange={handleChange(index)}
                style={{ margin: 10 }}
            />
            <input
                accept="*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUpload}
            />
            <Button onClick={handleUploadVideo(index)}>
                Upload
            </Button>
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

        </Card>
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
        let array = [...lectures];
        array.splice(index, 1);
        setLectures(array);

        array = [...editableLecture];
        const indexEdit = editable.indexOf(`lecture-name-${index}`);
        if (indexEdit !== -1) {
            array.splice(indexEdit, 1)
            setEditableLecture(array);
        }
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
                return handleCancelLecture(index)();
            }).catch(error => {
                console.log('err', error);
            })

        } else if (editLecture) {
            lectureService.updateOne(editLecture.Id, { Title: editLecture.Title, Section_Id: section.Id }).then((response) => {
                console.log('Res', response);
                setIsPending(false);
                let array = [...lectures];
                array[index] = editLecture;
                setLectures(array);
                return handleCancelLecture(index)();
            }).catch(error => {
                console.log('err', error);
            })
        }
    }
    return (<Card
        key={indexSection}
        style={{
            minHeight: 50,
            minWidth: 500,
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
                { readOnly: !editable.includes(`section-name-${indexSection}`) }
            }
            onChange={handleChange(indexSection)}
            style={{ margin: 10 }}
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
                    <Button onClick={handleAddLecture}>
                        Add lecture
                    </Button>
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
    }, [])

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
        let array = [...sections];
        array.splice(index, 1);
        setSections(array);

        array = [...editable];
        const indexEdit = editable.indexOf(`section-name-${index}`);
        if (indexEdit !== -1) {
            array.splice(indexEdit, 1)
            setEditable(array);
        }
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
            sectionService.postOne({ Name: newSection.Name, Course_Id: id }).then((response) => {
                console.log('Res', response);
                setIsPending(false);
                let array = [...sections];
                array.push(response.New_Section);
                setSections(array);
                return handleCancel(index)();
            }).catch(error => {
                console.log('err', error);
            })

        } else if (editSection) {
            sectionService.updateOne(editSection.Id, { Name: editSection.Name, Course_Id: id }).then((response) => {
                console.log('Res', response);
                setIsPending(false);
                let array = [...sections];
                array[index] = editSection;
                setSections(array);
                return handleCancel(index)();
            }).catch(error => {
                console.log('err', error);
            })

        }
    }
    return (
        <Container>
            <Button onClick={handleAddSection}>Add section</Button>
            {sections.map((section, index) => {
                return <SectionCard
                    section={section}
                    index={index}
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
                            { readOnly: !editable.includes(`section-name-edit`) }
                        }
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
    useEffect(() => {


    }, [])


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
                    {"This thumbnail will show in course card (small size) and detail course (large size)."}
                </Typography>
                <Grid container alignItems="center" className={classes.section}>
                    <div className={classes.thumbnail} style={{ background: `url('${preview}') no-repeat center center content-box` }} />
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

function Instructor() {
    const { path, url } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${path}`} exact>
                    <Link to={`${url}/create`}>Create course</Link>
                    <Link to={`${url}/lecture`}>Create lecture</Link>
                </Route>
                <Route path={`${path}/create`}>
                    <CreateCourse />
                </Route>
                <Route path={`${path}/lecture`}>
                    <CreateLecture />
                </Route>
            </Switch>
        </div>
    )
}

export default Instructor;