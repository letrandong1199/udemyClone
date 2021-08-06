import { Fragment } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    useScrollTrigger,
} from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import { Skeleton } from '@material-ui/lab';
import { useStyles } from './styles';

const PageNavigation = ({ course, isPending, handleEnroll, handleAddWishlist }) => {
    const classes = useStyles();
    const trigger = useScrollTrigger({ threshold: 700 });

    return (
        <Fragment>
            <AppBar
                className={trigger
                    ? `${classes.titleBar} ${classes.show}`
                    : `${classes.titleBar} ${classes.hide}`}
            >
                <Toolbar>
                    <Grid
                        container
                        alignItems='center'
                        style={{ justifyContent: 'space-between' }}
                    >
                        <Typography variant='h6'>
                            {isPending ? <Skeleton /> : course?.Title}
                        </Typography>
                        <Grid>
                            {isPending
                                ? <Skeleton><Button /></Skeleton>
                                : <Button
                                    color='primary'
                                    size='large'
                                    variant='outlined'
                                    style={{ marginRight: 20, textTransform: 'none' }}
                                    onClick={handleEnroll}
                                    startIcon={<AddCircleOutlineRoundedIcon />}
                                >
                                    Enroll for {course?.price ? course?.price + '$' : 'Free'}
                                </Button>
                            }
                            {isPending
                                ? <Skeleton><Button /></Skeleton>
                                : <Button
                                    color="primary"
                                    size="large"
                                    variant="outlined"
                                    startIcon={<FavoriteBorderRoundedIcon />}
                                    onClick={handleAddWishlist}
                                    style={{ marginRight: 20, textTransform: 'none' }}
                                >
                                    {'Wishlist'}
                                </Button>
                            }
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <ButtonGroup
                disableFocusRipple
                disableRipple
                disableElevation
                elevation={1}
                variant="contained"
                aria-label="large button group"
                className={classes.buttonGroup}>
                <Button
                    disableElevation
                    href="#description-section">About</Button>
                <Button disableElevation href="#instructor-section">Instructor</Button>
                <Button disableElevation href="#content-section" >Content</Button>
                <Button disableElevation href="#review-section">Review</Button>
                <Button disableElevation>FAQ</Button>
            </ButtonGroup >
        </Fragment >
    )
};

export default PageNavigation;