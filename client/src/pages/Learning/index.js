import { useState, useEffect, Fragment, useRef } from 'react'
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
import { Link, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
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
import Box from '@material-ui/core/Box';
import ReactPlayer from 'react-player';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Collapse } from '@material-ui/core';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import enrolledCourseService from '../../services/enrolledCourse.service';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import wishlistService from '../../services/wishlist.service.js';
import Backdrop from '@material-ui/core/Backdrop';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ENROLLED, ADD_WISHLIST } from '../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dashboard = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        courseService.getContentByCourseId(id).then((content) => {
            setContent(content.resultResponse.Content);
        }).catch(error => {
            console.log(error);
        })
    }, [id])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        return event;
    };

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
    const [url, setUrl] = useState(null);
    const [played, setPlayed] = useState(0);
    const sections = [
        {
            Name: 'Basic',
            Lectures: [
                {
                    Title: 'Basic Lo',
                    Link: {
                        url: 'http://res.cloudinary.com/dlupxhne4/video/upload/v1627751834/udemy/psdzlh3zfnceeubiaglu.mp4'
                    }
                }
            ]
        },
        {
            Name: 'Basic new',
            Lectures: [
                {
                    Title: 'Basic Lo lo',
                    Link: {
                        url: 'http://res.cloudinary.com/dlupxhne4/video/upload/v1627814924/udemy/p9xstbzqmspqut8iqjqb.mp4',
                        played: 0.5,
                    }
                }
            ]
        }
    ]
    const player = useRef();
    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>Learning</Typography>
            <Container style={{ minHeight: 500, display: 'flex' }}>
                <ReactPlayer
                    controls
                    url={url}
                    rel={player}
                />
                <Box style={{ background: 'rgb(241,241,241)', flexGrow: 1, overflow: 'hidden' }}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.listRoot}
                    >
                        {content.map((section, index) => (
                            <Fragment>
                                <ListItem button onClick={handleOpenList(`item-${index}`)}>
                                    <ListItemText primary={section.Name} />
                                    {expandedList.includes(`item-${index}`) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItem>
                                <Collapse in={expandedList.includes(`item-${index}`)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {section.Lectures.map((lecture, index) =>
                                            <ListItem button
                                                className={classes.nested}
                                                onClick={() => {
                                                    setUrl(`${lecture?.Media[0]?.Video_URL}`)
                                                }}
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
                </Box>
            </Container>
        </div >
    )
}

export default Dashboard;