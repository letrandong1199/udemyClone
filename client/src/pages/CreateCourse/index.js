import React from 'react'
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
import List from '@material-ui/core/List';

function CreateCourse() {
    const classes = useStyles();
    const [category, setCategory] = React.useState(null);
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const options = {

    }
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    const [selectedFile, setSelectedFile] = React.useState()
    const [preview, setPreview] = React.useState("/assets/image.svg");

    React.useEffect(() => {
        if (!selectedFile) {
            setPreview("/assets/image.svg");
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleUpload = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(event.target.files[0]);
    }
    const handleResetPreview = () => {
        setPreview("/assets/image.svg");
        setSelectedFile(undefined);
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
                    <TextField id="standard-basic" label="Title" variant="outlined" />
                    <TextField id="filled-basic" label="Short description" multiline maxRows={4} variant="outlined" />
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            onChange={handleChangeCategory}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Web</MenuItem>
                            <MenuItem value={20}>Mobile</MenuItem>
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