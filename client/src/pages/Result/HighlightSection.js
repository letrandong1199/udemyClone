import {
    useState,
    useEffect,
    forwardRef,
    Fragment,
} from 'react';
import {
    Typography,
    Tab,
    Tabs,
    Container,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import useGetParameter from '../../utils/useGetParameter'
import courseService from '../../services/course.service';
import MyCarousel from '../../components/MyCarousel';
import { useStyles } from './styles';

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

const HighlightSection = ({ setTitle, setLoading, setCategories, }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const category = useGetParameter('category');
    const [courses, setCourses] = useState([]);
    const [courses2, setCourses2] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        setLoading(true)
        const queryString = `category=${category}&sort=most-register&page=1&limit=10`;

        courseService.getByQuery(queryString)
            .then(response => {
                const listCourses = response.listAllResponse;
                if (listCourses?.length === 0) {
                    throw Error('No courses');
                }
                for (let course of listCourses) {
                    course.Tag = 'Best seller'
                }
                setTitle(response.Category.Name);
                setCategories(response.Category.Children);
                setLoading(false);
                setCourses(listCourses);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setError(error.message);
                setIsPending(false);
            })

        const queryString2 = `category=${category}&sort=most-recent&page=1&limit=10`;

        courseService.getByQuery(queryString2)
            .then(response => {
                const listCourses = response.listAllResponse;
                if (listCourses?.length === 0) {
                    throw Error('No courses');
                }
                for (let course of listCourses) {
                    course.Tag = 'New'
                }
                setCourses2(listCourses);
                setIsPending(false);
            }).catch(error => {
                console.log(error);
                setError(error.message);
                setIsPending(false);
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

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
                <StyledTab label="Most popular" {...a11yProps(0)} />
                <StyledTab label="Most recent" {...a11yProps(1)} />

            </StyledTabs>
            {error ? <Typography variant='h5'>{error}</Typography>
                : <Fragment>
                    <TabPanel value={value} index={0} >
                        {isPending ? <Skeleton width='100%' height='100px'></Skeleton>
                            : <MyCarousel courses={courses} />}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {isPending ? <Skeleton width='100%' height='100px'></Skeleton>
                            : <MyCarousel courses={courses2} />}
                    </TabPanel>
                </Fragment>
            }

        </Container>
    )
};

export default HighlightSection;