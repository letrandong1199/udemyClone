import {
    useEffect,
    useReducer,
    lazy,
    Suspense
} from 'react';
import { LinearProgress } from '@material-ui/core';
import courseService from '../../services/course.service.js';
import dataFetchReducer from '../../utils/dataFetchReducer';
const HomeSection = lazy(() => import('../../components/HomeSection'))

const MostRecentCourses = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    })

    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        courseService.getMostRecentCourses().then(response => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.listAllResponse });
        }).catch(error => {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        })
    }, [])


    return (
        <Suspense>
            {state.isLoading && <div><LinearProgress /></div>}
            {state.error && <div>{state.error}</div>}
            {state.data && <HomeSection title="Most recent courses" courses={state.data} />}
        </Suspense>
    )
};

export default MostRecentCourses;