import { lazy } from 'react';

const HomePage = lazy(() => import('./Home'));
const CourseDetailPage = lazy(() => import('./CourseDetail'));
const ProfilePage = lazy(() => import('./Profile'));
const ResultPage = lazy(() => import('./Result'));
const CreateCoursePage = lazy(() => import('./CreateCourse'));
const Page404 = lazy(() => import('./Page404'));
const AdminPage = lazy(() => import('./Admin'));
const LearningPage = lazy(() => import('./Learning'));
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
        path: '/course/detail/:id',
        exact: true,
        public: true,
        component: CourseDetailPage,
    },
    {
        path: '/profile',
        exact: false,
        public: false,
        private: true,
        component: ProfilePage,
    },
    {
        path: '/course',
        exact: true,
        public: true,
        component: ResultPage,
    },
    {
        path: '/learning/:id',
        exact: true,
        public: true,
        component: LearningPage,
    },
    {
        path: '/admin',
        exact: false,
        public: false,
        component: AdminPage,
    },
    {
        path: '/create-course',
        exact: false,
        public: true,
        component: CreateCoursePage,
    },
    {
        path: '*',
        exact: false,
        public: true,
        component: Page404,
    }
];
console.log('before');
export default routes;