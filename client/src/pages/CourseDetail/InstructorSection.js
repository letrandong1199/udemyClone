import { memo } from 'react';
import {
    Container,
    Typography,
    Grid,
    Avatar,
    Divider
} from '@material-ui/core';
import {
    Skeleton,
    Rating
} from '@material-ui/lab';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { useStyles } from './styles';

const InstructorSection = memo(({ course, isPending }) => {
    const classes = useStyles();
    return (
        <Container className={`${classes.vibrant} ${classes.padding}`}>
            <Typography variant="h5" className={classes.title}>
                {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                Instructor
            </Typography>
            <Divider />
            {isPending
                ? <Skeleton width='100px' />
                : <Grid
                    item
                    container
                    direction="row"
                    alignItems="center">
                    <Typography variant="subtitle2">Rating: </Typography>
                    <Rating
                        name="hover-feedback"
                        className={classes.rating}
                        value={0}
                        precision={0.5}
                        size="small"
                        style={{ color: 'rgb(247, 187, 86)' }}
                    />
                    <Typography variant="subtitle2">100</Typography>
                </Grid>
            }
            <Grid container style={{ marginTop: 32 }} direction="row">
                <Grid item>
                    {isPending
                        ? <Skeleton><Avatar /></Skeleton>
                        : <Avatar
                            style={{ height: 128, width: 128 }}
                            src={course?.Author?.Thumbnail} size="large">
                            {course?.Author?.Name[0]}
                        </Avatar>
                    }
                </Grid>

                <Grid item xs={4} container direction="column" style={{ marginLeft: 32 }} >

                    <Typography variant="h6">{isPending
                        ? <Skeleton />
                        : course?.Author?.Name
                    }
                    </Typography>

                    <Grid container alignItems="center">
                        <PeopleAltRoundedIcon />
                        <Typography variant="body2">
                            &nbsp;&nbsp;4500 learners
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center">
                        <MenuBookRoundedIcon />
                        <Typography variant="body2">
                            &nbsp;&nbsp;45 courses
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    )
});

export default InstructorSection;
