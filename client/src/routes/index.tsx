import Login from '@/features/auth/login/Login';
import Register from '@/features/auth/register/Register';
import VerifyMail from '@/features/auth/verify-mail/VerifyMail';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import Dashboard from '@/pages/dashboard/Dashboard';
import Home from '@/pages/home/Home';
import ErrorPage from '@/pages/Error';
import { Layout } from '@/pages/Layout';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import CreateProject from '@/pages/project/create/CreateProject';
import ManageProject from '@/pages/project/manage/ManageProject';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Register />,
            },
            {
                path: '/verify-mail',
                element: <VerifyMail />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardLayout />,
                        children: [
                            {
                                path: '',
                                element: <Dashboard />,
                            },
                            {
                                path: 'projects',
                                children: [
                                    {
                                        path: 'create',
                                        element: <CreateProject />,
                                    },
                                    {
                                        path: ':projectId/manage',
                                        element: <ManageProject />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
