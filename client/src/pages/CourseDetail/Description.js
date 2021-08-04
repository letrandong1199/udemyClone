import {
    Container,
    Typography,
    Grid
} from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';
import draftToHtml from 'draftjs-to-html';

import { useStyles } from './styles';

const Description = ({ course, isPending }) => {
    const classes = useStyles();
    let description = '';
    try {
        if (course?.Description) {
            description = draftToHtml(JSON.parse(course?.Description))
        }

    } catch (error) {
        console.log(error);
    }

    return (
        <Container className={classes.padding}>
            <Grid
                container
                style={{ justifyContent: 'space-between' }}
            >

                <Typography variant='h5' className={classes.title}>
                    About this Course
                </Typography>
                {isPending
                    ? <Skeleton width='100%' height='50px' />
                    : <Typography component="div" dangerouslySetInnerHTML={{
                        __html: description
                    }} >
                    </Typography>
                }
            </Grid>
        </Container >
    )
};

export default Description;