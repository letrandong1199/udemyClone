import {
    useState,
    useEffect,
    Fragment
} from 'react';
import {
    Container,
    Typography,
    Button,
    Snackbar,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import {
    Alert,
    Skeleton,
} from '@material-ui/lab'
import { Editor } from '@nick4fake/react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw, } from 'draft-js';
import { useStyles } from './styles';
import courseService from '../../services/course.service';

const DescriptionPanel = ({ id, course, loading, setCourse }) => {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editable, setEditable] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        return event;
    };

    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    useEffect(() => {
        setIsPending(false);
        if (course.Description) {
            const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(course.Description)));
            setEditorState(contentState);
        }

    }, [loading, course]);


    const handleCancel = () => {
        const contentState = EditorState.createWithContent(convertFromRaw(course.Description));
        setEditorState(contentState);
    }

    const handleSave = () => {
        const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        setIsPending(true);
        courseService.updateOne(id, {
            Title: course.Title,
            Category_Id: course.Category.Id,
            Language_Id: course.Language.Id,
            Is_Completed: course.Is_Completed,
            Sub_Description: course.Sub_Description,
            Description: description
        }).then(response => {
            let dic = { ...course };
            dic.Description = description;
            setCourse(dic);
            setSnackContent('Success');
            setSnackType('success');
            setOpenSnack(true);
            setIsPending(false);
            return response;
        }).catch(error => {
            console.log(error);
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsPending(false);
        })
    }
    return (
        <Container className={classes.marginContainer}>
            <Typography variant="h5" className={classes.title}>
                Description
            </Typography>
            <Typography variant="body1" className={classes.caption}>
                {"This description will show in detail course page."}
            </Typography>
            {loading
                ? <Skeleton width='500' height='200' />
                : <div style={{ position: 'relative' }}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName={classes.toolbarEditor}
                        wrapperClassName={classes.wrapperEditor}
                        editorClassName={classes.editorEditor}
                        onEditorStateChange={handleEditorStateChange}
                        readOnly={!editable}
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                        }}
                    />

                </div>}

            {!isPending && editable
                ? <Fragment>
                    <Button
                        onClick={handleSave}
                        variant="outlined"
                        color="primary"
                    >Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Fragment>
                : <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setEditable(true)}
                >
                    Edit
                </Button>
            }
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
            <Backdrop open={isPending} className={classes.backdrop} >
                <CircularProgress color='primary' />
            </Backdrop>
        </Container>
    )
}

export default DescriptionPanel;