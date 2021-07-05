import ProductCardV from './ProductCardV';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    bigTitle: {
        marginBottom: '10px',
        textAlign: 'center',
        backgroundColor: 'rgb(55, 51, 51)',
        color: 'whitesmoke',
        padding: '35px'
    },
    homeSection: {
        position: 'relative',
        backgroundColor: 'rgb(240, 238, 230)',
        padding: '10px',
        width: 'calc(100% + 12px)',
        justifyContent: 'space-arounds'
    }
}));



function HomeSection(props) {

    const classes = useStyles();
    const list_courses = props.courses.map((course, index) => {
        return <Grid item xs={6} sm={3} key={index}><ProductCardV course={course} /></Grid>
    })
    return (
        <div>
            <Typography variant="h6" className={classes.bigTitle}>{props.title}</Typography>
            <Grid container
                spacing={3}
                className={classes.homeSection}
            >
                {list_courses}
            </Grid>
        </div>
    )
}

export default HomeSection