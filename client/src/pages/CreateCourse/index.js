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
import { convertFromRaw } from 'draft-js';
import categoryService from '../../services/category.service';
import toDataUrl from '../../utils/toDataUrl';
import languageService from '../../services/language.service';
import authService from '../../services/auth.service';
import courseService from '../../services/course.service';

function CreateCourse() {
    const classes = useStyles();
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState(null);
    const [subDescription, setSubDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [promote, setPromote] = useState(null);
    const [language, setLanguage] = useState(null);


    const [isPending, setIsPending] = useState(false)
    const [categoriesTree, setCategoriesTree] = useState([]);
    const [languagesTree, setLanguagesTree] = useState([]);
    useEffect(() => {
        categoryService.getAll().then(response => {
            console.log('catg');
            const categoriesArray = response.data.message.listAllResponse;
            //const tree = listToTree(categoriesArray, { idCol: 'Id', parentCol: null });
            console.log(categoriesArray);
            if (categoriesArray !== undefined) { setCategoriesTree(categoriesArray); }
        });
        languageService.getAll().then(response => {
            console.log('lang');
            const languagesArray = response.data.message.listAllResponse;
            //const tree = listToTree(categoriesArray, { idCol: 'Id', parentCol: null });
            console.log(response);
            if (languagesArray !== undefined) { setLanguagesTree(languagesArray); }
        })
    }, [])


    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const options = {

    }
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    const [selectedFile, setSelectedFile] = useState()
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

    const handleCreate = () => {
        const author = authService.getCurrentUserId()
        console.log('author', author);
        console.log('price', price);
        console.log("hehe1");
        if (!preview) { return }
        console.log("hehe");
        setImage(JSON.stringify(uploadImage(preview)));

        const newCourse = {
            name: title,
            title,
            sub_description: subDescription,
            description: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            image,
            price: Number(price),
            category,
            author: authService.getCurrentUserId(),
            promote: Number(promote),
            language,
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
                        //className={classes.input}
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
                <Grid container direction="column" className={classes.section} zeroMinWidth>
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
                        maxRows={4}
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
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="catg-label" >Category</InputLabel>
                        <Select
                            labelId="catg-select-label"
                            id="catg-select"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categoriesTree.map(category => (
                                <MenuItem value={category.Id}>
                                    {category.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="lang-label" >Category</InputLabel>
                        <Select
                            labelId="lang-select-label"
                            id="lang-select"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {languagesTree.map(lang => (
                                <MenuItem value={lang.Id}>
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
            <Button variant='primary' onClick={handleCreate}>Create</Button>
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