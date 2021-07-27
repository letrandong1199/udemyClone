import { useState, useEffect } from 'react'
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

function CreateCourse() {
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
            Promote: Number(promote),
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
                    Create
                </Button>
            </Container>

            <Container className={classes.marginContainer}>
                <Typography variant="h5" className={classes.title}>
                    3. Lectures
                </Typography>
                <Typography variant="body1" className={classes.caption}>
                    {"Lectures of this course."}
                </Typography>


            </Container>


        </div >
    )
}

export default CreateCourse;