import ProductCardV from '../ProductCardV';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react'
import { useStyles } from './styles';
import CategoryCard from '../CategoryCard'



function HomeSection({
    title,
    showProgress,
    disableTitle,
    courses,
    categories,
    isEnrolled,
    isWishlist,
    hidePrice,
    handleRemove,
    color }) {
    const classes = useStyles({ color });
    let list_ = undefined;

    if (courses) {
        list_ = courses.map((course, index) => {
            return <Grid item key={index} >
                <ProductCardV
                    showProgress={showProgress}
                    course={course}
                    isEnrolled={isEnrolled}
                    isWishlist={isWishlist}
                    hidePrice={hidePrice}
                    handleRemove={handleRemove !== undefined
                        ? handleRemove(course.Id)
                        : undefined}
                />
            </Grid>
        })
    }
    else if (categories) {
        list_ = categories.map((catg, index) => {
            return <CategoryCard key={index} category={catg} />

        })
    }

    return (
        <Fragment>
            {!disableTitle && <Grid className={classes.bigTitle}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
            </Grid>}
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