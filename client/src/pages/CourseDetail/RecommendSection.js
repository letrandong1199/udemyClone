import { memo } from 'react';
import { Container, Typography } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';
import MyCarousel from '../../components/MyCarousel';
import { useStyles } from './styles';

const RecommendSection = memo(({ course, isPending }) => {
    const classes = useStyles();

    return (
        <Container style={{ padding: 20 }}>
            <Typography
                variant="h5"
                className={classes.title}
                style={{ textAlign: 'center' }}
            >
                People interested in this course also viewed
            </Typography>
            {isPending
                ? <Skeleton width='100%' height='100px'></Skeleton>
                : course.Similar_Courses && <MyCarousel courses={course.Similar_Courses} loading={isPending} />}
        </Container >
    )
});
export default RecommendSection;