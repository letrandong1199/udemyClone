import { useState, useEffect, Fragment, useRef } from 'react'
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import courseService from '../../services/course.service';
import { useParams } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import ReactPlayer from 'react-player';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Collapse } from '@material-ui/core';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Dashboard = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        courseService.getContentByCourseId(id).then((content) => {
            setContent(content.resultResponse.Content);
            console.log(content);
        }).catch(error => {
            console.log(error);
        })
    }, [id])


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