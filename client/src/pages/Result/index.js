import React from 'react'
import Typography from '@material-ui/core/Typography';
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

const courses_list = courses();

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
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


function Result() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Typography variant="h3" className={classes.bigTitle}>Development course</Typography>
            <Container className={classes.highlightSection} >
                <Typography variant="h4" style={{ textAlign: 'center', padding: 20 }}>Highlight course</Typography>
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
                    <MyCarousel courses={courses_list} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyCarousel courses={courses_list} />
                </TabPanel>

            </Container>
            <Container style={{ paddingTop: 20, paddingBottom: 20, }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>All course</Typography>
                <Grid container>

                </Grid>
                <List container style={{ padding: 20 }}>
                    {courses_list.map((course) =>
                        <Fragment>
                            <ListItem>
                                <ProductCardH course={course} />
                            </ListItem>
                            <Divider variant="middle" />
                        </Fragment>)}


                </List>

            </Container>

        </div>
    )
}

export default Result;