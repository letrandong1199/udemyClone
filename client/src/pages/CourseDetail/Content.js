import { useState, Fragment } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
} from '@material-ui/core';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import SubjectIcon from '@material-ui/icons/Subject';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { useStyles } from './styles';

const Content = ({ course, isPending }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        return event;
    };

    const handleOpenList = (list) => (event) => {
        if (expandedList.includes(list)) {
            let temp = [...expandedList];
            temp.pop(temp.indexOf(list))
            setExpandedList(temp)
        } else {
            setExpandedList([list, ...expandedList])
        }


        return event;
    };

    return (
        <Container className={`${classes.vibrant} ${classes.padding}`}>
            <Typography variant="h5" className={classes.title} style={{ textAlign: 'center' }}>
                Course content
            </Typography>
            <Grid container>
                <Card className={classes.cardContent}>
                    {!isPending && course && course?.Content?.map((section, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `panel-${index}`}
                            onChange={handleChange(`panel-${index}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                            >
                                <Typography className={classes.heading}>Chapter
                                    <br /><span>{index + 1}</span>
                                </Typography>
                                <Grid container direction="column">
                                    <Grid container alignItems="center">
                                        <AccessTimeIcon color="secondary" />
                                        <Typography variant="subtitle1">&nbsp;&nbsp;{`${section.Lectures.length} lectures`}</Typography>
                                    </Grid>
                                    <Typography variant="h4">{section.Name}</Typography>
                                    <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                                </Grid>

                            </AccordionSummary>
                            <AccordionDetails>
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    className={classes.listRoot}
                                >
                                    {section?.Lectures.map((lecture, index) => (
                                        <Fragment key={index}>
                                            <ListItem
                                                key={`${index}-list`}
                                                button
                                                onClick={handleOpenList(`item-${index}`)}>
                                                <ListItemIcon>
                                                    <PlayCircleFilledWhiteRoundedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={lecture.Title} />
                                                {expandedList.includes(`item-${index}`)
                                                    ? <ExpandLessIcon />
                                                    : <ExpandMoreIcon />}
                                            </ListItem>
                                            <Collapse
                                                key={`${index}-collapse`}
                                                in={expandedList.includes(`item-${index}`)}
                                                timeout="auto"
                                                unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {lecture.Description &&
                                                        <ListItem
                                                            key={`${index}-des`}
                                                            button
                                                            className={classes.nested}>
                                                            <ListItemIcon>
                                                                <SubjectIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={lecture.Description} />
                                                        </ListItem>
                                                    }
                                                    {lecture.Media.map((media, index) => {
                                                        return media && <ListItem
                                                            key={index}
                                                            href={media.Video_URL}
                                                            className={classes.nested}
                                                            component='a'
                                                        >
                                                            <ListItemIcon>
                                                                <PlayCircleFilledWhiteRoundedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={`Preview`} />
                                                        </ListItem>
                                                    })}
                                                </List>
                                            </Collapse>
                                        </Fragment>
                                    ))
                                    }
                                </List>
                            </AccordionDetails>
                        </Accordion>))
                    }
                </Card>
            </Grid>
        </Container >
    )
};
export default Content;