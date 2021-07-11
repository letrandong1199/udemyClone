import ProductCardV from './ProductCardV';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
    bigTitle: {
        position: 'relative',
        //marginBottom: '10px',
        //width: '100%',
        textAlign: 'center',
        backgroundColor: /*'rgb(55, 51, 51)',*/ 'rgb(235, 243, 255)',
        //color: '',
        color: 'rgb(60, 60, 59)',
        padding: '45px',
        //fontWeight: 'bold',
        //fontSize: '24px',
        //borderBottom: '3px solid rgb(60, 60, 59)',
        //lineHeight: '1.1em',
        // marginBottom: '10px',
        /*
        overflow: 'hidden',
        '&::before': {
            backgroundColor: 'rgb(60, 60, 59)',
            content: '""',
            display: 'inline-block',
            border: '1px solid rgb(60, 60, 59)',
            height: '1px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%',
            right: '0.5em',
            marginLeft: '-50%',
        },
        '&::after': {
            backgroundColor: 'rgb(60, 60, 59)',
            content: '""',
            display: 'inline-block',
            border: '1px solid rgb(60, 60, 59)',
            height: '1px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%',
            left: '0.5em',
            marginRight: '-50%',
        },*/
    },

    homeSection: {
        position: 'relative',
        backgroundColor: 'rgb(245, 245, 245)', //'rgb(240, 238, 230)',
        padding: '10px',
        //width: 'calc(100% + 12px)',
        justifyContent: 'space-between',
        //marginTop: '10px',
        //marginBottom: '10px'

    },
    section: {
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh',
        display: 'flex',
        textAlign: 'center',
        height: '100px',
        margin: 0
        //flexDirection: 'column',
        //position: 'absolute',
        //top: '50%',
        //left: '50%',
        //transform: 'translate(-50 %, -50 %)'
    },
}));



function HomeSection(props) {

    const classes = useStyles();
    const list_courses = props.courses.map((course, index) => {
        return <Grid item key={index}>
            <ProductCardV course={course} />

        </Grid>
    })
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    return (
        <div>
            <Grid className={classes.bigTitle}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid>
                <Grid container
                    spacing={0}
                    className={classes.homeSection}
                >
                    {list_courses}
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeSection