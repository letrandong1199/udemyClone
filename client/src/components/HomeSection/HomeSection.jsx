import ProductCardV from '../ProductCardV/ProductCardV.jsx';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react'
import { useStyles } from './styles';



function HomeSection(props) {
    const classes = useStyles();
    const list_courses = props.courses.map((course, index) => {
        return <Grid item key={index}>
            <ProductCardV course={course} />

        </Grid>
    })

    return (
        <Fragment>
            <Grid className={classes.bigTitle}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid>
                <Grid container
                    className={classes.homeSection}
                >
                    {list_courses}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default HomeSection