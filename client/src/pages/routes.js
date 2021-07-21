import { lazy } from 'react';

const HomePage = lazy(() => import('./Home'));
const CourseDetailPage = lazy(() => import('./CourseDetail'));
const ProfilePage = lazy(() => import('./Profile'));
const ResultPage = lazy(() => import('./Result'));
//import ProfilePage from './Profile';
//import CourseDetailPage from './CourseDetail';
//import HomePage from './Home';

const routes = [
    {
        path: '/',
        exact: true,
        public: true,
        component: HomePage,
    },
    {
        path: '/detail/:id',
        exact: true,
        public: true,
        component: CourseDetailPage,
    },
    {
        path: '/profile',
        exact: false,
        public: true,
        component: ProfilePage,
    },
    {
        path: '/course',
        exact: false,
        public: true,
        component: ResultPage,
    }
];
export default routes;