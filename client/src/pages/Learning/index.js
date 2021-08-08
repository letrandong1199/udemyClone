import {
    useState,
    useEffect,
    Fragment,
    useRef
} from 'react'

import ReactPlayer from 'react-player';
import {
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogContent,
    Collapse,
    Grid,
    TextField,
    Button,
    DialogActions,
    ListItem,
    List,
    Typography,
    CircularProgress,
    Backdrop,
    Snackbar,
    Box,
    DialogTitle
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {
    Skeleton,
    Rating,
    Alert
} from '@material-ui/lab';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import enrolledCourseService from '../../services/enrolledCourse.service';
import feedbackService from '../../services/feedback.service';
import mediaUserService from '../../services/mediaUser.service';
import { useStyles } from './styles';

import courseService from '../../services/course.service';
import { useParams } from 'react-router-dom';



const Dashboard = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [expandedList, setExpandedList] = useState([]);
    const [content, setContent] = useState([]);
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [url, setUrl] = useState(null);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(-1);
    const [review, setReview] = useState(null);
    const [mode, setMode] = useState(-1);
    const player = useRef();
    const [selectedIndex, setSelectedIndex] = useState('0-0');

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');
    const [currentPlaying, setCurrentPlaying] = useState(null);

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        setIsPending(true);
        courseService.getContentByCourseId(id).then((response) => {
            setContent(response.resultResponse.Content);
            setRating(response.resultResponse.Rating);
            if (response.resultResponse.Feedback !== undefined
                && response.resultResponse.Feedback) {
                setMode(response.resultResponse.Feedback.Id);
                setReview(response.resultResponse.Feedback.Content)
            }
            setCurrentPlaying(response.resultResponse.Content[0]?.Lectures[0]?.Media[0]);
            setIsPending(false);
        }).catch(error => {
            console.log(error);
            setIsPending(false);
            setError(error.message);
        })

    }, [id])

    const handleCloseDialog = () => {
        setOpenReviewDialog(false)
    }

    const handleOnProgress = (played, loaded) => {

        if (currentPlaying) {
            mediaUserService.postOne({
                Media_Id: currentPlaying?.Id,
                Played: played.playedSeconds,
            }).then(response => {
                return response;
            }).catch(err => {
                console.log(error);
            })
        }
    }

    const handleOpenList = (list) => (event, isExpanded) => {
        if (expandedList.includes(list)) {
            let temp = [...expandedList];
            temp.pop(temp.indexOf(list))
            setExpandedList(temp)
        } else {
            setExpandedList([list, ...expandedList])
        }


        return event;
    };

    const handleListItemClick = (event, lecture, indexLecture) => {
        setUrl(`${lecture?.Media[0]?.Video_URL}`);
        console.log(lecture);
        setCurrentPlaying(lecture?.Media[0]);
        setSelectedIndex(indexLecture);
    };

    const handleSave = () => {
        enrolledCourseService.updateOne({ Course_Id: id, Rating: rating }).then(() => {
            setSnackContent('Rating added');
            setSnackType('success');
            setOpenSnack(true);
            setIsProcessing(false)
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsProcessing(false)
            console.log(error);
        })
        if (mode === -1) {
            feedbackService.postOne({ Course_Id: id, Content: review }).then(() => {
                setSnackContent('Comment added');
                setSnackType('success');
                setOpenSnack(true);
                setIsProcessing(false)
            }).catch(error => {
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsProcessing(false)
                console.log(error);
            })
        } else if (mode !== undefined) {
            feedbackService.updateOne(mode, { Course_Id: id, Content: review }).then(() => {
                setSnackContent('Comment update');
                setSnackType('success');
                setOpenSnack(true);
                setIsProcessing(false)
            }).catch(error => {
                setSnackContent(error.message);
                setSnackType('error');
                setOpenSnack(true);
                setIsProcessing(false)
                console.log(error);
            })
        }
    }

    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>Learning</Typography>
            {!error && <Grid container>
                {isPending
                    ? <Skeleton width='66%' height='300px' />
                    : <Grid item sm={8} xs={12}>
                        <ReactPlayer
                            onProgress={handleOnProgress}
                            controls
                            progressInterval={10000}
                            url={`${currentPlaying?.Video_URL}#t=${currentPlaying?.Played}`}
                            rel={player}
                            width={'100%'}
                        />
                    </Grid>
                }
                {isPending
                    ? <Skeleton width='33%' height='300px' />
                    : <Grid item sm={4} xs={12}>
                        <div
                            className={classes.boxTitle}
                        >
                            <Typography variant='h6'>Content</Typography>
                            <Button
                                startIcon={<AddCommentRoundedIcon />}
                                onClick={() => { setOpenReviewDialog(true) }}
                            >
                                {mode === -1 ? 'Write review' : 'Your review'}
                            </Button>
                        </div>

                        <List
                            component="nav"
                            aria-labelledby="content"
                            className={classes.listRoot}
                        >
                            {content.map((section, index) => (
                                <Fragment key={index}>
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={handleOpenList(`item-${index}`)}
                                    >
                                        <ListItemText
                                            primary={section.Name}
                                        />
                                        {expandedList.includes(`item-${index}`) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItem>
                                    <Collapse in={expandedList.includes(`item-${index}`)} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {section.Lectures.map((lecture, indexLecture) =>
                                                <ListItem
                                                    key={indexLecture}
                                                    button
                                                    selected={selectedIndex === `${index}-${indexLecture}`}
                                                    onClick={
                                                        event => handleListItemClick(event, lecture, `${index}-${indexLecture}`)
                                                    }
                                                    className={classes.nested}
                                                >
                                                    <ListItemIcon>
                                                        <PlayCircleFilledWhiteRoundedIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={lecture.Title} />
                                                </ListItem>)}
                                        </List>
                                    </Collapse>
                                </Fragment>
                            ))
                            }
                        </List>

                    </Grid>
                }
            </Grid >
            }
            {error && <Typography>{error}</Typography>}
            <Dialog open={openReviewDialog}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <div className={classes.ratingRoot}>
                        <Rating
                            name="hover-feedback"
                            className={classes.rating}
                            value={rating || 0}
                            precision={0.5}
                            size="medium"
                            style={{ left: '-2px' }}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                    </div>
                    <TextField
                        value={review || ''}
                        autoFocus
                        margin='dense'
                        multiline
                        id='review'
                        label='Review'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => { setReview(event.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop className={classes.backdrop} open={isProcessing}>
                <CircularProgress color='primary' />
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

        </div >
    )
}

export default Dashboard;