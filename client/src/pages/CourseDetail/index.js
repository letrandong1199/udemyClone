import { useState, useEffect, useReducer } from 'react';
import {
    Typography,
    Backdrop,
    Snackbar,
    CircularProgress,
} from '@material-ui/core';

import {
    Alert
} from '@material-ui/lab';

import { useParams, useHistory } from 'react-router-dom';

import courseService from '../../services/course.service.js';
import enrolledCourseService from '../../services/enrolledCourse.service';
import wishlistService from '../../services/wishlist.service';

import Footer from '../../components/Footer';
import Banner from './Banner';
import Description from './Description';
import PageNavigation from './PageNavigation';
import InstructorSection from './InstructorSection';
import Content from './Content';
import RecommendSection from './RecommendSection';
import ReviewSection from './ReviewSection';
import { useStyles } from './styles';
import dataFetchReducer from '../../utils/dataFetchReducer';
import usePrepareLink from '../../utils/usePrepareLink';
import { GET_ENUMS, GET_PARAMS, ROUTES } from '../../config/config';

import { useSelector, useDispatch } from 'react-redux';
import {
    addWishlist,
    removeWishlist,
} from '../../store/features/wishlist/wishlistSlice';

const snackbarReducer = (state, action) => {
    switch (action.type) {
        case "SNACK_INIT":
            return {
                ...state,
                isLoading: true,
                open: false,
            };
        case "SNACK_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                snackContent: 'Success',
                snackType: 'success',
                open: true,
            };
        case "SNACK_ERROR":
            return {
                ...state,
                isLoading: false,
                snackContent: action.payload,
                snackType: 'error',
                open: true,
            };
        case 'CLOSE_SNACK':
            return {
                ...state,
                open: false,
            };
        default:
            throw new Error('Action is invalid');
    }
}

function DetailCourse() {
    const classes = useStyles();
    // Get id by url params
    const { id } = useParams();
    const history = useHistory();
    const reduxDispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isWishlist, setIsWishlist] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);


    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    });

    const signInLink = usePrepareLink({
        keepOldQuery: true,
        query: {
            [GET_PARAMS.popup]: GET_ENUMS.popup.signIn
        }
    });

    useEffect(() => {
        const inWishlist = wishlist.map(
            e => { return e?.Id; }).indexOf(state.data?.Id) !== -1

        setIsWishlist(inWishlist);
    }, [wishlist, state.data]);

    const [stateEnrollment, dispatchEnrollment] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    });

    const [snackState, dispatchSnackState] = useReducer(snackbarReducer, {
        isLoading: false,
        open: false,
    })

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        dispatchSnackState({ type: 'CLOSE_SNACK' })
    };

    const handleEnroll = () => {
        if (!isLoggedIn) {
            return history.push(signInLink);
        }
        dispatchSnackState({ type: 'SNACK_INIT' })
        enrolledCourseService.postOne({ Course_Id: state.data.Id }).then(response => {
            dispatchSnackState({ type: 'SNACK_SUCCESS' })
            history.push(`${ROUTES.profile}${ROUTES.myLearning}/${id}`)
            return response;
        }).catch(error => {
            dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
            console.log(error);
        })
    };

    const handleAddWishlist = () => {
        if (!isLoggedIn) {
            return history.push(signInLink);
        }
        if (isWishlist) {
            dispatchSnackState({ type: 'SNACK_INIT' })
            wishlistService.deleteOne(state.data.Id).then(response => {
                dispatchSnackState({ type: 'SNACK_SUCCESS' });
                reduxDispatch(removeWishlist(state.data.Id));
                return response;
            }).catch(error => {
                dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
                console.log(error);
            })
        } else {
            dispatchSnackState({ type: 'SNACK_INIT' })
            wishlistService.postOne({ Course_Id: state.data.Id }).then(response => {
                dispatchSnackState({ type: 'SNACK_SUCCESS' });
                reduxDispatch(addWishlist(state.data));
                return response;
            }).catch(error => {
                dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
                console.log(error);
            })
        }
    };

    const handleLearn = (id) => () => {
        history.push(`${ROUTES.course}${ROUTES.learn}/${id}`)
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_INIT' });
        courseService.getById(id)
            .then(response => {
                const courseRes = response.resultResponse;
                dispatch({ type: 'FETCH_SUCCESS', payload: courseRes });
            }).catch(error => {
                history.push('/500')
                dispatch({ type: 'FETCH_ERROR', payload: error.message })
            })
        dispatchEnrollment({ type: 'FETCH_INIT' });
        enrolledCourseService.getEnrolledByUser().then(response => {
            const enrolled = response.listAllResponse;

            dispatchEnrollment({ type: 'FETCH_SUCCESS', payload: enrolled });
        }).catch(error => {
            dispatchEnrollment({ type: 'FETCH_ERROR', payload: error.message })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {

        if (state.data && stateEnrollment.data.length > 0) {

            setIsEnrolled(!stateEnrollment.data.every(x => x.Id !== state.data.Id));
        }
    }, [state, stateEnrollment])

    useEffect(() => {
        const scrollOptions = {
            left: 0,
            top: 190,
            behavior: 'auto',
        }
        window.scrollTo(scrollOptions);
    }, [])

    return (
        <div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <Banner
                    course={state.data}
                    isPending={state.isLoading}
                    handleEnroll={handleEnroll}
                    handleAddWishlist={handleAddWishlist}
                    handleLearn={handleLearn(state.data?.Id)}
                    isEnrolled={isEnrolled}
                    isWishlist={isWishlist}
                />
            }
            <PageNavigation
                course={state.data}
                isPending={state.isLoading}
                handleEnroll={handleEnroll}
                handleAddWishlist={handleAddWishlist}
                handleLearn={handleLearn(state.data?.Id)}
                isEnrolled={isEnrolled}
                isWishlist={isWishlist}
            />
            <div style={{ position: 'relative' }}>
                <div id="description-section" className={classes.mark}></div>
            </div>

            {state.error
                ? <Typography>Cannot get data</Typography>
                : <Description
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            <div style={{ position: 'relative' }}>
                <div id="instructor-section" className={classes.mark}></div>
            </div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <InstructorSection
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            <div style={{ position: 'relative' }}>
                <div id="recommend-section" className={classes.mark} />
            </div>

            {state.error
                ? <Typography>Cannot get data</Typography>
                : <RecommendSection
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            <div style={{ position: 'relative' }}>
                < div id="content-section" className={classes.mark} />
            </div>

            {state.error
                ? <Typography>Cannot get data</Typography>
                : <Content
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            <div style={{ position: 'relative' }}>
                <div id="review-section" className={classes.mark} />
            </div>

            {state.error
                ? <Typography>Cannot get data</Typography>
                : <ReviewSection
                    course={state.data}
                    isPending={state.isLoading}
                />
            }


            <Backdrop className={classes.backdrop} open={snackState.isLoading}>
                <CircularProgress color='primary' />
            </Backdrop>
            <Snackbar
                open={snackState.open}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackState.snackType}>
                    {snackState.snackContent}
                </Alert>
            </Snackbar>
            <Footer style={{ marginTop: 20 }} />
        </div >
    )
}
export default DetailCourse;