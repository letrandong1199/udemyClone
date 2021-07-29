import { useState, useEffect, useRef, forwardRef } from 'react'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { courses } from '../../utils/dataSample';
import ProductCardV from '../../components/ProductCardV/ProductCardV.jsx';
import MyCarousel from '../../components/MyCarousel/MyCarousel.jsx';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ProductCardH from '../../components/ProductCardH/ProductCardH.jsx';
import Divider from '@material-ui/core/Divider';
import { Fragment } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import courseService from '../../services/course.service';
import Skeleton from '@material-ui/lab/Skeleton';
import languageService from '../../services/language.service';

const courses_list = courses();

const TabPanel = forwardRef(function TabPanel(props, ref) {
    const { children, value, index, ...other } = props;

    return (
        <div
            ref={ref}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{ marginTop: 20 }}>{children}</div>
            )}
        </div>
    );
});

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        //color: '#fff',
        //fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        //marginRight: theme.spacing(1),
        minWidth: 120,
        padding: 0,
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        //backgroundColor: 'transparent',

    },
})((props) => <Tabs {...props} />);

const HighlightSection = ({ courses, isPending }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container className={classes.highlightSection} >
            <Typography variant="h4" className={classes.title}>Highlight course</Typography>
            <StyledTabs value={value}
                onChange={handleChange}
                aria-label="login"
                indicatorColor="primary"
                centered
                textColor="primary"
            >
                <StyledTab label="Most viewed" {...a11yProps(0)} />
                <StyledTab label="Most recent" {...a11yProps(1)} />

            </StyledTabs>
            <TabPanel value={value} index={0} >
                {isPending ? <Skeleton width='100%' height='100px'></Skeleton>
                    : <MyCarousel courses={courses} />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {isPending ? <Skeleton width='100%' height='100px'></Skeleton>
                    : <MyCarousel courses={courses} />}
            </TabPanel>

        </Container>
    )
}

const AllCoursesSection = ({ id }) => {
    const classes = useStyles();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [languages, setLanguages] = useState([]);
    const [isPendingLang, setIsPendingLang] = useState(false);
    const [languagesQuery, setLanguagesQuery] = useState(null);
    const limit = 5;
    useEffect(() => {
        setIsPending(true);
        languageService.getAll().then(response => {
            const languagesRes = response.data.message.listAllResponse;
            const langDic = []
            for (let i = 0; i < languagesRes.length; i += 1)
                langDic.push({ label: languagesRes[i].Name, value: languagesRes[i].Id })

            setLanguages(langDic);
            console.log(langDic);
        })

        setIsPending(false);
    }, [])

    useEffect(() => {
        setIsPending(true);
        setTimeout(() => { console.log('test'); }, 3000);
        const query = { 'category': id, page: page, limit: limit }
        if (languagesQuery) {
            query['language'] = languagesQuery[0].value;
        }
        courseService.getByQuery(query)
            .then(response => {
                console.log('Get', response.data);
                const listCourses = response.data.message.listAllResponse;
                if (listCourses?.length === 0) {
                    //throw Error('No courses');
                }
                setCount(response.data.message.Count)
                setCourses(listCourses);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setError(error);
                setIsPending(false);
            })
    }, [id, page, languagesQuery])

    const options = [
        { label: 'Thing 1', value: 1 },
        { label: 'Thing 2', value: 2 },
    ];
    const [option, setOption] = useState([]);
    const handleChangeOption = (event) => {
        setLanguagesQuery(event);
        console.log(event);
    };
    const handleDelete = (event) => {

    }

    const styles = {
        menu: (provided, state) => ({
            border: '1px solid',
            borderRadius: 5
        }),
        option: (provided, state) => ({
            ...provided,
            borderRadius: 5,

        }),
    };
    const handleChangePage = (event, value) => {
        setPage(value)
    }

    return (
        <Container className={classes.section}>
            <Typography variant="h4" className={classes.title}>All course</Typography>
            <Grid container className={classes.filterContainer}>
                <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="Language"
                    options={languages}
                    //value={selectedOption}
                    onChange={handleChangeOption}
                    hideSearch={true}
                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => placeholderButtonLabel}
                    className={classes.selectStyles}
                />
                <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="Duration"
                    options={options}
                    //value={selectedOption}
                    onChange={handleChangeOption}
                    hideSearch={true}
                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => placeholderButtonLabel}
                />
                <ReactMultiSelectCheckboxes
                    placeholderButtonLabel="Rating"
                    options={options}
                    //value={selectedOption}
                    onChange={handleChangeOption}
                    hideSearch={true}
                    getDropdownButtonLabel={({ placeholderButtonLabel, value }) => placeholderButtonLabel}
                />
            </Grid>
            <Grid container className={classes.chipsContainer}>
                {option.map((opt, index) => {
                    return <Chip key={index} label={opt.label}
                        onDelete={handleDelete} />
                })}
            </Grid>

            <List style={{ padding: 20 }}>
                {isPending
                    ? <Skeleton height='100px' width='auto'><ListItem /></Skeleton>
                    : courses?.map((course, index) =>
                        <Fragment key={index}>
                            <ListItem key={index}>
                                <ProductCardH course={course} />
                            </ListItem>
                            <Divider variant="middle" />
                        </Fragment>)
                }
            </List>

            <Grid container alignItems="center" style={{ justifyContent: 'center', marginLeft: 20 }}>
                {isPending
                    ? <Skeleton width='50%' height='50px' />
                    : <Pagination
                        page={page}
                        count={(parseInt(count) / limit).toFixed(0)}
                        color="primary"
                        onChange={handleChangePage}
                    />
                }
            </Grid>

        </Container >
    )
}

function Result() {
    const classes = useStyles();



    // Get id by url params
    const { id } = useParams();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        setTimeout(() => { console.log('test'); }, 5000);
        courseService.getByQuery({ 'category': id })
            .then(response => {
                console.log('Get', response.data.message.listAllResponse);
                const listCourses = response.data.message.listAllResponse;
                if (listCourses?.length === 0) {
                    //throw Error('No courses');
                }
                setCourses(listCourses);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setError(error);
                setIsPending(false);

            })
    }, [id])

    return (
        <div>
            {isPending && courses
                ? <Skeleton variant="h3" />
                : <Typography
                    variant="h3"
                    className={classes.bigTitle}> {courses.length !== 0 ? courses[0]?.Category?.Name : 'Not found'}
                </Typography>
            }
            {error ? <Typography>{error}</Typography>
                : <HighlightSection courses={courses} isPending={isPending} />
            }
            {error ? <Typography>{error}</Typography>
                : <AllCoursesSection id={id} />
            }
        </div>
    )
}

export default Result;