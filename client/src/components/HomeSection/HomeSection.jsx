import ProductCardV from '../ProductCardV/ProductCardV.jsx';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react'
import { useStyles } from './styles';
import CategoryCard from '../CategoryCard/CategoryCard.jsx'



function HomeSection(props) {
    const classes = useStyles(props);
    let list_ = undefined;

    if (props.courses) {
        list_ = props.courses.map((course, index) => {
            return <Grid item key={index} >
                <ProductCardV course={course} />

            </Grid>
        })
    }
    else if (props.categories) {
        list_ = props.categories.map((catg, index) => {
            return <CategoryCard key={index} catg={catg} />

        })
    }

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
                    <div className={classes.list}>
                        {list_}
                    </div>

                </Grid>

            </Grid>
        </Fragment >
    )
}

export default HomeSection