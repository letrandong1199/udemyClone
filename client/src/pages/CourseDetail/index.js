import { useState, useEffect } from 'react';
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


function DetailCourse() {
    const classes = useStyles();
    // Get id by url params
    const { id } = useParams();
    const history = useHistory();

    const [course, setCourse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');


    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return event;
        }
        setOpenSnack(false);
    };

    const handleEnroll = () => {
        setIsProcessing(true);
        enrolledCourseService.postOne({ Course_Id: course.Id }).then(response => {
            setSnackContent('Added');
            setSnackType('success');
            setOpenSnack(true);
            setIsProcessing(false)
            return response;
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsProcessing(false)
            console.log(error);
        })
    }
    const handleAddWishlist = () => {
        setIsProcessing(true);
        console.log(course);
        wishlistService.postOne({ Course_Id: course.Id }).then(response => {
            setSnackContent('Added');
            setSnackType('success');
            setOpenSnack(true);
            setIsProcessing(false);
            return response;
        }).catch(error => {
            setSnackContent(error.message);
            setSnackType('error');
            setOpenSnack(true);
            setIsProcessing(false);
            console.log(error);
        })
    }

    const handleLearn = (id) => () => {
        history.push(`${ROUTES.course}${ROUTES.learn}/${id}`)
    }

    useEffect(() => {
        setIsPending(true);
        courseService.getById(id)
            .then(response => {
                const courseRes = response.resultResponse;
                enrolledCourseService.getEnrolledByUser().then(response => {
                    const enrolled = response.listAllResponse;
                    const isEnrolled = enrolled.every(x => x.Course_Id !== courseRes.Id)
                    courseRes.Is_Enrolled = isEnrolled;
                    console.log(courseRes);
                    setCourse(courseRes);
                    setIsPending(false);
                }).catch(error => {
                    console.log(error);
                    setIsPending(false);
                })

            }).catch(error => {
                setError(error.message);
                setIsPending(false);
            })
    }, [id])


    useEffect(() => {
        const scrollOptions = {
            left: 0,
            top: 190,
            behavior: 'auto',
        }
        window.scrollTo(scrollOptions);
    }, [isPending])

    return (
        <div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Banner
                    course={course}
                    isPending={isPending}
                    handleEnroll={handleEnroll}
                    handleAddWishlist={handleAddWishlist}
                    handleLearn={handleLearn(course?.Id)}
                />
            }
            <PageNavigation
                course={course}
                isPending={isPending}
                handleEnroll={handleEnroll}
                handleAddWishlist={handleAddWishlist}
                handleLearn={handleLearn(course?.Id)}
            />
            <div id="description-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Description
                    course={course}
                    isPending={isPending}
                />
            }

            <div id="instructor-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <InstructorSection
                    course={course}
                    isPending={isPending}
                />
            }
            <div id="recommend-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <RecommendSection
                    course={course}
                    isPending={isPending}
                />
            }
            < div id="content-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <Content
                    course={course}
                    isPending={isPending}
                />
            }
            < div id="review-section" style={{ height: 20, backgroundColor: 'rgb(243, 243, 243)' }}></div>
            {error
                ? <Typography>Cannot get data</Typography>
                : <ReviewSection
                    course={course}
                    loading={isPending}
                />
            }


            <Backdrop className={classes.backdrop} open={isProcessing}>
                <CircularProgress color='primary' />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackContent}
                </Alert>
            </Snackbar>
            <Footer style={{ marginTop: 20 }} />
        </div >
    )
}
export default DetailCourse;