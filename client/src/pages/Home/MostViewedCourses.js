import {
    useEffect,
    useReducer,
    lazy,
    Suspense
} from 'react';
import { LinearProgress } from '@material-ui/core';
import courseService from '../../services/course.service.js';
import dataFetchReducer from '../../utils/dataFetchReducer';
const HomeSection = lazy(() => import('../../components/HomeSection/HomeSection.jsx'))

const MostViewedCourses = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    })

    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        courseService.getMostViewedCourses().then(response => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.listAllResponse });
        }).catch(error => {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        })
    }, [])


    return (
        <Suspense>
            {state.isLoading && <div><LinearProgress /></div>}
            {state.error && <div>{state.error}</div>}
            {state.data && <HomeSection title="Most viewed courses" courses={state.data} color="vibrant" />}
        </Suspense>
    )
};

export default MostViewedCourses;