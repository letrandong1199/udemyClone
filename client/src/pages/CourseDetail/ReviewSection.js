import { memo, useState } from 'react';
import {
    Typography,
    Grid,
    List,
    Avatar,
    CircularProgress,
    Container,
    Button,
} from '@material-ui/core';
import {
    Skeleton,
    Rating
} from '@material-ui/lab';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import { useStyles } from './styles';

const Feedback = ({ feedback, loading }) => {
    const classes = useStyles();

    return (
        <Grid container style={{ marginTop: 32 }} direction="row">
            <Grid item>
                {loading
                    ? <Skeleton><Avatar /></Skeleton>
                    : <Avatar
                        style={{ height: 50, width: 50 }}
                        size="large">
                        {feedback?.User_Name[0]}
                    </Avatar>
                }
            </Grid>
            <Grid item xs={8} container direction="column"
                style={{ marginLeft: 10 }} >
                {loading ? <Skeleton width='100px' height='20px' />
                    : <Rating
                        name="hover-feedback"
                        className={classes.rating}
                        value={feedback?.Rating}
                        precision={0.5}
                        size="small"
                        readOnly={true}
                        style={{ left: '-2px' }}
                    />
                }
                <Typography variant="body2">
                    {`by ${feedback?.User_Name}`}
                </Typography>
            </Grid>
            <div style={{ width: '100%', marginTop: 10 }}>
                <Typography variant="body2">
                    {feedback?.Content}
                </Typography>
            </div>
        </Grid>
    )
}

const RatingGraph = ({ rating, numberOfRating, feedbacks, loading }) => {
    const classes = useStyles();
    return (
        <Grid item container direction='column'>
            <Typography
                variant='h2'
                style={{ fontSize: 54, fontWeight: 'bold' }}>
                {loading
                    ? <Skeleton width='50px' />
                    : rating !== null ? rating?.toFixed(1) : '0.0'}
            </Typography>
            <Grid
                item
                container
                alignItems='center'
            >
                {loading ? <Skeleton width="120px" height='30px' />
                    : <Rating
                        name='feedback'
                        className={classes.rating}
                        value={parseFloat(rating?.toFixed(1))}
                        precision={0.5}
                        size='medium'
                        readOnly={true}
                        style={{ left: '-2px' }}
                    />
                }
                <Typography variant="subtitle2" style={{ lineHeight: 1 }}>
                    {loading
                        ? <Skeleton />
                        : `(${Number(numberOfRating)?.toLocaleString()})`}
                </Typography>
            </Grid>
            <List>
                {[5, 4, 3, 2, 1].map((item, index) => {
                    const res = feedbacks?.filter(({
                        Rating
                    }) => Rating > item - 0.5 && Rating <= item + 0.5);

                    const per = numberOfRating ? (res?.length / numberOfRating * 100)?.toFixed(0) : 0;

                    return <li
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            style={{ minWidth: 50 }}
                            variant='subtitle2'>{item} star{item !== 1 && 's'}
                        </Typography>
                        <div style={{
                            height: 13,
                            minWidth: 200,
                            borderRadius: 10,
                            background: `linear-gradient(90deg,Orange ${per}%, rgba(255, 165, 0, 0.5) ${per}%)`
                        }}
                        />
                    </li>
                })}
            </List>
        </Grid>
    )
}

const ReviewSection = memo(({ course, loading }) => {
    const classes = useStyles();
    const [numShow, setNumShow] = useState({
        current: 3,
        next: 3,
        back: -3,
    });
    const handleShow = () => {
        setNumShow({
            ...numShow,
            current: numShow.current < course?.Feedbacks?.length
                ? numShow.current + numShow.next
                : numShow.next
        })
    }
    return (
        <Container className={`${classes.padding}`}>
            <Typography variant="h5" className={classes.title}>
                {/*<span style={{ backgroundImage: 'linear-gradient(transparent 25px, #F243B3 50%, #FFCA47 100%)' }}>Course content</span>*/}
                Review
            </Typography>
            <Grid container>
                <Grid container item sm={4} xs={12} >
                    <RatingGraph
                        loading={loading}
                        rating={course?.Rating}
                        feedbacks={course?.Feedbacks}
                        numberOfRating={course?.Number_Of_Rating}
                    />
                </Grid >
                <Grid container item sm={8} style={{ marginTop: 16 }}>
                    <Typography variant="h6" style={{ width: '100%' }}>Top feedbacks from enrollments</Typography>
                    <List style={{ width: '100%' }}>
                        {!loading && course?.Feedbacks?.slice(0, numShow.current).map((feedback, index) => {
                            return <li key={index}><Feedback feedback={feedback} loading={loading} /></li>
                        })}
                        {!loading && course?.Feedbacks?.length === 0 &&
                            <Typography>This course has no feedbacks yet.</Typography>
                        }
                        {loading && <CircularProgress />}
                    </List>
                    <Button
                        variant='text'
                        size='small'
                        disableRipple
                        disableFocusRipple
                        disableElevation
                        color='primary'
                        style={{ padding: 0, }}
                        className={course?.Feedbacks?.length > numShow.next
                            ? ''
                            : `${classes.hide}`}
                        onClick={handleShow}
                        endIcon={
                            numShow.current < course?.Feedbacks?.length
                                ? <ExpandMoreRoundedIcon />
                                : <ExpandLessRoundedIcon />
                        }
                    >
                        {numShow.current < course?.Feedbacks?.length ? 'Show more' : 'Show less'}
                    </Button>
                </Grid>
            </Grid >
        </Container>

    )
});

export default ReviewSection;

