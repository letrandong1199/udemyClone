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

import Footer from '../../components/Footer/Footer.jsx';
import Banner from './Banner';
import Description from './Description';
import PageNavigation from './PageNavigation';
import InstructorSection from './InstructorSection';
import Content from './Content';
import RecommendSection from './RecommendSection';
import ReviewSection from './ReviewSection';
import { useStyles } from './styles';
import { ROUTES } from '../../config/config';
import dataFetchReducer from '../../utils/dataFetchReducer';

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
                snackContent: '',
                snackType: '',
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

    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    });

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
        dispatchSnackState({ type: 'SNACK_INIT' })
        enrolledCourseService.postOne({ Course_Id: state.data.Id }).then(response => {
            dispatchSnackState({ type: 'SNACK_SUCCESS' })
            return response;
        }).catch(error => {
            dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
            console.log(error);
        })
    };

    const handleAddWishlist = () => {
        dispatchSnackState({ type: 'SNACK_INIT' })
        wishlistService.postOne({ Course_Id: state.data.Id }).then(response => {
            dispatchSnackState({ type: 'SNACK_SUCCESS' })
            return response;
        }).catch(error => {
            dispatchSnackState({ type: 'SNACK_ERROR', payload: error.message })
            console.log(error);
        })
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
                dispatch({ type: 'FETCH_ERROR', payload: error.message })
            })
        dispatchEnrollment({ type: 'FETCH_INIT' });
        enrolledCourseService.getEnrolledByUser().then(response => {
            const enrolled = response.listAllResponse;
            dispatch({ type: 'FETCH_SUCCESS', payload: enrolled });
        }).catch(error => {
            dispatch({ type: 'FETCH_ERROR', payload: error.message })
        })
    }, [id])

    useEffect(() => {
        if (state.data.length > 0 && stateEnrollment.data.length > 0) {
            const isEnrolled = stateEnrollment.data.every(x => x.Course_Id !== state.data.Id)
            dispatch({ type: 'FETCH_SUCCESS', payload: { ...state.data, Is_Enrolled: isEnrolled } })
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
                />
            }
            <PageNavigation
                course={state.data}
                isPending={state.isLoading}
                handleEnroll={handleEnroll}
                handleAddWishlist={handleAddWishlist}
                handleLearn={handleLearn(state.data?.Id)}
            />
            <div id="description-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <Description
                    course={state.data}
                    isPending={state.isLoading}
                />
            }

            <div id="instructor-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <InstructorSection
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            <div id="recommend-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <RecommendSection
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            < div id="content-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {state.error
                ? <Typography>Cannot get data</Typography>
                : <Content
                    course={state.data}
                    isPending={state.isLoading}
                />
            }
            < div id="review-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
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