import { Grid, Typography } from '@material-ui/core';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded';

import { useStyles } from './styles';

const HomeIntroBanner = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}>
                <MenuBookRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Courses</Typography>
                <Typography className={classes.body}>Variant video courses</Typography>
            </Grid>
            <Grid item xs={4}>
                <PeopleOutlineRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Instructor</Typography>
                <Typography className={classes.body}>Most content from top instructor </Typography>
            </Grid>
            <Grid item xs={4}>
                <AllInclusiveRoundedIcon fontSize="large" />
                <Typography variant="h6" color="inherit">Flexible</Typography>
                <Typography className={classes.body}>Learn on anything device</Typography>
            </Grid>
        </Grid>
    )
};

export default HomeIntroBanner;