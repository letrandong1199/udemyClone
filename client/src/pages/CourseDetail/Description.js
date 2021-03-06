import { useState, memo, useRef, useEffect } from 'react';
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

const Description = memo(({ course, isPending }) => {
    const classes = useStyles();
    let description = '';

    try {
        if (course?.Description) {
            description = draftToHtml(JSON.parse(course?.Description))
        }

    } catch (error) {
        console.log(error);
    }
    const [more, setMore] = useState(undefined);
    const desRef = useRef();
    useEffect(() => {
        setMore(desRef.current?.scrollHeight > 200 ? false : undefined);
    }, [course])
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
                    : <div style={{width: '100%'}}>
                        <Typography
                            ref={desRef}
                            className={more ? 'off' : `${classes.limit}`}
                            component="div"
                            dangerouslySetInnerHTML={{
                                __html: description
                            }} >
                        </Typography>
                        {more === false && <div className={classes.fade} />}
                    </div>
                }

                {isPending ? <Skeleton width='100%' height='50px' />
                    : more !== undefined &&
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
                    </Button>}

            </Grid>
        </Container >
    )
});

export default Description;
