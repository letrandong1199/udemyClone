import { lazy } from 'react';

const HomePage = lazy(() => import('./Home'));
const CourseDetailPage = lazy(() => import('./CourseDetail'));

const routes = [
    {
        path: '/',
        extract: true,
        public: true,
        component: HomePage,
    },
    {
        path: '/detail/:id',
        extract: true,
        public: true,
        component: CourseDetailPage,
    }
];
export default routes;