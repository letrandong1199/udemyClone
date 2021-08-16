import {
    useEffect,
    useReducer,
    lazy,
    Suspense
} from 'react';
import { LinearProgress } from '@material-ui/core';
import courseService from '../../services/course.service.js';
import dataFetchReducer from '../../utils/dataFetchReducer';
const Carousel = lazy(() => import('../../components/Carousel'))

const WeeklyHotCourses = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    })

    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        courseService.getMostEnrollmentCourses().then(response => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.listAllResponse });
        }).catch(error => {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        })
    }, [])


    return (
        <Suspense>
            {state.isLoading && <div><LinearProgress /></div>}
            {state.error && <div>{state.error}</div>}
            {state.data && <Carousel courses={state.data} />}
        </Suspense>
    )
}

export default WeeklyHotCourses;