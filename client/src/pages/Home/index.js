/* eslint-disable no-undef */
import { lazy, Suspense } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Footer from '../../components/Footer/Footer.jsx';
import HomeIntroBanner from './HomeIntroBanner';
const WeeklyHotCourses = lazy(() => import('./WeeklyHotCourses'));
const MostViewedCourses = lazy(() => import('./MostViewedCourses'));
const MostRecentCourses = lazy(() => import('./MostRecentCourses'));
const HotCategories = lazy(() => import('./HotCategories'));

function Home() {
    // Get course

    return (
        <div>
            <Suspense fallback={<div><LinearProgress /></div>}>
                <WeeklyHotCourses />
                <HomeIntroBanner />
                <MostViewedCourses />
                <MostRecentCourses />
                <HotCategories />
                <Footer />
            </Suspense>
        </div >
    )
}

export default Home;