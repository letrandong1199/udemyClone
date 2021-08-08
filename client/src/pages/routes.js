import { lazy } from 'react';
import { ROUTES } from '../config/config';

const HomePage = lazy(() => import('./Home'));
const CourseDetailPage = lazy(() => import('./CourseDetail'));
const ProfilePage = lazy(() => import('./Profile'));
const ResultPage = lazy(() => import('./Result'));
const CreateCoursePage = lazy(() => import('./CreateCourse'));
const Page404 = lazy(() => import('./Page404'));
const AdminPage = lazy(() => import('./Admin'));
const LearningPage = lazy(() => import('./Learning'));


const routes = [
    {
        path: ROUTES.home,
        exact: true,
        public: true,
        component: HomePage,
    },
    {
        path: `${ROUTES.courseDetail}/:id`,
        exact: true,
        public: true,
        component: CourseDetailPage,
    },
    {
        path: ROUTES.profile,
        exact: false,
        public: false,
        private: true,
        component: ProfilePage,
    },
    {
        path: ROUTES.course,
        exact: true,
        public: true,
        component: ResultPage,
    },
    {
        path: `${ROUTES.course}${ROUTES.learn}/:id`,
        exact: true,
        public: false,
        component: LearningPage,
    },
    {
        path: ROUTES.admin,
        exact: false,
        public: false,
        component: AdminPage,
    },
    {
        path: ROUTES.instructor,
        exact: false,
        public: false,
        component: CreateCoursePage,
    },
    {
        path: '*',
        exact: false,
        public: true,
        component: Page404,
    }
];
export default routes;