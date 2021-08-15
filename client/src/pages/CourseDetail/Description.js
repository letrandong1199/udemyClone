import { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

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
    const [more, setMore] = useState(false);
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
                    : <Typography
                        className={!more ? `${classes.limit}` : 'off'}
                        component="div"
                        dangerouslySetInnerHTML={{
                            __html: description
                        }} >
                    </Typography>
                }

                <Button
                    variant='text'
                    size='small'
                    disableRipple
                    disableFocusRipple
                    disableElevation
                    color='primary'
                    style={{ padding: 0 }}
                    onClick={() => setMore(!more)}
                    endIcon={more ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                >
                    {more ? 'Show less' : 'Show more'}
                </Button>

            </Grid>
        </Container >
    )
};

export default Description;