import { lazy } from 'react';

const HomePage = lazy(() => import('./Home'));
const CourseDetailPage = lazy(() => import('./CourseDetail'));
const ProfilePage = lazy(() => import('./Profile'));
const ResultPage = lazy(() => import('./Result'));
const CreateCoursePage = lazy(() => import('./CreateCourse'));
const Page404 = lazy(() => import('./Page404'));
const PopupPage = lazy(() => import('./Popup'));
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
    },
    {
        path: '/create-course',
        exact: false,
        public: true,
        component: CreateCoursePage,
    },
    {
        path: '/popup',
        exact: false,
        public: true,
        component: PopupPage,
    },
    {
        path: '*',
        exact: false,
        public: true,
        component: Page404,
    }
];
export default routes;