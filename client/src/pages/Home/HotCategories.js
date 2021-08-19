import {
    useEffect,
    useReducer,
    lazy,
    Suspense
} from 'react';
import { LinearProgress } from '@material-ui/core';
import categoryService from '../../services/category.service';
import dataFetchReducer from '../../utils/dataFetchReducer';
const HomeSection = lazy(() => import('../../components/HomeSection'))

const HotCategories = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: [],
        isLoading: false,
        error: null,
    })

    useEffect(() => {
        dispatch({ type: "FETCH_INIT" });
        categoryService.getMostEnrollmentCategories().then(response => {
            dispatch({ type: "FETCH_SUCCESS", payload: response.listAllResponse });
        }).catch(error => {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
        })
    }, [])


    return (
        <Suspense>
            {state.isLoading && <div><LinearProgress /></div>}
            {state.error && <div>{state.error}</div>}
            {state.data && <HomeSection title="Hot categories" categories={state.data} />}
        </Suspense>
    )
};

export default HotCategories;